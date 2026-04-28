import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { createAuthToken, setAuthCookie, UserRole } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

type RegisterBody = {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
};

const allowedRoles: UserRole[] = ["admin", "teacher", "student"];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterBody;
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const role = body.role ?? "student";

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "name, email, dan password wajib diisi." },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "password minimal 6 karakter." },
        { status: 400 },
      );
    }

    if (!allowedRoles.includes(role)) {
      return NextResponse.json({ message: "role tidak valid." }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "email sudah terdaftar." }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    const token = createAuthToken({ userId: user.id, role: user.role });
    const response = NextResponse.json(
      {
        message: "register berhasil.",
        user,
      },
      { status: 201 },
    );

    setAuthCookie(response, token);

    return response;
  } catch {
    return NextResponse.json({ message: "gagal register user." }, { status: 500 });
  }
}
