"use client";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { fetchTrack } from "./actions";
import indicator from "ordinal/indicator";
import { Track, TrackItem } from "@spotify/web-api-ts-sdk";
import { getSpotify } from "@/lib/spotify";

export default async function TrackInfo({ uri }: { uri: string }) {
  if (!uri) return null;
  const [track, setTrack] = useState<Track>();
  const [listens, setListens] = useState<number>();
  const [relativePopularity, setRelativePopularity] = useState<number>();
  const spotify = await getSpotify();

  useEffect(() => {
    spotify?.tracks.get(uri.split(":")[2]).then((res: Track) => {
      // console.log(res);
      setTrack(res);
    });

    fetchTrack(uri).then(({ listens, ranking }) => {
      setListens(listens);
      setRelativePopularity(ranking);
    });
  }, [uri]);

  return (
    track && (
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
          You've listened to this track {listens?.toLocaleString()} times
        </p>
        <p className="text-sm opacity-50">
          {track?.artists[0].name} is the{" "}
          <span className="font-bold text-white opacity-100 text-base ">
            {relativePopularity?.toLocaleString() +
              indicator(relativePopularity!)}
          </span>{" "}
          most popular artist in your library
        </p>
      </div>
    )
  );
}
