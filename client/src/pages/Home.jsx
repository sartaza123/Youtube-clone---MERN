import FilterBar from "../components/filterBar";

function Home() {
  return (
    <div className="flex-1 bg-gray-50">
      {/* Filter Buttons */}
      <FilterBar />

      {/* Video Grid (later) */}
      <div className="p-4">{/* Videos will go here */}</div>
    </div>
  );
}

export default Home;
