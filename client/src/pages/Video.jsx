import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { RiPlayListAddLine } from "react-icons/ri";

import API from "../services/api";
import CommentSection from "../components/CommentSection";

function Video() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    fetchVideo();
    fetchSuggestedVideos();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const res = await API.get(`/videos/${id}`);
      setVideo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSuggestedVideos = async () => {
    try {
      const res = await API.get("/videos");

      const filtered = res.data.filter((v) => v._id !== id);

      setSuggestedVideos(filtered.slice(0, 15));
    } catch (err) {
      console.error(err);
    }
  };

  const getYoutubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/);
    return match ? match[1] : "";
  };

  const formatViews = (num) => {
    if (!num) return "0";

    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(".0", "") + "M";

    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(".0", "") + "K";

    return num;
  };

  if (!video) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT SECTION */}
        <div className="flex-1 lg:w-[70%]">
          {/* Video Player */}
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${getYoutubeId(video.videoUrl)}`}
              title="video"
              allowFullScreen
            />
          </div>

          {/* Title */}
          <h1 className="text-xl font-semibold mt-4">{video.title}</h1>

          {/* Channel + Buttons Row */}
          <div className="flex flex-wrap justify-between items-center mt-4 gap-4">
            {/* Channel Section */}
            <div className="flex items-center gap-4">
              <img
                src={video.channel?.avatar || "/default-avatar.png"}
                alt="channel"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <p className="font-semibold text-sm">
                  {video.channel?.channelName}
                </p>

                <p className="text-xs text-gray-500">
                  {formatViews(video.channel?.subscribers || 0)} subscribers
                </p>
              </div>

              <button className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition">
                Subscribe
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200">
                  <BiLike size={18} />
                  {formatViews(video.likes)}
                </button>

                <div className="h-6 w-[1px] bg-gray-300" />

                <button className="px-4 py-2 hover:bg-gray-200">
                  <BiDislike size={18} />
                </button>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <FiShare size={18} />
                Share
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <RiPlayListAddLine size={18} />
                Save
              </button>

              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <BsThreeDots size={18} />
              </button>
            </div>
          </div>

          {/* Description Box */}
          <div
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-6 bg-gray-100 p-4 rounded-xl text-sm cursor-pointer"
          >
            <p className="font-semibold mb-2">
              {formatViews(video.views)} views
            </p>

            <p
              className={`whitespace-pre-wrap ${
                showFullDescription ? "" : "line-clamp-2"
              }`}
            >
              {video.description}
            </p>

            {!showFullDescription && (
              <p className="text-xs text-gray-600 mt-2 font-medium">
                Show more
              </p>
            )}

            {showFullDescription && (
              <p className="text-xs text-gray-600 mt-2 font-medium">
                Show less
              </p>
            )}
          </div>

          {/* Comments */}
          <div className="mt-8">
            <CommentSection
              videoId={video._id}
              currentUser={localStorage.getItem("username")}
            />
          </div>
        </div>

        {/* RIGHT SECTION (Suggested Videos) */}
        <div className="lg:w-[30%] w-full space-y-4">
          {suggestedVideos.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/video/${item._id}`)}
              className="flex gap-3 cursor-pointer group"
            >
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-40 h-24 object-cover rounded-lg"
              />

              <div>
                <h3
                  className="text-sm font-medium group-hover:text-blue-600"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.title}
                </h3>

                <p className="text-xs text-gray-600 mt-1">
                  {item.channel?.channelName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Video;
