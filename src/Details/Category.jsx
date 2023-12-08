import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import image1 from "../assets/18.jpg";
import image2 from "../assets/8.jpg";
import image3 from "../assets/10.jpg";

export default function Category() {
    const [ brightList, setBrightList ] = useState([])
    const [ pimpleList, setPimpleList ] = useState([])
    const [ youngList, setYoungList ] = useState([])
    const [ brightItems, setBrightItems ] = useState(false)
    const [ pimpleItems, setPimpleItems ] = useState(false)
    const [ youngItems, setYoungItems ] = useState(false)

    useEffect(()=> {
        const getProducts = async () => {
            try {
                const products = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://skincare-backend.onrender.com'}/product/get-all-products`)
                const bright = products?.data?.filter((item) => item.category === "Brightening")
                setBrightList(bright)
                const pimple = products?.data?.filter((item) => item.category === "Anti-Pimple")
                setPimpleList(pimple)
                const young = products?.data?.filter((item) => item.category === "Anti-Aging")
                setYoungList(young)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [])

    return (
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
                                                <Link to='/details/product' state={{productid: a._id}}
                                                    key={index} className="hover:bg-gray-700 flex-shrink-0 h-full sm:w-[200px] w-[150px] bg-gray-800 rounded-md overflow-hidden p-2 cursor-pointer">
                                                    <img className="h-3/4 w-full" src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a.displayimage}.jpg`}></img>
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
                                                <Link to='/details/product' state={{productid: a._id}}
                                                    key={index} className="hover:bg-gray-700 flex-shrink-0 h-full sm:w-[200px] w-[150px] bg-gray-800 rounded-md overflow-hidden p-2 cursor-pointer">
                                                    <img className="h-3/4 w-full" src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a.displayimage}.jpg`}></img>
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
                                                <Link to='/details/product' state={{productid: a._id}}
                                                    key={index} className="hover:bg-gray-700 flex-shrink-0 h-full sm:w-[200px] w-[150px] bg-gray-800 rounded-md overflow-hidden p-2 cursor-pointer">
                                                    <img className="h-3/4 w-full" src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a.displayimage}.jpg`}></img>
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
  
        </>
    )
}