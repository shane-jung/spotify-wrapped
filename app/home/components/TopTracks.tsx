import { ChangeEvent, useEffect, useState } from "react";
import TopArtists from "./TopArtists";
import TopSongs from "./TopSongs";

const options = [
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Annual",
    value: "annual",
  },
  {
    label: "All Time",
    value: "alltime",
  },
];
export default function TopTracks() {
  return (
    <div className="relative">
      <div className="">
        <TopArtists period={""} />
      </div>
      <div className="h-[90vh] bg-blue-200 py-24">
        <TopSongs period={""} />
      </div>

      <div className="z-100 fixed bottom-0 right-0 flex flex-row gap-3 p-5 text-white">
        {options.map((option, i) => (
          <div key={i}>
            <input
              id={option.value}
              className="peer hidden"
              type="radio"
              name="period"
              value={option.value}
              // checked={period === option.value}
              // onChange={handleOptionChange}
            />

            <label
              htmlFor={option.value}
              className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-3 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
