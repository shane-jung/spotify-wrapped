import prisma from "@/lib/prisma";
import Profile from "./components/Profile";
import AnnualStats from "./components/AnnualStats";

export default async function Page() {
  const data = await prisma.listening_history.findMany({
    take: 15,
    orderBy: {
      played_at: "desc",
    },
  });

  return (
    <div className="grid grid-cols-3 gap-12 place-content-center place-items-center">
      <div className="">
        <Profile />
        <AnnualStats />
      </div>
      <div className=" cursor-pointer group col-span-2">
        <div className="py-12">
          <h1 className="text-2xl font-bold">Recent Listening History</h1>
          <p className="text-sm opacity-50">
            Your most recent listening history from Spotify.
          </p>

          <div className="my-8 flex flex-col gap-4 max-h-[65vh] overflow-y-scroll col-span-2">
            {data?.map((item) => (
              <a
                href={`/songs/${item.track_uri?.split(":")[2]}`}
                key={item.id}
                className="flex flex-col gap-2 p-4 border-2 border-gray-200 rounded-md hover:border-gray-300 transition-colors duration-200 ease-in-out cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{item.track_name}</h2>
                  <p className="text-sm opacity-50">{item.album_name}</p>
                </div>
                <p className="text-sm opacity-50">{item.artist_name}</p>
              </a>
            ))}
          </div>

          <a
            className="text-sm opacity-50 text-center mx-auto  "
            href="/history"
          >
            View Full Listening History
          </a>
        </div>
      </div>
    </div>
  );
}
