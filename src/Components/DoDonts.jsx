import React from "react";
import { PiNumberCircleOneFill, PiNumberCircleTwoFill, PiNumberCircleThreeFill, PiNumberCircleFourFill, PiNumberCircleFiveFill } from "react-icons/pi";

export default function DoDonts({proddo, proddont}) {
    return (
        <>
            <div className="min-h-screen h-full w-full grid justify-center p-2 sm:py-10 bg-blue-300 sm:bg-cover sm:bg-[linear-gradient(to_right,rgba(147,197,253,1),rgba(255,255,255,0)),url('https://images.unsplash.com/photo-1521840233161-295ed621e056?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                <div className="h-[20vh] w-full max-w-6xl pt-8 sm:bg-none bg-cover bg-[linear-gradient(to_right,rgba(147,197,253,1),rgba(255,255,255,0)),url('https://images.unsplash.com/photo-1521840233161-295ed621e056?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                    <h1 className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] sm:text-5xl text-4xl font-bold">Klued products do's and don'ts</h1>
                </div>

                <div className="h-full w-full sm:max-w-6xl grid sm:container sm:mx-auto sm:grid-cols-2">

                    <div className="sm:rounded-tl-[100px] border-b-2 sm:border-b-0 container mx-auto grid bg-white sm:border-r-2 border-blue-300">
                        <div className="grid gap-2 p-6">
                            <h1 className="capitalize font-bold text-gray-700 text-3xl text-center">Do's</h1>
                            
                            {proddo[0]!==undefined ? 
                                <>
                                    {proddo.map((a, index)=> {
                                        return (
                                            <div key={index} className="grid grid-cols-5 gap-4 py-2">
                                                <div className="flex justify-center">
                                                    {index===0 && (
                                                        <PiNumberCircleOneFill className="text-blue-400 h-[50px] w-[100px]"/>
                                                    )}
                                                    {index===1 && (
                                                        <PiNumberCircleTwoFill className="text-blue-400 h-[50px] w-[100px]"/>
                                                    )}
                                                    {index===2 && (
                                                        <PiNumberCircleThreeFill className="text-blue-400 h-[50px] w-[100px]"/>
                                                    )}
                                                    {index===3 && (
                                                        <PiNumberCircleFourFill className="text-blue-400 h-[50px] w-[100px]"/>
                                                    )}
                                                    {index===4 && (
                                                        <PiNumberCircleFiveFill className="text-blue-400 h-[50px] w-[100px]"/>
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

                    <div className="sm:rounded-br-[100px] border-t-2 sm:border-t-0 container mx-auto grid bg-white sm:border-l-2 border-blue-300">
                        <div className="grid gap-2 p-6">
                            <h1 className="capitalize font-bold text-gray-700 text-3xl text-center">Don't</h1>
                            
                            {proddont[0]!==undefined ? 
                                <>
                                    {proddont?.map((a, index)=> {
                                        return (
                                            <div key={index} className="grid grid-cols-5 gap-4 py-2">
                                                <div className="flex justify-center">
                                                    {index===0 && (
                                                        <PiNumberCircleOneFill className="text-blue-400 h-[50px] w-[100px]"/>
                                                    )}
                                                    {index===1 && (
                                                        <PiNumberCircleTwoFill className="text-blue-400 h-[50px] w-[100px]"/>
                                                    )}
                                                    {index===2 && (
                                                        <PiNumberCircleThreeFill className="text-blue-400 h-[50px] w-[100px]"/>
                                                    )}
                                                    {index===3 && (
                                                        <PiNumberCircleFourFill className="text-blue-400 h-[50px] w-[100px]"/>
                                                    )}
                                                    {index===4 && (
                                                        <PiNumberCircleFiveFill className="text-blue-400 h-[50px] w-[100px]"/>
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