function VideoSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 rounded-xl aspect-video"></div>
      <div className="flex gap-3 mt-3">
        <div className="w-9 h-9 rounded-full bg-gray-300"></div>
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

export default VideoSkeleton;
