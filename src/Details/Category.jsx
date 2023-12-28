import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Packages from './Packages';

export default function Category() {
    const [ cleanseList, setCleanseList ] = useState([])
    const [ tonerList, setTonerList ] = useState([])
    const [ serumList, setSerumList ] = useState([])
    const [ moistList, setMoistList ] = useState([])
    const [ screenList, setScreenList ] = useState([])

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])

    useEffect(()=> {
        const getProducts = async () => {
            try {
                const products = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/product/get-all-products`)
                const cleanse = products?.data?.filter((item) => item.category === "Cleanser")
                setCleanseList(cleanse)
                const toner = products?.data?.filter((item) => item.category === "Toner")
                setTonerList(toner)
                const serum = products?.data?.filter((item) => item.category === "Serum")
                setSerumList(serum)
                const moist = products?.data?.filter((item) => item.category === "Moisturizer")
                setMoistList(moist)
                const screen = products?.data?.filter((item) => item.category === "Sunscreen")
                setScreenList(screen)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [])

    return (
        <div>
            <Packages/>
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Cleanser</h2>
        
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-5 xl:gap-x-8">
                    {cleanseList.map((product) => (
                        <Link to={`/details/product/${product._id}`} state={{productid: product._id}} key={product._id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                            <img
                                src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${product.displayimage}.jpg`}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                            </div>
                            <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                <div>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {product.name}
                                </div>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.maindesc}</p>
                            </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Toner</h2>
        
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-5 xl:gap-x-8">
                    {tonerList.map((product) => (
                        <Link to={`/details/product/${product._id}`} state={{productid: product._id}} key={product._id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                            <img
                                src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${product.displayimage}.jpg`}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                            </div>
                            <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                <div>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {product.name}
                                </div>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.maindesc}</p>
                            </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Serum</h2>
        
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-5 xl:gap-x-8">
                    {serumList.map((product) => (
                        <Link to={`/details/product/${product._id}`} state={{productid: product._id}} key={product._id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                <img
                                    src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${product.displayimage}.jpg`}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <div>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </div>
                                        </h3>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.maindesc}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Moisturizer</h2>
        
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-5 xl:gap-x-8">
                    {moistList.map((product) => (
                        <Link to={`/details/product/${product._id}`} state={{productid: product._id}} key={product._id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                            <img
                                src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${product.displayimage}.jpg`}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                            </div>
                            <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                <div>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {product.name}
                                </div>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.maindesc}</p>
                            </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Sunscreen</h2>
        
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-5 xl:gap-x-8">
                    {screenList.map((product) => (
                        <Link to={`/details/product/${product._id}`} state={{productid: product._id}} key={product._id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                            <img
                                src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${product.displayimage}.jpg`}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                            </div>
                            <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                <div>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {product.name}
                                </div>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.maindesc}</p>
                            </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

/*
        <>
            <div className="h-[50vh] w-full overflow-hidden sm:flex sm:flex-rows-3 sm:flex-row-reverse grid grid-rows-3 rounded-xl bg-cover bg-no-repeat bg-center bg-[url('https://images.pexels.com/photos/3762877/pexels-photo-3762877.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1')]">
                <div className="h-full max-w-screen w-full sm:w-2/3 row-span-2">
                    <div className="w-full sm:w-2/3 row-span-2 relative">
                        <div className="sm:h-[50vh] h-[35vh] sm:w-[1000px] w-full absolute items-center inset-0">  
                            {brightItems===true ? 
                                <>
                                {brightList[0]!==undefined ? 
                                    <div className="sm:p-8 px-4 py-8 h-full w-full flex gap-2 overflow-x-auto">
                                        {brightList.map((a, index)=> {
                                            return (
                                                <Link to={`/details/product/${a._id}`} state={{productid: a._id}}
                                                    key={index} className="hover:bg-gray-700 flex-shrink-0 h-full sm:w-[200px] w-[150px] bg-gray-800 rounded-md overflow-hidden p-2 cursor-pointer">
                                                    <img className="h-3/4 w-full" src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${a.displayimage}.jpg`}></img>
                                                    <label className="text-sm text-white sm:line-clamp-none line-clamp-1">{a.name}</label>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                : null}
                                </>
                            :null}

                        </div>
                    </div>
                </div>
                <div className="sm:w-1/3 max-w-screen row-span-1 text-white sm:px-4 px-8 py-2 grid justify-center bg-black h-full w-full backdrop-blur-sm bg-opacity-80">
                    <div className="sm:my-4">
                        <h1 className="font-bold sm:text-2xl text-base">Brightening Products</h1>
                        <p className="sm:smallText tinyText">Your way to the ultimate clear complexion.</p>
                    </div>
                    <button onClick={()=>{
                        if (brightItems===false) {
                            setBrightItems(true)
                        }
                        if (brightItems===true) {
                            setBrightItems(false)
                        }
                    }} className="sm:h-10 w-full hover:bg-gray-700 border border-gray-200 p-2 hover:backdrop-blur hover:bg-opacity-10 rounded-md font-semibold">View the collection</button>
                </div>
            </div> 

            <div className="h-[50vh] w-full overflow-hidden sm:flex sm:flex-rows-3 sm:flex-row-reverse grid grid-rows-3 rounded-xl bg-cover bg-no-repeat bg-center bg-[url('https://images.pexels.com/photos/6476081/pexels-photo-6476081.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1')]">
                <div className="h-full max-w-screen w-full sm:w-2/3 row-span-2">
                    <div className="w-full sm:w-2/3 row-span-2 relative">
                        <div className="sm:h-[50vh] h-[35vh] sm:w-[1000px] w-full absolute items-center inset-0">  
                            {pimpleItems===true ? 
                                <>
                                {pimpleList[0]!==undefined ? 
                                    <div className="sm:p-8 px-4 py-8 h-full w-full flex gap-2 overflow-x-auto">
                                        {pimpleList.map((a, index)=> {
                                            return (
                                                <Link to={`/details/product/${a._id}`} state={{productid: a._id}}
                                                    key={index} className="hover:bg-gray-700 flex-shrink-0 h-full sm:w-[200px] w-[150px] bg-gray-800 rounded-md overflow-hidden p-2 cursor-pointer">
                                                    <img className="h-3/4 w-full" src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${a.displayimage}.jpg`}></img>
                                                    <label className="text-sm text-white sm:line-clamp-none line-clamp-1">{a.name}</label>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                : null}
                                </>
                            :null}

                        </div>
                    </div>
                </div>
                <div className="sm:w-1/3 row-span-1 text-white sm:px-4 px-8 py-2 grid justify-center bg-black h-full w-full backdrop-blur-sm bg-opacity-80">
                    <div className="sm:my-4">
                        <h1 className="font-bold sm:text-2xl text-base">Anti Pimple Products</h1>
                        <p className="sm:smallText tinyText">Say goodbye to your insecurities.</p>
                    </div>
                    <button onClick={()=>{
                        if (pimpleItems===false) {
                            setPimpleItems(true)
                        }
                        if (pimpleItems===true) {
                            setPimpleItems(false)
                        }
                    }} className="sm:h-10 w-full hover:bg-gray-700 border border-gray-200 p-2 hover:backdrop-blur hover:bg-opacity-10 rounded-md font-semibold">View the collection</button>
                </div>
            </div>    

            <div className="h-[50vh] w-full overflow-hidden sm:flex sm:flex-rows-3 sm:flex-row-reverse grid grid-rows-3 rounded-xl bg-cover bg-no-repeat bg-center bg-[url('https://images.pexels.com/photos/3436830/pexels-photo-3436830.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1')]">
                <div className="h-full max-w-screen w-full sm:w-2/3 row-span-2">
                    <div className="w-full sm:w-2/3 row-span-2 relative">
                        <div className="sm:h-[50vh] h-[35vh] sm:w-[1000px] w-full absolute items-center inset-0">  
                            {youngItems===true ? 
                                <>
                                {youngList[0]!==undefined ? 
                                    <div className="sm:p-8 px-4 py-8 h-full w-full flex gap-2 overflow-x-auto">
                                        {youngList.map((a, index)=> {
                                            return (
                                                <Link to={`/details/product/${a._id}`} state={{productid: a._id}}
                                                    key={index} className="hover:bg-gray-700 flex-shrink-0 h-full sm:w-[200px] w-[150px] bg-gray-800 rounded-md overflow-hidden p-2 cursor-pointer">
                                                    <img className="h-3/4 w-full" src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${a.displayimage}.jpg`}></img>
                                                    <label className="text-sm text-white sm:line-clamp-none line-clamp-1">{a.name}</label>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                : null}
                                </>
                            :null}

                        </div>
                    </div>
                </div>
                <div className="sm:w-1/3 row-span-1 text-white sm:px-4 px-8 py-2 grid justify-center bg-black h-full w-full backdrop-blur-sm bg-opacity-80">
                    <div className="sm:my-4">
                        <h1 className="font-bold sm:text-2xl text-base">Anti-aging Products</h1>
                        <p className="sm:smallText tinyText">Maintain your skin's young glow and elasticity.</p>
                    </div>
                    <button onClick={()=>{
                        if (youngItems===false) {
                            setYoungItems(true)
                        }
                        if (youngItems===true) {
                            setYoungItems(false)
                        }
                    }} className="sm:h-10 w-full hover:bg-gray-700 border border-gray-200 p-2 hover:backdrop-blur hover:bg-opacity-10 rounded-md font-semibold">View the collection</button>
                </div>
            </div>    
        </>*/