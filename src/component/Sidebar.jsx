import React, { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import logo from "../assets/gemini-logo.png";
import { BiHelpCircle } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { Context } from "./context/context";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const { onSent, previousPrompt, setRecentPrompt, homePage } = useContext(Context);

  const loaddata = async (prompt) => {
    await onSent(prompt);
    await setRecentPrompt(prompt);
  }

  return (
    <section
      className={`h-screen hidden md:inline-flex flex-col justify-between bg-gradient-to-t from-gray-200 to-green-50 py-[25px] px-[12px] font-pop ${
        open ? "w-[272px]" : "w-[86px]"
      } transition-all duration-500 `}
    >
      <div className={`text-lg font-medium`}>
        <RxHamburgerMenu
          className="block cursor-pointer ml-[10px] transition-all duration-500"
          onClick={() => setOpen(!open)}
        />
        <div onClick={() => homePage()} className="mt-10 inline-flex items-center gap-4 py-3 px-3 bg-slate-200 text-sm text-gray-400 rounded-full cursor-pointer ">
          <AiOutlinePlus />
          {open ? (
            <p className="transition-all duration-500">New Chat</p>
          ) : null}
        </div>
        {open ? (
          <div id="webscroll" className="flex flex-col mt-3 h-[260px] overflow-y-scroll">
            <p className="mt-6 mb-5 text-sm pl-2 text-gray-700">Recent</p>
            {previousPrompt.map((item, index) => (
              <div onClick={() => loaddata(item)} key={index} className="text-sm flex items-center gap-3 p-3 pr-8 rounded-full text-gray-700 cursor-pointer hover:bg-gray-200 transition-all duration-500 hover:text-black">
                <FaRegMessage />
                <p key={index}>{item.slice(0,20)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col">
        <div className="text-sm flex items-center gap-3 p-3 pr-6 mr-2 rounded-full text-gray-700 cursor-pointer hover:bg-gray-200 transition-all duration-500 hover:text-black">
          <BiHelpCircle className="text-lg font-medium" />
          {open ? <p>Help</p> : null}
        </div>
        <div className="text-sm flex items-center gap-3 p-3 pr-6 mr-2 rounded-full text-gray-700 cursor-pointer hover:bg-gray-200 transition-all duration-500 hover:text-black">
          <RxCountdownTimer className="text-lg font-medium" />
          {open ? <p>Activity</p> : null}
        </div>
        <div className="text-sm flex items-center gap-3 p-3 pr-6 mr-2 rounded-full text-gray-700 cursor-pointer hover:bg-gray-200 transition-all duration-500 hover:text-black">
          <IoSettingsOutline className="text-lg font-medium" />
          {open ? <p>Setting</p> : null}
        </div>
        {open ? (
          <div className="flex items-center gap-3 p-3 pr-6 mr-2 rounded-lg bg-gray-300 text-gray-800 cursor-pointer hover:bg-gray-400 transition-all duration-500 hover:text-black">
            <img
              src={logo}
              className="h-5 w-5 object-cover saturate-200 backdrop-brightness-100"
              alt="gemini-logo"
            />
            <p className="text-xs font-medium">Upgrade to Gemini Advance</p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Sidebar;
