import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from 'react-router';
import axios from "axios";
import Routines from "../Components/Routines";
import Precautions from "../Components/Precautions";
import DoDonts from "../Components/DoDonts";
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import Usage from '../Components/Usage';
import OrderNow from '../Components/OrderNow';
import { UserContext } from "../App";
import EmailSubscription from '../Modals/EmailSubscription';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductReview from "../Components/ProductReview";

export default function Product1() {
    const { userData, setUserData } = useContext(UserContext)
    const location = useLocation()
    const {id} = useParams()
    const [ productData, setProductData ] = useState({})
    const [ quantity, setQuantity ] = useState(1)
    const [ isOpen, setIsOpen ] = useState(false)
    
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
        const showPopup = () => {
        let token = localStorage.getItem("auth-token")
        if (token === null){
            localStorage.setItem("auth-token", "")
            token = ""
        }

        if (token==="" || token===null || token===undefined) {
            setTimeout(()=>{
                setIsOpen(true)
            }, 5000)
        }
        }
        showPopup()
    }, [])
    
    useEffect(()=> {
        const getProduct = async () => {
            try {
                const product = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/product/get-product`, {params: {
                    productid: id ? id : location.state.productid
                }})
                setProductData(product.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProduct()
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
                type: "single",
                product: {
                    _id: pack._id,
                    name: pack.name,
                    displayimage: pack.displayimage,
                    price: pack.price,
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
                                type: "single",
                                product: {
                                    _id: pack._id,
                                    name: pack.name,
                                    displayimage: pack.displayimage,
                                    price: pack.price,
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
            <div>
                <Navbar/>
            </div>
            {isOpen && (
                <EmailSubscription isOpen={isOpen} setIsOpen={setIsOpen}/>
            )}
            <div className="h-full w-full sm:flex grid grid-cols-3 container max-w-6xl mx-auto gap-0">
                <div className="bg-gray-50 backdrop-blur-xs bg-opacity-50 min-h-[200vh] h-auto w-full col-span-2 sm:px-20 z-10 px-4 py-16">
                    <div className="py-8">
                        <h1 className="subHeading">{productData.name}</h1>
                        <h1 className="smallText text-gray-700 my-4">₱ <b>{productData.price}.00</b></h1>
                        <p className="miniText whitespace-pre-wrap break-normal text-justify">{productData.maindesc}</p>
                    </div>
                    <div>
                        <div className="grid grid-cols-3 gap-4">
                            <label htmlFor="quantity-input" className="col-span-1 block text-center text-sm font-medium text-gray-900 dark:text-white"><b>Qantity:</b></label>
                            <label className="col-span-2 flex justify-center">
                                {productData.stock!==0 ? 
                                    <>
                                        {productData.stock} <span className="text-xs">items left</span>
                                    </>
                                : <>Out of stock.</>}
                            </label>
                        </div>
                        <div className="grid grid-cols-2 sm:grid sm:grid-cols-3 sm:gap-4 gap-1 h-12 w-full">
                            <div className="w-full sm:col-span-1">
                                <div className="relative max-w-sm h-full w-full flex items-center justify-center">
                                    <input readOnly value={quantity} disabled type="number" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-100 border-x-0 border-gray-300 h-full text-gray-900 text-base focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center rounded-lg" placeholder="99" required/>
                                    <div className="grid absolute right-0">
                                        <button onClick={()=>setQuantity(prev=>prev+1)} disabled={quantity<productData.stock ? quantity<4 ? false : true : true} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-t-lg p-2 h-6 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
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
                                <button onClick={()=>handleAddToCart(productData)} disabled={quantity<productData.stock ? false : true} className={`${quantity>productData.stock ? 'bg-gray-900 text-gray-400' : 'bg-blue-400 before:bg-yellow-200 before:-z-10 z-0 text-slate-50 transition-colors before:absolute before:left-0 before:top-0 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:duration-300 hover:text-black before:hover:scale-x-100 overflow-hidden relative'} text-center py-1 h-full w-full sm:px-3 px-1 font-bold rounded-lg `}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="flex justify-center"><h3 className="subHeading">Key Ingredients</h3></div>
                    <br/>
                    {productData.ingredients?.map((a, index)=> {
                        return (
                            <div key={index} className="w-full grid justify-center my-8 rounded-xl p-4">
                                <div className="flex justify-center">
                                    <img className='h-[25vh] sm:w-[250px] rounded-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_80/${a.photo}.jpg`}></img>
                                </div>
                                <br/>
                                <div className="w-full">
                                    <h5 className="contentHeading text-blue-400 text-center">{a.name}</h5>
                                    <p className="tinyText sm:text-center text-justify mt-4 first-letter:uppercase">{a.desc}</p>
                                </div>
                            </div>
                        )   
                    })}

                </div>
                <div className='h-screen w-full sticky top-0 col-span-1 items-center sm:overflow-hidden'>
                    {productData?.displayimage ? 
                        <img className='h-full w-full object-cover z-10 overflow-visible' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_60/${productData.displayimage}.jpg`}></img>
                    :null}
                </div>
            </div>
            <Usage usage={productData?.usage} extra={productData?.extra} moreimage={productData?.moreimage ? productData.moreimage : []}/>
            <Routines routines={productData?.routines}/>
            {productData?.do ?
                <>
                    {productData.do[0]!==undefined && productData.dont[0]!==undefined ? 
                        <DoDonts proddo={productData?.do ? productData?.do : []} proddont={productData?.dont ? productData?.dont : []}/>
                    :null}
                </>
            :null}
            <Precautions />
            <ProductReview id={id} secondid={location.state?.productid} mode={"View"}/>
            <OrderNow productlinks={productData?.productlinks}/>
            <Footer/>
        </>
    )
}