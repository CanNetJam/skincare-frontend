import React from 'react';
import img2 from '../assets/Compressed-Webp/After.webp';
import img3 from '../assets/Compressed-Webp/BGText2.webp';
import img4 from '../assets/Compressed-Webp/BGPaper.png';
import img5 from '../assets/Compressed-Webp/Savings.webp';
import img6 from '../assets/Compressed-Webp/Safe.webp';
import img7 from '../assets/Compressed-Webp/EffectiveLogo.webp';
import img8 from '../assets/Compressed-Webp/LowLogo.webp';
import img9 from '../assets/Compressed-Webp/SafetyLogo.webp';

export default function BrandOffers() {
    return (
        <div className='h-auto w-full grid sm:gap-6'>
            <div className='sm:h-screen h-auto max-w-6xl w-full container mx-auto grid sm:gap-6 gap-2 sm:grid-cols-2 px-4'>
                <div className="h-full flex sm:p-12 py-8 sm:px-0 w-full items-center">
                    <div className="h-full w-full flex justify-center items-center">
                        <div className='w-full max-w-md'>
                            <h2 className="font-bold lg:text-5xl text-3xl text-slate-800 sm:justify-start justify-center gap-2 flex">Highly Effective
                                <span className='sm:h-12 sm:w-12 h-8 w-8'>
                                    <img height={'48px'} width={'48px'} loading='lazy' title='Sparkles' alt='Sparkles' className='h-full w-full object-contain object-center' src={img7}/>
                                </span>
                            </h2>
                            <p className="sm:text-xl text-base text-gray-700 mt-4 text-justify">
                                We offer a wide variety of products that will satisfy every skin care needs. We had sold over a hundred thousand products over our online shops on Lazada, Shopee and TikTok ranging from cleansers, toners, serums, and even moisturizers, all were tested and proven by our customers to do what they claim as advertised. 
                            </p>
                        </div>
                    </div>
                </div>
                <div style={{'--image-url': `url(${img3})`}} className='bg-[image:var(--image-url)] bg-center bg-no-repeat bg-contain h-full min-h-[350px] w-full flex justify-center items-center'>
                    <div className='sm:h-[300px] sm:w-[300px] h-[150px] w-[225px] rounded-lg overflow-hidden shadow-xl shadow-slate-400'>
                        <img height={'300px'} width={'300px'} loading='lazy' title='Klued products effectiveness' alt='Male with smooth and clean skin' className='h-full w-full object-cover object-center' src={img2}/>
                    </div>
                </div>
            </div>

            <div style={{'--image-url': `url(${img4})`}} className='bg-[image:var(--image-url)] bg-no-repeat bg-cover sm:min-h-[120vh] h-auto w-full grid justify-center items-center py-20 px-4'>
                <div className='h-full w-full container mx-auto sm:grid flex flex-col-reverse max-w-6xl sm:gap-6 gap-2 sm:grid-cols-2'>
                    <div className='h-full w-full flex justify-center items-center'>
                        <div className='sm:h-[450px] sm:w-[450px] h-[250px] w-full rounded-lg overflow-hidden'>
                            <img height={'450px'} width={'450px'} loading='lazy' title='Klued products low cost' alt='Graphic art with a male having a lot of savings' className='h-full w-full object-contain object-center' src={img5}/>
                        </div>
                    </div>

                    <div className="h-full w-full grid justify-center items-center">
                        <div className='w-full max-w-md'>
                            <h2 className="font-bold lg:text-5xl text-3xl text-slate-800 sm:justify-start flex gap-2 justify-center">Low Cost
                                <span className='sm:h-12 sm:w-12 h-8 w-8'>
                                    <img height={'48px'} width={'48px'} loading='lazy' title='Coin with arrow sign pointing downwards' alt='Coin with arrow sign pointing downwards' className='h-full w-full object-contain object-center' src={img8}/>
                                </span>
                            </h2>
                            <p className="sm:text-xl text-base text-gray-700 mt-4 text-justify">
                                We knew that the cost of skin care builds up over time, that is why our prices are much more budget friendly compared to the competitors because we value customer retention rather than one time purchases. Check out on our own shop now to enjoy exclusive discounts.
                            </p>
                        </div>
                    </div>
                </div>
            </div> 

            <div className='sm:h-screen h-auto max-w-6xl container mx-auto grid sm:gap-6 gap-2 sm:grid-cols-2 w-full px-4 sm:mb-2 mb-8'>
                <div className="h-full flex sm:p-12 py-8 sm:px-0 w-full items-center">
                    <div className="h-full w-full flex justify-center items-center">
                        <div className='w-full max-w-md'>
                            <h2 className="font-bold lg:text-5xl text-3xl text-slate-800 flex sm:justify-start justify-center gap-2">Safe
                                <span className='sm:h-12 sm:w-12 h-8 w-8'>
                                    <img height={'48px'} width={'48px'} loading='lazy' title='Shield with a plus sign on the middle' alt='Shield with a plus sign on the middle' className='h-full w-full object-contain object-center' src={img9}/>
                                </span>
                            </h2>
                            <p className="sm:text-lg text-base text-gray-700 mt-4 text-justify">
                                No need to worry about your skin's health when using our products. We are FDA approved therefore you can expect the highest safety standards. Our products are also Cruelty-Free, Fragrance-Free, and Paraben-Free.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='h-full w-full flex justify-center items-center'>
                    <div className='sm:h-[450px] sm:w-[450px] h-[250px] w-full rounded-lg overflow-hidden'>
                        <img height={'450px'} width={'450px'} loading='lazy' title='Klued products safety' alt='Graphic art containing hands with a heart sign' className='h-full w-full object-contain object-center' src={img6}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
