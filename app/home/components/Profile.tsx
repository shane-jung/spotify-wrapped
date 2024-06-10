import { fetchProfile } from "@/lib/spotify";
import Image from "next/image";

export default async function Profile() {
  const user = await fetchProfile();
  return (
    <div className="my-auto flex flex-col items-center justify-center p-4">
      {user && (
        <Image
          src={user?.images[1].url}
          alt="Spotify Profile"
          width={350}
          height={350}
          className="mb-4 rounded-full"
          priority
        />
      )}
      <h1 className="text-2xl font-bold">Hey, {user?.display_name}!</h1>
    </div>
  );
}
