"use server";

import prisma from "@/lib/prisma";

const fetchTracks = async ({ page }: { page: number }) => {
  return prisma.listening_history.findMany({
    skip: (page - 1) * 15,
    take: 15,
    orderBy: {
      played_at: "desc",
    },
  });
};

const fetchTrack = async (id: string) => {
  // find how popular song is by finding wheere it ranks in listens by counting all listens for each song and ordering
  // by most popular
  const popular = await prisma.listening_history.groupBy({
    by: ["track_uri"],
    _count: {
      track_uri: true,
    },
    orderBy: {
      _count: {
        track_uri: "desc",
      },
    },
  });

  const listens = popular.find((item) => item.track_uri === id);
  const numListens = listens?._count.track_uri;
  const ranking = popular.findIndex((item) => item.track_uri === id) + 1;

  return { listens: numListens, ranking };
};

export { fetchTracks, fetchTrack };
