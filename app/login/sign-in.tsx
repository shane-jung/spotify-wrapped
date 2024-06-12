import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("spotify", { redirectTo: "/home" });
      }}
      className="mt-12 flex h-screen flex-col items-center justify-center"
    >
      <button type="submit" className="rounded-lg bg-green-600 p-4">
        Sign In with Spotify
      </button>
    </form>
  );
}
