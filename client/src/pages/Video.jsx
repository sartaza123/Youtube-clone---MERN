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

  useEffect(() => {
    fetchVideo();
    fetchSuggestedVideos();
  }, [id]);

  /* ================= FETCH VIDEO ================= */

  const fetchVideo = async () => {
    try {
      const res = await API.get(`/videos/${id}`);

      const videoData = res.data;

      // Ensure arrays exist
      videoData.likes = videoData.likes || [];
      videoData.dislikes = videoData.dislikes || [];

      setVideo(videoData);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= FETCH SUGGESTED ================= */

  const fetchSuggestedVideos = async () => {
    try {
      const res = await API.get("/videos");

      const filtered = res.data.filter((v) => v._id !== id);

      setSuggestedVideos(filtered.slice(0, 15));
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= GET YOUTUBE ID ================= */

  const getYoutubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/);
    return match ? match[1] : "";
  };

  /* ================= LIKE VIDEO ================= */

  const handleLike = async () => {
    if (!authUser) {
      alert("Please login to like videos");
      navigate("/login");
      return;
    }

    try {
      const res = await API.put(`/videos/${video._id}/like`);

      setVideo((prev) => ({
        ...prev,
        likes: res.data.likes,
        dislikes: res.data.dislikes,
      }));
    } catch (err) {
      console.error(err); // err handling
    }
  };

  /* ================= DISLIKE VIDEO ================= */

  const handleDislike = async () => {
    if (!authUser) {
      alert("Please login to dislike videos");
      navigate("/login");
      return;
    }

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

  if (!video) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT SIDE */}
        <div className="flex-1 lg:w-[70%]">
          {/* VIDEO PLAYER */}
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${getYoutubeId(video.videoUrl)}`}
              allowFullScreen
            />
          </div>

          {/* TITLE */}
          <h1 className="text-xl font-semibold mt-4">{video.title}</h1>

          {/* CHANNEL + ACTIONS */}
          <div className="flex justify-between items-center mt-4">
            {/* CHANNEL */}
            <div className="flex items-center gap-4">
              <img
                src={video.channel?.avatar || "/default-avatar.png"}
                className="w-10 h-10 rounded-full"
              />

              <div>
                <p className="font-semibold text-sm">
                  {video.channel?.channelName}
                </p>
              </div>

              <button className="bg-black text-white px-4 py-2 rounded-full text-sm">
                Subscribe
              </button>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-3 text-sm">
              {/* LIKE DISLIKE GROUP */}
              <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
                >
                  <BiLike size={18} />
                  {video.likes.length || 0}
                </button>

                <div className="h-6 w-[1px] bg-gray-300" />

                <button
                  onClick={handleDislike}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
                >
                  <BiDislike size={18} />
                  {video.dislikes.length || 0}
                </button>
              </div>

              {/* SHARE */}
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <FiShare size={18} />
                Share
              </button>

              {/* SAVE */}
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <RiPlayListAddLine size={18} />
                Save
              </button>

              {/* MORE */}
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <BsThreeDots size={18} />
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

          {/* COMMENTS */}
          <div className="mt-8">
            <CommentSection videoId={video._id} />
          </div>
        </div>

        {/* RIGHT SIDE (SUGGESTED VIDEOS) */}
        <div className="lg:w-[30%] space-y-4">
          {suggestedVideos.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/video/${item._id}`)}
              className="flex gap-3 cursor-pointer group"
            >
              <img
                src={item.thumbnailUrl}
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
