import React, { useState, useContext }  from 'react';
import { UserContext } from "../App";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Hero({packageData}) {
    const { userData, setUserData } = useContext(UserContext)
    const [ quantity, setQuantity ] = useState(1)

    function toastSuccessNotification(props) {
        toast.success(`Added ${props} to your cart.`, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
    }

    function toastErrorNotification() {
        toast.error('An error happened while adding an item to your cart.', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
    }

    const handleAddToCart = async (pack) => {
        try {
            let cart = localStorage.getItem("items")
            const obj = {
                type: "package",
                product: {
                    _id: pack._id,
                    name: pack.name,
                    displayimage: pack.displayimage,
                    price: pack.origprice,
                    stock: pack.stock,
                },
                quantity: quantity
            }
            if (userData.user) {
                let token = localStorage.getItem("auth-token")
                const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/accounts/update-add-cart/${userData?.user?._id}`, obj, 
                { headers: { "Content-Type": "application/json", "auth-token": token } })
                if (res.data===true) {
                    toastSuccessNotification(pack.name) 
                } else {
                    toastErrorNotification()
                }
            }

            if ( cart === null) {
                localStorage.setItem("items", JSON.stringify([obj]))
                setUserData({...userData, cartNumber: userData.cartNumber+quantity})
                if (!userData.user) {
                    toastSuccessNotification(obj.product.name)
                }
                setQuantity(1)
            }
            if (cart !== null) {
                let currentCart = JSON.parse(localStorage.getItem("items"))
                let dupe = false

                function duplicateCheck() {
                    currentCart.map((a, index )=> {
                        if (a.product._id === pack._id){
                            currentCart[index] = {
                                type: "package",
                                product: {
                                    _id: pack._id,
                                    name: pack.name,
                                    displayimage: pack.displayimage,
                                    price: pack.origprice,
                                    stock: pack.stock,
                                },
                                quantity: a.quantity+quantity
                            }
                            setUserData({...userData, cartNumber: userData.cartNumber+quantity})
                            if (!userData.user) {
                                toastSuccessNotification(obj.product.name)
                            }
                            setQuantity(1)
                            dupe = true
                            return dupe
                        }
                        return dupe
                    })
                }
                duplicateCheck()
                if (dupe===false) {
                    currentCart.push(obj)
                    setUserData({...userData, cartNumber: userData.cartNumber+quantity})
                    setQuantity(1)
                    if (!userData.user) {
                        toastSuccessNotification(obj.product.name)
                    }
                }
                localStorage.setItem("items", JSON.stringify(currentCart))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-6xl pt-10 sm:py-10">
                    <div className="relative isolate overflow-hidden bg-slate-700 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        <svg
                            viewBox="0 0 1024 1024"
                            className="absolute left-1/3 top-1/3 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] 
                            sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                            aria-hidden="true"
                        >
                            <circle cx={400} cy={400} r={400} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.9" />
                            <defs>
                                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                    <stop stopColor="#2563eb" />
                                    <stop offset={1} stopColor="#60a5fa" />
                                </radialGradient>
                            </defs>
                        </svg>
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                {packageData?.name}
                            </h2>
                            <h1 className="smallText text-gray-300 my-4">₱ <b>{packageData.origprice}.00</b></h1>
                            <p className="mt-6 miniText text-gray-300 whitespace-pre-wrap break-normal">
                                {packageData?.maindesc}
                            </p>
                            <br/>
                            <div className="grid grid-cols-3 gap-4">
                                <label htmlFor="quantity-input" className="col-span-1 block text-center text-sm font-medium text-gray-300 dark:text-white"><b>Qantity:</b></label>
                                <label className="col-span-2 flex justify-center text-gray-300 dark:text-white">
                                    {packageData.stock!==0 ? 
                                        <>
                                            {packageData.stock} <span className="text-xs">items left</span>
                                        </>
                                    : <>Out of stock.</>}
                                </label>
                            </div>
                            <div className="grid grid-cols-2 sm:grid sm:grid-cols-3 sm:gap-4 gap-1 h-12 w-full">
                                <div className="w-full sm:col-span-1">
                                    <div className="relative max-w-sm h-full w-full flex items-center justify-center">
                                        <input readOnly value={quantity} disabled type="number" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-100 border-x-0 border-gray-300 h-full text-gray-900 text-base focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center rounded-lg" placeholder="99" required/>
                                        <div className="grid absolute right-0">
                                            <button onClick={()=>setQuantity(prev=>prev+1)} disabled={quantity<packageData.stock ? false : true} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-t-lg p-2 h-6 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                    <path stroke="currentColor" d="M9 1v16M1 9h16"/>
                                                </svg>
                                            </button>
                                            <button onClick={()=>setQuantity(prev=>prev-1)} disabled={quantity>1 ? false : true} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className={`${quantity>1 ? 'hover:bg-gray-200 dark:hover:bg-gray-600' : null}bg-gray-100 dark:bg-gray-700  dark:border-gray-600  border border-gray-300 rounded-b-lg p-2 h-6 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none`}>
                                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                    <path stroke="currentColor" d="M1 1h16"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-2 h-full w-full">
                                    <button disabled={quantity<=packageData.stock ? false : true} onClick={()=>handleAddToCart(packageData)} className={`${quantity>packageData.stock ? 'bg-gray-900 text-gray-400' : 'bg-blue-400 before:bg-yellow-200 before:-z-10 z-0 text-slate-50 transition-colors before:absolute before:left-0 before:top-0 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:duration-300 hover:text-black before:hover:scale-x-100 overflow-hidden relative'} text-center py-1 h-full w-full sm:px-3 px-1 font-bold rounded-lg `}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="relative mt-16 h-80 lg:mt-8">
                            <img
                            className="absolute left-0 top-0 sm:w-[38rem] w-[28rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                            src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${packageData?.displayimage}.jpg`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
