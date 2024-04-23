"use client";
import spotify from "@/lib/spotify";
import prisma from "@/lib/prisma";
import { useEffect, useState } from "react";
export default function Page({
  params: { songId },
}: {
  params: { songId: string };
}) {
  const [song, setSong] = useState<any>(null);
  useEffect(() => {
    spotify.tracks.get(songId).then((res) => {
      setSong(res);
    });
  }, []);

  
  return (
    <div>
      <h1>Song Page</h1>
      <p>Song ID: {songId}</p>
      <p>Song Name: {song?.name}</p>
      <p>Artist: {song?.artists[0].name}</p>
      <p>Album: {song?.album.name}</p>
      <img src={song?.album.images[0].url} alt="Album Cover" />
      <p>Listens: 

      </p>
    </div>
  );
}
