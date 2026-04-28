import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "auth_token";
const AUTH_SECRET = process.env.AUTH_SECRET ?? "dev_auth_secret_change_me";

type UserRole = "admin" | "teacher" | "student";

type AuthTokenPayload = {
  sub: string;
  role: UserRole;
  exp: number;
};

const ROLE_DASHBOARD: Record<UserRole, string> = {
  admin: "/dashboard/admin",
  teacher: "/dashboard/teacher",
  student: "/dashboard/student",
};

function base64UrlToBase64(input: string) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padding = (4 - (base64.length % 4)) % 4;

  return `${base64}${"=".repeat(padding)}`;
}

function base64UrlDecode(input: string) {
  const base64 = base64UrlToBase64(input);
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function createSignature(unsignedToken: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(AUTH_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(unsignedToken),
  );

  return bytesToBase64Url(new Uint8Array(signature));
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return mismatch === 0;
}

function isUserRole(value: unknown): value is UserRole {
  return value === "admin" || value === "teacher" || value === "student";
}

async function verifyAuthToken(token: string): Promise<AuthTokenPayload | null> {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  const [header, payload, signature] = parts;
  if (!header || !payload || !signature) {
    return null;
  }

  const expectedSignature = await createSignature(`${header}.${payload}`);
  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const parsedPayload = JSON.parse(base64UrlDecode(payload)) as Partial<AuthTokenPayload>;

    if (
      typeof parsedPayload.sub !== "string" ||
      typeof parsedPayload.exp !== "number" ||
      !isUserRole(parsedPayload.role)
    ) {
      return null;
    }

    if (parsedPayload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return {
      sub: parsedPayload.sub,
      role: parsedPayload.role,
      exp: parsedPayload.exp,
    };
  } catch {
    return null;
  }
}

function redirect(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, request.url));
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const payload = token ? await verifyAuthToken(token) : null;

  if (pathname.startsWith("/dashboard")) {
    if (!payload) {
      return redirect(request, "/login");
    }

    const ownDashboard = ROLE_DASHBOARD[payload.role];

    if (pathname === "/dashboard" || pathname === "/dashboard/") {
      return redirect(request, ownDashboard);
    }

    if (pathname.startsWith("/dashboard/admin") && payload.role !== "admin") {
      return redirect(request, ownDashboard);
    }

    if (pathname.startsWith("/dashboard/teacher") && payload.role !== "teacher") {
      return redirect(request, ownDashboard);
    }

    if (pathname.startsWith("/dashboard/student") && payload.role !== "student") {
      return redirect(request, ownDashboard);
    }
  }

  if (pathname === "/login" && payload && searchParams.get("autoLogin") === "1") {
    return redirect(request, ROLE_DASHBOARD[payload.role]);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
