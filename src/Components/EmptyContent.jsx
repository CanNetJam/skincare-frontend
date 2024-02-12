import React from 'react';
import img1 from '../assets/Compressed-Webp/Alone.svg'

export default function EmptyContent() {
    return (
        <div className='min-h-[40vh] w-full flex justify-center items-center text-gray-500 border rounded-b-md shadow-md'>
            <div className='max-w-[250px] flex items-center px-6 rounded-full'>
                <label className='font-semibold text-lg'>Seems like this  page is empty.</label>
                <div className='h-28 w-28'>
                    <img className='h-full w-full object-contain' src={img1}></img>
                </div>
            </div>
        </div>
    )
}
