import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import api from "../services/api";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH SEARCH RESULTS ================= */

  useEffect(() => {
    if (!query) return;

    const fetchVideos = async () => {
      setLoading(true);

      try {
        const { data } = await api.get(`/videos?search=${query}`);
        setVideos(data || []);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [query]);

  return (
    <div className="flex flex-col p-4">
      {/* Search Title */}
      {query && (
        <h2 className="text-xs font-semibold ml-3 text-gray-500">
          Showing results for <span className="text-gray-900">{query}</span>
        </h2>
      )}

      {/* Video Grid */}
      <div
        className="
      grid
      gap-x-4
      gap-y-8
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-3
    "
      >
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-6 text-gray-500">Loading...</div>
      )}

      {/* Empty State */}
      {!loading && videos.length === 0 && (
        <div className="text-center py-6 text-gray-500">No videos found</div>
      )}
    </div>
  );
}

export default Search;
