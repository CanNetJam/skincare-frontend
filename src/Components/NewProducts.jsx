import React from "react"
import { Link } from 'react-router-dom';
import image1 from '../assets/Jelly1.jpg';
import image2 from '../assets/18.jpg';
import image3 from '../assets/20.jpg';

export default function NewProducts() {

    return (
        <div className="min-h-screen h-full sm:mt-16 mt-8 bg-blue-300 sm:px-10 px-4">
            <div className="container mx-auto min-h-screen h-full w-full sm:pt-0 pt-16 md:grid-cols-2 md:grid items-center grid">
                <div className="h-full flex sm:p-12 py-8 w-full items-center">
                    <div className="">
                        <h1 className="font-bold lg:text-7xl md:text-5xl text-5xl sm:text-left text-center">3 New Products Available</h1>
                        <p className="sm:text-3xl text-lg sm:mt-6 mt-2 text-white font-semibold sm:text-left text-center">Prepare to be transformed!</p>
                        <div className="grid justify-center sm:justify-start sm:flex">
                            <Link to="/product-details" className="h-auto px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray-800 border border-gray-800 rounded hover:shadow hover:bg-gray-900 focus:outline-none focus:ring">Learn More</Link>
                        </div>
                    </div>
                </div>

                <div className='h-[55vh] w-full relative sm:my-20 my-40'>
                    <div style={{backgroundImage: `url(${image1})`}} className='overflow-hidden rounded-lg shadow-lg shadow-gray-400 bg-cover bg-center h-3/5 w-1/2 absolute -top-10 -translate-y-1/3 left-0 translate-x-1/4 z-20'></div>
                    <div style={{backgroundImage: `url(${image3})`}} className='overflow-hidden rounded-lg shadow-lg shadow-gray-400 bg-cover bg-center h-3/5 w-1/2 absolute top-1/2 -translate-y-1/2 right-0 -translate-x-1/4 z-10'></div>
                    <div style={{backgroundImage: `url(${image2})`}} className='overflow-hidden rounded-lg shadow-lg shadow-gray-400 bg-cover bg-center h-3/5 w-1/2 absolute -bottom-10 translate-y-1/3 left-0 translate-x-1/4 z-0'></div>

                    <div className='overflow-hidden rounded-lg h-1/2 w-1/3 absolute top-0 -translate-y-2/3 right-0 z-0'>
                      <div className='h-full w-full flex items-center'>
                        <p className='italic text-base font-semibold'>Maintaining a resilient and radiant complexion.</p>
                      </div>
                    </div>
                    <div className='overflow-hidden rounded-lg h-1/2 w-1/3 absolute top-1/2 -translate-y-1/2 left-0 z-0'>
                      <div className='h-full w-full flex items-center'>
                        <p className='italic text-base text-right font-semibold'>Target hyperpigmentation, uneven skin tone, and stubborn dark spots.</p>
                      </div>
                    </div>
                    <div className='overflow-hidden rounded-lg h-1/2 w-1/3 absolute bottom-0 translate-y-2/3 right-0 z-0'>
                      <div className='h-full w-full flex items-center'>
                        <p className='italic text-base font-semibold'>Deeply hydrates, plumps, and diminishes fine lines, ensuring healthy and vibrant skin.</p>
                      </div>
                    </div>
                </div>                
            </div>
        </div>
    )
}

/*
<div className="h-full bg-gray-700 w-full max-h-screen relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-16 w-16">
                        <div
                        className="absolute transform -rotate-45 bg-gray-900 text-center text-white text-lg font-semibold py-1 left-[-40px] top-[32px] w-[180px]">
                        New
                        </div>
                    </div>
                    <img className='h-full w-full object-cover object-center' src={image1}></img>
                </div>
                <div className="h-full bg-gray-700 w-full max-h-screen relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-16 w-16">
                        <div
                        className="absolute transform -rotate-45 bg-gray-900 text-center text-white text-lg font-semibold py-1 left-[-40px] top-[32px] w-[180px]">
                        New
                        </div>
                    </div>
                    <img className='h-full w-full object-cover object-center' src={image2}></img>
                </div>
                <div className="h-full bg-gray-700 w-full max-h-screen relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-16 w-16">
                        <div
                        className="absolute transform -rotate-45 bg-gray-900 text-center text-white text-lg font-semibold py-1 left-[-40px] top-[32px] w-[180px]">
                        New
                        </div>
                    </div>
                    <img className='h-full w-full object-cover object-center' src={image3}></img>
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
                
                */