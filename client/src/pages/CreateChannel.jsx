import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateChannel() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
    avatar: "",
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Avatar Upload
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    // For now we store preview url (since backend expects URL)
    setFormData((prev) => ({
      ...prev,
      avatar: imageUrl,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.channelName.trim()) {
      alert("Channel name is required");
      return;
    }

    if (!formData.description.trim()) {
      alert("Description is required");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/channels", formData);

      navigate(`/channel/${data._id}`);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create channel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-gray-100">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-6 text-center">
          How you'll appear
        </h2>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-6">
          <label className="cursor-pointer">
            <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm">Select picture</span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>

          <p className="text-blue-600 text-sm mt-2 cursor-pointer">
            Select picture
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Channel Name */}
          <div>
            <label className="text-sm text-gray-600">Name</label>

            <input
              type="text"
              name="channelName"
              value={formData.channelName}
              onChange={handleChange}
              placeholder="Enter channel name"
              required
              className="w-full border rounded-md p-3 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-600">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell viewers about your channel"
              rows={3}
              required
              className="w-full border rounded-md p-3 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {loading ? "Creating..." : "Create channel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateChannel;
