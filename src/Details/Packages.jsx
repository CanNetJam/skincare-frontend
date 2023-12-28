import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Packages() {
    const ref = useRef(null);
    const [ packages, setPackages ] = useState([])

    useEffect(()=> {
        const getPackage = async () => {
            try {
                const packageList = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://kluedskincare-backend.onrender.com'}/package/get-all-packages`)
                setPackages(packageList.data)
            } catch (err) {
                console.log(err)
            }
        }
        getPackage()
    }, [])

    return (
        <>
            <div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-8">
                        <h2 className="text-2xl font-bold text-gray-900">Package Sets</h2>
                        <div>
                            {packages[0]!==undefined ? 
                                <div ref={ref} className="mt-6 w-auto sm:grid sm:grid-cols-5 gap-x-6 gap-y-16 space-y-0">
                                    {packages.map((pack)=> {
                                        return (
                                            <Link key={pack._id} to={`/details/package/${pack._id}`} state={{packageid: pack._id}} className="group flex-shrink-0 relative">
                                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-56">
                                                    <img src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${pack.displayimage}.jpg`} className="h-full w-full object-cover object-center"/>
                                                </div>
                                                <p className="mt-6 text-base font-semibold text-gray-900">{pack.name}</p>
                                            </Link>
                                        )
                                    })}
                                </div>
                            :<span>No package sets available</span>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

/*
                                    <div className='hidden group-hover/item:block group-hover:bg-gray-100 group-hover:backdrop-blur-sm group-hover:bg-opacity-20 absolute inset-0 py-10 px-4'>
                                        <button className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-black focus:outline-none">Learn More</button>
                                        <button className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-black focus:outline-none">Add to Cart</button>
                                    </div>*/