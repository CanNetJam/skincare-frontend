import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../App";
import CheckoutDetails from '../Components/CheckoutDetails';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CartDetails() {
    const { userData, setUserData } = useContext(UserContext || null)
    const [cartData, setCartData] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [shippingFee, setShippingFee] = useState(0)

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
        const calculateShipping = () => { 
            let userRegion = userData.user?.billingaddress?.region.toUpperCase() 
            if(userRegion==="REGION 1" || userRegion==="REGION 2" || userRegion==="REGION 3" || userRegion==="CORDILLERA ADMINISTRATIVE REGION" || userRegion==="NATIONAL CAPITAL REGION" || userRegion==="REGION IV-A" || userRegion==="REGION V") {
                setShippingFee(85)
            } else if (userRegion==="MIMAROPA REGION" || userRegion==="REGION VI" || userRegion==="REGION VIII" || userRegion==="REGION VII") {
                setShippingFee(95)
            } else if (userRegion==="REGION IX" || userRegion==="REGION X" || userRegion==="REGION XI" || userRegion==="REGION XII" || userRegion==="REGION XIII" || userRegion==="BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO") {
                setShippingFee(105)
            } else {
                setShippingFee(100)
            }
        }
        calculateShipping()
    }, [userData.user?.billingaddress?.region])

    useEffect(() => {
        const fetchCartData = async () => {
        try {
            let localData = JSON.parse(localStorage.getItem("items")) || []
            setCartData(localData)
        } catch (error) {
            console.error('Error fetching cart data:', error)
        }
        }
        fetchCartData()
    }, [])

    useEffect(() => {
        const computeTotal = async () => {
        try {
            let summary = []

            cartData.map((a)=> {
                let haha = Number(a.product?.price ? a.product.price : a.product.origprice) * Number(a.quantity)
                summary.push(haha)
            })

            let total = 0
            function computeSum(){
                if (summary.length>1) {
                    for (let i=0; i<summary.length; i++){
                    total = summary[i] + total
                    }
                    return total
                }
                if (summary.length===1) {
                    total = summary[0]
                    return total
                }
                return total
            }
            computeSum()
            if (total===0) {
                setCartTotal(0)
            } else {
                setSubTotal(total)
                setCartTotal(total+shippingFee)
            }
        } catch (error) {
            console.error('Error computing data:', error);
        }
        }
        computeTotal()
    }, [cartData])

    const handleAddQuantity = async (pack) => {
        try {
            let cart = localStorage.getItem("items")
            const obj = {
                type: pack.type,
                product: {
                _id: pack.product._id,
                name: pack.product.name,
                displayimage: pack.product.displayimage,
                price: pack.product.price ? pack.product.price : pack.product.origprice,
                stock: pack.product.stock,
                },
                quantity: pack.quantity
            }

            if (userData.user) {
                let token = localStorage.getItem("auth-token")
                const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/accounts/update-add-cart/${userData?.user?._id}`, obj, 
                { headers: { "Content-Type": "application/json", "auth-token": token } })
            }
            
            if ( cart === null) {
                localStorage.setItem("items", JSON.stringify([obj]))
                setUserData({...userData, cartNumber: userData.cartNumber+1})
            }
            if (cart !== null) {
                let currentCart = JSON.parse(localStorage.getItem("items"))
                let dupe = false
                function duplicateCheck() {
                currentCart.map((a, index )=> {
                    if (a.product._id === pack.product._id){
                    currentCart[index] = {
                        type: pack.type,
                        product: {
                        _id: pack.product._id,
                        name: pack.product.name,
                        displayimage: pack.product.displayimage,
                        price: pack.product.price ? pack.product.price : pack.product.origprice,
                        stock: pack.product.stock,
                        },
                        quantity: a.quantity+1
                    }
                    setUserData({...userData, cartNumber: userData.cartNumber+1})
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
                }
                localStorage.setItem("items", JSON.stringify(currentCart))
                setCartData(currentCart)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubtractQuantity = async (pack) => {
        try {
            let cart = localStorage.getItem("items")
            const obj = {
            type: pack.type,
            product: {
                _id: pack.product._id,
                name: pack.product.name,
                displayimage: pack.product.displayimage,
                price: pack.product.price ? pack.product.price : pack.product.origprice,
                stock: pack.product.stock,
            },
            quantity: pack.quantity
            }

            if (userData.user) {
            let token = localStorage.getItem("auth-token")
            const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/accounts/update-subtract-cart/${userData?.user?._id}`, obj, 
            { headers: { "Content-Type": "application/json", "auth-token": token } })
            }
            
            if (cart !== null) {
                let currentCart = JSON.parse(localStorage.getItem("items"))
                let dupe = false

                function duplicateCheck() {
                    currentCart.map((a, index )=> {
                        if (a.product._id === pack.product._id){
                            currentCart[index] = {
                            type: pack.type,
                            product: {
                                _id: pack.product._id,
                                name: pack.product.name,
                                displayimage: pack.product.displayimage,
                                price: pack.product.price ? pack.product.price : pack.product.origprice,
                                stock: pack.product.stock,
                            },
                            quantity: a.quantity-1
                            }
                            setUserData({...userData, cartNumber: userData.cartNumber-1})
                            dupe = true
                            return dupe
                        }
                        return dupe
                    })
                }
                duplicateCheck()
                if (dupe===false) {
                    currentCart.push(obj)
                    setUserData({...userData, cartNumber: userData.cartNumber-1})
                }
                localStorage.setItem("items", JSON.stringify(currentCart))
                setCartData(currentCart)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function toastSuccessNotification(props) {
        toast.success(`Removed ${props} to your cart.`, {
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
        toast.error('An error happened while removing an item to your cart.', {
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

    async function handleRemoveItem(prop1, prop2) {
        if (userData.user) {
        let token = localStorage.getItem("auth-token")
        const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/accounts/update-remove-cart-item/${userData?.user?._id}`, prop1, 
        { headers: { "Content-Type": "application/json", "auth-token": token } })
        if (res.data===true) {
            toastSuccessNotification(prop1.name) 
        } else {
            toastErrorNotification()
        }
        }

        let currentCart = JSON.parse(localStorage.getItem("items"))
        const filteredCart = currentCart.filter((a)=> a.product._id!==prop1._id)
        localStorage.setItem("items", JSON.stringify(filteredCart))
        setUserData({...userData, cartNumber: userData.cartNumber-prop2})
        setCartData(filteredCart)
        if (!userData.user) {
        toastSuccessNotification(prop1.name)
        }
    }

    return (
        <div className='bg-gray-100'>
            <div className="container mx-auto grid lg:grid-cols-2 gap-4 h-auto p-4 sm:p-8">
                
                <div className='sm:order-2 order-1'>
                    <header className="text-center my-4">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Order Summary</h1>
                    </header>
                    {cartData.length>0 ? 
                        <ul>
                        {cartData.map((item, index) => (
                            <li key={index} className="border-b border-gray-200 py-4 grid grid-cols-3 items-center gap-4">
                                <div className='col-span-2 flex items-center gap-4'>
                                <img className='h-24 w-24 rounded-lg' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${item.product.displayimage}.jpg`}/>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">{item.product.name}</h3>
                                    <dl className="flex gap-2 text-xs text-gray-600">
                                        <dt className="inline">Price:</dt>
                                        <dd className="inline">₱ {item.product?.price ? item.product.price : item.product.origprice}.00</dd>
                                    </dl>
                                    <p className='py-2'><b>{item.product.stock}</b> <span className='text-xs'>items left</span></p>
                                </div>
                                </div>

                                <div className='col-span-1 grid gap-2 items-center justify-center min-w-lg'>
                                <label htmlFor="quantity-input" className="block text-sm text-center font-medium text-gray-900 dark:text-white">Quantity:</label>
                                <div className="flex items-center text-center gap-2">
                                    <div className="relative flex items-center justify-center max-w-[8rem]">
                                        <button onClick={()=>{
                                                        if (item.quantity>1) {
                                                            handleSubtractQuantity(item)
                                                        } else {
                                                            handleRemoveItem(item.product, item.quantity)
                                                        }
                                                    }} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className={`${item.quantity>1 ? 'hover:bg-gray-200 dark:hover:bg-gray-600' : null}bg-gray-100 dark:bg-gray-700  dark:border-gray-600  border border-gray-300 rounded-s-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none`}>
                                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" d="M1 1h16"/>
                                            </svg>
                                        </button>
                                        <input readOnly value={item.quantity} type="number" id={`quantity-input`+item.product?._id} data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-8 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center" placeholder="99" required/>
                                        <button onClick={()=>handleAddQuantity(item)} disabled={item.quantity<item.product.stock ? false : true} type="button" id="increment-button" data-input-counter-increment="quantity-input" className={`${item.quantity<item.product.stock ? 'hover:bg-gray-200' : null} bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 border border-gray-300 rounded-e-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none`}>
                                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" d="M9 1v16M1 9h16"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                </div>
                            </li>
                        ))}
                        </ul>
                    :null}
                    <div className="flex justify-end border-t border-slate-500 pt-8">
                        <div className="w-auto space-y-4">
                            <dl className="space-y-0.5 text-sm text-gray-700">
                                <div className="flex gap-6 justify-between text-sm ">
                                    <dt>Subtotal: </dt>
                                    <dd className='font-bold text-black'>₱ <b>{subTotal}.00</b></dd>
                                </div>
                                {cartData.length>0 ? 
                                    <div className="flex gap-6 justify-between text-sm ">
                                        <dt>Shipping: </dt>
                                        <dd className='font-bold text-black'>₱ <b>{shippingFee}.00</b></dd>
                                    </div>
                                :null}
                                <div className="flex gap-6 border-t py-2 justify-between !text-base font-medium">
                                    <dt>Total: </dt>
                                    <dd className='font-bold text-black'>₱ <b>{cartTotal}.00</b></dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className='sm:order-1 order-2'>
                    <CheckoutDetails cartData={cartData} cartTotal={cartTotal} shippingFee={shippingFee} subTotal={subTotal}/>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default CartDetails