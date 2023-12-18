import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaCheck } from "react-icons/fa";

export default function SliderComp() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    }

    return (
        <div className="sm:flex grid">
                                    <div className="w-full bg-yellow-300 text-black block px-10 pb-8">
                                        <div className="flex justify-center p-6">
                                            <h3 className="font-bold text-2xl">Morning Routine</h3>
                                        </div>
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
            </div>
                                </div>
        </div>
    )
}
