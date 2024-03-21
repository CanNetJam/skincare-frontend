import React, { useState } from "react";
 
export default function ReadMore(text) {
    const [ word, setWord ] = useState("more")
    const [ expand, setExpand ] = useState(false)
    
    let resultString = !expand ? text.text.slice(0, 100) : text.text

    return (
        <p className="text-sm drop-shadow-[0_4px_4px_rgba(255,255,255,1)] text-gray-700">
            {expand==false ? resultString+"...": resultString}
            <button className="text-blue-400 text-sm font-bold cursor-pointer" onClick={()=> {
                if (expand===false) {
                    setExpand(true) 
                    setWord("less")
                }
                if (expand===true) {
                    setExpand(false) 
                    setWord("more")
                }
            }}>{`${word}`}</button>
        </p>
    )
}