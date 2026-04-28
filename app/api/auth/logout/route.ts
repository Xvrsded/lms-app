import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ message: "logout berhasil." });
  response.headers.set("Cache-Control", "no-store");
  clearAuthCookie(response);
  return response;
}
