import { NextRequest, NextResponse } from "next/server";
import { getAuthTokenFromRequest, verifyAuthToken } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

type EnrollBody = {
  courseId?: string;
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

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json({ message: "unauthorized." }, { status: 401 });
    }

    if (user.role !== "student") {
      return NextResponse.json({ message: "hanya student yang bisa enroll course." }, { status: 403 });
    }

    const body = (await request.json()) as EnrollBody;
    const courseId = body.courseId?.trim();

    if (!courseId) {
      return NextResponse.json({ message: "courseId wajib diisi." }, { status: 400 });
    }

    const course = await db.course.findUnique({
      where: { id: courseId },
      select: { id: true },
    });

    if (!course) {
      return NextResponse.json({ message: "course tidak ditemukan." }, { status: 404 });
    }

    const existingEnrollment = await db.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId,
      },
      select: { id: true },
    });

    if (existingEnrollment) {
      return NextResponse.json({ message: "kamu sudah enroll course ini." }, { status: 409 });
    }

    const enrollment = await db.enrollment.create({
      data: {
        userId: user.id,
        courseId,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            teacherId: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "enroll berhasil.",
        enrollment,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ message: "gagal enroll course." }, { status: 500 });
  }
}
