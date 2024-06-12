import { type User } from "next-auth";
import { type JWT } from "next-auth/jwt";

declare module "next-auth/core/types" {
  interface Session {
    user: User;
    token: JWT | undefined;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    expires_at: number;
    access_token: string;
    refresh_token: string;
  }
}
