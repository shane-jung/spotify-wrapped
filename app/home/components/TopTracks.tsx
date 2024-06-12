import { ChangeEvent, useEffect, useState } from "react";
import TopArtists from "./TopArtists";
import TopSongs from "./TopSongs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

      <div className="z-100 fixed bottom-0 right-0 flex flex-row gap-3 p-5">
        <ToggleGroup type="single">
          <ToggleGroupItem value="monthly" aria-label="Monthly">
            Monthly
          </ToggleGroupItem>
          <ToggleGroupItem value="annual">Annual</ToggleGroupItem>
          <ToggleGroupItem value="alltime">All Time</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
