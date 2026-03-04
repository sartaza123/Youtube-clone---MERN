import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import VideoCard from "../components/VideoCard";

function Channel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
    banner: "",
  });

  const [loading, setLoading] = useState(true);

  /* ================= FETCH CHANNEL ================= */

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const { data } = await api.get(`/channels/${id}`);

        setChannel(data.channel);
        setVideos(data.videos);

        setFormData({
          channelName: data.channel.channelName,
          description: data.channel.description,
          banner: data.channel.banner,
        });
      } catch (err) {
        console.error("Channel fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [id]);

  if (loading) return <div className="p-6">Loading channel...</div>;
  if (!channel) return <div className="p-6">Channel not found</div>;

  const isOwner = channel.owner?._id === userId;

  /* ================= INPUT HANDLER ================= */

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= UPDATE CHANNEL ================= */

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.put(`/channels/${channel._id}`, formData);
      setChannel(data);
      setEditing(false);
    } catch (err) {
      console.error("Channel update failed:", err);
    }
  };

  /* ================= DELETE CHANNEL ================= */

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this channel?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/channels/${channel._id}`);
      navigate("/");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  /* ================= SUBSCRIBE ================= */

  const handleSubscribe = async () => {
    try {
      const { data } = await api.put(`/channels/${channel._id}/subscribe`);

      setChannel((prev) => ({
        ...prev,
        subscribers: data.subscribers,
      }));
    } catch (err) {
      console.error("Subscribe failed:", err);
    }
  };

  /* ================= CHANNEL AVATAR ================= */

  const avatarUrl =
    channel.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      channel.channelName,
    )}`;

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* ================= BANNER ================= */}

      {channel.banner && (
        <div className="w-full h-44 overflow-hidden">
          <img
            src={channel.banner}
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* ================= HEADER ================= */}

      <div className="px-6 py-6 flex gap-6 items-start">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200">
          <img
            src={avatarUrl}
            alt="channel avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          {editing ? (
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="channelName"
                value={formData.channelName}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />

              <input
                type="text"
                name="banner"
                value={formData.banner}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />

              <div className="flex gap-3">
                <button className="bg-black text-white px-4 py-2 rounded">
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{channel.channelName}</h1>

              <p className="text-sm text-gray-600 mt-1">
                @{channel.channelName.replace(/\s+/g, "_")} ·{" "}
                {channel.subscribers?.length || 0} subscribers · {videos.length}{" "}
                videos
              </p>

              <p className="mt-2 text-sm text-gray-700">
                {channel.description}
              </p>

              <div className="flex gap-3 mt-4">
                {isOwner ? (
                  <>
                    <button
                      onClick={() => setEditing(true)}
                      className="px-4 py-2 bg-gray-200 rounded-full text-sm"
                    >
                      Edit Channel
                    </button>

                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-500 text-white rounded-full text-sm"
                    >
                      Delete Channel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleSubscribe}
                    className="px-6 py-2 bg-black text-white rounded-full text-sm"
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ================= TABS ================= */}

      <div className="border-b px-6 flex gap-6 text-sm font-medium">
        {["home", "videos", "shorts", "posts"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 capitalize ${
              activeTab === tab ? "border-b-2 border-black" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= VIDEOS ================= */}

      <div className="px-6 py-8">
        {(activeTab === "home" || activeTab === "videos") && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {videos.map((video) => (
              <VideoCard
                key={video._id}
                video={{
                  videoId: video._id,
                  thumbnail: video.thumbnailUrl,
                  title: video.title,
                  channelName: channel.channelName,
                  views: video.views,
                  uploadedAt: new Date(video.createdAt).toLocaleDateString(),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Channel;
