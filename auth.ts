import Spotify from "next-auth/providers/spotify";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email%20user-read-private%20user-top-read&response_type=code&show_dialog=true",
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, profile }) => {
      console.log("JWT Callback");
      // console.log("Token", token);
      // console.log("Account", account);
      // console.log("Profile", profile);
      if (account) {
        // First login, save the `access_token`, `refresh_token`, and other
        // details into the JWT

        const userProfile = {
          id: token.sub,
          name: token?.name,
          email: token?.email,
          image: token?.picture,
        };

        return {
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          user: userProfile,
        };
      } else if (Date.now() < token.exp! * 1000) {
        // Subsequent logins, if the `access_token` is still valid, return the JWT
        return token;
      } else {
        // Subsequent logins, if the `access_token` has expired, try to refresh it
        if (!token.refresh_token) throw new Error("Missing refresh token");

        try {
          const response = await fetch(
            "https://accounts.spotify.com/api/token",
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                grant_type: "refresh_token",
                access_token: token.accessToken as string,
                client_id: process.env.SPOTIFY_CLIENT_ID!,
              }),
              method: "POST",
            },
          );

          const responseTokens = await response.json();

          if (!response.ok) throw responseTokens;

          return {
            ...token,
            access_token: responseTokens.access_token,
            expires_at: Math.floor(
              Date.now() / 1000 + (responseTokens.expires_in as number),
            ),
            refresh_token: responseTokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          // The error property can be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    session: async ({ session, token }) => {
      console.log("Session Callback");
      // console.log(session);
      // console.log(token);
      session.access_token = token.access_token as string;
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    error?: "RefreshAccessTokenError";
    access_token: string;
  }
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}
