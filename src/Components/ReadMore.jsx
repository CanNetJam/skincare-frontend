import React, { useState } from "react";
 
export default function ReadMore(text) {
    const [ word, setWord ] = useState("more")
    const [ expand, setExpand ] = useState(false)
    
    let resultString = !expand ? text.text.slice(0, 100) : text.text

    return (
        <p>
            {expand==false ? resultString+"...": resultString}
            <button className="text-blue-400 font-bold cursor-pointer" onClick={()=> {
                if (expand===false) {
                    setExpand(true) 
                    setWord("less")
                }
                if (expand===true) {
                    setExpand(false) 
                    setWord("more")
                }
            }}>{`Read ${word}`}</button>
        </p>
    )
}