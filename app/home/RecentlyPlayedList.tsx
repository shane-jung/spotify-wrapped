"use client";

import { listening_history } from "@prisma/client";
import { useEffect } from "react";

export default function RecentlyPlayedList({
  tracks,
}: {
  tracks: listening_history[];
}) {
  useEffect(() => {
    const tracksContainer = document.getElementById("recently-played-list");
    tracksContainer?.animate(
      [
        { transform: "translateY(0)" },
        { transform: `translateY(-${tracksContainer?.clientHeight}px)` },
        { transform: "translateY(0)" },
      ],
      {
        duration: 40000,
        iterations: Infinity,
      },
    );
  }, []);

  return (
    <div id="inner-container" className="overflow-y-hidden">
      <div
        id="recently-played-list"
        className="overflow-y-hidden transition-all"
        style={{
          marginTop: "50%",
        }}
      >
        {tracks?.map((track, i) => (
          <div
            key={i}
            className="track group my-4 flex cursor-pointer flex-row items-center justify-between gap-2 rounded-md border-2 border-gray-200 px-4 py-5 transition-colors duration-200 ease-in-out hover:border-gray-300"
          >
            <div>
              <h2 className="mb-1 text-lg font-semibold">{track.track_name}</h2>
              <p className="text-sm opacity-50">{track.artist_name}</p>
            </div>

            <span className="opacity-50">
              {track.played_at &&
                (track.played_at >
                new Date(new Date().setMinutes(new Date().getMinutes() - 1))
                  ? "Just Now"
                  : track.played_at >
                      new Date(new Date().setHours(new Date().getHours() - 1))
                    ? `${Math.floor(
                        (new Date().getTime() - track.played_at.getTime()) /
                          60000,
                      )}m ago`
                    : track.played_at >
                        new Date(new Date().setDate(new Date().getDate() - 1))
                      ? `${Math.floor(
                          (new Date().getTime() - track.played_at.getTime()) /
                            3600000,
                        )}h ago`
                      : `${Math.floor(
                          (new Date().getTime() - track.played_at.getTime()) /
                            86400000,
                        )}d ago`)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
