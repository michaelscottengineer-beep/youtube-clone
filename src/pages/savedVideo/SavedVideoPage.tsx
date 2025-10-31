import { Link, useLoaderData } from "react-router";
import type { SavedVideosResponse } from "./savedVideosLoader";
import { MdPlaylistPlay } from "react-icons/md";

const SavedVideoPage = () => {
  const { playlists } = useLoaderData() as SavedVideosResponse;
  return (
    <div className="px-10">
      <h1 className="text-3xl font-semibold">Danh sách video đã lưu</h1>
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {playlists.map((pl) => {
          return (
            <Link
              to={`/watch?v=${pl.videoIds[0]}&list=${pl.id}`}
              className="video hover:bg-hover-video-card cursor-pointer px-2 py-2 rounded-lg"
              key={pl.id}
            >
              <div className="img">
                <img
                  src={pl.thumbnail}
                  className="w-full rounded-lg"
                  alt="thumbnail-img"
                />
              </div>
              <div className="flex flex-col gap-1 p-2 items-start">
                <div>{pl.title}</div>
                <div className="flex items-center gap-1 text-gray-500">
                  <MdPlaylistPlay className="text-gray-500" />
                  {pl.videoIds.length} videos
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SavedVideoPage;
