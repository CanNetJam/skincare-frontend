import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../App";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Packages() {
    const { userData, setUserData } = useContext(UserContext)
    const [ packages, setPackages ] = useState([])
    const [ quantity, setQuantity ] = useState(1)

    useEffect(()=> {
        const getPackage = async () => {
            try {
                const packageList = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/package/get-all-packages`)
                setPackages(packageList.data)
            } catch (err) {
                console.log(err)
            }
        }
        getPackage()
    }, [])

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
                type:  pack.price ? "single": "package",
                product: {
                    _id: pack._id,
                    name: pack.name,
                    displayimage: pack.displayimage,
                    price: pack.price ? pack.price : pack.origprice,
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
                setUserData({...userData, cartNumber: userData.cartNumber+1})
                if (!userData.user) {
                    toastSuccessNotification(obj.product.name)
                }
            }
            if (cart !== null) {
                let currentCart = JSON.parse(localStorage.getItem("items"))
                let dupe = false

                function duplicateCheck() {
                    currentCart.map((a, index )=> {
                        if (a.product._id === pack._id){
                            currentCart[index] = {
                                type:  pack.price ? "single": "package",
                                product: {
                                    _id: pack._id,
                                    name: pack.name,
                                    displayimage: pack.displayimage,
                                    price: pack.price ? pack.price : pack.origprice,
                                    stock: pack.stock,
                                },
                                quantity: a.quantity+1
                            }
                            setUserData({...userData, cartNumber: userData.cartNumber+1})
                            if (!userData.user) {
                                toastSuccessNotification(obj.product.name)
                            }
                            dupe = true
                            return dupe
                        }
                        return dupe
                    })
                }

                duplicateCheck()
                if (dupe===false) {
                    currentCart.push(obj)
                    setUserData({...userData, cartNumber: userData.cartNumber+1})
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
            <div className="container mx-auto max-w-6xl px-4 sm:px-0 relative">
                <div className="mx-auto max-w-2xl py-4 sm:py-24 lg:max-w-none lg:py-8">
                    <h2 className="text-2xl font-bold text-gray-900">Package Sets</h2>
                    <div>
                        {packages[0]!==undefined ? 
                            <div className="mt-6 w-auto sm:grid sm:grid-cols-5 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-10 space-y-0">
                                {packages.map((pack)=> {
                                    return (
                                        <div key={pack._id}  className="group flex-shrink-0 relative">
                                            <Link to={`/details/package/${pack._id}`} state={{packageid: pack._id}} className="relative h-32 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-90 sm:h-56">
                                                <img className='rounded-md' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${pack.displayimage}.jpg`}/>
                                            </Link>
                                            {pack.origprice!==pack.disprice ? 
                                                <div className='bg-blue-500 text-white font-bold sm:text-3xl text-xl absolute top-0 px-4 rounded-l-lg right-0 group-hover:opacity-90'>{100-(Math.floor((pack.origprice/pack.disprice)*100))}% Off!</div>
                                            :null}
                                            <div className='min-h-[80px]'>
                                                <p className="my-2 text-base font-semibold text-gray-900 line-clamp-3">{pack.name}</p>
                                            </div>
                                            <div className='sm:flex sm:justify-between items-end grid gap-2'>
                                                {pack.origprice!==pack.disprice ? 
                                                    <div className='grid'>
                                                        <p className='text-gray-900 text-lg font-bold'>₱{(pack?.origprice).toFixed(2)}</p>
                                                        <div className='text-gray-800 text-sm flex items-center justify-center relative max-w-[55px]'>₱{(pack?.disprice).toFixed(2)} <div className='absolute w-full border border-blue-600 top-1/2 -translate-x-1/2 left-1/2 rotate-[15deg]'></div></div>
                                                    </div>
                                                :
                                                    <p className='text-gray-900 font-bold'>₱{(pack?.origprice).toFixed(2)}</p>
                                                }
                                                <p className='text-gray-700'>
                                                    {pack.stock!==0 ? 
                                                        <>
                                                            <b>{pack.stock}</b> <span className='text-xs'>items left</span>
                                                        </>
                                                        : 
                                                        <b>Out of stock.</b>
                                                    }
                                                </p>
                                            </div>
                                            <button onClick={()=>handleAddToCart(pack)} disabled={pack.stock<1 ? true : false} className={`${pack.stock<1 ? null : 'hover:bg-black'} my-2 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-2 text-sm font-medium text-white focus:outline-none`}>Add to Cart</button>
                                        </div>
                                    )
                                })}
                            </div>
                        :<span>No package sets available</span>}
                    </div>
                </div>
            </div>
        </>
    )
}

/*
                                                <div className='grid grid-cols-2'>
                                                    <div>
                                                        <label htmlFor="quantity-input" className="block text-sm font-medium text-gray-900 dark:text-white">Price:</label>
                                                        <p className='font-semibold text-gray-700'>₱ {pack.origprice}.00</p>
                                                    </div>
                                                    <div className="">
                                                        <label htmlFor="quantity-input" className="block text-sm font-medium text-gray-900 dark:text-white">Quantity:</label>
                                                        <div className="relative flex items-center max-w-[8rem]">
                                                            <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                    <path stroke="currentColor" d="M1 1h16"/>
                                                                </svg>
                                                            </button>
                                                            <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="99" required/>
                                                            <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                    <path stroke="currentColor" d="M9 1v16M1 9h16"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='hidden group-hover:block group-hover:bg-gray-100 group-hover:backdrop-blur-xs group-hover:bg-opacity-20 absolute inset-0 py-10 px-4'>
                                                    <button className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-black focus:outline-none">Learn More</button>
                                                    <button className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-black focus:outline-none">Add to Cart</button>
                                                </div>*/