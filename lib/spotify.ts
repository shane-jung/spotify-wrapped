import { auth } from "@/lib/auth";
import axios from "@/lib/axios";

const fetchProfile = async () => {
  try {
    const res = await axios.get("https://api.spotify.com/v1/me");
    return res.data;
  } catch (error) {
    console.error("Error fetching profile");
    return null;
  }
};

const fetchArtist = async (id: string) => {
  try {
    const res = await axios.get(`https://api.spotify.com/v1/artists/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching artist");
    return null;
  }
};

const fetchTopTracks = async () => {
  try {
    const res = await axios.get("https://api.spotify.com/v1/me/top/tracks");
    return res.data;
  } catch (error) {
    console.error("Error fetching top tracks");
    return [];
  }
};

const fetchTopArtists = async () => {
  try {
    const res = await axios.get("https://api.spotify.com/v1/me/top/artists");
    return res.data;
  } catch (error) {
    console.error("Error fetching top artists");
    return [];
  }
};

export { fetchProfile, fetchArtist, fetchTopTracks, fetchTopArtists };
