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
    <div className="flex flex-row justify-around ">
      <div className="my-auto">
        <Profile />
        <AnnualStats />
      </div>
      <div className="overflow-y-auto h-[100vh] border-2 border-gray-200 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer group">
        <div className="flex flex-col gap-4 p-4 max-w-xl mx-auto py-12">
          <h1 className="text-2xl font-bold">Recent Listening History</h1>
          <p className="text-sm opacity-50">
            Your most recent listening history from Spotify.
          </p>
          {data?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 p-4 border-2 border-gray-200 rounded-md hover:border-gray-300 transition-colors duration-200 ease-in-out cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{item.track_name}</h2>
                <p className="text-sm opacity-50">{item.album_name}</p>
              </div>
              <p className="text-sm opacity-50">{item.artist_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
