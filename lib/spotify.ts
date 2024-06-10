import { auth } from "@/auth";
import axios from "@/lib/axios";

const fetchProfile = async () => {
  const res = await axios.get("https://api.spotify.com/v1/me");
  return res.data;
};

const fetchArtist = async (id: string) => {
  const res = await axios.get(`https://api.spotify.com/v1/artists/${id}`);
  return res.data;
};

const fetchTopTracks = async () => {
  try {
    const res = await axios.get("https://api.spotify.com/v1/me/top/tracks");
    return res.data;
  } catch (error) {
    console.error("Error fetching top tracks", error);
    return null;
  }
};

const fetchTopArtists = async () => {
  try {
    const res = await axios.get("https://api.spotify.com/v1/me/top/artists");
    return res.data;
  } catch (error) {
    console.error("Error fetching top artists", error);
    return null;
  }
};

export { fetchProfile, fetchArtist, fetchTopTracks, fetchTopArtists };
