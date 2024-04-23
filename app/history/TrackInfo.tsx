"use client";
import spotify from "@/lib/spotify";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchTrack } from "./actions";

export default function TrackInfo({ uri }: { uri: string }) {
  if (!uri) return null;
  const [track, setTrack] = useState<any>();
  const [listens, setListens] = useState<number>();
  const [relativePopularity, setRelativePopularity] = useState<number>();

  useEffect(() => {
    const track = spotify.tracks
      .get(uri.split(":")[2])
      .then((res) => {
        console.log(res);
        setTrack(res);
      })
      .catch((err) => console.log(err));
    const test = fetchTrack(uri).then(({ listens, ranking }) => {
      setListens(listens);
      setRelativePopularity(ranking);
    });
  }, [uri]);

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <h1 className="text-2xl">{track?.artists[0].name}</h1>
      <Image
        src={track?.album.images[0].url}
        alt="Album Cover"
        width={300}
        height={300}
        className="rounded-full mb-4"
      />
      <h1 className="text-2xl">{track?.name}</h1>
      <p className="text-sm opacity-50">{track?.album.name}</p>
      <p className="text-sm opacity-50">
        You've listened to this track {listens} times
      </p>
      <p className="text-sm opacity-50">
        {relativePopularity?.toLocaleString()}
      </p>
    </div>
  );
}
