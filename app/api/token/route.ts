import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  console.log(data);
  // console.log(res);
  SpotifyApi.withAccessToken("client-id", data); // SDK now authenticated as client-side user

  return new Response("OK");
}
