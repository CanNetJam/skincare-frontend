import React, { useState, useEffect } from 'react';
import { FaCheck } from "react-icons/fa";

export default function Routines({routines}) {
    const [opentab, setOpenTab] = useState("Wrinkle")
    const [wrinkleRoutine, setWrinkleRoutine] = useState({morning: [], night: []})
    const [pigmentRoutine, setPigmentRoutine] = useState({morning: [], night: []})
    const [acneRoutine, setAcneRoutine] = useState({morning: [], night: []})
    const [dryRoutine, setDryRoutine] = useState({morning: [], night: []})
    const [oilyRoutine, setOilyRoutine] = useState({morning: [], night: []})

    useEffect(()=> {
        const setRoutines = () => {
            routines?.map((a)=> {
                if (a.skintype==="Wrinkle") {
                    setWrinkleRoutine(a)
                } else if (a.skintype==="Pigmentation") {
                    setPigmentRoutine(a)
                } else if (a.skintype==="Acne") {
                    setAcneRoutine(a)
                } else if (a.skintype==="Dry") {
                    setDryRoutine(a)
                } else if (a.skintype==="Oily") {
                    setOilyRoutine(a)
                } 
            })
        }
        setRoutines()
    }, [routines])

    return (
        <>
            <div className="min-h-screen h-auto w-full sm:px-20 py-8 ">
                <div className='min-h-[10vh] h-auto sticky top-16 bg-white z-30 w-full grid sm:grid-cols-5 grid-cols-2 sm:gap-2 gap-0 sm:border-b sm:border-black border-0'>
                    <section onClick={()=> setOpenTab("Wrinkle")}  className={`h-full items-center flex justify-center font-bold text-xl text-center sm:border-0 border-b border-black ${opentab==="Wrinkle" ? "bg-blue-400 text-white" : null}`}>
                        <span className='cursor-pointer sm:hover:text-gray-600 sm:hover:text-2xl'>Wrinkle</span>
                    </section>
                    <section onClick={()=> setOpenTab("Pigment")} className={`h-full items-center flex justify-center font-bold text-xl text-center sm:border-0 border-b border-black ${opentab==="Pigment" ? "bg-blue-400 text-white" : null}`}>
                        <span className='cursor-pointer sm:hover:text-gray-600 sm:hover:text-2xl'>Pigmentation</span>
                    </section>
                    <section onClick={()=> setOpenTab("Acne")} className={`h-full items-center flex justify-center font-bold text-xl text-center sm:border-0 border-b border-black ${opentab==="Acne" ? "bg-blue-400 text-white" : null}`}>
                        <span className='cursor-pointer sm:hover:text-gray-600 sm:hover:text-2xl'>Acne</span>
                    </section>
                    <section onClick={()=> setOpenTab("Dry")} className={`h-full items-center flex justify-center font-bold text-xl text-center sm:border-0 border-b border-black ${opentab==="Dry" ? "bg-blue-400 text-white" : null}`}>
                        <span className='cursor-pointer sm:hover:text-gray-600 sm:hover:text-2xl'>Dry</span>
                    </section>
                    <section onClick={()=> setOpenTab("Oily")} className={`h-full items-center flex justify-center font-bold text-xl text-center sm:border-0 border-b border-black ${opentab==="Oily" ? "bg-blue-400 text-white" : null}`}>
                        <span className='cursor-pointer sm:hover:text-gray-600 sm:hover:text-2xl'>Oily</span>
                    </section>
                </div>

                <div className='container mx-auto h-full w-full'>
                    {opentab==="Wrinkle" &&
                        <>
                            <div className="py-4 sm:px-0 px-4">
                                <h1 className="subHeading py-2">Wrinkled Skin</h1>
                                <p className="smallText text-justify"></p>
                            </div>
                            <div className="sm:flex grid">
                                <div className="w-full bg-yellow-300 text-black block px-10 pb-8">
                                    <div className="flex justify-center p-6">
                                        <h3 className="font-bold text-2xl">Morning Routine</h3>
                                    </div>

                                    {wrinkleRoutine?.morning[0]!==undefined ? 
                                        <div className="grid">
                                            {wrinkleRoutine?.morning.map((a, index)=>{
                                                return (
                                                    <div key={index} className="flex w-full gap-2 p-2 overflow-hidden">
                                                        <div className="w-[60px] grid justify-center gap-4">
                                                            <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                                            {wrinkleRoutine.morning[index+1]!==undefined ? 
                                                                <div className="flex">
                                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                                    <div className="w-full"></div>
                                                                </div>
                                                            :null}
                                                        </div>
                                                        <div className="grid px-2">
                                                            <p className="font-semibold text-base text-gray-700">Step {index+1}</p>
                                                            <p><b>{a}</b></p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :null}
                                </div>

                                <div className="w-full bg-black text-white block px-10 pb-8">
                                    <div className="flex justify-center p-6">
                                        <h3 className="font-bold text-2xl">Evening Routine</h3>
                                    </div>

                                    {wrinkleRoutine?.night[0]!==undefined ? 
                                        <div className="grid">
                                            {wrinkleRoutine?.night.map((a, index)=>{
                                                return (
                                                    <div key={index} className="flex w-full gap-2 p-2 overflow-hidden">
                                                        <div className="w-[60px] grid justify-center gap-4">
                                                            <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                            {wrinkleRoutine.night[index+1]!==undefined ? 
                                                                <div className="flex">
                                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                                    <div className="w-full"></div>
                                                                </div>
                                                            :null}
                                                        </div>
                                                        <div className="grid px-2">
                                                            <p className="font-semibold text-base text-gray-700">Step {index+1}</p>
                                                            <p><b>{a}</b></p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :null}
                                </div>
                            </div>
                        </>
                    }

                    {opentab==="Pigment" && 
                        <>
                            <div className="py-4 sm:px-0 px-4">
                                <h1 className="subHeading py-2">Skin with Pigmentation</h1>
                                <p className="smallText text-justify"></p>
                            </div>
                            <div className="sm:flex grid">
                                <div className="w-full bg-yellow-300 text-black block px-10 pb-8">
                                    <div className="flex justify-center p-6">
                                        <h3 className="font-bold text-2xl">Morning Routine</h3>
                                    </div>
                                    {pigmentRoutine?.morning[0]!==undefined ? 
                                        <div className="grid">
                                            {pigmentRoutine?.morning.map((a, index)=>{
                                                return (
                                                    <div key={index} className="flex w-full gap-2 p-2 overflow-hidden">
                                                        <div className="w-[60px] grid justify-center gap-4">
                                                            <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                                            {pigmentRoutine.morning[index+1]!==undefined ? 
                                                                <div className="flex">
                                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                                    <div className="w-full"></div>
                                                                </div>
                                                            :null}
                                                        </div>
                                                        <div className="grid px-2">
                                                            <p className="font-semibold text-base text-gray-700">Step {index+1}</p>
                                                            <p><b>{a}</b></p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :null}
                                </div>

                                <div className="w-full bg-black text-white block px-10 pb-8">
                                    <div className="flex justify-center p-6">
                                        <h3 className="font-bold text-2xl">Evening Routine</h3>
                                    </div>

                                    {pigmentRoutine?.night[0]!==undefined ? 
                                        <div className="grid">
                                            {pigmentRoutine?.night.map((a, index)=>{
                                                return (
                                                    <div key={index} className="flex w-full gap-2 p-2 overflow-hidden">
                                                        <div className="w-[60px] grid justify-center gap-4">
                                                            <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                            {pigmentRoutine.night[index+1]!==undefined ? 
                                                                <div className="flex">
                                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                                    <div className="w-full"></div>
                                                                </div>
                                                            :null}
                                                        </div>
                                                        <div className="grid px-2">
                                                            <p className="font-semibold text-base text-gray-700">Step {index+1}</p>
                                                            <p><b>{a}</b></p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :null}
                                </div>
                            </div>
                        </>
                    }

                    {opentab==="Acne" && 
                        <>
                            <div className="py-4 sm:px-0 px-4">
                                <h1 className="subHeading py-2">Skin with Acne</h1>
                                <p className="smallText text-justify"></p>
                            </div>
                            <div className="sm:flex grid">
                                <div className="w-full bg-yellow-300 text-black block px-10 pb-8">
                                    <div className="flex justify-center p-6">
                                        <h3 className="font-bold text-2xl">Morning Routine</h3>
                                    </div>
                                    {acneRoutine?.morning[0]!==undefined ? 
                                        <div className="grid">
                                            {acneRoutine?.morning.map((a, index)=>{
                                                return (
                                                    <div key={index} className="flex w-full gap-2 p-2 overflow-hidden">
                                                        <div className="w-[60px] grid justify-center gap-4">
                                                            <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                                            {acneRoutine.morning[index+1]!==undefined ? 
                                                                <div className="flex">
                                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                                    <div className="w-full"></div>
                                                                </div>
                                                            :null}
                                                        </div>
                                                        <div className="grid px-2">
                                                            <p className="font-semibold text-base text-gray-700">Step {index+1}</p>
                                                            <p><b>{a}</b></p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :null}
                                </div>

                                <div className="w-full bg-black text-white block px-10 pb-8">
                                    <div className="flex justify-center p-6">
                                        <h3 className="font-bold text-2xl">Evening Routine</h3>
                                    </div>

                                    {acneRoutine?.night[0]!==undefined ? 
                                        <div className="grid">
                                            {acneRoutine?.night.map((a, index)=>{
                                                return (
                                                    <div key={index} className="flex w-full gap-2 p-2 overflow-hidden">
                                                        <div className="w-[60px] grid justify-center gap-4">
                                                            <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                            {acneRoutine.night[index+1]!==undefined ? 
                                                                <div className="flex">
                                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                                    <div className="w-full"></div>
                                                                </div>
                                                            :null}
                                                        </div>
                                                        <div className="grid px-2">
                                                            <p className="font-semibold text-base text-gray-700">Step {index+1}</p>
                                                            <p><b>{a}</b></p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :null}
                                </div>
                            </div>
                        </>
                    }

                    {opentab==="Dry" && 
                        <>
                            <div className="py-4 sm:px-0 px-4">
                                <h1 className="subHeading py-2">Dry Skin</h1>
                                <p className="smallText text-justify">Dry is used to describe a skin type that produces less sebum than normal skin. As a result of the lack of sebum, dry skin lacks the lipids that it needs to retain moisture and build a protective shield against external influences.</p>
                            </div>
                            <div className="sm:flex grid">
                                <div className="w-full bg-yellow-300 text-black block px-10 pb-8">
                                    <div className="flex justify-center p-6">
                                        <h3 className="font-bold text-2xl">Morning Routine</h3>
                                    </div>

                                    {dryRoutine?.morning[0]!==undefined ? 
                                        <div className="grid">
                                            {dryRoutine?.morning.map((a, index)=>{
                                                return (
                                                    <div key={index} className="flex w-full gap-2 p-2 overflow-hidden">
                                                        <div className="w-[60px] grid justify-center gap-4">
                                                            <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                                            {dryRoutine.morning[index+1]!==undefined ? 
                                                                <div className="flex">
                                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                                    <div className="w-full"></div>
                                                                </div>
                                                            :null}
                                                        </div>
                                                        <div className="grid px-2">
                                                            <p className="font-semibold text-base text-gray-700">Step {index+1}</p>
                                                            <p><b>{a}</b></p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :null}
                                </div>

                                <div className="w-full bg-black text-white block px-10 pb-8">
                                    <div className="flex justify-center p-6">
                                        <h3 className="font-bold text-2xl">Evening Routine</h3>
                                    </div>
                                    {dryRoutine?.night[0]!==undefined ? 
                                        <div className="grid">
                                            {dryRoutine?.night.map((a, index)=>{
                                                return (
                                                    <div key={index} className="flex w-full gap-2 p-2 overflow-hidden">
                                                        <div className="w-[60px] grid justify-center gap-4">
                                                            <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                            {dryRoutine.night[index+1]!==undefined ? 
                                                                <div className="flex">
                                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                                    <div className="w-full"></div>
                                                                </div>
                                                            :null}
                                                        </div>
                                                        <div className="grid px-2">
                                                            <p className="font-semibold text-base text-gray-700">Step {index+1}</p>
                                                            <p><b>{a}</b></p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :null}
                                </div>
                            </div>
                        </>
                    }

                    {opentab==="Oily" && 
                        <>
                            <div className="py-4 sm:px-0 px-4">
                                <h1 className="subHeading py-2">Oily Skin</h1>
                                <p className="smallText text-justify">You have shiny skin, enlarged pores, prone to blackheads and breakout but at times your skin feels tight. Often caused by overproduction of sebum, this skin type can have visible excess oil on the skin and blocked pores which can cause increased breakouts, blemishes, and blackheads.</p>
                            </div>
                            <div className="sm:flex grid">
                                <div className="w-full bg-yellow-300 text-black block px-10 pb-8">
                                    <div className="flex justify-center p-6">
                                        <h3 className="font-bold text-2xl">Morning Routine</h3>
                                    </div>
                                    
                                    {oilyRoutine?.morning[0]!==undefined ? 
                                        <div className="grid">
                                            {oilyRoutine?.morning.map((a, index)=>{
                                                return (
                                                    <div key={index} className="flex w-full gap-2 p-2 overflow-hidden">
                                                        <div className="w-[60px] grid justify-center gap-4">
                                                            <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                                            {oilyRoutine.morning[index+1]!==undefined ? 
                                                                <div className="flex">
                                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                                    <div className="w-full"></div>
                                                                </div>
                                                            :null}
                                                        </div>
                                                        <div className="grid px-2">
                                                            <p className="font-semibold text-base text-gray-700">Step {index+1}</p>
                                                            <p><b>{a}</b></p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :null}
                                </div>

                                <div className="w-full bg-black text-white block px-10 pb-8">
                                    <div className="flex justify-center p-6">
                                        <h3 className="font-bold text-2xl">Evening Routine</h3>
                                    </div>
                                    
                                    {oilyRoutine?.night[0]!==undefined ? 
                                        <div className="grid">
                                            {oilyRoutine?.night.map((a, index)=>{
                                                return (
                                                    <div key={index} className="flex w-full gap-2 p-2 overflow-hidden">
                                                        <div className="w-[60px] grid justify-center gap-4">
                                                            <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                            {oilyRoutine.night[index+1]!==undefined ? 
                                                                <div className="flex">
                                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                                    <div className="w-full"></div>
                                                                </div>
                                                            :null}
                                                        </div>
                                                        <div className="grid px-2">
                                                            <p className="font-semibold text-base text-gray-700">Step {index+1}</p>
                                                            <p><b>{a}</b></p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :null}
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}