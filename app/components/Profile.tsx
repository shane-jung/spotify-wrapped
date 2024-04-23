"use client";
import spotify from "@/lib/spotify";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Profile() {
  if (!spotify.currentUser) return <div>Loading...</div>;
  const [user, setUser] = useState<any>();

  useEffect(() => {
    spotify.currentUser.profile().then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Image
        src={user?.images[1].url}
        alt="Spotify Profile"
        width={300}
        height={300}
        className="rounded-full mb-4"
        priority
      />
      <h1 className="text-2xl font-bold">Hey, {user?.display_name}!</h1>
    </div>
  );
}
