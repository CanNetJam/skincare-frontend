import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Packages from './Packages';
import { UserContext } from "../App";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Category() {
    const { userData, setUserData } = useContext(UserContext)
    const [ cleanseList, setCleanseList ] = useState([])
    const [ tonerList, setTonerList ] = useState([])
    const [ serumList, setSerumList ] = useState([])
    const [ moistList, setMoistList ] = useState([])
    const [ screenList, setScreenList ] = useState([])
    const [ quantity, setQuantity ] = useState(1)

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
                const products = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/product/get-all-products`)
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
        <div className="grid justify-center">
            <Packages />
            <div className="container mx-auto max-w-6xl px-4 py-4 sm:px-0">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Cleanser</h2>
        
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-10 sm:grid-cols-5 xl:gap-x-8">
                    {cleanseList.map((product) => (
                        <div key={product._id} className="group flex-shrink-0 relative">
                            <Link to={`/details/product/${product._id}`} state={{productid: product._id}} className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-90 sm:h-56">
                                <img
                                    src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${product.displayimage}.jpg`}
                                    className="rounded-md"
                                />
                            </Link>
                            {product.price!==product.disprice ? 
                                <div className='group-hover:opacity-90 bg-blue-500 text-white font-bold sm:text-3xl text-xl absolute top-0 px-4 rounded-l-lg right-0'>{100-(Math.round((product.price/product.disprice)*100))}% Off!</div>
                            : null}
                            <div className='min-h-[80px]'>
                                <h3 className="my-2 text-base font-semibold text-gray-900 line-clamp-3">{product.name}</h3>
                            </div>
                            <div className='sm:flex sm:justify-between items-end grid gap-1'>
                                {product.price!==product.disprice ? 
                                    <div className='grid'>
                                        <p className='text-gray-900 text-lg font-bold'>₱{(product.price).toFixed(2)}</p>
                                        <div className='text-gray-800 text-sm flex items-center justify-center relative max-w-[55px]'>₱{(product?.disprice).toFixed(2)} <div className='absolute w-full border border-blue-600 top-1/2 -translate-x-1/2 left-1/2 rotate-[15deg]'></div></div>
                                    </div>
                                :
                                    <p className='text-gray-900 font-bold'>₱{(product.price).toFixed(2)}</p>
                                }
                                <p className='text-gray-700'> 
                                    {product.stock!==0 ? 
                                        <>
                                            <b>{product.stock}</b> <span className='text-xs'>items left</span>
                                        </>
                                    : 
                                    <>
                                        <b>Out of stock.</b>
                                    </>}
                                </p>
                            </div>
                            <button onClick={()=>handleAddToCart(product)} disabled={product.stock<1 ? true : false} className={`${product.stock<1 ? null : 'hover:bg-black'} my-2 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-2 text-sm font-medium text-white focus:outline-none`}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-4 sm:px-0">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Toner</h2>
        
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-10 sm:grid-cols-5 xl:gap-x-8">
                    {tonerList.map((product) => (
                        <div key={product._id} className="group flex-shrink-0 relative">
                            <Link to={`/details/product/${product._id}`} state={{productid: product._id}} className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-90 sm:h-56">
                                <img
                                    src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${product.displayimage}.jpg`}
                                    className="rounded-md"
                                />
                            </Link>
                            {product.price!==product.disprice ? 
                                <div className='group-hover:opacity-90 bg-blue-500 text-white font-bold sm:text-3xl text-xl absolute top-0 px-4 rounded-l-lg right-0'>{100-(Math.round((product.price/product.disprice)*100))}% Off!</div>
                            : null}
                            <div className='min-h-[80px]'>
                                <h3 className="my-2 text-base font-semibold text-gray-900 line-clamp-3">{product.name}</h3>
                            </div>
                            <div className='sm:flex sm:justify-between items-end grid gap-1'>
                                {product.price!==product.disprice ? 
                                    <div className='grid'>
                                        <p className='text-gray-900 text-lg font-bold'>₱{(product.price).toFixed(2)}</p>
                                        <div className='text-gray-800 text-sm flex items-center justify-center relative max-w-[55px]'>₱{(product?.disprice).toFixed(2)} <div className='absolute w-full border border-blue-600 top-1/2 -translate-x-1/2 left-1/2 rotate-[15deg]'></div></div>
                                    </div>
                                :
                                    <p className='text-gray-900 font-bold'>₱{(product.price).toFixed(2)}</p>
                                }
                                <p className='text-gray-700'> 
                                    {product.stock!==0 ? 
                                        <>
                                            <b>{product.stock}</b> <span className='text-xs'>items left</span>
                                        </>
                                    : 
                                    <>
                                        <b>Out of stock.</b>
                                    </>}
                                </p>
                            </div>
                            <button onClick={()=>handleAddToCart(product)} disabled={product.stock<1 ? true : false} className={`${product.stock<1 ? null : 'hover:bg-black'} my-2 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-2 text-sm font-medium text-white focus:outline-none`}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-4 sm:px-0">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Serum</h2>
        
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-10 sm:grid-cols-5 xl:gap-x-8">
                    {serumList.map((product) => (
                        <div key={product._id} className="group flex-shrink-0 relative">
                            <Link to={`/details/product/${product._id}`} state={{productid: product._id}} className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-90 sm:h-56">
                                <img
                                    src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${product.displayimage}.jpg`}
                                    className="rounded-md"
                                />
                            </Link>
                            {product.price!==product.disprice ? 
                                <div className='group-hover:opacity-90 bg-blue-500 text-white font-bold sm:text-3xl text-xl absolute top-0 px-4 rounded-l-lg right-0'>{100-(Math.round((product.price/product.disprice)*100))}% Off!</div>
                            : null}
                            <div className='min-h-[80px]'>
                                <h3 className="my-2 text-base font-semibold text-gray-900 line-clamp-3">{product.name}</h3>
                            </div>
                            <div className='sm:flex sm:justify-between items-end grid gap-1'>
                                {product.price!==product.disprice ? 
                                    <div className='grid'>
                                        <p className='text-gray-900 text-lg font-bold'>₱{(product.price).toFixed(2)}</p>
                                        <div className='text-gray-800 text-sm flex items-center justify-center relative max-w-[55px]'>₱{(product?.disprice).toFixed(2)} <div className='absolute w-full border border-blue-600 top-1/2 -translate-x-1/2 left-1/2 rotate-[15deg]'></div></div>
                                    </div>
                                :
                                    <p className='text-gray-900 font-bold'>₱{(product.price).toFixed(2)}</p>
                                }
                                <p className='text-gray-700'> 
                                    {product.stock!==0 ? 
                                        <>
                                            <b>{product.stock}</b> <span className='text-xs'>items left</span>
                                        </>
                                    : 
                                    <>
                                        <b>Out of stock.</b>
                                    </>}
                                </p>
                            </div>
                            <button onClick={()=>handleAddToCart(product)} disabled={product.stock<1 ? true : false} className={`${product.stock<1 ? null : 'hover:bg-black'} my-2 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-2 text-sm font-medium text-white focus:outline-none`}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-4 sm:px-0">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Moisturizer</h2>
        
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-10 sm:grid-cols-5 xl:gap-x-8">
                    {moistList.map((product) => (
                        <div key={product._id} className="group flex-shrink-0 relative">
                            <Link to={`/details/product/${product._id}`} state={{productid: product._id}} className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-90 sm:h-56">
                                <img
                                    src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${product.displayimage}.jpg`}
                                    className="rounded-md"
                                />
                            </Link>
                            {product.price!==product.disprice ? 
                                <div className='group-hover:opacity-90 bg-blue-500 text-white font-bold sm:text-3xl text-xl absolute top-0 px-4 rounded-l-lg right-0'>{100-(Math.round((product.price/product.disprice)*100))}% Off!</div>
                            : null}
                            <div className='min-h-[80px]'>
                                <h3 className="my-2 text-base font-semibold text-gray-900 line-clamp-3">{product.name}</h3>
                            </div>
                            <div className='sm:flex sm:justify-between items-end grid gap-1'>
                                {product.price!==product.disprice ? 
                                    <div className='grid'>
                                        <p className='text-gray-900 text-lg font-bold'>₱{(product.price).toFixed(2)}</p>
                                        <div className='text-gray-800 text-sm flex items-center justify-center relative max-w-[55px]'>₱{(product?.disprice).toFixed(2)} <div className='absolute w-full border border-blue-600 top-1/2 -translate-x-1/2 left-1/2 rotate-[15deg]'></div></div>
                                    </div>
                                :
                                    <p className='text-gray-900 font-bold'>₱{(product.price).toFixed(2)}</p>
                                }
                                <p className='text-gray-700'> 
                                    {product.stock!==0 ? 
                                        <>
                                            <b>{product.stock}</b> <span className='text-xs'>items left</span>
                                        </>
                                    : 
                                    <>
                                        <b>Out of stock.</b>
                                    </>}
                                </p>
                            </div>
                            <button onClick={()=>handleAddToCart(product)} disabled={product.stock<1 ? true : false} className={`${product.stock<1 ? null : 'hover:bg-black'} my-2 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-2 text-sm font-medium text-white focus:outline-none`}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}