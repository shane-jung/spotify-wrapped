import axios from "./axios";
import prisma from "./prisma";

const SPOTIFY_MAX_RECENT_STREAMS = 10;

const fetchRecentStreams = async (limit: number = 60, skip: number = 0) => {
  const spotifyLimit =
    limit <= SPOTIFY_MAX_RECENT_STREAMS ? limit : SPOTIFY_MAX_RECENT_STREAMS;

  const res = await axios.get(
    "https://api.spotify.com/v1/me/player/recently-played",
    {
      params: { limit: spotifyLimit },
    },
  );

  let spotifyStreams = res.data.items.map((stream: any) => {
    return {
      played_at: new Date(stream.played_at),
      ms_played: stream.track.duration_ms,
      id: stream.track.id,
      track_uri: stream.track.uri,
      artist_name: stream.track.artists
        .map((artist: any) => artist.name)
        .join(", "),
      album_name: stream.track.album.name,
      track_name: stream.track.name,
    };
  });

  let dbStreams: any[] = [];
  if (limit > SPOTIFY_MAX_RECENT_STREAMS) {
    dbStreams = await prisma.listening_history.findMany({
      take: limit - SPOTIFY_MAX_RECENT_STREAMS,
      orderBy: { played_at: "desc" },
      skip: SPOTIFY_MAX_RECENT_STREAMS,
    });
  }
  spotifyStreams = [
    ...spotifyStreams,
    ...dbStreams.filter(
      (dbStream) =>
        !spotifyStreams.some(
          (spotifyStream: any) => spotifyStream.id === dbStream.track_id,
        ),
    ),
  ];
  return spotifyStreams;
};

export { fetchRecentStreams };
