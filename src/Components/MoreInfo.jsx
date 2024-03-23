import React from 'react';
import img1 from '../assets/Oat.jpg';
import img2 from '../assets/Pouch.png';

export default function MoreInfo({packageData}) {
    return (
        <div className='w-full bg-gray-100 sm:py-20 py-12'>
            <div className='container mx-auto grid max-w-6xl sm:grid-cols-2 gap-6 items-center'>
                <div className='sm:px-8 px-4 text-gray-900 whitespace-pre-wrap break-normal text-justify'>
                    {packageData.moredesc}
                    <br/>
                    <br/>
                    This skincare set includes a FREE Klued – Double Oat Moisturizer a lightweight moisturizer to help repair your skin barrier and an exclusive Klued pouch for easier carry so that you can maintain a healthy skin where ever you go.
                </div>
                
                <div className='px-16 grid sm:grid-cols-2 gap-8 justify-center'>
                    <div className='max-h-[250px] max-w-[250px] rounded-full overflow-hidden relative'>
                        <div className="absolute left-0 top-0 h-16 w-16">
                            <label className="absolute Text transform z-10 -rotate-45 bg-blue-500 text-center text-black text-2xl font-bold py-1 left-[-50px] top-[48px] w-[250px]">
                                Free!
                            </label>
                        </div>
                        <img height={'300px'} width={'300px'} title='Klued Double Oat Moisturizer' alt='Klued Double Oat Moisturizer' loading='eager' className='h-full w-full object-cover' src={img1}/>
                    </div>
                    <div className='max-h-[250px] max-w-[250px] rounded-full overflow-hidden relative'>
                        <div className="absolute left-0 top-0 h-16 w-16">
                            <label className="absolute Text transform z-10 -rotate-45 bg-blue-500 text-center text-black text-2xl font-bold py-1 left-[-50px] top-[48px] w-[250px]">
                                Free!
                            </label>
                        </div>
                        <img height={'300px'} width={'300px'} title='Klued Pouch' alt='Klued pouch' loading='eager' className='h-full w-full object-cover' src={img2}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
