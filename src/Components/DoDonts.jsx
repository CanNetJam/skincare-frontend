import React from "react";

export default function DoDonts({proddo, proddont}) {
    return (
        <>
            <div className="min-h-screen h-full w-full grid justify-center p-2 sm:py-10 bg-blue-300 sm:bg-cover sm:bg-[linear-gradient(to_right,rgba(147,197,253,1),rgba(255,255,255,0)),url('https://images.unsplash.com/photo-1521840233161-295ed621e056?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                <div className="h-[20vh] w-full max-w-6xl pt-8 sm:bg-none bg-cover bg-[linear-gradient(to_right,rgba(147,197,253,1),rgba(255,255,255,0)),url('https://images.unsplash.com/photo-1521840233161-295ed621e056?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                    <h1 className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] sm:text-5xl text-4xl font-bold">Klued products do's and don'ts</h1>
                </div>

                <div className="h-full w-full sm:max-w-6xl grid sm:container sm:mx-auto sm:grid-cols-2">

                    <div className="sm:rounded-tl-[100px] border-b-2 sm:border-b-0 col-span-1 container mx-auto grid bg-white sm:border-r-2 border-blue-300">
                        <div className="grid gap-2 p-6 w-full">
                            <h1 className="capitalize font-bold text-gray-700 text-3xl text-center">Do's</h1>
                            
                            {proddo[0]!==undefined ? 
                                <>
                                    {proddo.map((a, index)=> {
                                        return (
                                            <div key={index} className="grid grid-cols-5 gap-4 py-2 w-full">
                                                <div className="flex justify-center">
                                                    {index===0 && (
                                                        <div className="h-11 w-11 rounded-full bg-blue-400 flex justify-center items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-number-1"><path stroke="none" d="M0 0h24v24H0z"/><path d="M13 20v-16l-5 5" /></svg>
                                                        </div>
                                                    )}
                                                    {index===1 && (
                                                        <div className="h-11 w-11 rounded-full bg-blue-400 flex justify-center items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-number-1"><path stroke="none" d="M0 0h24v24H0z"/><path d="M8 8a4 4 0 1 1 8 0c0 1.098 -.564 2.025 -1.159 2.815l-6.841 9.185h8"/></svg>
                                                        </div>
                                                    )}
                                                    {index===2 && (
                                                        <div className="h-11 w-11 rounded-full bg-blue-400 flex justify-center items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-number-1"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 12a4 4 0 1 0 -4 -4" /><path d="M8 16a4 4 0 1 0 4 -4" /></svg>
                                                        </div>
                                                    )}
                                                    {index===3 && (
                                                        <div className="h-11 w-11 rounded-full bg-blue-400 flex justify-center items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-number-1"><path stroke="none" d="M0 0h24v24H0z"/><path d="M15 20v-15l-8 11h10" /></svg>
                                                        </div>
                                                    )}
                                                    {index===4 && (
                                                        <div className="h-11 w-11 rounded-full bg-blue-400 flex justify-center items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-number-1"><path stroke="none" d="M0 0h24v24H0z"/><path d="M8 20h4a4 4 0 1 0 0 -8h-4v-8h8" /></svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-span-4">
                                                    <h1 className="capitalize font-bold text-gray-600 text-base my-1">{a.title}</h1>
                                                    <p className="tinyText">{a.desc}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            :null}
                        </div>
                    </div>

                    <div className="sm:rounded-br-[100px] border-t-2 sm:border-t-0 col-span-1 container mx-auto grid bg-white sm:border-l-2 border-blue-300">
                        <div className="grid gap-2 p-6 w-full">
                            <h1 className="capitalize font-bold text-gray-700 text-3xl text-center">Don't</h1>
                            
                            {proddont[0]!==undefined ? 
                                <>
                                    {proddont?.map((a, index)=> {
                                        return (
                                            <div key={index} className="grid grid-cols-5 gap-4 py-2 w-full">
                                                <div className="flex justify-center">
                                                    {index===0 && (
                                                        <div className="h-11 w-11 rounded-full bg-blue-400 flex justify-center items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-number-1"><path stroke="none" d="M0 0h24v24H0z"/><path d="M13 20v-16l-5 5" /></svg>
                                                        </div>
                                                    )}
                                                    {index===1 && (
                                                        <div className="h-11 w-11 rounded-full bg-blue-400 flex justify-center items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-number-1"><path stroke="none" d="M0 0h24v24H0z"/><path d="M8 8a4 4 0 1 1 8 0c0 1.098 -.564 2.025 -1.159 2.815l-6.841 9.185h8"/></svg>
                                                        </div>
                                                    )}
                                                    {index===2 && (
                                                        <div className="h-11 w-11 rounded-full bg-blue-400 flex justify-center items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-number-1"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 12a4 4 0 1 0 -4 -4" /><path d="M8 16a4 4 0 1 0 4 -4" /></svg>
                                                        </div>
                                                    )}
                                                    {index===3 && (
                                                        <div className="h-11 w-11 rounded-full bg-blue-400 flex justify-center items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-number-1"><path stroke="none" d="M0 0h24v24H0z"/><path d="M15 20v-15l-8 11h10" /></svg>
                                                        </div>
                                                    )}
                                                    {index===4 && (
                                                        <div className="h-11 w-11 rounded-full bg-blue-400 flex justify-center items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-number-1"><path stroke="none" d="M0 0h24v24H0z"/><path d="M8 20h4a4 4 0 1 0 0 -8h-4v-8h8" /></svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-span-4">
                                                    <h1 className="capitalize font-bold text-gray-600 text-base my-1">{a.title}</h1>
                                                    <p className="tinyText">{a.desc}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            :null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
//text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)]