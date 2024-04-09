"use client";
import { useEffect } from "react";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const WithSpotifyAuth = (WrappedComponent) => {
  const WithSpotifyAuth = (props) => {
    useEffect(() => {
      const performAuthorization = async () => {
        try {
          await SpotifyApi.performUserAuthorization(
            "febdfe488e774c68aabb2e041145071f",
            "http://localhost:8000/callback",
            ["user-read-recently-played"],
            "https://localhost:8000/api/token"
          );
        } catch (error) {
          console.error("Spotify authorization failed:", error);
          // Handle the error, e.g., redirect to an error page
        }
      };

      performAuthorization();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithSpotifyAuth;
};

export default WithSpotifyAuth;
