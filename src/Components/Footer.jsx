import React, { useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";
import img1 from '../assets/Compressed-Webp/Klued-logo-min.webp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Footer() {
    const [ email, setEmail ] = useState("")

    function toastWarningNotification() {
        toast.warn('Thankyou for the support but this email is already subscribed!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    }

    function toastSuccessNotification() {
        toast.success('Successfully subscribed to Klued newsletter!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    }

    async function submitHandler(e) {
        e.preventDefault()
        try {
            const passEmail = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/emails/submit-email`, {email})
            if (passEmail.data===false) {
                setEmail("")
                toastSuccessNotification()
            } else if (passEmail.data===true) {
                toastWarningNotification()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-slate-900 sm:h-auto h-auto w-full sm:px-10 p-4">
            <div className='grid sm:grid sm:grid-cols-3 border-b gap-y-6 border-slate-700 py-10 sm:px-2'>
                <div className='col-span-1'>
                    <div className='h-[50px] w-[150px]'>
                    <img className='h-full w-full object-cover' src={img1}/>
                    </div>
                    <p className='text-slate-400 pl-4'>"Combining knowledge and passion to the skin"</p>

                    <div className='text-slate-400 pl-4 grid gap-1 mt-8 sm:text-sm text-xs '>
                        <p className='grid grid-cols-10 gap-1'>
                            <svg className='col-span-1' fill='#ffffff' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c-3.148 0-6 2.553-6 5.702 0 4.682 4.783 5.177 6 12.298 1.217-7.121 6-7.616 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 16l-6.707-2.427-5.293 2.427-5.581-2.427-6.419 2.427 4-9 3.96-1.584c.38.516.741 1.08 1.061 1.729l-3.523 1.41-1.725 3.88 2.672-1.01 1.506-2.687-.635 3.044 4.189 1.789.495-2.021.465 2.024 4.15-1.89-.618-3.033 1.572 2.896 2.732.989-1.739-3.978-3.581-1.415c.319-.65.681-1.215 1.062-1.731l4.021 1.588 3.936 9z"/></svg>
                            <label className='col-span-9'>2nd Floor WANJ Bldg. Don Placido Campos Ave. Brgy. San Jose Dasmarinas, Cavite 4114</label>
                        </p>
                        <p className='grid grid-cols-10 gap-1'>
                            <svg className='col-span-1' fill='#ffffff' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M14.89 23.654c-7.367 3.367-18.802-18.86-11.601-22.615l2.107-1.039 3.492 6.817-2.082 1.026c-2.189 1.174 2.37 10.08 4.609 8.994.091-.041 2.057-1.007 2.064-1.011l3.521 6.795c-.008.004-1.989.978-2.11 1.033zm-1.538-13.409l2.917.87c.223-.747.16-1.579-.24-2.317-.399-.739-1.062-1.247-1.808-1.469l-.869 2.916zm1.804-6.058c1.551.462 2.926 1.516 3.756 3.051.831 1.536.96 3.263.498 4.813l-1.795-.535c.325-1.091.233-2.306-.352-3.387-.583-1.081-1.551-1.822-2.643-2.146l.536-1.796zm.95-3.187c2.365.705 4.463 2.312 5.729 4.656 1.269 2.343 1.466 4.978.761 7.344l-1.84-.548c.564-1.895.406-4.006-.608-5.882-1.016-1.877-2.696-3.165-4.591-3.729l.549-1.841z"/></svg>
                            <label className='col-span-9'>09176680429</label>
                        </p>
                        <p className='grid grid-cols-10 gap-1'>
                            <svg className='col-span-1' fill='#ffffff' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"/></svg>
                            <label className='col-span-9'>hello@kluedskincare.com</label>
                        </p>
                    </div>
                </div>
                <div className='col-span-1'>

                </div>
                <div className='col-span-1 grid grid-cols-2 gap-10 px-4 sm:px-0'>
                    <div>
                        <div className='mb-2'>
                        <label className='font-semibold text-white'>Links</label>
                        </div>
                        <ul className='text-slate-400 sm:text-base text-sm'>
                        <li><Link to="/product-details" className='hover:text-slate-200'>Our Products</Link></li>
                        <li><Link to="/understandingyourskin" className='hover:text-slate-200'>Understanding your Skin</Link></li>
                        <li><Link to="/aboutus" className='hover:text-slate-200'>About Us</Link></li>
                        <li><Link to="/faqs" className='hover:text-slate-200'>FAQs</Link></li>
                        </ul>
                    </div>
                    <div>
                        <div className='mb-2'>
                        <label className='font-semibold text-white'>Legal</label>
                        </div>
                        <ul className='text-slate-400 sm:text-base text-sm'>
                        <li><Link to="/terms-of-use" className='hover:text-slate-200'>Terms of Use</Link></li>
                        <li><Link to="/refund-policy"  className='hover:text-slate-200'>Refund Policy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className=' grid sm:flex justify-between gap-4 sm:px-6 p-4 border-b border-slate-700'>
                <div className='max-w-[400px]'>
                <h1 className='text-white text-lg'>Subscribe to our Newsletter!</h1>
                <label className='text-slate-400'>The latest news, articles, and special discounts, sent to your inbox weekly.</label>
                </div>
                <div className='sm:w-2/5 flex justify-center items-center'>
                <form onSubmit={submitHandler} className="w-full py-2">
                    <div className="sm:flex sm:items-center sm:gap-4">
                    <input
                        type="email"
                        id="UserEmail"
                        placeholder="johndoe@gmail.com"
                        onChange={e=>setEmail(e.target.value)}
                        value={email}
                        className="w-full p-3 text-sm rounded-md"
                        required
                    />

                    <button className="mt-1 w-full bg-blue-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-gray-900 transition-none hover:bg-gray-700 hover:text-white sm:mt-0 sm:w-auto sm:shrink-0 rounded-md">
                        Subscribe
                    </button>
                    </div>
                </form>
                </div>
            </div>

            <div className='grid justify-center gap-4 sm:flex sm:flex-row-reverse sm:justify-between px-6 py-2 items-center'>
                <div className='flex justify-center items-center text-slate-400 gap-8'>
                    <a href='https://www.facebook.com/Klued' target='_blank' className='cursor-pointer hover:text-slate-300'><FaFacebook size='28px'/></a>
                    <a href='https://www.tiktok.com/@klued_' target='_blank' className='cursor-pointer hover:text-slate-300'><FaTiktok size='28px'/></a>
                    <a href='https://www.instagram.com/klued_/' target='_blank' className='cursor-pointer hover:text-slate-300'><FaInstagram size='28px'/></a>
                </div>
                <div className='flex justify-center items-center'>
                    <h1 className='text-slate-400 text-sm'>© 2024 Klued. All rights reserved.</h1>
                </div>
            </div>
        </div>
    )
}