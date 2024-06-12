import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="fixed left-0 top-0 z-10 flex w-full justify-between bg-white px-2 py-4 shadow-md">
      <h1 className="ml-2 text-4xl">
        <span className="font-bold text-green-600">Spotify</span>{" "}
        <span className="opacity-50">re</span>
        <span className="font-medium text-slate-700">Wrapped</span>
      </h1>
      {session?.user && (
        <Avatar>
          <AvatarImage src={session?.user?.image!} />
        </Avatar>
      )}
    </nav>
  );
}
