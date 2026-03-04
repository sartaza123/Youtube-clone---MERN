import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UploadVideo() {
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useAuth();

  const editVideo = location.state;

  const [channelId, setChannelId] = useState("");

  const [formData, setFormData] = useState({
    title: editVideo?.title || "",
    description: editVideo?.description || "",
    thumbnailUrl: editVideo?.thumbnailUrl || "",
    videoUrl: editVideo?.videoUrl || "",
    category: editVideo?.category || "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= AUTH CHECK ================= */

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  /* ================= GET MY CHANNEL ================= */

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
      } catch (err) {
        console.error(err);
        navigate("/create-channel");
      }
    };

    fetchChannel();
  }, [navigate]);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= UPLOAD / UPDATE VIDEO ================= */

  const handleUpload = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (editVideo) {
        await API.put(`/videos/${editVideo._id}`, formData);

        alert("Video updated successfully");
      } else {
        await API.post("/videos", {
          ...formData,
          channel: channelId,
        });

        alert("Video uploaded successfully");
      }

      navigate(`/channel/${channelId}`);
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        {editVideo ? "Edit Video" : "Upload Video"}
      </h1>

      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Video Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL"
          value={formData.videoUrl}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          {loading
            ? editVideo
              ? "Updating..."
              : "Uploading..."
            : editVideo
              ? "Update Video"
              : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

export default UploadVideo;
