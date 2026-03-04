import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

/* Hover Colors */
const hoverColors = [
  "hover:bg-red-100/50",
  "hover:bg-blue-100/50",
  "hover:bg-green-100/50",
  "hover:bg-yellow-100/50",
  "hover:bg-purple-100/50",
  "hover:bg-pink-100/50",
  "hover:bg-orange-100/50",
];

function VideoCard({ video }) {
  const navigate = useNavigate();

  const hoverColor =
    hoverColors[Math.floor(Math.random() * hoverColors.length)];

  /* Format views */
  const formatViews = (views) => {
    if (!views) return "0 views";

    if (views >= 1_000_000)
      return (views / 1_000_000).toFixed(1).replace(".0", "") + "M views";

    if (views >= 1_000)
      return (views / 1_000).toFixed(1).replace(".0", "") + "K views";

    return views + " views";
  };

  /* Time ago */
  const timeAgo = (date) => {
    if (!date) return "";

    const now = new Date();
    const uploaded = new Date(date);

    if (isNaN(uploaded)) return "";

    const diff = Math.floor((now - uploaded) / 1000);

    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);
    const months = Math.floor(diff / 2592000);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 30) return `${days} days ago`;

    return `${months} months ago`;
  };

  /* Safe values */
  const videoId = video._id || video.videoId;
  const thumbnail = video.thumbnailUrl || video.thumbnail;
  const channelName =
    video.channel?.channelName || video.channelName || "Unknown Channel";

  const avatar =
    video.channel?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(channelName)}`;

  return (
    <div
      onClick={() => navigate(`/video/${videoId}`)}
      className={`cursor-pointer rounded-xl p-2 transition-all duration-300 group ${hoverColor}`}
    >
      {/* Thumbnail */}{" "}
      <div className="relative">
        <img
          src={thumbnail || "/default-thumbnail.jpg"}
          alt={video.title}
          className="w-full rounded-xl object-cover aspect-video"
          onError={(e) => {
            e.target.src = "/default-thumbnail.jpg";
          }}
        />

        {video.duration && (
          <span className="absolute bottom-2 right-2 text-xs bg-black text-white px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        )}
      </div>
      {/* Info Section */}
      <div className="flex gap-3 mt-3">
        {/* Avatar */}
        <img
          src={avatar}
          alt="avatar"
          className="w-9 h-9 rounded-full object-cover"
        />

        <div className="flex-1">
          {/* Title */}
          <h3
            className="text-sm font-semibold leading-5"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {video.title}
          </h3>

          {/* Channel */}
          <p className="text-xs text-gray-600 mt-1">{channelName}</p>

          {/* Views + Time */}
          <p className="text-xs text-gray-500">
            {formatViews(video.views)} • {timeAgo(video.createdAt)}
          </p>
        </div>

        <BsThreeDotsVertical className="text-gray-600 mt-1 opacity-0 group-hover:opacity-100 transition" />
      </div>
    </div>
  );
}

export default VideoCard;
