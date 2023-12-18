import React, { useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";
import img1 from '../assets/Klued-logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Footer() {
  const [ email, setEmail ] = useState("")

  async function submitHandler(e) {
    e.preventDefault()
    try {
      const loadingNotif = async function myPromise() {
        const passEmail = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://skincare-backend.onrender.com'}/emails/submit-email`, {email})
        console.log(passEmail.data)
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
    <div className="bg-slate-900 h-auto w-full sm:p-10 p-4">
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
            <ul className='text-slate-400'>
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
            <ul className='text-slate-400'>
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
        <div className='flex justify-center items-center'>
          <form onSubmit={submitHandler} className="w-full py-2">
            <div className="sm:flex sm:items-center sm:gap-4">
              <input
                type="email"
                id="UserEmail"
                placeholder="johndoe@gmail.com"
                onChange={e=>setEmail(e.target.value)}
                value={email}
                className="w-full p-3 text-sm rounded-md"
              />

              <button className="mt-1 w-full bg-blue-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-gray-700 sm:mt-0 sm:w-auto sm:shrink-0 rounded-md">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='grid justify-center gap-4 sm:flex sm:flex-row-reverse sm:justify-between p-6 items-center'>
        <div className='flex justify-center items-center text-slate-400 gap-8'>
          <nav ><FaFacebook size='28px'/></nav>
          <nav><FaTiktok size='28px'/></nav>
          <nav><FaInstagram size='28px'/></nav>
        </div>
        <div className='flex justify-center items-center'>
          <h1 className='text-slate-400 text-sm'>© 2023 Klued. All rights reserved.</h1>
        </div>
      </div>


      <div className='grid sm:flex justify-between p-6 items-center'>
            <div className='w-full flex justify-center items-center'>
              <Link to="/emails" className="inline-block w-[250px] text-center px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray-800 border border-gray-800 rounded hover:shadow hover:bg-gray-900 focus:outline-none focus:ring">Emails</Link>
            </div>
            <div className='w-full flex justify-center items-center'>
              <Link to="/add-product" className="inline-block w-[250px] text-center px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray-800 border border-gray-800 rounded hover:shadow hover:bg-gray-900 focus:outline-none focus:ring">Add Product</Link>
            </div>
            <div className='w-full flex justify-center items-center'>
              <Link to="/add-package" className="inline-block w-[250px] text-center px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray-800 border border-gray-800 rounded hover:shadow hover:bg-gray-900 focus:outline-none focus:ring">Add Package</Link>
            </div>
      </div>

      <ToastContainer />
    </div>
  );
}

/*
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
            <div className="col-span-2">
              <h2 className="text-3xl font-bold text-gray-100">
              Subscribe to our Newsletter to get notified for updates!
              </h2>
            </div>
            <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
              <form onSubmit={submitHandler} className="w-full">

                <div className="p-2 focus-within:ring sm:flex sm:items-center sm:gap-4">
                  <input
                    type="email"
                    id="UserEmail"
                    placeholder="johndoe@gmail.com"
                    onChange={e=>setEmail(e.target.value)}
                    value={email}
                    className="w-full focus:outline-none p-3 text-sm rounded-sm"
                  />

                  <button className="mt-1 w-full bg-gray-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-gray-700 sm:mt-0 sm:w-auto sm:shrink-0 rounded-md">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            <ul
              className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end"
            >
              <li>
                <a
                  href="https://www.facebook.com/Klued"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-300 transition hover:opacity-75"
                >
                  <span className="sr-only">Facebook</span>

                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/klued_/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-300 transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>

                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
                <li>
              </li>
            </ul>


            <div className='w-full flex justify-center items-center'>
              <Link to="/emails" className="inline-block w-[250px] text-center px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray-800 border border-gray-800 rounded hover:shadow hover:bg-gray-900 focus:outline-none focus:ring">Emails</Link>
            </div>
            <div className='w-full flex justify-center items-center'>
              <Link to="/add-product" className="inline-block w-[250px] text-center px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray-800 border border-gray-800 rounded hover:shadow hover:bg-gray-900 focus:outline-none focus:ring">Add Product</Link>
            </div>
            <div className='w-full flex justify-center items-center'>
              <Link to="/add-package" className="inline-block w-[250px] text-center px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray-800 border border-gray-800 rounded hover:shadow hover:bg-gray-900 focus:outline-none focus:ring">Add Package</Link>
            </div>
          </div>
        </div>
      </div>*/