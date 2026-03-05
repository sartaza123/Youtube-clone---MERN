import {
  MdHome,
  MdSubscriptions,
  MdHistory,
  MdOutlineVideoLibrary,
  MdDownload,
  MdOutlineWatchLater,
  MdOutlineSettings,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { FaMusic, FaFire, FaYoutube } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { LuChevronDown } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  /* ================= MINI COLLAPSED ITEM ================= */

  function MiniItem({ icon, label, to }) {
    return (
      <div
        onClick={() => to && navigate(to)}
        className="flex flex-col items-center text-[11px] text-gray-700 hover:bg-gray-100 p-2 rounded-lg cursor-pointer transition w-full"
      >
        <div className="text-[22px]">{icon}</div>
        <span className="mt-1">{label}</span>
      </div>
    );
  }

  /* ================= FULL SIDEBAR ITEM ================= */

  function SidebarItem({ icon, text, to }) {
    return (
      <div
        onClick={() => to && navigate(to)}
        className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
      >
        <div className="text-[22px]">{icon}</div>
        <span>{text}</span>
      </div>
    );
  }

  /* ================= SECTION TITLE ================= */

  function SectionTitle({ text }) {
    return (
      <h3 className="px-3 py-2 text-gray-600 font-semibold text-sm">{text}</h3>
    );
  }

  /* ================= DIVIDER ================= */

  function Divider() {
    return <div className="my-3 border-t border-gray-100" />;
  }

  /* ================= MOBILE OVERLAY ================= */

  const Overlay = () => (
    <div
      className="fixed inset-0 bg-black/40 z-40 md:hidden"
      onClick={() => setSidebarOpen(false)}
    />
  );

  /* ================= COLLAPSED ================= */

  if (!sidebarOpen) {
    return (
      <>
        {/* MINI SIDEBAR (DESKTOP) */}

        <aside className="hidden md:flex w-[60px] bg-white h-[calc(100vh-56px)] flex-col items-center pt-4 space-y-6 sticky top-[56px]">
          <MiniItem icon={<MdHome />} label="Home" to="/" />
          <MiniItem icon={<SiYoutubeshorts />} label="Shorts" />
          <MiniItem icon={<MdSubscriptions />} label="Subs" />
          <MiniItem icon={<CgProfile />} label="You" />
        </aside>
      </>
    );
  }

  /* ================= EXPANDED ================= */

  return (
    <>
      {/* MOBILE OVERLAY */}

      <Overlay />

      <aside
        className={`fixed md:relative z-50 md:z-auto
        w-[240px] bg-white h-[calc(100vh-56px)]
        overflow-y-auto sidebar-scroll
        transform transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="px-3 py-4 text-sm">
          {/* MAIN */}

          <SidebarItem icon={<MdHome />} text="Home" to="/" />
          <SidebarItem icon={<SiYoutubeshorts />} text="Shorts" />
          <SidebarItem icon={<MdSubscriptions />} text="Subscriptions" />

          <Divider />

          {/* YOU */}

          <SectionTitle text="You" />
          <SidebarItem icon={<MdHistory />} text="History" />
          <SidebarItem icon={<MdOutlineVideoLibrary />} text="Playlists" />
          <SidebarItem icon={<MdOutlineWatchLater />} text="Watch later" />
          <SidebarItem icon={<MdDownload />} text="Downloads" />
          <SidebarItem icon={<LuChevronDown />} text="Show more" />

          <Divider />

          {/* EXPLORE */}

          <SectionTitle text="Explore" />
          <SidebarItem icon={<FaFire />} text="Trending" />
          <SidebarItem icon={<FaMusic />} text="Music" />

          <Divider />

          {/* MORE FROM YOUTUBE */}

          <SectionTitle text="More from YouTube" />
          <SidebarItem icon={<FaYoutube />} text="YouTube Premium" />
          <SidebarItem icon={<FaYoutube />} text="YouTube Studio" />
          <SidebarItem icon={<FaYoutube />} text="YouTube Music" />

          <Divider />

          {/* SETTINGS */}

          <SidebarItem icon={<MdOutlineSettings />} text="Settings" />
          <SidebarItem icon={<IoMdHelpCircleOutline />} text="Help" />

          {/* FOOTER */}

          <div className="text-xs text-gray-500 mt-6 space-y-2 leading-relaxed">
            <p>About Press Copyright</p>
            <p>Contact us Creators Advertise</p>
            <p>Developers</p>
            <p>Terms Privacy Policy & Safety</p>
            <p>How YouTube works</p>
            <p className="pt-2">© 2026 YouTube Clone</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
