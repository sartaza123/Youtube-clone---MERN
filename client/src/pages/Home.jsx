import { useEffect, useState } from "react";
import FilterBar from "../components/filterBar";
import VideoCard from "../components/VideoCard";
import api from "../services/api";

function Home() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH VIDEOS ================= */

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await api.get("/videos");

        setVideos(data || []);
        setFilteredVideos(data || []);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  /* ================= FILTER VIDEOS ================= */

  const handleFilterChange = (category) => {
    if (category === "All") {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter((video) => video.category === category);
      setFilteredVideos(filtered);
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* FILTER BAR */}
      <FilterBar onFilterChange={handleFilterChange} />

      {/* VIDEO GRID */}
      <div className="p-4">
        {loading && <p className="text-gray-500">Loading videos...</p>}

        {!loading && filteredVideos.length === 0 && (
          <p className="text-gray-500">No videos found</p>
        )}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
