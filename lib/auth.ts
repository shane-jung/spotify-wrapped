import Spotify from "next-auth/providers/spotify";
import NextAuth, { Session } from "next-auth";
import "next-auth/jwt";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";

let promise: Promise<any> | null = null;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
      authorization:
        "https://accounts.spotify.com/en/authorize?scope=user-read-recently-played%20user-read-email%20user-read-private%20user-top-read&response_type=code&callback",
    }),
  ],

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/error",
    verifyRequest: "/verify",
    newUser: "/new",
  },

  callbacks: {
    async signIn(): Promise<boolean> {
      return true;
    },

    async redirect({ baseUrl }): Promise<string> {
      return baseUrl;
    },

    async jwt({ token, account }): Promise<JWT> {
      if (account) {
        token.expires_at = account.expires_at ?? 0;
        token.access_token = account.access_token!;
        token.refresh_token = account.refresh_token!;
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (!token) return session;

      return {
        expires: session.expires,
        user: session.user,
        token,
      };
    },
  },
});
