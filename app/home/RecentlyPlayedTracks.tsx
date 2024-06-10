import RecentlyPlayedList from "./RecentlyPlayedList";
import { fetchRecentStreams } from "@/lib/database";

export default async function RecentlyPlayedTracks() {
  // const tracks2 = (await spotify?.player.getRecentlyPlayedTracks())?.items;
  const tracks = await fetchRecentStreams();

  return (
    <div className="relative h-full">
      <RecentlyPlayedList tracks={tracks} />
      <div className="absolute top-0 h-full w-full bg-gradient-to-t from-white/70 from-5% via-transparent via-65% to-white to-95%"></div>
    </div>
  );
}
