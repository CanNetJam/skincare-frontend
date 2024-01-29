import React from 'react';
import img1 from '../assets/fda.jpg';
import img2 from '../assets/cruelty.jpg';
import img3 from '../assets/fragrance.png';
import img4 from '../assets/paraben.jpg';
import img5 from '../assets/sulfate.jpg';

export default function Approvals() {
    const logos = [
        { src: img1, alt: 'FDA Approved' },
        { src: img2, alt: 'Animal Cruelty Free' },
        { src: img3, alt: 'Fragrance Free' },
        { src: img4, alt: 'Paraben Free' },
        { src: img5, alt: 'Sulfate Free' }
    ]
      
    return (
        <>
            <div className="bg-white py-6 sm:py-12">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                        Our products are guaranteed to be safe and environment friendly
                    </h2>

                    <div className="w-full mt-10 inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                        <ul className="flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll">
                            {logos.map((logo, index) => (
                            <li className='sm:h-[120px] sm:w-[140px] h-[70px] w-[80px] p-2' key={index}>
                                <img className="h-full w-full object-fill" src={logo.src} alt={logo.alt} />
                            </li>
                            ))}
                        </ul>
                        <ul className="flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                            {logos.map((logo, index) => (
                            <li className='sm:h-[120px] sm:w-[140px] h-[70px] w-[80px] p-2' key={index}>
                                <img className="h-full w-full object-fill" src={logo.src} alt={logo.alt} />
                            </li>
                            ))}
                        </ul>
                        </div>
                </div>
            </div>
        </>
    )
}