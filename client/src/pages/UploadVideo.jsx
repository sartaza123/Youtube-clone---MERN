import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function UploadVideo() {
  const navigate = useNavigate();

  const [channelId, setChannelId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= GET MY CHANNEL ================= */
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await API.get("/my-channel", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setChannelId(data._id);
      } catch (err) {
        console.error("Channel not found");
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

  /* ================= UPLOAD VIDEO ================= */

  const handleUpload = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/videos",
        {
          ...formData,
          channel: channelId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Upload Video</h1>

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
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

export default UploadVideo;
