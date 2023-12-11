import React, { useState, useEffect } from 'react';
import { FaCheck } from "react-icons/fa";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Routines({routines}) {
    const [opentab, setOpenTab] = useState("Normal")
    const [normalRoutine, setNormalRoutine] = useState({morning: [], night: []})
    const [dryRoutine, setDryRoutine] = useState({morning: [], night: []})
    const [oilyRoutine, setOilyRoutine] = useState({morning: [], night: []})
    const [combinationRoutine, setCombinationRoutine] = useState({morning: [], night: []})
    
    useEffect(()=> {
        const setRoutines = () => {
            routines?.map((a)=> {
                if (a.skintype==="Normal") {
                    setNormalRoutine(a)
                } else if (a.skintype==="Dry") {
                    setDryRoutine(a)
                } else if (a.skintype==="Oily") {
                    setOilyRoutine(a)
                } else if (a.skintype==="Combination") {
                    setCombinationRoutine(a)
                }
            })
        }
        setRoutines()
    }, [routines])

    let settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <>
            <div className="min-h-screen h-auto w-full sm:px-20 py-8 ">
                <div className='h-[10vh] sticky sm:top-0 top-16 bg-white z-30 w-full grid sm:grid-cols-4 grid-cols-2 sm:gap-2 gap-0 border-b border-black'>
                    <section className={`h-full items-center flex justify-center font-bold sm:text-xl text-md text-center ${opentab==="Normal" ? "bg-blue-400 text-white" : null}`}>
                    <span onClick={()=> setOpenTab("Normal")} className='cursor-pointer sm:hover:text-gray-600 sm:hover:text-2xl'>Normal</span>
                    </section>
                    <section className={`h-full items-center flex justify-center font-bold sm:text-xl text-md text-center ${opentab==="Dry" ? "bg-blue-400 text-white" : null}`}>
                    <span onClick={()=> setOpenTab("Dry")} className='cursor-pointer sm:hover:text-gray-600 sm:hover:text-2xl'>Dry</span>
                    </section>
                    <section className={`h-full items-center flex justify-center font-bold sm:text-xl text-md text-center ${opentab==="Oily" ? "bg-blue-400 text-white" : null}`}>
                    <span onClick={()=> setOpenTab("Oily")} className='cursor-pointer sm:hover:text-gray-600 sm:hover:text-2xl'>Oily</span>
                    </section>
                    <section className={`h-full items-center flex justify-center font-bold sm:text-xl text-md text-center ${opentab==="Combination" ? "bg-blue-400 text-white" : null}`}>
                    <span onClick={()=> setOpenTab("Combination")} className='cursor-pointer sm:hover:text-gray-600 sm:hover:text-2xl'>Combination</span>
                    </section>
                </div>

                <div className='container mx-auto h-full w-full'>
                    {opentab==="Normal" &&
                        <>
                            <div className="py-4 sm:px-0 px-4">
                                <h1 className="subHeading py-2">Normal Skin</h1>
                                <p className="smallText text-justify">‘Normal’ is a term widely used to refer to well-balanced skin. The T-zone (forehead, chin and nose) may be a bit oily, but overall sebum and moisture is balanced and the skin is neither too oily nor too dry.</p>
                            </div>
                            <div className="sm:flex grid">
                                <div className="w-full bg-yellow-300 text-black block px-10 pb-8">
                                    <div className="flex justify-center p-6">
                                        <h3 className="font-bold text-2xl">Morning Routine</h3>
                                    </div>

                                    {normalRoutine?.morning[0]!==undefined ? 
                                        <div className="grid">
                                            {normalRoutine?.morning.map((a, index)=>{
                                                return (
                                                    <div key={index} className="flex w-full gap-2 p-2 overflow-hidden">
                                                        <div className="w-[60px] grid justify-center gap-4">
                                                            <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                                            {normalRoutine.morning[index+1]!==undefined ? 
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

                                    {normalRoutine?.night[0]!==undefined ? 
                                        <div className="grid">
                                            {normalRoutine?.night.map((a, index)=>{
                                                return (
                                                    <div key={index} className="flex w-full gap-2 p-2 overflow-hidden">
                                                        <div className="w-[60px] grid justify-center gap-4">
                                                            <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                                            {normalRoutine.night[index+1]!==undefined ? 
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
                                                            <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
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
                                                            <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
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

                    {opentab==="Combination" && 
                        <>
                            <div className="py-4 sm:px-0 px-4">
                                <h1 className="subHeading py-2">Combination Skin</h1>
                                <p className="smallText text-justify">Combination skin is characterized by having an oily T-zone (forehead, chin, and nose), enlarged pores in this area perhaps with some impurities, and normal to dry cheeks</p>
                            </div>
                            <div className="sm:flex grid">
                                <div className="w-full bg-yellow-300 text-black block px-10 pb-8">
                                    <div className="flex justify-center p-6">
                                        <h3 className="font-bold text-2xl">Morning Routine</h3>
                                    </div>
                                    {combinationRoutine?.morning[0]!==undefined ? 
                                        <div className="grid">
                                            {combinationRoutine?.morning.map((a, index)=>{
                                                return (
                                                    <div key={index} className="flex w-full gap-2 p-2 overflow-hidden">
                                                        <div className="w-[60px] grid justify-center gap-4">
                                                            <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                                            {combinationRoutine.morning[index+1]!==undefined ? 
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

                                    {combinationRoutine?.night[0]!==undefined ? 
                                        <div className="grid">
                                            {combinationRoutine?.night.map((a, index)=>{
                                                return (
                                                    <div key={index} className="flex w-full gap-2 p-2 overflow-hidden">
                                                        <div className="w-[60px] grid justify-center gap-4">
                                                            <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                                            {combinationRoutine.night[index+1]!==undefined ? 
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
/*
<div className="lg:w-[400px] md:w-[300px] sm:w-[250px] w-[250px]">
                                        <Slider {...settings}>
                                            <div className="grid">
                                                <div className="flex justify-center">
                                                    <h3 className="text-white normalText font-semibold">Monday/Wednesday/Friday</h3>
                                                </div>
                                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                                    <div className="w-[60px] grid justify-center gap-4">
                                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                        <div className="flex">
                                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                            <div className="w-full"></div>
                                                        </div>
                                                    </div>
                                                    <div className="grid px-2">
                                                        <p className="font-semibold text-base text-gray-400">Step 1</p>
                                                        <p><b>2% Salicylic Cleanser</b></p>
                                                    </div>
                                                </div>
                                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                                    <div className="w-[60px] grid justify-center gap-4">
                                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                        <div className="flex">
                                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                            <div className="w-full"></div>
                                                        </div>
                                                    </div>
                                                    <div className="grid px-2">
                                                        <p className="font-semibold text-base  text-gray-400">Step 2</p>
                                                        <p><b>5% Mandelic Toner</b></p>
                                                    </div>
                                                </div>
                                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                                    <div className="w-[60px] grid justify-center gap-4">
                                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                        <div className="flex">
                                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                            <div className="w-full"></div>
                                                        </div>
                                                    </div>
                                                    <div className="grid px-2">
                                                        <p className="font-semibold text-base text-gray-400">Step 3</p>
                                                        <p><b>5% Niacinamide</b></p>
                                                    </div>
                                                </div>
                                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                                    <div className="w-[60px] grid justify-center gap-4">
                                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                    </div>
                                                    <div className="grid px-2">
                                                        <p className="font-semibold text-base text-gray-400">Step 4</p>
                                                        <p><b>Double Oat Moisturizer</b></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid">
                                                <div className="flex justify-center">
                                                    <h3 className="text-white normalText font-semibold">Tuesday/Thursday</h3>
                                                </div>
                                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                                    <div className="w-[60px] grid justify-center gap-4">
                                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                        <div className="flex">
                                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                            <div className="w-full"></div>
                                                        </div>
                                                    </div>
                                                    <div className="grid px-2">
                                                        <p className="font-semibold text-base text-gray-400">Step 1</p>
                                                        <p><b>2% Salicylic Cleanser</b></p>
                                                    </div>
                                                </div>
                                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                                    <div className="w-[60px] grid justify-center gap-4">
                                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                        <div className="flex">
                                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                            <div className="w-full"></div>
                                                        </div>
                                                    </div>
                                                    <div className="grid px-2">
                                                        <p className="font-semibold text-base  text-gray-400">Step 2</p>
                                                        <p><b>2% BHA Toner</b></p>
                                                    </div>
                                                </div>
                                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                                    <div className="w-[60px] grid justify-center gap-4">
                                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                        <div className="flex">
                                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                            <div className="w-full"></div>
                                                        </div>
                                                    </div>
                                                    <div className="grid px-2">
                                                        <p className="font-semibold text-base text-gray-400">Step 3</p>
                                                        <p><b>5% Niacinamide</b></p>
                                                    </div>
                                                </div>
                                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                                    <div className="w-[60px] grid justify-center gap-4">
                                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                    </div>
                                                    <div className="grid px-2">
                                                        <p className="font-semibold text-base text-gray-400">Step 4</p>
                                                        <p><b>Double Oat Moisturizer</b></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid">
                                                <div className="flex justify-center">
                                                    <h3 className="text-white normalText font-semibold">Sunday</h3>
                                                </div>
                                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                                    <div className="w-[60px] grid justify-center gap-4">
                                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                        <div className="flex">
                                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                            <div className="w-full"></div>
                                                        </div>
                                                    </div>
                                                    <div className="grid px-2">
                                                        <p className="font-semibold text-base text-gray-400">Step 1</p>
                                                        <p><b>2% Salicylic Cleanser</b></p>
                                                    </div>
                                                </div>
                                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                                    <div className="w-[60px] grid justify-center gap-4">
                                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                        <div className="flex">
                                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                            <div className="w-full"></div>
                                                        </div>
                                                    </div>
                                                    <div className="grid px-2">
                                                        <p className="font-semibold text-base text-gray-400">Step 2</p>
                                                        <p><b>5% Niacinamide</b></p>
                                                    </div>
                                                </div>
                                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                                    <div className="w-[60px] grid justify-center gap-4">
                                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                    </div>
                                                    <div className="grid px-2">
                                                        <p className="font-semibold text-base text-gray-400">Step 3</p>
                                                        <p><b>Double Oat Moisturizer</b></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Slider>
                                    </div>*/