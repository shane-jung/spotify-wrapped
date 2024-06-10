import prisma from "@/lib/prisma";
import { getSpotify } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const spotify = await getSpotify();
  const range = req.nextUrl.searchParams.get("range");
  let beginDate, endDate;

  const today = new Date();
  if (range === "alltime") {
    beginDate = new Date("2010-01-01");
    endDate = new Date();
  } else if (range === "annual") {
    beginDate = new Date(new Date().setDate(today.getDate() - 365));
    endDate = new Date();
  } else if (range === "monthly") {
    beginDate = new Date(new Date().setDate(today.getDate() - 30));
    endDate = new Date();
  }

  const tracks = await prisma.listening_history.groupBy({
    by: ["track_name", "artist_name"],
    _count: {
      _all: true,
    },
    where: {
      played_at: {
        gt: beginDate,
        lt: endDate,
      },
      artist_name: {
        notIn: ["NaN", "Pink Noise Therapy", "Me & Us"],
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

  return NextResponse.json(tracks);
}
