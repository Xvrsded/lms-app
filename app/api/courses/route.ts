import { NextRequest, NextResponse } from "next/server";
import { getAuthTokenFromRequest, verifyAuthToken } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

type CreateCourseBody = {
  title?: string;
  description?: string;
  price?: number | string;
};

async function getCurrentUser(request: NextRequest) {
  const token = getAuthTokenFromRequest(request);

  if (!token) {
    return null;
  }

  const payload = verifyAuthToken(token);
  if (!payload) {
    return null;
  }

  return db.user.findUnique({
    where: { id: payload.sub },
    select: {
      id: true,
      role: true,
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json({ message: "unauthorized." }, { status: 401 });
    }

    const courses = await db.course.findMany({
      where: user.role === "teacher" ? { teacherId: user.id } : undefined,
      orderBy: {
        title: "asc",
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ courses });
  } catch {
    return NextResponse.json({ message: "gagal mengambil course." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json({ message: "unauthorized." }, { status: 401 });
    }

    if (user.role !== "teacher") {
      return NextResponse.json({ message: "hanya teacher yang bisa membuat course." }, { status: 403 });
    }

    const body = (await request.json()) as CreateCourseBody;
    const title = body.title?.trim();
    const description = body.description?.trim();
    const priceValue = typeof body.price === "string" ? Number(body.price) : body.price;

    if (!title || !description || typeof priceValue !== "number" || Number.isNaN(priceValue)) {
      return NextResponse.json(
        { message: "title, description, dan price wajib diisi dengan benar." },
        { status: 400 },
      );
    }

    if (priceValue < 0) {
      return NextResponse.json({ message: "price tidak boleh negatif." }, { status: 400 });
    }

    const course = await db.course.create({
      data: {
        title,
        description,
        price: priceValue,
        teacherId: user.id,
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "course berhasil dibuat.",
        course,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ message: "gagal membuat course." }, { status: 500 });
  }
}
