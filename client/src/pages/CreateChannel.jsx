import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateChannel() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
    banner: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { channelName, description, banner, avatar } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!channelName.trim()) {
      return setError("Channel name is required");
    }

    try {
      setLoading(true);
      setError("");

      const avatarUrl =
        avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          channelName,
        )}&background=random&color=fff`;

      const { data } = await api.post("/channels", {
        channelName: channelName.trim(),
        description,
        banner,
        avatar: avatarUrl,
      });

      navigate(`/channel/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create channel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Create Your Channel</h2>

      {error && (
        <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Channel Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Channel Name</label>
          <input
            type="text"
            name="channelName"
            value={channelName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            rows={4}
            className="w-full border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Avatar URL */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Avatar Image URL (optional)
          </label>
          <input
            type="text"
            name="avatar"
            value={avatar}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Banner URL */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Banner Image URL
          </label>
          <input
            type="text"
            name="banner"
            value={banner}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Channel"}
        </button>
      </form>
    </div>
  );
}

export default CreateChannel;
