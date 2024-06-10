import prisma from "./prisma";

const fetchRecentStreams = async () => {
  const streams = await prisma.listening_history.findMany({
    orderBy: { played_at: "desc" },
    take: 10,
  });
  return streams;
};

export { fetchRecentStreams };
