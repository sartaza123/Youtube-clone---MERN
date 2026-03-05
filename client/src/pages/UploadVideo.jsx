import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UploadVideo() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [channelId, setChannelId] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= AUTH CHECK ================= */

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  /* ================= GET CHANNEL ================= */

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const { data } = await API.get("/my-channel");

        if (!data || !data._id) {
          alert("You must create a channel before uploading videos.");
          navigate("/create-channel");
          return;
        }

        setChannelId(data._id);
      } catch {
        navigate("/create-channel");
      }
    };

    fetchChannel();
  }, []);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= YOUTUBE VALIDATION ================= */

  const isYoutubeLink = (url) => {
    return url.includes("youtube.com/watch?v=") || url.includes("youtu.be/");
  };

  /* ================= UPLOAD VIDEO ================= */

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!isYoutubeLink(formData.videoUrl)) {
      alert("Only YouTube video links are supported right now.");
      return;
    }

    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    setLoading(true);

    try {
      await API.post("/videos", {
        ...formData,
        channel: channelId,
      });

      alert("Video uploaded successfully");

      navigate(`/channel/${channelId}`);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 pt-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow">
        {/* TITLE */}
        <h1 className="text-2xl font-semibold mb-6">Upload Video</h1>

        <form onSubmit={handleUpload} className="flex flex-col gap-5">
          {/* TITLE */}
          <div>
            <label className="text-sm font-medium">Title (required)</label>

            <input
              type="text"
              name="title"
              placeholder="Add a title that describes your video"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded mt-1"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium">Description</label>

            <textarea
              name="description"
              rows="4"
              placeholder="Tell viewers about your video"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-3 rounded mt-1"
            />
          </div>

          {/* VIDEO URL */}
          <div>
            <label className="text-sm font-medium">YouTube Video Link</label>

            <input
              type="text"
              name="videoUrl"
              placeholder="Paste YouTube link (https://youtu.be/...)"
              value={formData.videoUrl}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded mt-1"
            />

            <p className="text-xs text-gray-500 mt-1">
              Only YouTube links are supported for now
            </p>
          </div>

          {/* THUMBNAIL */}
          <div>
            <label className="text-sm font-medium">Thumbnail URL</label>

            <input
              type="text"
              name="thumbnailUrl"
              placeholder="Paste thumbnail image link"
              value={formData.thumbnailUrl}
              onChange={handleChange}
              className="w-full border p-3 rounded mt-1"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm font-medium">Category</label>

            <input
              type="text"
              name="category"
              placeholder="Music, Coding, Gaming..."
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded mt-1"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white py-3 rounded hover:bg-red-700 transition"
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadVideo;
