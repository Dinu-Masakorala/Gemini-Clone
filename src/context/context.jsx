/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from "react";
import run from "../config/gemini";
//import { useEffect } from "react";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setshowResult] = useState("");
    const [loading, setloading] = useState("");
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {

        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index)

    }

    const newChat = () => {
        setloading(false)
        setshowResult(false)
    }

    // eslint-disable-next-line no-unused-vars
    const onSent = async (prompt) => {

        setResultData("")
        setloading(true)
        setshowResult(true)
        if (prompt === undefined) {
            prompt = input;
        }
        setrecentPrompt(input);
        setPrevPrompts((prev) => {
            if (!prev.includes(prompt)) {
                return [...prev, prompt];
            }
            return prev;
        });
        const response = await run(prompt);
        let responseArray = response.split("**");
        let newResponse = " ";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ")
        }
        setloading(false)
        setInput("")
    };

    // The initial context value can include the onSent function
    const ContextValue = {
        onSent,
        prevPrompts,
        setPrevPrompts,
        setrecentPrompt,
        recentPrompt,
        showResult,
        setshowResult,
        loading,
        setloading,
        resultData,
        setResultData,
        input,
        setInput,
        newChat
    };
    // useEffect(() => {
    //     // Call onSent with "what is react js" prompt after the component mounts
    //     onSent("what is react js");
    // }, []);

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
