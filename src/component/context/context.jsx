import { createContext, useState } from "react";
import runChat from "../gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentprompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPrevoiusPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultdata, setResultData] = useState("");

  const typewritter = (index, nxt) => {
    setTimeout(function () {
      setResultData((pre) => pre + nxt);
    }, 75 * index);
  };

  const homePage = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      setRecentPrompt(prompt);
      response = await runChat(prompt);
    } else {
      setPrevoiusPrompt((pre) => [...pre, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }

    let modifiedParagraph = response.replace(/\*/g, "");

    modifiedParagraph = modifiedParagraph.replace(/\./g, ".<br />");

    modifiedParagraph = modifiedParagraph.replace(
      /(\b\S+:\s*\b)/g,
      "<b>$1</b>"
    );

    let newres1 = modifiedParagraph.split(" ");

    for (let i = 0; i < newres1.length; i++) {
      let nxt = newres1[i];
      typewritter(i, nxt + " ");
    }

    setLoading(false);
    setInput("");
  };

  // onSent("what is jsx in react")

  const contextValue = {
    input,
    setInput,
    previousPrompt,
    setPrevoiusPrompt,
    showResult,
    recentprompt,
    loading,
    recentprompt,
    resultdata,
    onSent,
    homePage,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
