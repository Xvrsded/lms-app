import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "auth_token";
const ROLE_COOKIE_NAMES = ["auth_role", "role"] as const;
const SESSION_COOKIE_NAMES = ["connect.sid"] as const;
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

export type UserRole = "admin" | "teacher" | "student";

type CreateAuthTokenInput = {
  userId: string;
  role: UserRole;
};

export type AuthTokenPayload = {
  sub: string;
  role: UserRole;
  exp: number;
};

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET is required in production.");
  }

  return secret ?? "dev_auth_secret_change_me";
}

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function createSignature(unsignedToken: string) {
  return createHmac("sha256", getAuthSecret())
    .update(unsignedToken)
    .digest("base64url");
}

export function createAuthToken({ userId, role }: CreateAuthTokenInput) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({
      sub: userId,
      role,
      exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
    } satisfies AuthTokenPayload),
  );

  const unsignedToken = `${header}.${payload}`;
  const signature = createSignature(unsignedToken);

  return `${unsignedToken}.${signature}`;
}

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  const [header, payload, signature] = parts;
  if (!header || !payload || !signature) {
    return null;
  }

  const unsignedToken = `${header}.${payload}`;
  const expectedSignature = createSignature(unsignedToken);

  const signatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedSignatureBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
  ) {
    return null;
  }

  try {
    const parsedPayload = JSON.parse(base64UrlDecode(payload)) as AuthTokenPayload;

    if (
      !parsedPayload ||
      typeof parsedPayload.sub !== "string" ||
      typeof parsedPayload.exp !== "number" ||
      !parsedPayload.role
    ) {
      return null;
    }

    if (parsedPayload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return parsedPayload;
  } catch {
    return null;
  }
}

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TOKEN_TTL_SECONDS,
  });
}

export function clearAuthCookie(response: NextResponse) {
  const secure = process.env.NODE_ENV === "production";

  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 0,
  });

  ROLE_COOKIE_NAMES.forEach((name) => {
    response.cookies.set({
      name,
      value: "",
      httpOnly: false,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: 0,
    });
  });

  SESSION_COOKIE_NAMES.forEach((name) => {
    response.cookies.set({
      name,
      value: "",
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: 0,
    });
  });
}

export function getAuthTokenFromRequest(request: NextRequest) {
  return request.cookies.get(AUTH_COOKIE_NAME)?.value;
}
