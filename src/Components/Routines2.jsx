import React from 'react';
import { FaCheck } from "react-icons/fa";

export default function Routines2({packageData, morning, night}) {
    return (
        <div className='h-auto w-full sm:p-10 p-4 bg-gray-100'>
            <h1 className='subHeading mb-10 text-center'>{packageData.name} Routine</h1>
            <div className='container mx-auto max-w-6xl'>
                <div className="sm:flex grid ">
                    <div className="w-full bg-yellow-300 sm:rounded-l-lg rounded-t-lg text-black block px-10 pb-8">
                        <div className="flex justify-center p-6">
                            <h3 className="font-bold text-2xl">Morning Routine</h3>
                        </div>

                        {morning[0]!==undefined ? 
                            <div className="grid">
                                {morning.map((a, index)=>{
                                    return (
                                        <div key={index} className="grid grid-cols-6 w-full gap-2 p-2 overflow-hidden">
                                            <div className="col-span-1 w-[60px] grid justify-center gap-4">
                                                <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                                {morning[index+1]!==undefined ? 
                                                    <div className="flex">
                                                        <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                        <div className="w-full"></div>
                                                    </div>
                                                :null}
                                            </div>
                                            <div className="col-span-5 grid px-2">
                                                <p className="font-semibold text-base text-gray-500">Step {index+1}</p>
                                                <p><b>{a}</b></p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        :null}
                    </div>

                    <div className="w-full bg-black sm:rounded-r-lg rounded-b-lg text-white block px-10 pb-8">
                        <div className="flex justify-center p-6">
                            <h3 className="font-bold text-2xl">Evening Routine</h3>
                        </div>

                        {night[0]!==undefined ? 
                            <div className="grid">
                                {night.map((a, index)=>{
                                    return (
                                        <div key={index} className="grid grid-cols-6 w-full gap-2 p-2 overflow-hidden">
                                            <div className="col-span-1 w-[60px] grid justify-center gap-4">
                                                <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-slate-200 rounded-full"/>
                                                {night[index+1]!==undefined ? 
                                                    <div className="flex">
                                                        <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                        <div className="w-full"></div>
                                                    </div>
                                                :null}
                                            </div>
                                            <div className="col-span-5 grid px-2">
                                                <p className="font-semibold text-base text-gray-500">Step {index+1}</p>
                                                <p><b>{a}</b></p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        :null}
                    </div>
                </div>
            </div>
        </div>
    )
}
