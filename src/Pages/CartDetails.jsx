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
    const [initalTotal, setInitialTotal] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [shippingFee, setShippingFee] = useState(0)
    const [ exceed, setExceed ] = useState(false)
    const [ collapse, setCollapse ] = useState(true)
    const [ currentVoucher, setCurrentVoucher ] = useState("")
    const [ discount, setDiscount ] = useState(0)

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
            if(userRegion==="NATIONAL CAPITAL REGION") {
                setShippingFee(45)
            } else if (userRegion==="MIMAROPA REGION" || userRegion==="REGION 1" || userRegion==="REGION 2" || userRegion==="REGION 3" || userRegion==="CORDILLERA ADMINISTRATIVE REGION" || userRegion==="REGION IV-A" || userRegion==="REGION V") {
                setShippingFee(40)
            } else if ( userRegion==="REGION VI" || userRegion==="REGION VIII" || userRegion==="REGION VII") {
                setShippingFee(48)
            } else if (userRegion==="REGION IX" || userRegion==="REGION X" || userRegion==="REGION XI" || userRegion==="REGION XII" || userRegion==="REGION XIII" || userRegion==="BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO") {
                setShippingFee(50)
            } else {
                setShippingFee(55)
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
            let a = false
            function checkExceed(){
                for (let i=0; i<cartData.length; i++){
                    if (cartData[i].quantity<cartData[i].product.stock){
                        if (cartData[i].quantity>4){
                            return a=true
                        }
                    }
                }
            }
            checkExceed()
            if (a===false) {
                setExceed(false)
            } else if (a===true) {
                setExceed(true)
            }

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
                if (currentVoucher!=="") {
                    if (currentVoucher.type==="Discount") {
                        if (currentVoucher.discounttype==="Percentage") {
                            if (currentVoucher.minimum>total) {
                                setInitialTotal(total+shippingFee)
                                setCartTotal(total+shippingFee)
                            } else {
                                let discount = ((total)*(currentVoucher?.amount/100)).toFixed(2)
                                setDiscount(discount)
                                setInitialTotal(total+shippingFee)
                                setCartTotal((total-discount)+shippingFee)
                            }
                        } else if (currentVoucher.discounttype==="Flat") {
                            if (currentVoucher.minimum>total) {
                                setInitialTotal(total+shippingFee)
                                setCartTotal(total+shippingFee)
                            } else {
                                let discount = (currentVoucher?.amount).toFixed(2)
                                setDiscount(discount)
                                setInitialTotal(total+shippingFee)
                                setCartTotal((total-discount)+shippingFee)
                            }
                        }
                    }
                } else {
                    setCartTotal(total+shippingFee)
                }
            }
        } catch (error) {
            console.error('Error computing data:', error);
        }
        }
        computeTotal()
    }, [cartData, shippingFee, currentVoucher])

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
                
                <div className='sm:sticky sm:top-16 sm:min-h-96 mt-16 sm:mt-0 sm:h-min sm:order-2 order-1'>
                    <header className="text-center my-4">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Order Summary</h1>
                    </header>
                    {collapse===true ? 
                        <>
                            <button onClick={()=>setCollapse(!collapse)} className='bg-white border rounded-lg w-full flex justify-between items-center px-4 py-2 my-4 hover:bg-slate-50 shadow-sm'>
                                <label className='font-bold'>Hide order items</label>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg>
                            </button>
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
                                                <dd className="inline">₱ {item.product?.price ? item.product.price.toFixed(2) : item.product.origprice.toFixed(2) }</dd>
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
                                                <input readOnly value={item.quantity} type="number" id={`quantity-input`+item.product?._id} data-input-counter aria-describedby="helper-text-explanation" className={`${item.quantity>item.product.stock || item.quantity>4 ? 'text-red-600 font-semibold' : null} col-span-2 flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[3rem] text-center`} placeholder="99" required/>
                                                <button onClick={()=>handleAddQuantity(item)} disabled={item.quantity<item.product.stock ? item.quantity<4 ? false : true : true} type="button" id="increment-button" data-input-counter-increment="quantity-input" className={`${item.quantity<item.product.stock ? 'hover:bg-gray-200' : null} bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 border border-gray-300 rounded-e-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none`}>
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
                        </>
                    :<button onClick={()=>setCollapse(!collapse)} className='bg-white border rounded-lg w-full flex justify-between items-center px-4 py-2 my-4 hover:bg-slate-50 shadow-sm'>
                        <label className='font-bold'>View order items</label>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
                    </button>}
                    <div className="flex justify-end border-t border-slate-500 pt-8">
                        <div className="w-full space-y-4">
                            {currentVoucher.minimum>initalTotal ?
                                <div className='flex gap-1 justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill='red' d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
                                    <label className='text-sm text-center'>Your voucher does not meet the minimum amount of <b>₱{currentVoucher.minimum}.00</b>. It will not be used for this purchase.</label>   
                                </div>
                            :null}
                            <dl className="space-y-0.5 text-gray-700">
                                <div className="flex gap-6 justify-between">
                                    <dt>Subtotal: </dt>
                                    <dd className='font-bold text-black'>₱ <b>{subTotal.toFixed(2)}</b></dd>
                                </div>
                                {discount!==0 && currentVoucher.minimum<initalTotal ? 
                                    <div className="flex gap-6 justify-between">
                                        <dt>Discount: <span className='text-blue-500 font-bold'>{currentVoucher.discounttype==="Percentage" ? currentVoucher.amount+'%' : ' ₱'+(currentVoucher.amount).toFixed(2)}</span></dt>
                                        <dd className='font-bold text-blue-500'>- ₱ <b>{discount}</b></dd>
                                    </div>
                                :null}
                                
                                {cartData.length>0 ? 
                                    <div className="flex gap-6 justify-between">
                                        <dt>Shipping: </dt>
                                        <dd className='font-bold text-black'>₱ <b>{shippingFee.toFixed(2)}</b></dd>
                                    </div>
                                :null}
                                <div className="border-t-2 py-2 !text-base font-medium">
                                    {discount!==0 && currentVoucher.minimum<initalTotal ?
                                        <div className='flex justify-between '>
                                            <dt></dt>
                                            <dd className='font-bold text-black relative'>₱ <b>{initalTotal.toFixed(2)}</b><div className='absolute w-full border border-blue-600 top-1/2 -translate-x-1/2 left-1/2 rotate-[15deg]'></div></dd>
                                        </div> 
                                    :null}
                                    <div className='flex justify-between'>
                                        <dt>Total: </dt>
                                        <dd className='font-bold text-blue-500 text-lg'>₱ <b>{cartTotal.toFixed(2)}</b></dd>
                                    </div>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className='sm:order-1 order-2'>
                    <CheckoutDetails cartData={cartData} cartTotal={cartTotal} shippingFee={shippingFee} subTotal={subTotal} exceed={exceed} currentVoucher={currentVoucher} setCurrentVoucher={setCurrentVoucher}/>
                </div>
            </div>
        </div>
    )
}

export default CartDetails