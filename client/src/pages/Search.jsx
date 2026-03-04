import { useEffect, useState } from "react";
import API from "../services/api";
import VideoCard from "../components/VideoCard";

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await API.get("/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Error loading videos:", err);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Home;
