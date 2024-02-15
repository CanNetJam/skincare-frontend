import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/Jelly cropped.png'
import img2 from '../assets/Multi Brightening cropped.png'
import img3 from '../assets/Multi Hayaluronic cropped.png'

export default function Landing() {
    return (
        <>
            <div className='h-auto min-h-screen w-full bg-blue-400 overflow-hidden'>
                <div className='container relative mx-auto min-h-screen h-full w-full max-w-5xl grid sm:grid-cols-2 items-center'>
                    <div className="col-span-1 h-full grid sm:p-12 py-8 sm:px-0 px-4 w-full items-center">
                        <div>
                            <h1 className="font-bold sm:text-6xl text-3xl sm:text-left text-center">Klued - Barrier Support Hydrating Jelly Cleanser</h1>
                            <p className="text-xl sm:my-6 my-2 text-white sm:text-left text-center">A lightly foaming, jelly-bouncy hydrating cleanser infused with the powerful trio of Ceramides, Niacinamide and Hyaluronic Acid.</p>
                            <div className="grid justify-center sm:justify-start sm:flex my-2">
                                <Link to="/product-details" className="relative text-center text-sm font-semibold py-3 w-auto sm:px-12 px-1 rounded-md before:bg-yellow-200 before:-z-10 bg-slate-900 z-0 text-slate-50 transition-colors before:absolute before:left-0 before:top-0 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:duration-300 hover:text-black before:hover:scale-x-100 overflow-hidden">Check it out!</Link>
                            </div>
                        </div>
                    </div>
                    <div className='absolute top-1/2 -translate-y-1/2 -right-[100px] h-[950px] w-[550px]'>
                        <img className='h-full w-full object-center object-contain' src={img1}></img>
                    </div>
                </div>
            </div>

            <div className='h-auto min-h-screen w-full bg-slate-800 overflow-hidden'>
                <div className='container relative mx-auto h-auto min-h-screen w-full max-w-5xl grid sm:grid-cols-2 items-center'>
                    <div className='absolute top-1/2 -translate-y-1/2 -left-[100px] h-[950px] w-[550px]'>
                        <img className='h-full w-full object-center object-contain' src={img2}></img>
                    </div>
                    <div></div>
                    <div className="col-span-1 h-full grid sm:p-12 py-8 sm:px-0 px-4 w-full items-center">
                        <div>
                            <h1 className="font-bold sm:text-6xl text-3xl sm:text-right text-center text-white">Klued - Multi-Brightening Complex Serum</h1>
                            <p className="text-xl sm:my-6 my-2 text-gray-400 sm:text-right text-center">A lightly foaming, jelly-bouncy hydrating cleanser infused with the powerful trio of Ceramides, Niacinamide and Hyaluronic Acid.</p>
                            <div className="grid justify-center sm:justify-end sm:flex my-2">
                                <Link to="/product-details" className="relative text-center text-sm font-semibold py-3 w-auto sm:px-12 px-1 rounded-md before:bg-yellow-200 before:-z-10 bg-slate-900 z-0 text-slate-50 transition-colors before:absolute before:left-0 before:top-0 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:duration-300 hover:text-black before:hover:scale-x-100 overflow-hidden">Check it out!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
