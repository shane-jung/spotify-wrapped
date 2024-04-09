"use client";
import spotify from "@/lib/spotify";
import { useEffect, useState } from "react";

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
      <img
        src={user?.images[1].url}
        alt="Spotify Profile"
        className="w-80 h-80 rounded-full mb-4"
      />
      <h1 className="text-2xl font-bold">Hey, {user?.display_name}!</h1>
    </div>
  );
}
