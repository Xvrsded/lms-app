import { NextRequest, NextResponse } from "next/server";
import { getAuthTokenFromRequest, verifyAuthToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendWhatsApp } from "@/lib/whatsapp";

export const runtime = "nodejs";

type AttendanceBody = {
  image?: string;
  latitude?: number;
  longitude?: number;
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
      return NextResponse.json({ message: "hanya student yang bisa absen." }, { status: 403 });
    }

    const body = (await request.json()) as AttendanceBody;

    if (
      typeof body.image !== "string" ||
      typeof body.latitude !== "number" ||
      typeof body.longitude !== "number"
    ) {
      return NextResponse.json(
        { message: "image, latitude, dan longitude wajib diisi." },
        { status: 400 },
      );
    }

    if (
      Number.isNaN(body.latitude) ||
      Number.isNaN(body.longitude) ||
      body.latitude < -90 ||
      body.latitude > 90 ||
      body.longitude < -180 ||
      body.longitude > 180
    ) {
      return NextResponse.json({ message: "koordinat tidak valid." }, { status: 400 });
    }

    const enrollment = await db.enrollment.findFirst({
      where: { userId: user.id },
      select: {
        courseId: true,
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { message: "kamu belum enroll course, tidak bisa absen." },
        { status: 400 },
      );
    }

    const attendance = await db.attendance.create({
      data: {
        userId: user.id,
        courseId: enrollment.courseId,
        imageUrl: body.image,
        latitude: body.latitude,
        longitude: body.longitude,
      },
      select: {
        id: true,
        userId: true,
        courseId: true,
        imageUrl: true,
        latitude: true,
        longitude: true,
        createdAt: true,
      },
    });

    await sendWhatsApp(
      user.id,
      `Absensi berhasil pada ${attendance.createdAt.toISOString()} (lat: ${attendance.latitude}, long: ${attendance.longitude})`,
    );

    return NextResponse.json(
      {
        message: "absensi berhasil disimpan.",
        attendance,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ message: "gagal menyimpan absensi." }, { status: 500 });
  }
}
