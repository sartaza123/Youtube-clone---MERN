import { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const filters = [
  "All",
  "Music",
  "JavaScript",
  "Trailers",
  "Mixes",
  "Marvel Studios",
  "Web series",
  "Action Thrillers",
  "Satire",
  "Dramedy",
  "Live",
  "Algorithms",
  "Animated films",
  "Vocal Music",
  "Lectures",
  "Recently uploaded",
];

function FilterBar() {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [active, setActive] = useState("All");

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    const amount = 300;

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });

    setTimeout(checkScroll, 300);
  };

  return (
    <div className="relative bg-white">
      {/* LEFT ARROW */}
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 h-full px-2 bg-white z-10 flex items-center"
        >
          <FiChevronLeft size={20} />
        </button>
      )}

      {/* SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-3 px-4 py-3 overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`px-2 py-1 rounded-md text-xs font-medium transition
              ${
                active === item
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* RIGHT ARROW */}
      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 h-full px-2 bg-white z-10 flex items-center"
        >
          <FiChevronRight size={20} />
        </button>
      )}
    </div>
  );
}

export default FilterBar;
