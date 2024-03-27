import React from 'react';

export default function Routines2({packageData, morning, night}) {
    return (
        <div className='h-auto w-full sm:p-10 p-4 bg-gray-100'>
            <h2 className='subHeading mb-10 text-center'>{packageData.name} Routine</h2>
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
                                                <div className='h-8 w-8 bg-black flex justify-center items-center rounded-full'>
                                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="yellow" xmlns="http://www.w3.org/2000/svg"><path d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z"/></svg>
                                                </div>
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
                                                <div className='h-8 w-8 bg-slate-200 flex justify-center items-center rounded-full'>
                                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z"/></svg>
                                                </div>
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
