"use client";
import { listening_history } from "@prisma/client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchTracks } from "./actions";
import TrackInfo from "./TrackInfo";

export default function FullHistory({
  initialTracks,
}: {
  initialTracks: listening_history[] | undefined;
}) {
  const [tracks, setTracks] = useState(initialTracks);
  const [page, setPage] = useState(1);
  const [ref, inview] = useInView();
  const [showModal, setShowModal] = useState(false);
  const [activeTrack, setActiveTrack] = useState("");

  async function loadTracks() {
    const next = page + 1;
    const tracks = await fetchTracks({ page: next });
    if (tracks?.length) {
      setTracks((prev: listening_history[] | undefined) =>
        prev ? [...prev, ...tracks] : tracks
      );
      setPage(next);
    }
  }

  useEffect(() => {
    if (inview) {
      loadTracks();
    }
  }, [inview]);

  const handleShowModal = (uri: string) => {
    setShowModal(true);
    setActiveTrack(uri);
  };

  return (
    <div className="my-8 flex flex-col px-24 gap-2 ">
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        id={activeTrack}
      />
      <table className="table-fixed">
        <thead>
          <tr>
            <th></th>
            <th>Track</th>
            <th>Album</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody className="">
          {tracks?.map((track: listening_history, n: number) => (
            <tr key={n} className="p-3">
              <td>{n + 1}</td>
              <td className="p-4 hover:text-blue-500 hover:underline duration-100 transition rounded-md">
                <button
                  className="w-full h-full text-left"
                  onClick={() => handleShowModal(track.track_uri!)}
                >
                  {track.track_name?.slice(0, 50).trim() +
                    (track.track_name?.length! > 50 ? "..." : "")}
                </button>
              </td>
              <td className="p-4">
                {track.album_name?.slice(0, 50).trim() +
                  (track.album_name?.length! > 50 ? "..." : "")}
              </td>
              <td className="p-4">
                {track.artist_name?.slice(0, 50).trim() +
                  (track.artist_name?.length! > 50 ? "..." : "")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div ref={ref} className="text-center">
        {inview && <p>Loading...</p>}
      </div>
    </div>
  );
}

const Modal = ({
  show,
  onClose,
  id,
}: {
  show: boolean;
  onClose: () => void;
  id: string;
}) => {
  return (
    <div className="flex ">
      <input
        type="checkbox"
        id="drawer-toggle"
        className="relative sr-only peer"
        onChange={onClose}
        checked={show}
      ></input>
      <label
        htmlFor="drawer-toggle"
        className="fixed top-0 right-0  block cursor-default bg-white"
      ></label>
      <div
        className={
          "fixed top-0 right-0 z-20 w-[500px] h-full transition-all duration-500 transform translate-x-full bg-gray-900 shadow-lg peer-checked:translate-x-0"
        }
      >
        <TrackInfo uri={id} />
      </div>
    </div>
  );
};
