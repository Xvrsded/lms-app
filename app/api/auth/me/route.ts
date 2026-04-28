import { NextRequest, NextResponse } from "next/server";
import { getAuthTokenFromRequest, verifyAuthToken } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const token = getAuthTokenFromRequest(request);

    if (!token) {
      return NextResponse.json({ message: "unauthorized." }, { status: 401 });
    }

    const payload = verifyAuthToken(token);
    if (!payload) {
      return NextResponse.json({ message: "token tidak valid." }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "user tidak ditemukan." }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ message: "gagal mengambil user." }, { status: 500 });
  }
}
