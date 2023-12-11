import React, { useState } from "react"
import { PiNumberCircleOneFill, PiNumberCircleTwoFill, PiNumberCircleThreeFill, PiNumberCircleFourFill, PiNumberCircleFiveFill } from "react-icons/pi";
import { BsMoisture } from "react-icons/bs";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FiWatch } from "react-icons/fi";
import { FaRegEyeSlash } from "react-icons/fa";
import { TbDropletOff } from "react-icons/tb";

export default function DoDonts({proddo, proddont}) {
    
    return (
        <>
            <div className="min-h-screen h-full w-full sm:py-10 grid bg-blue-300 sm:bg-cover sm:bg-[linear-gradient(to_right,rgba(147,197,253,1),rgba(255,255,255,0)),url('https://images.unsplash.com/photo-1521840233161-295ed621e056?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                <div className="h-[20vh] w-full sm:pl-12 pl-4 pt-8 sm:bg-none bg-cover bg-[linear-gradient(to_right,rgba(147,197,253,1),rgba(255,255,255,0)),url('https://images.unsplash.com/photo-1521840233161-295ed621e056?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                    <h1 className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] sm:text-5xl text-4xl font-bold">Klued products do's and don'ts</h1>
                </div>

                <div className="h-full w-full grid sm:container sm:mx-auto sm:grid-cols-2">
                    <div className="sm:rounded-tl-[100px] border-b-2 sm:border-b-0 container mx-auto grid bg-white sm:border-r-2 border-blue-300">
                        <div className="grid gap-2 p-6">
                            <h1 className="capitalize font-bold text-gray-700 text-3xl text-center">Do's</h1>
                            <div className="grid grid-cols-5 gap-4 py-2">
                                <div className="flex justify-center">
                                    <PiNumberCircleOneFill className="col-span-1 text-blue-400 h-[45px] w-[45px]"/>
                                </div>
                                <div className="col-span-4">
                                    <h1 className="capitalize font-bold text-gray-600 text-base my-1">Apply Moisturizer and Sunscreen</h1>
                                    <div className="grid grid-cols-4 items-center">
                                        <p className="col-span-3 tinyText inline-block">Using Salicylic Acid Gentle Cleanser can be drying so it’s important to always wear moisturizer and sunscreen after use.</p>
                                        <BsMoisture className="col-span-1 text-5xl m-3 text-yellow-300 h-[45px] w-[45px]"/>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-5 gap-4 py-2">
                                <div className="flex justify-center">
                                    <PiNumberCircleTwoFill className="text-blue-400 h-[50px] w-[100px]"/>
                                </div>
                                <div className="col-span-4">
                                    <h1 className="capitalize font-bold text-gray-600 text-base my-1">Start Low and Slow</h1>
                                    <p className="tinyText">Trying a new product can be exciting but we should always be careful and go slow. Start by using it for 2-3 times a week to see how your skin would react.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-5 gap-4 py-2">
                                <div className="flex justify-center">
                                    <PiNumberCircleThreeFill className="text-blue-400 h-[50px] w-[100px]"/>
                                </div>
                                <div className="col-span-4">
                                    <h1 className="capitalize font-bold text-gray-600 text-base my-1">Lessen the use when purging</h1>
                                    <div className="grid grid-cols-4 items-center">
                                        <p className="col-span-3 tinyText inline-block">It is normal to experience purging when using Salicylic Acid, but most people doesn’t know what to do once it starts. By decreasing the use of the product, it helps your skin feel more comfortable and lessen the irritation your skin may feel when purging.</p>
                                        <FaArrowTrendDown className="col-span-1 text-2xl m-3 text-yellow-300 h-[45px] w-[45px]"/>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-5 gap-4 py-2">
                                <div className="flex justify-center">
                                    <PiNumberCircleFourFill className="text-blue-400 h-[50px] w-[100px]"/>
                                </div>
                                <div className="col-span-4">
                                    <h1 className="capitalize font-bold text-gray-600 text-base my-1">Know when to consult a doctor</h1>
                                    <p className="tinyText">Each person may have different reactions when using a product, which is why it’s important to determine what product is most suitable for yourself. If you experience continues breakouts, it’s better to stop and immediately consult a doctor.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-5 gap-4 py-2">
                                <div className="flex justify-center">
                                    <PiNumberCircleFiveFill className="text-blue-400 h-[50px] w-[100px]"/>
                                </div>
                                <div className="col-span-4">
                                    <h1 className="capitalize font-bold text-gray-600 text-base my-1">Be patient</h1>
                                    <div className="grid grid-cols-4 items-center">
                                        <p className="col-span-3 tinyText inline-block">Salicylic is not a magic cure for acne and oily skin. It takes time for it to work, and you might not even see the results right away. It takes weeks to months to see an improvement in your skin. Be patient and consistent with the use of the product, and don’t expect overnight results.</p>
                                        <FiWatch className="col-span-1 text-3xl m-3 text-yellow-300 h-[45px] w-[45px]"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>

                    <div className="sm:rounded-br-[100px] border-t-2 sm:border-t-0 container mx-auto grid bg-white sm:border-l-2 border-blue-300">
                        <div className="grid gap-2 p-6">
                            <h1 className="capitalize font-bold text-gray-700 text-3xl text-center">Don't</h1>
                            <div className="grid grid-cols-5 gap-4 py-2">
                                <div className="flex justify-center">
                                    <PiNumberCircleOneFill className="col-span-1 text-blue-400 h-[45px] w-[45px]"/>
                                </div>
                                <div className="col-span-4">
                                    <h1 className="capitalize font-bold text-gray-600 text-base my-1">Do not overdo it</h1>
                                    <div className="grid grid-cols-4 items-center">
                                        <p className="col-span-3 tinyText inline-block">It is easy to go overboard, especially if you are expecting immediate results. Salicylic Acid contains exfoliating properties so overdoing it can be stripping and might compromise your skin barrier.</p>
                                        <TbDropletOff className="col-span-1 text-3xl m-3 text-yellow-300 h-[45px] w-[45px]"/>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-5 gap-4 py-2">
                                <div className="flex justify-center">
                                    <PiNumberCircleTwoFill className="text-blue-400 h-[50px] w-[100px]"/>
                                </div>
                                <div className="col-span-4">
                                    <h1 className="capitalize font-bold text-gray-600 text-base my-1">Do not refrigerate</h1>
                                    <p className="tinyText">Storing Salicylic Acid in the refrigerator can crystallize it. Once it crystallizes, stop using it and quickly throw it away.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-5 gap-4 py-2">
                                <div className="flex justify-center">
                                    <PiNumberCircleThreeFill className="text-blue-400 h-[50px] w-[100px]"/>
                                </div>
                                <div className="col-span-4">
                                    <h1 className="capitalize font-bold text-gray-600 text-base my-1">do not get in your eyes, nose, and mouth</h1>
                                    <div className="grid grid-cols-4 items-center">
                                        <p className="col-span-3 tinyText inline-block">To avoid irritation, rinse it off with water right away if it does get on these areas.</p>
                                        <FaRegEyeSlash className="col-span-1 text-3xl m-3 text-yellow-300 h-[45px] w-[45px]"/>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
//text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)]