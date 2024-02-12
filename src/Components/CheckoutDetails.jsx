import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../App";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../assets/Compressed-Webp/Flash.webp';
import img2 from '../assets/Compressed-Webp/J&T.webp';
import img3 from '../assets/Compressed-Webp/visa.webp';
import img4 from '../assets/Compressed-Webp/gcash.webp';

export default function CheckoutDetails({cartData, cartTotal, shippingFee, subTotal}) {
    const navigate = useNavigate()
    const { userData, setUserData } = useContext(UserContext)
    const [ firstname, setFirstName ] = useState("")
    const [ lastname, setLastName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ phone, setPhone ] = useState("")
    const [ region, setRegion ] = useState("")
    const [ province, setProvince ] = useState("")
    const [ city, setCity ] = useState("")
    const [ barangay, setBarangay ] = useState("")
    const [ postal, setPostal ] = useState("")
    const [ street, setStreet ] = useState("")
    const [ delivery, setDelivery ] = useState("Flash Express")
    const [ payment, setPayment ] = useState("")

    useEffect(()=> {
        const setDrafts = async () => {
            setFirstName(userData.user?.firstname ? userData.user?.firstname : "")
            setLastName(userData.user?.lastname ? userData.user?.lastname : "")
            setEmail(userData.user?.email ? userData.user?.email : "")
            setPhone(userData.user?.phone ? userData.user?.phone : "")
            setRegion(userData.user?.billingaddress?.region ? userData.user?.billingaddress?.region : "")
            setProvince(userData.user?.billingaddress?.province ? userData.user?.billingaddress?.province : "")
            setCity(userData.user?.billingaddress?.city ? userData.user?.billingaddress?.city : "")
            setBarangay(userData.user?.billingaddress?.barangay ? userData.user?.billingaddress?.barangay : "")
            setPostal(userData.user?.billingaddress?.postal ? userData.user?.billingaddress?.postal : "")
            setStreet(userData.user?.billingaddress?.street ? userData.user?.billingaddress?.street : "")
        }
        setDrafts()
    }, [userData])

    async function submitHandler(e) {
        e.preventDefault()
        const loadingNotif = async function myPromise() {
            const data = new FormData()
            let token = localStorage.getItem("auth-token")
            data.append("firstname", firstname)
            data.append("lastname", lastname)
            data.append("phone", phone)
            data.append("email", email)
            data.append("region", region)
            data.append("province", province)
            data.append("city", city)
            data.append("barangay", barangay)
            data.append("postal", postal)
            data.append("street", street)
            data.append("payment", payment)
            data.append("delivery", delivery)
            data.append("items", JSON.stringify(cartData))
            data.append("amounttotal", cartTotal)
            data.append("subtotal", subTotal)
            data.append("shippingfee", shippingFee)
            
            const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/orders/submit-order/${userData.user._id}`, data, 
            { headers: { "Content-Type": "application/json", "auth-token": token } })
            
            if (res.data) {
                window.location.href=res.data.data.attributes.checkout_url
            }
            // if (res.data) {
            //     localStorage.setItem("items", JSON.stringify([]))
            //     setUserData({...userData, cartNumber: 0})
            //     //navigate(`/orders/${userData.user._id}`)
            // }
        }
        toast.promise(
            loadingNotif,
            {
                pending: 'Processing order...',
                success: 'Redirecting to PayMongo Checkout.',
                error: 'Order processing failed!'
            }
        )
    }

    return (
        <>
            <div className="grid">
                <div className="bg-white p-4 rounded-xl">
                    <div className="flex justify-start text-center text-sm text-gray-500">
                        <Link
                            to="/product-details"
                            className="font-medium text-blue-600 hover:text-blue-500 text-center"
                            >
                            <span aria-hidden="true"> &larr;</span>
                            Continue Shopping
                        </Link>
                    </div>
                    <br/>

                    <form onSubmit={submitHandler}>
                        <p className="text-xl font-semibold">Payment Details</p>
                        <p className="text-gray-400">Complete your order by providing your payment details.</p>
                        <div className='grid gap-4 py-8 border-b-2'>
                            <div className='grid sm:grid-cols-2 gap-4'>
                                <div className='grid-cols-1'>
                                    <label htmlFor="firstname" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">First Name</label>
                                    <input onChange={(e)=> setFirstName(e.target.value)} value={firstname} type="text" name="firstname" id="firstname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                </div>
                                <div className='grid-cols-1'>
                                    <label htmlFor="lastname" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Last Name</label>
                                    <input onChange={(e)=> setLastName(e.target.value)} value={lastname} type="text" name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Email</label>
                                <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                            </div>

                            <div className='grid sm:grid-cols-2 gap-4'>
                                <div className='grid-cols-1'>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Phone</label>
                                    <input onChange={(e)=> setPhone(e.target.value)} value={phone} type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                </div>
                                <div className='grid-cols-1'>
                                    <label htmlFor="postal" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Postal Number</label>
                                    <input onChange={(e)=> setPostal(e.target.value)} value={postal} type="text" name="postal" id="postal" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="street" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Street</label>
                                <input onChange={(e)=> setStreet(e.target.value)} value={street} type="text" name="street" id="street" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                            </div>

                            <div className='grid sm:grid-cols-2 gap-4'>
                                <div className='grid-cols-1'>
                                    <label htmlFor="barangay" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Barangay</label>
                                    <input onChange={(e)=> setBarangay(e.target.value)} value={barangay} type="text" name="barangay" id="barangay" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                </div>
                                <div className='grid-cols-1'>
                                    <label htmlFor="city" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">City</label>
                                    <input onChange={(e)=> setCity(e.target.value)} value={city} type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                </div>
                            </div>

                            <div className='grid sm:grid-cols-2 gap-4'>
                                <div className='grid-cols-1'>
                                    <label htmlFor="province" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Province</label>
                                    <input onChange={(e)=> setProvince(e.target.value)} value={province} type="text" name="province" id="province" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                </div>
                                <div className='grid-cols-1'>
                                    <label htmlFor="region" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Region</label>
                                    <input onChange={(e)=> setRegion(e.target.value)} value={region} type="text" name="region" id="region" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                </div>
                            </div>
                        </div>
                        <br/>

                        <p className="text-xl font-semibold">Delivery Options</p>
                        <p className="text-gray-400">Select your prefered method of shipping.</p>
                        <div className='grid py-8 sm:grid-cols-2 gap-4 border-b-2'>
                            <div className="relative">
                                <input onChange={()=>setDelivery("Flash Express")} checked={delivery==="Flash Express" ? true : false} className="peer hidden" id="radio_1" type="radio" name="radio" />
                                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                                <img className="w-14 object-contain" src={img1} alt="Flash logo" />
                                <div className="ml-5">
                                    <span className="font-semibold">Flash Express</span>
                                    <p className="text-slate-500 text-sm leading-6">₱{shippingFee}.00</p>
                                </div>
                                </label>
                            </div>
                        </div>
                        <br/>

                        <p className="text-xl font-semibold">Payment Method</p>
                        <p className="text-gray-400">Decide how you would like to pay your order.</p>
                        <div className='grid sm:grid-cols-2 gap-4 py-8'>
                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                <img className="h-10 w-10 object-contain cursor-pointer" src={img3} alt="Visa/Mastercard logo" />
                                <label htmlFor="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-semibold text-gray-900 dark:text-gray-300 cursor-pointer">Credit / Debit Card</label>
                                <input onChange={()=>setPayment("Credit / Debit Card")} id="bordered-radio-1" type="radio" name="bordered-radio" className="mr-2 w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            </div>
                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                <img className="h-10 w-10 object-contain cursor-pointer" src={img4} alt="Gcash logo" />
                                <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-semibold text-gray-900 dark:text-gray-300 cursor-pointer">GCash</label>
                                <input onChange={()=>setPayment("Gcash")} id="bordered-radio-2" type="radio" name="bordered-radio" className="mr-2 w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            </div>
                        </div>
                        <div className="justify-center hidden">
                            <button disabled={delivery==="" || payment==="" ? true : false} type='submit' className={`${delivery==="" || payment==="" ? 'bg-gray-500': ' before:bg-yellow-200 before:-z-10 bg-blue-400 z-0 text-slate-50 transition-colors before:absolute before:left-0 before:top-0 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:duration-300 hover:text-black before:hover:scale-x-100 overflow-hidden'} relative text-center py-2 w-auto sm:px-10 px-1 font-bold rounded-md`}>
                                Checkout
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

/*
                            <div className="relative">
                                <input onChange={()=>setDelivery("J&T Express")} className="peer hidden" id="radio_2" type="radio" name="radio" />
                                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                                <img className="w-14 object-contain" src={img2} alt="J&T logo" />
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">J&T Express</span>
                                    <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                                </div>
                                </label>
                            </div>

                            
                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                <input onChange={()=>setPayment("Paymaya")} id="bordered-radio-3" type="radio" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="bordered-radio-3" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">PayMaya</label>
                            </div>
                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                <input onChange={()=>setPayment("Grabpay")} id="bordered-radio-4" type="radio" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="bordered-radio-4" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">GrabPay</label>
                            </div>
                            */