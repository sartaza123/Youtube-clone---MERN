import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BiMicrophone } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import YouTubeLogo from "../assets/YouTube_Logo.svg";
import api from "../services/api";

function Header({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const { authUser, logout } = useAuth();

  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileSearch, setMobileSearch] = useState(false);

  const menuRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpenMenu(false);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${searchTerm}`);
    setMobileSearch(false);
  };

  const handleCreate = async () => {
    try {
      const res = await api.get("/my-channel");

      if (!res.data || !res.data._id) {
        alert("You need to create a channel before uploading videos.");
        navigate("/create-channel");
        return;
      }

      navigate("/upload");
    } catch {
      navigate("/create-channel");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* MOBILE SEARCH BAR */}

      {mobileSearch && (
        <div className="fixed top-0 left-0 w-full bg-white z-50 flex items-center p-3 gap-3 md:hidden">
          {/* <div className="fixed top-0 left-0 w-full h-[56px] bg-white z-50 flex items-center px-4 gap-3 border-b md:hidden"> */}

          <button onClick={() => setMobileSearch(false)}>←</button>

          <input
            type="text"
            autoFocus
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 border px-4 py-2 rounded-full outline-none"
          />

          <button onClick={handleSearch}>
            <CiSearch size={22} />
          </button>
        </div>
      )}

      {/* HEADER */}

      <header className="w-full flex justify-between items-center px-4 h-[56px] bg-white sticky top-0 z-40">
        {/* LEFT */}

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="text-xl hover:bg-gray-200 p-2 rounded-full transition"
          >
            <LuMenu />
          </button>

          <img
            src={YouTubeLogo}
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* CENTER SEARCH */}

        <div className="hidden md:flex items-center w-1/2 max-w-xl">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full border border-gray-300 rounded-l-full px-4 py-[7px] text-sm outline-none focus:border-blue-500"
          />

          <button
            onClick={handleSearch}
            className="border border-gray-300 border-l-0 rounded-r-full px-5 py-2 bg-gray-100 hover:bg-gray-200 text-lg"
          >
            <CiSearch />
          </button>

          <button className="rounded-full p-2 bg-gray-100 text-xl ml-4 hover:bg-gray-200 transition">
            <BiMicrophone />
          </button>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-1 md:gap-3 relative">
          {/* MOBILE SEARCH ICON */}

          <button
            onClick={() => {
              setSidebarOpen(false);
              setMobileSearch(true);
            }}
            className="md:hidden text-xl p-2 hover:bg-gray-200 rounded-full"
          >
            <CiSearch />
          </button>

          {!authUser ? (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-1 md:gap-2 p-1 border border-gray-300 text-blue-700 rounded-full hover:bg-sky-100 transition"
            >
              <CgProfile className="text-xl" />
              <span className="text-sm font-medium">Sign In</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleCreate}
                className="sm:flex items-center gap-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              >
                <FiPlus />
                <span className="hidden md:block  text-sm font-medium">
                  Create
                </span>
              </button>

              <div className="relative text-2xl cursor-pointer hover:bg-gray-200 p-2 rounded-full transition">
                <IoMdNotificationsOutline />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1 rounded-full">
                  9+
                </span>
              </div>

              {/* AVATAR */}

              <div ref={menuRef} className="relative">
                <div
                  onClick={() => setOpenMenu(!openMenu)}
                  className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer"
                >
                  {authUser?.charAt(0).toUpperCase()}
                </div>

                {/* DROPDOWN */}

                {openMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-lg py-2 z-50 ">
                    <div className="px-4 py-3 border-b border-gray-300">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {authUser?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="text-sm">{authUser}</p>
                          <p className="text-xs text-gray-500">
                            @{authUser.toLowerCase()}
                          </p>

                          <button
                            onClick={async () => {
                              try {
                                const res = await api.get("/my-channel");

                                if (!res.data || !res.data._id) {
                                  navigate("/create-channel");
                                  return;
                                }

                                navigate(`/channel/${res.data._id}`);
                                setOpenMenu(false);
                              } catch {
                                navigate("/create-channel");
                              }
                            }}
                            className="text-blue-600 text-xs mt-2"
                          >
                            View your channel
                          </button>
                        </div>
                      </div>
                    </div>

                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex gap-4">
                      <FaGoogle />
                      Google Account
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex gap-4"
                    >
                      <MdOutlineLogout />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
