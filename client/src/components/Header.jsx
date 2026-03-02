import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoMdMore } from "react-icons/io";
import { BiMicrophone } from "react-icons/bi";
import YouTubeLogo from "../assets/YouTube_Logo.svg";

function Header() {
  return (
    <div className="w-full flex justify-between items-center px-4 py-1 border-b bg-white sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Hamburger */}
        <button className="text-xl hover:bg-gray-200 p-2 rounded-full">
          ☰
        </button>
        {/* Logo */}
        <img src={YouTubeLogo} alt="YouTube Logo" className="h-4" />
      </div>

      {/* Center Section */}
      <div className="hidden md:flex items-center w-1/2 max-w-xl">
        <input
          type="text"
          placeholder="Search"
          className="
            w-full
            border border-gray-300
            rounded-l-full
            px-4 py-[7px]
            text-sm
            outline-none
            bg-white
            focus:border-blue-500
            focus:shadow-[inset_0_0_0_1px_#1c62b9]
            transition-all
        "
        />
        <button className="border border-gray-300 border-l-0 rounded-r-full px-5 py-2 bg-gray-100 hover:bg-gray-200 text-lg">
          <CiSearch />
        </button>
        <button className=" rounded-full p-2 bg-gray-200 bg-gray-100 text-xl ml-4 cursor-pointer hover:bg-gray-300">
          <BiMicrophone />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 mr-2">
        <div className="w-9 h-9 text-2xl rounded-full flex items-center justify-center">
          <IoMdMore />
        </div>
        <button className=" flex justify-between items-center gap-2 px-2 py-1 border border-gray-300 text-blue-700 rounded-full hover:bg-sky-100">
          <div className="text-xl rounded-full flex items-center justify-center">
            <CgProfile />
          </div>
          <h3 className="text-xs">Sign In</h3>
        </button>
      </div>
    </div>
  );
}

export default Header;
