import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { RiPlayListAddLine } from "react-icons/ri";

import API from "../services/api";
import CommentSection from "../components/CommentSection";
import { useAuth } from "../context/AuthContext";

function Video() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { authUser } = useAuth();

  const [video, setVideo] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    fetchVideo();
    fetchSuggestedVideos();
    fetchComments();
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

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${id}`);
      setComments(res.data || []);
    } catch {
      console.log("Error loading comments");
    }
  };

  const getYoutubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/);
    return match ? match[1] : "";
  };

  if (!video) return <div className="p-6">Loading...</div>;

  const handleLike = async () => {
    try {
      const res = await API.put(`/videos/${video._id}/like`);

      setVideo((prev) => ({
        ...prev,
        likes: res.data.likes,
        dislikes: res.data.dislikes,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await API.put(`/videos/${video._id}/dislike`);

      setVideo((prev) => ({
        ...prev,
        likes: res.data.likes,
        dislikes: res.data.dislikes,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* VIDEO SECTION */}

        <div className="flex-1 lg:w-[70%]">
          {/* PLAYER */}

          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${getYoutubeId(video.videoUrl)}`}
              allowFullScreen
            />
          </div>

          {/* TITLE */}

          <h1 className="text-lg sm:text-xl font-semibold mt-4">
            {video.title}
          </h1>

          {/* CHANNEL + ACTIONS */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
            {/* CHANNEL */}

            <div className="flex items-center gap-4">
              <img
                src={video.channel?.avatar || "/default-avatar.png"}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full"
              />

              <div>
                <p className="font-semibold text-xs md:text-sm">
                  {video.channel?.channelName}
                </p>
              </div>

              <button className="bg-black text-white px-4 py-2 rounded-full text-xs md:text-sm">
                Subscribe
              </button>
            </div>

            {/* ACTIONS */}

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-200"
              >
                <BiLike size={18} />
                {video.likes?.length || 0}
              </button>

              <button
                onClick={handleDislike}
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-200"
              >
                <BiDislike size={18} />
                {video.dislikes?.length || 0}
              </button>

              <button className="px-4 py-2 bg-gray-100 rounded-full">
                <FiShare />
              </button>

              <button className="px-4 py-2 bg-gray-100 rounded-full">
                <RiPlayListAddLine />
              </button>

              <button className="p-2 bg-gray-100 rounded-full">
                <BsThreeDots />
              </button>
            </div>
          </div>

          {/* DESCRIPTION */}

          <div
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-6 bg-gray-100 p-4 rounded-xl text-sm cursor-pointer"
          >
            <p>{video.views} views</p>

            <p
              className={`whitespace-pre-wrap ${
                showFullDescription ? "" : "line-clamp-2"
              }`}
            >
              {video.description}
            </p>
          </div>
          {/* FULL COMMENT SECTION */}
          <div className="mt-8">
            <CommentSection videoId={video._id} />
          </div>
        </div>

        {/* SUGGESTED VIDEOS */}

        <div className="lg:w-[30%] space-y-4">
          {suggestedVideos.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/video/${item._id}`)}
              className="flex gap-3 cursor-pointer"
            >
              <img
                src={item.thumbnailUrl}
                className="w-40 h-24 object-cover rounded-lg"
              />

              <div>
                <h3 className="text-sm font-medium line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-600">
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
