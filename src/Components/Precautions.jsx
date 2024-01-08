import React from 'react';
import boxes from '../assets/boxes.png';
import boy from '../assets/boy.png';
import brightness from '../assets/brightness.png';
import irritation from '../assets/irritation.png';
import pregnant from '../assets/pregnant.png';

export default function Precautions2() {
    return (
        <div className='min-h-screen container mx-auto grid gri sm:grid-cols-3 gap-10 h-auto w-full sm:px-20 sm:py-10 px-4 py-8'>
            <div className='col-span-1 grid gap-10 mt-6'>
                <div className='sm:h-[40vh] h-auto w-full grid items-center'>
                    <div>
                        <h2 className='font-bold text-blue-400 subHeading sm:mb-4'>General Precautions</h2>
                        <label>Please keep these things in mind when using our products...</label>
                    </div>
                </div>
                <div className='sm:h-[40vh] h-[30vh] px-10 py-5 rounded-md bg-white w-full grid sm:grid sm:grid-rows-2 justify-center overflow-hidden shadow-gray-400 shadow-xl'>
                    <div className='sm:row-span-1 overflow-hidden'>
                        <img className='object-contain h-full w-full' src={boxes}/>
                    </div>
                    <div className='sm:row-span-1 h-full w-full'>
                        <p className='text-gray-900 text-center normalText font-semibold capitalize mb-2'>proper storage</p>
                        <p className='text-center'>Place in it a cool and dark place away from sunlight.</p>
                    </div>
                </div>
            </div>

            <div className='col-span-1 grid gap-10 mb-6'>
                <div className='sm:h-[40vh] h-[30vh]  px-10 py-5 rounded-md bg-white w-full grid sm:grid sm:grid-rows-2 justify-center overflow-hidden shadow-gray-400 shadow-xl'>
                    <div className='sm:row-span-1 overflow-hidden'>
                        <img className='object-contain h-full w-full' src={irritation}/>
                    </div>
                    <div className='sm:row-span-1 h-full w-full'>
                        <p className='text-gray-900  text-center normalText font-semibold capitalize mb-2'>patch testing</p>
                        <p className='text-center'> Apply a small amount on your inner arm. Wait at least 24 hours to see for reactions.</p>
                    </div>
                </div>
                <div className='sm:h-[40vh] h-[30vh]  px-10 py-5 rounded-md bg-white w-full grid sm:grid sm:grid-rows-2 justify-center overflow-hidden shadow-gray-400  shadow-xl'>
                    <div className='sm:row-span-1 overflow-hidden'>
                        <img className='object-contain h-full w-full' src={pregnant}/>
                    </div>
                    <div className='sm:row-span-1 h-full w-full'>
                        <p className='text-gray-900  text-center normalText font-semibold capitalize mb-2'>pregnant/ breast-feeding</p>
                        <p className='text-center text-sm'>We do not recommend this product if you're pregnant or breastfeeding, consult your doctor before use.</p>
                    </div>
                </div>
            </div>

            <div className='col-span-1 grid gap-10 mt-6'>
                <div className='sm:h-[40vh] h-[30vh] px-10 py-5 rounded-md col-span-1 bg-white w-full grid sm:grid sm:grid-rows-2 justify-center overflow-hidden shadow-gray-400 shadow-xl'>
                    <div className='sm:row-span-1 overflow-hidden'>
                        <img className='object-contain h-full w-full' src={boy}/>
                    </div>
                    <div className='sm:row-span-1 h-full w-full'>
                        <p className='text-gray-900 text-center normalText font-semibold capitalize mb-2'>children under age of 12</p>
                        <p className='text-center'>This product is only recommended for people aged 13 and above.</p>
                    </div>
                </div>
                <div className='sm:h-[40vh] h-[30vh]  px-10 py-5 rounded-md col-span-1 bg-white w-full grid sm:grid sm:grid-rows-2 justify-center overflow-hidden shadow-gray-400 shadow-xl'>
                    <div className='sm:row-span-1 overflow-hidden'>
                        <img className='object-contain h-full w-full' src={brightness}/>
                    </div>
                    <div className='sm:row-span-1 h-full w-full'>
                        <p className='text-gray-900  text-center normalText font-semibold capitalize mb-2'>external use only</p>
                        <p className='text-white'>This product is only recommended for people aged 13 and above.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}