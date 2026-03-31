import { randomUUID } from "crypto";
import type { NextResponse } from "next/server";

export const VISITOR_ID_COOKIE_NAME = "nfr_vid";

const VISITOR_ID_COOKIE_MAX_AGE = 60 * 60 * 24 * 400;

export function getOrCreateVisitorId(existingVisitorId?: string | null) {
  if (existingVisitorId) {
    return {
      visitorId: existingVisitorId,
      shouldSetCookie: false,
    };
  }

  return {
    visitorId: randomUUID(),
    shouldSetCookie: true,
  };
}

export function applyVisitorIdCookie(response: NextResponse, visitorId: string) {
  response.cookies.set(VISITOR_ID_COOKIE_NAME, visitorId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: VISITOR_ID_COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
}
