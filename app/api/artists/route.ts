import prisma from "@/lib/prisma";
import { getSpotify } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const spotify = await getSpotify();
  const range = req.nextUrl.searchParams.get("range");
  let beginDate;

  const today = new Date();
  let endDate = today;
  if (range === "alltime") {
    beginDate = new Date("2010-01-01");
  } else if (range === "annual") {
    beginDate = new Date(new Date().setDate(today.getDate() - 365));
  } else if (range === "monthly") {
    beginDate = new Date(new Date().setDate(today.getDate() - 30));
  } else {
    endDate = new Date(req.nextUrl.searchParams.get("end")!);
    beginDate = new Date(req.nextUrl.searchParams.get("begin")!);
  }

  const items = await prisma.listening_history.groupBy({
    by: ["artist_name"],
    _count: {
      _all: true,
    },
    where: {
      played_at: {
        gt: beginDate,
        lt: endDate,
      },
      NOT: {
        track_name: "NaN",
        artist_name: "NaN",
        album_name: "NaN",
      },
    },
    orderBy: {
      _count: {
        artist_name: "desc",
      },
    },
    take: 5,
  });

  const artists = await Promise.all(
    items.map(
      async (item) =>
        await spotify
          ?.search(`artist:${item.artist_name!}`, ["artist"], undefined, 1)
          .then((res) => {
            const artist = res.artists.items[0];
            const image = artist.images[0]?.url;
            return { name: artist.name, image, count: item._count._all };
          })
    )
  ).then((res) => res);

  return NextResponse.json({ artists });
}
