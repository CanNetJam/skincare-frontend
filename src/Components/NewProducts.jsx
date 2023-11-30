import React from "react"
import { Link } from 'react-router-dom';
import image1 from '../assets/15.jpg';
import image2 from '../assets/17.jpg';

export default function NewProducts() {
    return (
        <>
            <div className="min-h-screen h-auto w-full sm:pt-0 pt-16 md:grid-cols-3 md:grid flex flex-col-reverse">
                <div className="flex sm:p-12 p-2 w-full bg-blue-300 items-center">
                    <div className="sm:p-0 p-8">
                        <h1 className="font-bold lg:text-7xl md:text-5xl text-4xl">2 New Products Available</h1>
                        <p className="text-lg mt-6">Limited stocks only!</p>
                        <Link to="/products" className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray-800 border border-gray-800 rounded hover:shadow hover:bg-gray-900 focus:outline-none focus:ring">Order Now</Link>
                    </div>
                </div>
                <div className="h-full w-full max-h-screen relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-16 w-16">
                        <div
                        className="absolute transform -rotate-45 bg-gray-900 text-center text-white text-lg font-semibold py-1 left-[-40px] top-[32px] w-[180px]">
                        New
                        </div>
                    </div>
                    <img className='h-full w-full object-cover object-center' src={image1}></img>
                </div>
                <div className="h-full w-full max-h-screen relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-16 w-16">
                        <div
                        className="absolute transform -rotate-45 bg-gray-900 text-center text-white text-lg font-semibold py-1 left-[-40px] top-[32px] w-[180px]">
                        New
                        </div>
                    </div>
                    <img className='h-full w-full object-cover object-center' src={image2}></img>
                </div>
            </div>
        </>
    )
}