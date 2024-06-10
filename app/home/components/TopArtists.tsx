import { fetchTopArtists } from "@/lib/spotify";

interface Artist {
  name: string;
  image: string;
  count: number;
}

export default async function TopArtists({ period }: { period: string }) {
  const { items: artists } = await fetchTopArtists();
  console.log(artists);
  // useEffect(() => {
  //   if (period === "alltime") {
  //     setPeriodText("All Time");
  //     setDurationString("since you started using Spotify");
  //   } else if (period === "annual") {
  //     setPeriodText("This Year");
  //     setDurationString("this past year");
  //   } else if (period === "monthly") {
  //     setPeriodText("This Month");
  //     setDurationString("this past month");
  //   }
  // }, [period]);

  if (!artists) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex h-[90vh] flex-row items-center justify-around bg-lime-200 px-24">
        <div className="col-start-1 flex w-[700px] max-w-2xl flex-col px-12">
          <div className="mx-auto my-auto w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg shadow-gray-700">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-4xl font-semibold text-gray-800">
                Top Artists{" "}
                {/* <span className="text-3xl font-light opacity-50">
                  ({periodText})
                </span> */}
              </h2>
            </div>
            <div className="flex h-full flex-col gap-4 overflow-auto">
              {artists?.slice(0, 5).map((artist: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-md bg-gray-100 p-4"
                >
                  <span className="text-2xl font-bold text-gray-600">
                    {i + 1}.
                  </span>
                  <p className="text-2xl text-gray-800">{artist?.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid h-full grid-cols-2 gap-8 overflow-hidden">
            {artists?.slice(1, 5).map((artist: any, i: number) => (
              <div
                key={i}
                className="relative col-span-1 h-72 w-72 overflow-hidden shadow-lg shadow-gray-800"
              >
                <img
                  src={artist?.images[0].url}
                  alt={artist?.name}
                  className="z-10 overflow-hidden"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex h-[80vh] items-center justify-center gap-16 bg-orange-300">
        <div className="relative">
          <div className="absolute h-full w-full scale-[1.03] rounded-full bg-white shadow-md shadow-gray-800"></div>

          <img
            src={artists[0]?.images[0].url}
            alt={artists[0]?.name}
            className="relative h-[450px] w-[450px] rounded-full shadow-lg"
          />
        </div>
        <p className="my-auto max-w-xl text-center text-5xl leading-normal">
          You had <span className="font-bold">{artists[0]?.name} </span>on
          {/* repeat <span className="font-bold">{durationString}</span>. You */}
          streamed their music over{" "}
          <span className="font-bold">
            {/* {artists[0]?.count.toLocaleString()} times */}
          </span>
          . 🎧
        </p>
      </div>
    </div>
  );
}
