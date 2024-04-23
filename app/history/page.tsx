import prisma from "@/lib/prisma";
import FullHistory from "./FullHistory";
import { fetchTracks } from "./actions";

export default async function Page() {
  const tracks = await fetchTracks({ page: 1 });

  return <FullHistory initialTracks={tracks} />;
}
