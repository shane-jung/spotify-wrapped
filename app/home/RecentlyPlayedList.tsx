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
        duration: 120000,
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

            <span className="opacity-50">{getTimeAgo(track.played_at!)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getTimeAgo(playedAt: Date) {
  if (!playedAt) return "Just Now";
  const currentTime = new Date();
  const timeDiff = (currentTime.getTime() - playedAt.getTime()) / 1000;
  const thresholds = [
    { label: "Just Now", seconds: 60 },
    { label: "m ago", seconds: 3600 },
    { label: "h ago", seconds: 86400 },
    { label: "d ago", seconds: Infinity },
  ];

  for (const { label, seconds } of thresholds) {
    if (timeDiff < seconds) {
      if (label === "Just Now") {
        return label;
      } else {
        const divisor = seconds === Infinity ? 86400 : seconds / 60;
        const value = Math.floor(timeDiff / divisor);
        return `${value}${label}`;
      }
    }
  }
}
