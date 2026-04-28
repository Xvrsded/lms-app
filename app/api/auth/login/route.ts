import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { createAuthToken, setAuthCookie } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { message: "email dan password wajib diisi." },
        { status: 400 },
      );
    }

    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "email atau password salah." }, { status: 401 });
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ message: "email atau password salah." }, { status: 401 });
    }

    const token = createAuthToken({ userId: user.id, role: user.role });
    const response = NextResponse.json({
      message: "login berhasil.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    setAuthCookie(response, token);

    return response;
  } catch {
    return NextResponse.json({ message: "gagal login user." }, { status: 500 });
  }
}
