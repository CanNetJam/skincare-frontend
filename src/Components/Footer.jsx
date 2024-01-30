import React, { useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";
import img1 from '../assets/Compressed-Webp/Klued-logo-min.webp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Footer() {
    const [ email, setEmail ] = useState("")

    async function submitHandler(e) {
        e.preventDefault()
        try {
        const loadingNotif = async function myPromise() {
            const passEmail = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/emails/submit-email`, {email})
            setEmail("")
        }
        toast.promise(
            loadingNotif,
            {
                pending: 'Processing subscription...',
                success: 'Successfully subscribed!',
                error: 'Subscription failed!'
            }
        )
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
                <li><Link to="/knowledge-base" className='hover:text-slate-200'>Employee Portal</Link></li>
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
            <h1 className='text-slate-400 text-sm'>© 2023 Klued. All rights reserved.</h1>
            </div>
        </div>
        </div>
    )
}