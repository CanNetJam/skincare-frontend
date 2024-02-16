import React, { useState } from 'react';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import img2 from '../assets/3.jpg';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
    const [ checked, setChecked ] = useState(false)
    const [ email, setEmail ] = useState("")

    function toastErrorNotification() {
        toast.error('Email not found!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
    }
  
    function toastSuccessNotification() {
        toast.success(`Successfully sent a new password to your email.`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loadingNotif = async function myPromise() {
            try {
                const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/accounts/reset-password/${email}`, { headers: { "Content-Type": "application/json" } })
                if(res.data==="Please check your email for the temporary password.") {
                    toastSuccessNotification()
                    setChecked(false)
                    setEmail("")
                } else {
                    toastErrorNotification()
                    setChecked(false)
                    setEmail("")
                }
            } catch (err) {
                console.log(err)
            }
        }
        toast.promise(
          loadingNotif,
            {
              pending: 'Verifying credentials...',
            }
        )
    }
    
    return (
        <>
            <Navbar/>
            <div style={{backgroundImage: `url(${img2})`}} className="bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center px-4 sm:py-16 pt-32 pb-16 mx-auto md:h-screen lg:py-0">
                <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Forgot your password?
                        </h1>
                        <p className="font-light text-gray-500 dark:text-gray-400">Enter the email address used to register your account and we will help you recover your account.</p>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input onChange={()=>{
                                        if (checked===false) {
                                            setChecked(true)
                                        } else if (checked===true) {
                                            setChecked(false)
                                        }
                                    }} checked={checked===true ? true : false} id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link to="/terms-of-use" className="font-medium text-blue-500 hover:underline dark:text-primary-500">Terms and Conditions</Link></label>
                                </div>
                            </div>
                            <button disabled={checked===true ? false : true} type='submit' className={`${checked===true ? 'hover:bg-blue-600 dark:hover:bg-primary-700' : 'bg-gray-400'} w-full text-white bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:focus:ring-primary-800`}>Reset password</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
