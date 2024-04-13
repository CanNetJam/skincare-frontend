import React from 'react';
import img1 from '../assets/Compressed-Webp/BGHome.webp';
import img3 from '../assets/Compressed-Webp/Hero-Cover-2.webp';
import { Link } from 'react-router-dom';

export default function HomeHero() {
    return (
        <div style={{'--image-url': `url(${img1})`}} className='sm:min-h-screen h-auto w-full bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat relative'>
            <div className='container mx-auto h-auto w-full max-w-6xl grid justify-center mt-16'>
                <div className='w-full grid justify-center pt-8 px-8'>
                    <h1 className='font-bold lg:text-7xl text-5xl text-center'>SAVE UP TO 43% OFF!!!</h1>
                    <p className='w-full text-center font-semibold sm:text-2xl text-lg text-white'>Get your hands to the newest Klued products directly from the origin.</p>
                    <div className='grid justify-center mt-4'>
                        <Link to="/products" className="relative text-center text-lg font-semibold py-3 w-auto max-w-[200px] sm:px-12 px-10 rounded-md before:bg-yellow-200 before:-z-10 bg-slate-900 z-0 text-slate-50 transition-colors before:absolute before:left-0 before:top-0 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:duration-300 hover:text-black before:hover:scale-x-100 overflow-hidden">Shop Now</Link>
                    </div>
                </div>
                <div className='sm:h-[400px] h-[300px] w-full flex justify-center items-center'>
                    <img height={'400px'} width={'600px'} loading='eager' title='Klued products' alt='Klued products' className='h-full w-full object-contain mx-auto' src={img3}/>
                </div>
            </div>
            <div className='h-14 w-full bg-slate-900 flex justify-center items-center py-4 absolute bottom-0'>
                <p className='w-full text-center font-semibold sm:text-2xl text-xs text-blue-400'>Register an account to instantly recieve a free 15% off voucher</p>
            </div>
        </div>
    )
}
