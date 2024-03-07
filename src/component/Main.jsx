import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdCode } from "react-icons/io";
import { GoLightBulb } from "react-icons/go";
import { GiThink } from "react-icons/gi";
import { FaYoutube } from "react-icons/fa";
import { RiGalleryLine } from "react-icons/ri";
import { TiMicrophoneOutline } from "react-icons/ti";
import { AiOutlineSend } from "react-icons/ai";
import { useContext } from "react";
import { Context } from "./context/context";
import logo from "../assets/gemini-logo.png";
import { CiCirclePlus } from "react-icons/ci";

const Main = () => {
  const {
    input,
    setInput,
    showResult,
    loading,
    recentprompt,
    resultdata,
    onSent,
    setPrevoiusPrompt,
    homePage,
  } = useContext(Context);

  const fourdiv = [
    {
      word: "Write code for a specific task, including edge cases",
      icon: (
        <IoMdCode className="absolute right-3 bottom-3 text-2xl text-green-600" />
      ),
    },
    {
      word: "Explain how something works like an engineer",
      icon: (
        <GoLightBulb className="absolute right-3 bottom-3 text-2xl text-blue-600" />
      ),
    },
    {
      word: "Help me plan a game night with 5 friends for under $100",
      icon: (
        <GiThink className="absolute right-3 bottom-3 text-2xl text-slate-600" />
      ),
    },
    {
      word: "Help me find YouTube videos to care for a specific plant",
      icon: (
        <FaYoutube className="absolute right-3 bottom-3 text-2xl text-red-600" />
      ),
    },
  ];

  const loaddata = async (prompt) => {
    await setPrevoiusPrompt((pre) => [...pre, prompt]);
    await onSent(prompt);
  };

  return (
    <div className="flex-1 max-h-screen min-h-screen pb-[15vh] relative font-pop">
      <div className="flex items-center justify-between text-xl p-5 text-gray-600">
        <div className="flex items-end justify-center gap-1">
          <div>Gemini</div>
          <div className="text-black">
            <MdOutlineArrowDropDown />
          </div>
        </div>
        <div className="bg-gray-600 rounded-full text-white p-2 flex items-center w-8 h-8 justify-center text-sm">
          U
        </div>
      </div>
      <div className="md:max-w-[900px] md:m-auto">
        {!showResult ? (
          <>
            <div className="my-5 mx-0 text-[25px] font-base md:text-[50px] md:font-semibold p-2">
              <p>
                <span className="bg-gradient-to-r from-blue-600 to-rose-400 bg-clip-text text-transparent">
                  Hello, User
                </span>
              </p>
              <p className="text-gray-300">How can i help you today?</p>
            </div>

            <div className="grid-cols-4 hidden md:grid gap-4 ">
              {fourdiv.map((item, index) => (
                <div
                  onClick={() => loaddata(item.word)}
                  key={index}
                  className={`h-[190px] p-4 bg-green-50 hover:bg-gray-200 rounded-xl relative cursor-pointer`}
                >
                  <p className="text-base text-gray-800">{item.word}</p>
                  {item.icon}
                </div>
              ))}
            </div>

            {/* for mobile */}
            <div className="flex mb-6 md:hidden">
              <div
                onClick={() =>
                  loaddata(
                    "Help me plan a game night with 5 friends for under $100"
                  )
                }
                className={`h-[100px] mx-4 p-4 bg-green-50 hover:bg-gray-200 rounded-xl relative cursor-pointer`}
              >
                <p className="text-lg text-gray-800">
                  {"Write code for a specific task, including edge cases"}
                </p>
                <GiThink className="absolute right-3 bottom-3 text-2xl text-slate-600" />
              </div>
            </div>
            <div className="flex md:hidden">
              <div
                onClick={() =>
                  loaddata("Explain how something works like an engineer")
                }
                className={`h-[100px] mx-4 p-4 bg-green-50 hover:bg-gray-200 rounded-xl relative cursor-pointer`}
              >
                <p className="text-lg text-gray-800">
                  {"Write code for a specific task, including edge cases"}
                </p>
                <GoLightBulb className="absolute right-3 bottom-3 text-2xl text-blue-600" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              id="webscroll"
              className="py-1 px-[5%] my-4 h-[65vh] overflow-y-scroll"
            >
              <div className="flex gap-2 items-center mx-0 my-10">
                <div className="bg-gray-600 rounded-full text-white p-2 flex items-center w-8 h-8 justify-center text-sm">
                  U
                </div>
                <p>{recentprompt}</p>
              </div>
              <div className="flex items-start gap-2">
                <img
                  src={logo}
                  className={`h-8 w-8" alt="gemini-ai ${
                    loading ? "animate-spin" : null
                  }`}
                />
                {loading ? (
                  <div className="w-[100%] flex flex-col gap-4">
                    <p className="rounded border-0 bg-transperent bg-gradient-to-r from-sky-400 to-white bg-[length:800px_50px] h-5 animate-pulse"></p>
                    <p className="rounded border-0 bg-transperent bg-gradient-to-r from-sky-400 to-white bg-[length:800px_50px] h-5 animate-pulse"></p>
                    <p className="rounded border-0 bg-transperent bg-gradient-to-r from-sky-400 to-white bg-[length:800px_50px] h-5 animate-pulse"></p>
                  </div>
                ) : (
                  <p
                    className="text-base font-light leading-8"
                    dangerouslySetInnerHTML={{ __html: resultdata }}
                  ></p>
                )}
              </div>
            </div>
          </>
        )}

        <div className="absolute bottom-0 w-screen max-w-[900px] py-2 px-3 m-auto ">
          <div className="flex items-center justify-between gap-5 py-2 px-4 rounded-full bg-green-50">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter your prompt here"
              className="flex-1 bg-transparent p-3 md:text-lg outline-none"
            />
            <div className="flex gap-3 text-xl">
              <RiGalleryLine className="cursor-pointer hidden md:block" />
              <CiCirclePlus onClick={() => homePage()} className="cursor-pointer block md:hidden" />
              <TiMicrophoneOutline className="cursor-pointer hidden md:block"/>
              {input.length > 0 && !loading ? (
                <AiOutlineSend
                  onClick={() => onSent()}
                  className={`cursor-pointer hover:text-gray-800`}
                />
              ) : null}
            </div>
          </div>
          <small className="flex items-center justify-center py-2 text-gray-700">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.{" "}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Main;
