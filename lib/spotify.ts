"use client";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const spotifyApiSingleton = () => {
  let sdk = SpotifyApi.withUserAuthorization(
    "febdfe488e774c68aabb2e041145071f",
    "http://localhost:8000",
    ["user-read-recently-played"]
  );
  return sdk;
};

type SpotifyClientSingleton = ReturnType<typeof spotifyApiSingleton>;

const globalForSpotify = globalThis as unknown as {
  spotify: SpotifyClientSingleton | undefined;
};

let spotify = globalForSpotify.spotify ?? spotifyApiSingleton();

export default spotify;

if (process.env.NODE_ENV !== "production") globalForSpotify.spotify = spotify;
