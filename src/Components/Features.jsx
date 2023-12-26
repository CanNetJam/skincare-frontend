import React from 'react';
import { Link } from 'react-router-dom';

export default function Features({packageData, packageItems}) {
    //console.log(packageItems)
    return (
        <div className="bg-white py-12">
            <div className="mx-auto max-w-8xl px-4 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-400">Maximum value</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{packageData.name} Includes</p>
                    <p className="mt-6 smallText leading-8 text-gray-600">Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
                </div>
                <div className="mx-auto sm:mt-16 mt-8 max-w-2xl lg:max-w-6xl">
                    {packageItems[0]!==undefined ? 
                        <>
                            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 lg:max-w-none lg:grid-cols-2 lg:gap-y-8">
                                {packageItems.map((item)=> {
                                    return (
                                        <div className="relative bg-blue-100 rounded-xl sm:px-12 p-4 shadow-2xl" key={item._id}>
                                            <div className="text-base grid grid-cols-3 font-semibold leading-7 text-gray-900">
                                                <div className="col-span-2 flex sm:h-[180px] sm:w-[260px] h-[150px] w-[175px] overflow-hidden items-center justify-center rounded-lg bg-indigo-600">
                                                    <img className='h-full w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${item.displayimage}.jpg`}/>
                                                </div>
                                                <div className='col-span-1 grid'>
                                                    <div className='flex items-center justify-center'>
                                                        <label className='smallText text-center font-semibold'>{item.name}</label>
                                                    </div>
                                                    <div className='grid items-center'>
                                                        <Link to={`/details/product/${item._id}`} state={{productid: item._id}} className="relative text-center py-2 h-10 w-full sm:h-10 sm:px-3 font-bold text-[16px] rounded-full before:bg-yellow-200 before:-z-10 bg-blue-400 z-0 text-slate-100 transition-colors before:absolute before:left-0 before:top-0 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:duration-300 hover:text-black before:hover:scale-x-100 overflow-hidden">Learn More</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <dd className="mt-2 text-justify leading-7 text-gray-800 line-clamp-4 whitespace-pre-wrap break-normal">{item.maindesc}</dd>
                                            </div>   
                                            <br/> 
                                            <div>
                                                <label className='font-bold '>How to Use?</label>
                                                <div className='mt-2 text-justify leading-7 text-gray-800 line-clamp-3'>
                                                    {item.usage}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    :null}
                </div>
            </div>
        </div>

    )
}
