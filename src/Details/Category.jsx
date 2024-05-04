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
                        if (a?.product?._id === pack._id){
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
            <div className="container mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-6xl px-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Sunscreen</h2>
        
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {screenList.map((product) => (
                        <div key={product._id} className="h-full group flex flex-col justify-between flex-shrink-0 relative border shadow-md rounded-lg">
                        <Link to={`/products/${((product?.name?.replace(/\s+/g, '-')).replace(/[^a-zA-Z0-9--]/g, '').toLowerCase())}/${product._id}`} state={{productid: product._id, productname: product.name}} className="relative h-[230px] w-full overflow-hidden rounded-lg bg-white group-hover:opacity-90 sm:h-[295px]">
                            <div className="sm:h-56 h-40 w-full overflow-hidden rounded-t-lg">
                                <img title='Klued product' alt={`${product.name}`} loading='eager' height={'100px'} width={'100px'}
                                    src={`https://klued-uploads.s3.ap-southeast-1.amazonaws.com/${product.displayimage}`}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className='min-h-[50px] sm:px-2 px-1'>
                                <h3 className="my-2 text-base font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                            </div>
                        </Link>
                        <div className="">
                            {product.price!==product.disprice ? 
                                <div className='group-hover:opacity-90 bg-blue-500 text-white font-bold sm:text-3xl text-xl absolute top-2 px-4 rounded-l-lg sm:-right-2 -right-1'>{100-(Math.round((product.price/product.disprice)*100))}% Off!</div>
                            : null}
                            <div className='flex justify-between gap-1 sm:px-2 px-1'>
                                {product.price!==product.disprice ? 
                                    <div className='grid'>
                                        <div className='text-gray-900 sm:text-lg text-base font-bold'>₱{(product.price).toFixed(2)}</div>
                                        <div className='text-gray-800 text-sm flex'><div className="relative">₱{(product?.disprice).toFixed(2)} <div className='absolute w-[90%] border border-blue-600 top-1/2 -translate-x-1/2 left-1/2 rotate-[6deg]'></div></div></div>
                                    </div>
                                :
                                    <p className='text-gray-900 sm:text-lg text-base font-bold'>₱{(product.price).toFixed(2)}</p>
                                }
                                <div className='text-gray-700 grid items-end'>
                                    {product?.sold ?
                                        <div className="h-full text-sm flex gap-1 justify-end items-center"><b>{product.sold>1000 ? product.sold/1000+"K " : product.sold+" "}</b> sold</div>
                                    : <div></div>} 
                                    {product.stock!==0 ? 
                                        <div className="flex gap-1 items-base justify-end sm:text-base text-sm">
                                            <b className="sm:text-base text-sm">{product.stock}</b> <p className='text-xs flex items-center'>items left</p>
                                        </div>
                                    : 
                                    <>
                                        <b className="sm:text-sm text-xs flex items-end">Out of stock.</b>
                                    </>}
                                </div>
                            </div>
                            <div className="w-full sm:px-2 px-1">
                                <button onClick={()=>handleAddToCart(product)} disabled={product.stock<1 ? true : false} className={`${product.stock<1 ? null : 'hover:bg-black'} my-2 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-2 text-sm font-medium text-white focus:outline-none`}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <br/>

            <div className="container mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-6xl px-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Cleanser</h2>
        
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {cleanseList.map((product) => (
                        <div key={product._id} className="h-full group flex flex-col justify-between flex-shrink-0 relative border shadow-md rounded-lg">
                        <Link to={`/products/${((product?.name?.replace(/\s+/g, '-')).replace(/[^a-zA-Z0-9--]/g, '').toLowerCase())}/${product._id}`} state={{productid: product._id, productname: product.name}} className="relative h-[230px] w-full overflow-hidden rounded-lg bg-white group-hover:opacity-90 sm:h-[295px]">
                            <div className="sm:h-56 h-40 w-full overflow-hidden rounded-t-lg">
                                <img title='Klued product' alt={`${product.name}`} loading='eager' height={'100px'} width={'100px'}
                                    src={`https://klued-uploads.s3.ap-southeast-1.amazonaws.com/${product.displayimage}`}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className='min-h-[50px] sm:px-2 px-1'>
                                <h3 className="my-2 text-base font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                            </div>
                        </Link>
                        <div className="">
                            {product.price!==product.disprice ? 
                                <div className='group-hover:opacity-90 bg-blue-500 text-white font-bold sm:text-3xl text-xl absolute top-2 px-4 rounded-l-lg sm:-right-2 -right-1'>{100-(Math.round((product.price/product.disprice)*100))}% Off!</div>
                            : null}
                            <div className='flex justify-between gap-1 sm:px-2 px-1'>
                                {product.price!==product.disprice ? 
                                    <div className='grid'>
                                        <div className='text-gray-900 sm:text-lg text-base font-bold'>₱{(product.price).toFixed(2)}</div>
                                        <div className='text-gray-800 text-sm flex'><div className="relative">₱{(product?.disprice).toFixed(2)} <div className='absolute w-[90%] border border-blue-600 top-1/2 -translate-x-1/2 left-1/2 rotate-[6deg]'></div></div></div>
                                    </div>
                                :
                                    <p className='text-gray-900 sm:text-lg text-base font-bold'>₱{(product.price).toFixed(2)}</p>
                                }
                                <div className='text-gray-700 grid items-end'>
                                    {product?.sold ?
                                        <div className="h-full text-sm flex gap-1 justify-end items-center"><b>{product.sold>1000 ? product.sold/1000+"K " : product.sold+" "}</b> sold</div>
                                    : <div></div>} 
                                    {product.stock!==0 ? 
                                        <div className="flex gap-1 items-base justify-end sm:text-base text-sm">
                                            <b className="sm:text-base text-sm">{product.stock}</b> <p className='text-xs flex items-center'>items left</p>
                                        </div>
                                    : 
                                    <>
                                        <b className="sm:text-sm text-xs flex items-end">Out of stock.</b>
                                    </>}
                                </div>
                            </div>
                            <div className="w-full sm:px-2 px-1">
                                <button onClick={()=>handleAddToCart(product)} disabled={product.stock<1 ? true : false} className={`${product.stock<1 ? null : 'hover:bg-black'} my-2 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-2 text-sm font-medium text-white focus:outline-none`}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <br/>
            <div className="container mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-6xl px-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Toner</h2>
        
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {tonerList.map((product) => (
                        <div key={product._id} className="h-full group flex flex-col justify-between flex-shrink-0 relative border shadow-md rounded-lg">
                            <Link to={`/products/${((product?.name?.replace(/\s+/g, '-')).replace(/[^a-zA-Z0-9--]/g, '').toLowerCase())}/${product._id}`} state={{productid: product._id, productname: product.name}} className="relative h-[230px] w-full overflow-hidden rounded-lg bg-white group-hover:opacity-90 sm:h-[295px]">
                                <div className="sm:h-56 h-40 w-full overflow-hidden rounded-t-lg">
                                    <img title='Klued product' alt={`${product.name}`} loading='eager' height={'100px'} width={'100px'}
                                        src={`https://klued-uploads.s3.ap-southeast-1.amazonaws.com/${product.displayimage}`}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className='min-h-[50px] sm:px-2 px-1'>
                                    <h3 className="my-2 text-base font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                                </div>
                            </Link>
                            <div className="">
                                {product.price!==product.disprice ? 
                                    <div className='group-hover:opacity-90 bg-blue-500 text-white font-bold sm:text-3xl text-xl absolute top-2 px-4 rounded-l-lg sm:-right-2 -right-1'>{100-(Math.round((product.price/product.disprice)*100))}% Off!</div>
                                : null}
                                <div className='flex justify-between gap-1 sm:px-2 px-1'>
                                    {product.price!==product.disprice ? 
                                        <div className='grid'>
                                            <div className='text-gray-900 sm:text-lg text-base font-bold'>₱{(product.price).toFixed(2)}</div>
                                            <div className='text-gray-800 text-sm flex'><div className="relative">₱{(product?.disprice).toFixed(2)} <div className='absolute w-[90%] border border-blue-600 top-1/2 -translate-x-1/2 left-1/2 rotate-[6deg]'></div></div></div>
                                        </div>
                                    :
                                        <p className='text-gray-900 sm:text-lg text-base font-bold'>₱{(product.price).toFixed(2)}</p>
                                    }
                                    <div className='text-gray-700 grid items-end'>
                                        {product?.sold ?
                                            <div className="h-full text-sm flex gap-1 justify-end items-center"><b>{product.sold>1000 ? product.sold/1000+"K " : product.sold+" "}</b> sold</div>
                                        : <div></div>} 
                                        {product.stock!==0 ? 
                                            <div className="flex gap-1 items-base justify-end sm:text-base text-sm">
                                                <b className="sm:text-base text-sm">{product.stock}</b> <p className='text-xs flex items-center'>items left</p>
                                            </div>
                                        : 
                                        <>
                                            <b className="sm:text-sm text-xs flex items-end">Out of stock.</b>
                                        </>}
                                    </div>
                                </div>
                                <div className="w-full sm:px-2 px-1">
                                    <button onClick={()=>handleAddToCart(product)} disabled={product.stock<1 ? true : false} className={`${product.stock<1 ? null : 'hover:bg-black'} my-2 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-2 text-sm font-medium text-white focus:outline-none`}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <br/>
            <div className="container mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-6xl px-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Serum</h2>
        
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {serumList.map((product) => (
                        <div key={product._id} className="h-full group flex flex-col justify-between flex-shrink-0 relative border shadow-md rounded-lg">
                        <Link to={`/products/${((product?.name?.replace(/\s+/g, '-')).replace(/[^a-zA-Z0-9--]/g, '').toLowerCase())}/${product._id}`} state={{productid: product._id, productname: product.name}} className="relative h-[230px] w-full overflow-hidden rounded-lg bg-white group-hover:opacity-90 sm:h-[295px]">
                            <div className="sm:h-56 h-40 w-full overflow-hidden rounded-t-lg">
                                <img title='Klued product' alt={`${product.name}`} loading='eager' height={'100px'} width={'100px'}
                                    src={`https://klued-uploads.s3.ap-southeast-1.amazonaws.com/${product.displayimage}`}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className='min-h-[50px] sm:px-2 px-1'>
                                <h3 className="my-2 text-base font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                            </div>
                        </Link>
                        <div className="">
                            {product.price!==product.disprice ? 
                                <div className='group-hover:opacity-90 bg-blue-500 text-white font-bold sm:text-3xl text-xl absolute top-2 px-4 rounded-l-lg sm:-right-2 -right-1'>{100-(Math.round((product.price/product.disprice)*100))}% Off!</div>
                            : null}
                            <div className='flex justify-between gap-1 sm:px-2 px-1'>
                                {product.price!==product.disprice ? 
                                    <div className='grid'>
                                        <div className='text-gray-900 sm:text-lg text-base font-bold'>₱{(product.price).toFixed(2)}</div>
                                        <div className='text-gray-800 text-sm flex'><div className="relative">₱{(product?.disprice).toFixed(2)} <div className='absolute w-[90%] border border-blue-600 top-1/2 -translate-x-1/2 left-1/2 rotate-[6deg]'></div></div></div>
                                    </div>
                                :
                                    <p className='text-gray-900 sm:text-lg text-base font-bold'>₱{(product.price).toFixed(2)}</p>
                                }
                                <div className='text-gray-700 grid items-end'>
                                    {product?.sold ?
                                        <div className="h-full text-sm flex gap-1 justify-end items-center"><b>{product.sold>1000 ? product.sold/1000+"K " : product.sold+" "}</b> sold</div>
                                    : <div></div>} 
                                    {product.stock!==0 ? 
                                        <div className="flex gap-1 items-base justify-end sm:text-base text-sm">
                                            <b className="sm:text-base text-sm">{product.stock}</b> <p className='text-xs flex items-center'>items left</p>
                                        </div>
                                    : 
                                    <>
                                        <b className="sm:text-sm text-xs flex items-end">Out of stock.</b>
                                    </>}
                                </div>
                            </div>
                            <div className="w-full sm:px-2 px-1">
                                <button onClick={()=>handleAddToCart(product)} disabled={product.stock<1 ? true : false} className={`${product.stock<1 ? null : 'hover:bg-black'} my-2 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-2 text-sm font-medium text-white focus:outline-none`}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <br/>
            <div className="container mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-6xl px-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Moisturizer</h2>
        
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {moistList.map((product) => (
                        <div key={product._id} className="h-full group flex flex-col justify-between flex-shrink-0 relative border shadow-md rounded-lg">
                        <Link to={`/products/${((product?.name?.replace(/\s+/g, '-')).replace(/[^a-zA-Z0-9--]/g, '').toLowerCase())}/${product._id}`} state={{productid: product._id, productname: product.name}} className="relative h-[230px] w-full overflow-hidden rounded-lg bg-white group-hover:opacity-90 sm:h-[295px]">
                            <div className="sm:h-56 h-40 w-full overflow-hidden rounded-t-lg">
                                <img title='Klued product' alt={`${product.name}`} loading='eager' height={'100px'} width={'100px'}
                                    src={`https://klued-uploads.s3.ap-southeast-1.amazonaws.com/${product.displayimage}`}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className='min-h-[50px] sm:px-2 px-1'>
                                <h3 className="my-2 text-base font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                            </div>
                        </Link>
                        <div className="">
                            {product.price!==product.disprice ? 
                                <div className='group-hover:opacity-90 bg-blue-500 text-white font-bold sm:text-3xl text-xl absolute top-2 px-4 rounded-l-lg sm:-right-2 -right-1'>{100-(Math.round((product.price/product.disprice)*100))}% Off!</div>
                            : null}
                            <div className='flex justify-between gap-1 sm:px-2 px-1'>
                                {product.price!==product.disprice ? 
                                    <div className='grid'>
                                        <div className='text-gray-900 sm:text-lg text-base font-bold'>₱{(product.price).toFixed(2)}</div>
                                        <div className='text-gray-800 text-sm flex'><div className="relative">₱{(product?.disprice).toFixed(2)} <div className='absolute w-[90%] border border-blue-600 top-1/2 -translate-x-1/2 left-1/2 rotate-[6deg]'></div></div></div>
                                    </div>
                                :
                                    <p className='text-gray-900 sm:text-lg text-base font-bold'>₱{(product.price).toFixed(2)}</p>
                                }
                                <div className='text-gray-700 grid items-end'>
                                    {product?.sold ?
                                        <div className="h-full text-sm flex gap-1 justify-end items-center"><b>{product.sold>1000 ? product.sold/1000+"K " : product.sold+" "}</b> sold</div>
                                    : <div></div>} 
                                    {product.stock!==0 ? 
                                        <div className="flex gap-1 items-base justify-end sm:text-base text-sm">
                                            <b className="sm:text-base text-sm">{product.stock}</b> <p className='text-xs flex items-center'>items left</p>
                                        </div>
                                    : 
                                    <>
                                        <b className="sm:text-sm text-xs flex items-end">Out of stock.</b>
                                    </>}
                                </div>
                            </div>
                            <div className="w-full sm:px-2 px-1">
                                <button onClick={()=>handleAddToCart(product)} disabled={product.stock<1 ? true : false} className={`${product.stock<1 ? null : 'hover:bg-black'} my-2 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-2 text-sm font-medium text-white focus:outline-none`}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <br/>
            <Packages />
        </div>
    )
}