import RecentlyPlayedTracks from "./RecentlyPlayedTracks";
import Profile from "./components/Profile";

export default function Landing() {
  return (
    <div className="grid grid-cols-12 h-[75vh] px-16 py-10 items-center">
      <div className="col-span-5">
        <Profile />
      </div>
      <div className="cursor-pointer group col-span-7 h-full flex flex-col overflow-y-hidden py-10">
        <h1 className="text-2xl font-bold">Recent Listening History</h1>
        <p className="text-sm opacity-50 mb-2">
          Your most recent listening history from Spotify.
        </p>
        <RecentlyPlayedTracks />

        <a
          className="opacity-50 text-center mx-auto pt-12 hover:underline transition hover:opacity-90 duration-75"
          href="/history"
        >
          View Full Listening History
        </a>
      </div>
    </div>
  );
}
