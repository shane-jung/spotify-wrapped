import { fetchTopTracks } from "@/lib/spotify";
import { useEffect, useState } from "react";

interface Track {
  artist_name: string;
  track_name: string;
  _count: any;
}

export default async function TopSongs({ period }: { period: string }) {
  const { items: tracks } = await fetchTopTracks();

  // useEffect(() => {
  //   fetch(
  //     "http://localhost:8000/api/tracks?" +
  //       new URLSearchParams({ range: period })
  //   ).then((res) => {
  //     res.json().then((tracks) => {
  //       setTracks(tracks);
  //     });
  //   });

  //   if (period === "alltime") {
  //     setPeriodText("All Time");
  //   } else if (period === "annual") {
  //     setPeriodText("This Year");
  //   } else if (period === "monthly") {
  //     setPeriodText("This Month");
  //   }
  // }, [period]);

  return (
    <div className="col-span-5 col-start-1 flex min-w-96 flex-col px-12">
      <div className="mx-auto my-auto w-full max-w-3xl p-6 shadow-gray-700">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-center text-4xl font-semibold text-gray-800">
            Your Top Songs{" "}
            {/* <span className="text-3xl font-light opacity-50">
              ({periodText})
            </span> */}
          </h2>
        </div>
        <div className="flex h-full flex-col gap-4 overflow-auto">
          {tracks?.slice(0, 5).map((track: any, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 rounded-md py-4"
            >
              <div className="flex flex-row justify-between gap-6">
                <span className="text-6xl font-light text-gray-800">
                  {i + 1}.
                </span>
                <div className="flex w-[500px] flex-row justify-between text-2xl">
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-800">
                      {track.track_name} {"   "}
                    </p>
                    <span className="text-lg text-gray-400">
                      {track.artist_name}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {/* {track._count._all} streams */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
