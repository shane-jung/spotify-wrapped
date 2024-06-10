import TopTracks from "./components/TopTracks";
import Landing from "./Landing";

export default async function Page() {
  return (
    <div className="mt-8">
      <Landing />
      <TopTracks />
    </div>
  );
}
