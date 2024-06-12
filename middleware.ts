import {
  NextResponse,
  type NextMiddleware,
  type NextRequest,
} from "next/server";
import { encode, getToken, decode, type JWT } from "next-auth/jwt";

// import { admins } from "./config/data/internalData";

export const SIGNIN_SUB_URL = "/api/auth/signin";
export const SESSION_TIMEOUT = 60 * 60 * 24 * 30; // 30 days
export const TOKEN_REFRESH_BUFFER_SECONDS = 3;
export const SESSION_SECURE = process.env.NEXTAUTH_URL?.startsWith("https://");
export const SESSION_COOKIE = SESSION_SECURE
  ? "__Secure-authjs.session-token"
  : "authjs.session-token";

let isRefreshing = false;

export function shouldUpdateToken(token: JWT): boolean {
  const timeInSeconds = Math.floor(Date.now() / 1000);
  return timeInSeconds >= token?.expires_at - TOKEN_REFRESH_BUFFER_SECONDS;
}

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  if (isRefreshing) {
    return token;
  }

  const timeInSeconds = Math.floor(Date.now() / 1000);
  isRefreshing = true;
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.AUTH_SPOTIFY_ID!,
        grant_type: "refresh_token",
        refresh_token: token?.refresh_token!,
      }),
      method: "POST",
    });

    const newTokens = await response.json();

    if (!response.ok) {
      throw new Error(`Token refresh failed with status: ${response.status}`);
    }

    return {
      ...token,
      access_token: newTokens?.access_token ?? token?.access_token,
      expires_at: newTokens?.expires_in + timeInSeconds,
      refresh_token: newTokens?.refresh_token ?? token?.refresh_token,
    };
  } catch (e) {
    console.error(e);
  } finally {
    isRefreshing = false;
  }
  console.log("SHOULDN'T BE HERE");
  return token;
}

export function updateCookie(
  sessionToken: string | null,
  request: NextRequest,
  response: NextResponse,
): NextResponse<unknown> {
  /*
   * BASIC IDEA:
   *
   * 1. Set request cookies for the incoming getServerSession to read new session
   * 2. Updated request cookie can only be passed to server if it's passed down here after setting its updates
   * 3. Set response cookies to send back to browser
   */

  if (sessionToken) {
    // Set the session token in the request and response cookies for a valid session
    request.cookies.set(SESSION_COOKIE, sessionToken);
    response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      maxAge: SESSION_TIMEOUT,
      secure: SESSION_SECURE,
      sameSite: "lax",
    });
  } else {
    request.cookies.delete(SESSION_COOKIE);
    return NextResponse.redirect(new URL(SIGNIN_SUB_URL, request.url));
  }

  return response;
}

export async function middleware(request: NextRequest) {
  // console.log(request);
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET!,
    salt: SESSION_COOKIE,
  });

  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
  const isAuthenticated = !!token;

  let response = NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL(SIGNIN_SUB_URL, request.url));
  }

  if (shouldUpdateToken(token)) {
    try {
      const newSessionToken = await encode({
        secret: process.env.AUTH_SECRET!,
        token: await refreshAccessToken(token),
        maxAge: SESSION_TIMEOUT,
        salt: SESSION_COOKIE,
      });
      response = updateCookie(newSessionToken, request, response);
    } catch (error) {
      console.log("Error refreshing token: ", error);
      return updateCookie(null, request, response);
    }
  }

  // if (isAdminPage && isAuthenticated && !admins.includes(token.email!)) {
  //   return NextResponse.redirect(new URL("/forbidden", request.url));
  // }

  if (isAdminPage && isAuthenticated) {
    console.log("Admin page");
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/home/:path*"],
};
