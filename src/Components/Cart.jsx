import { Fragment, useState, useContext, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { UserContext } from "../App";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart({open, setOpen}) {
    const navigate = useNavigate()
    const { userData, setUserData } = useContext(UserContext)
    const [ cartData, setCartData ] = useState([])
    const [ cartTotal, setCartTotal ] = useState(0)
    const [ exceed, setExceed ] = useState(false)

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
    }, [open])

    useEffect(() => {
        const computeTotal = async () => {
            try {
                let a = false
                function checkExceed(){
                    for (let i=0; i<cartData.length; i++){
                        if (cartData[i].quantity<=cartData[i].product.stock){
                            if (cartData[i].quantity>4){
                                return a=true
                            }
                        } else {
                            return a=true
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
                setCartTotal(total)
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
            type:  pack.type,
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
                            type:  pack.type,
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
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setOpen}>
                <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="pointer-events-auto w-[90vw] max-w-md">
                            <div className="flex h-full flex-col w-full overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto sm:px-4 px-2 py-6">
                                <div className="flex items-start justify-between">
                                    <Dialog.Title className="text-lg font-bold text-gray-900">Shopping cart ({userData.cartNumber})</Dialog.Title>
                                    <div className="ml-3 flex h-7 items-center">
                                    <button
                                        type="button"
                                        className="relative text-gray-400 hover:text-gray-500"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close panel</span>
                                        <svg height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                                    </button>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {cartData.map((product, index) => (
                                        <li key={index} className="flex py-6">
                                            <div className="sm:h-24 h-16 sm:w-24 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img className='h-full w-full object-cover object-center' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${product.product?.displayimage}.jpg`}/>
                                            </div>

                                            <div className="ml-2 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <Link to={product?.type==="single" ? `/products/${encodeURIComponent(product.product.name.replace(/\s+/g, '-').toLowerCase())}/${product.product._id}` : `/packages/${encodeURIComponent(product.product.name.replace(/\s+/g, '-').toLowerCase())}/${product.product._id}`} className='font-semibold hover:underline'>
                                                        {product.product?.name}
                                                    </Link>
                                                    <p className="ml-4">₱{product.product?.price ? (product.product.price).toFixed(2) : (product.product?.origprice).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm py-2">
                                                    <div>
                                                        <label>{product.product?.stock} <span>items left</span></label>
                                                    </div>
                                                    <div className="relative flex gap-0.5 items-center">
                                                        <p className="text-gray-500">Qty</p>
                                                        <div className='grid grid-cols-4'>
                                                            <button onClick={()=>{
                                                                if (product.quantity>1) {
                                                                    handleSubtractQuantity(product)
                                                                } else {
                                                                    handleRemoveItem(product.product, product.quantity)
                                                                }
                                                            }} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className={`${product.quantity>1 ? 'col-span-1 hover:bg-gray-200 dark:hover:bg-gray-600' : null}flex-shrink-0 bg-gray-100 dark:bg-gray-700  dark:border-gray-600 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none`}>
                                                                <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                    <path stroke="currentColor" d="M1 1h16"/>
                                                                </svg>
                                                            </button>
                                                            <input readOnly value={product.quantity} type="text" id={`counter-input`+product.product._id} data-input-counter className={`${product.quantity>product.product.stock || product.quantity>4 ? 'text-red-600 font-semibold' : null} col-span-2 flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center`}/>
                                                            <button onClick={()=>handleAddQuantity(product)} disabled={product.product?.stock>product.quantity ? product.quantity<4 ? false : true : true} type="button" id="increment-button" data-input-counter-increment="counter-input" className="col-span-1 flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                                <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                    <path stroke="currentColor" d="M9 1v16M1 9h16"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        ))}
                                    </ul>
                                    </div>
                                </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>₱ <b>{cartTotal.toFixed(2)}</b></p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6 w-full flex justify-center">
                                    <button onClick={()=> {
                                        if (userData.token!==undefined) {
                                            navigate('/cartdetails')
                                        }
                                    }} disabled={userData.token!==undefined && cartData.length>0 && ((userData.user?.billingaddress?.region!=="") && (userData.user?.billingaddress?.region!==undefined)) && exceed===false ? false : true} 
                                        className={`${userData.token!==undefined && cartData.length>0 && ((userData.user?.billingaddress?.region!=="") && (userData.user?.billingaddress?.region!==undefined)) && exceed===false ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500'} relative flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm`}>
                                        {userData.token===undefined ?
                                            <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill='white' d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z"/></svg>
                                        :null}
                                        Proceed to Checkout
                                    </button>
                                </div>
                                <div className='flex justify-center item-center gap-2 py-2'>
                                    {cartData.length>0 ? 
                                        <>
                                            {userData.token!==undefined ? 
                                                <>
                                                    {(userData.user?.billingaddress?.street==="" && userData.user?.billingaddress?.barangay==="" && userData.user?.billingaddress?.city==="" && userData.user?.billingaddress?.province==="" && userData.user?.billingaddress?.region==="" && userData.user?.billingaddress?.postal==="") ||
                                                    (userData.user?.billingaddress?.street===undefined && userData.user?.billingaddress?.barangay===undefined && userData.user?.billingaddress?.city===undefined && userData.user?.billingaddress?.province===undefined && userData.user?.billingaddress?.region===undefined && userData.user?.billingaddress?.postal===undefined) ?
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill='red' d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
                                                            <label className='text-xs'>Please fill out billing address to continue. Go to <b>My Orders</b>, then head to <b>Delivery Details</b> tab. Click <Link to={`/orders/${userData.user?._id}`} className='cursor-pointer underline'>here</Link> to redirect.</label>
                                                        </>
                                                    : null}
                                                    {exceed===true ? 
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill='red' d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
                                                            <label className='text-xs'>An item on your cart has exceeded the allowed quantity.</label>   
                                                        </>
                                                    :null}
                                                </>
                                            :                                                
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill='red' d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
                                                    <label className='text-xs'>Please login to continue. Click <Link to={`/login`} className='cursor-pointer underline'>here</Link> to redirect.</label>
                                                </>
                                            }
                                        </>
                                    :null}
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                    or{' '}
                                    <button
                                        type="button"
                                        className="font-medium text-blue-600 hover:text-blue-500"
                                        onClick={() => setOpen(false)}
                                    >
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                    </p>
                                </div>
                                </div>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
