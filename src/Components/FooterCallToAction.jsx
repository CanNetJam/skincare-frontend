import React from 'react';
import img1 from '../assets/Compressed-Webp/Cover.webp';
import { Link } from 'react-router-dom';

export default function FooterCallToAction() {
    return (
        <div style={{'--image-url': `url(${img1})`}} className='bg-[image:var(--image-url)] bg-no-repeat bg-cover h-[50vh] w-full mt-10'>
            <div className='h-full w-full container mx-auto relative max-w-6xl'>
                <div className='absolute top-1/2 -translate-y-1/2 sm:left-0 sm:-translate-x-0 left-1/2 -translate-x-1/2 h-auto max-w-md sm:px-0 px-4'>
                    <h2 className='font-semibold sm:text-3xl text-2xl text-center'>Begin your skin care journey with us.</h2>
                    <p className='text-gray-200 font-medium sm:text-xl text-base text-center'>Become the best version of yourself.</p>
                    <div className='w-full py-6 flex justify-center items-center'>
                        <Link to="/register" className="w-min text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg sm:text-base text-sm font-bold px-10 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-md">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
