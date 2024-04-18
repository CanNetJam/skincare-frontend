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
            <div className="container mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-6xl px-4">
                <div className="mx-auto max-w-2xl py-4 sm:py-24 lg:max-w-none lg:py-8">
                    <h2 className="text-2xl font-bold text-gray-900">Package Sets</h2>
                    <div>
                        {packages[0]!==undefined ? 
                            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {packages.map((pack)=> {
                                    return (
                                        <div key={pack._id} className="group flex-shrink-0 relative border shadow-md rounded-lg">
                                            <Link to={`/packages/${(pack?.name?.replace(/\s+/g, '-')).replace(/[^a-zA-Z0-9--]/g, '').toLowerCase()}/${pack._id}`} state={{packageid: pack._id, packagename: pack.name}} className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-90 sm:h-56">
                                                <div className="sm:h-56 h-40 w-full overflow-hidden rounded-t-lg">
                                                    <img title='Klued package' alt={`${pack.name}`} loading='eager' height={'100px'} width={'100px'}
                                                        src={`https://klued-uploads.s3.ap-southeast-1.amazonaws.com/${pack.displayimage}`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className='min-h-[50px] px-2'>
                                                    <h3 className="my-2 text-base font-semibold text-gray-900 line-clamp-2">{pack.name}</h3>
                                                </div>
                                            </Link>
                                            {pack.origprice!==pack.disprice ? 
                                                <div className='group-hover:opacity-90 bg-blue-500 text-white font-bold sm:text-3xl text-xl absolute top-2 px-4 rounded-l-lg -right-2'>{100-(Math.round((pack.origprice/pack.disprice)*100))}% Off!</div>
                                            : null}
                                            <div className='sm:flex sm:justify-between items-end grid gap-1 px-2'>
                                                {pack.origprice!==pack.disprice ? 
                                                    <div className='sm:grid flex justify-between items-center'>
                                                        <p className='text-gray-900 sm:text-lg text-base font-bold'>₱{(pack.origprice).toFixed(2)}</p>
                                                        <div className='text-gray-800 sm:text-sm text-xs flex items-center justify-center relative'>₱{(pack?.disprice).toFixed(2)} <div className='absolute w-full border border-blue-600 top-1/2 -translate-x-1/2 left-1/2 rotate-[15deg]'></div></div>
                                                    </div>
                                                :
                                                    <p className='text-gray-900 font-bold'>₱{(pack.origprice).toFixed(2)}</p>
                                                }
                                                <p className='text-gray-700 flex justify-between text-sm sm:grid text-end'>
                                                    {pack?.sold ?
                                                        <div><b>{pack.sold>1000 ? pack.sold/1000+"K " : pack.sold}</b> sold</div>
                                                    : null} 
                                                    {pack.stock!==0 ? 
                                                        <div className="flex gap-1 justify-end items-baseline sm:text-base text-sm">
                                                            <b className="sm:text-base text-sm">{pack.stock}</b> <span className='text-xs'>items left</span>
                                                        </div>
                                                    : 
                                                    <>
                                                        <b className="sm:text-base text-sm">Out of stock.</b>
                                                    </>}
                                                </p>
                                            </div>
                                            <div className="w-full px-2">
                                                <button onClick={()=>handleAddToCart(pack)} disabled={pack.stock<1 ? true : false} className={`${pack.stock<1 ? null : 'hover:bg-black'} my-2 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-2 text-sm font-medium text-white focus:outline-none`}>Add to Cart</button>
                                            </div>
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