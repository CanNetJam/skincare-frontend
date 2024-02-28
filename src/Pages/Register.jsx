import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import img2 from '../assets/Compressed-Webp/3-min.webp';

function Register() {
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [type, setType] = useState("Customer")
    const [phone, setPhone] = useState("")
    const [ checked, setChecked ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false)
    const [ subscribe, setSubscribe ] = useState(true)

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])

    function toastErrorNotification() {
        toast.error('Email already exists!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    function toastSuccessNotification(props) {
        toast.success(`Successfully registered your account.`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    async function submitHandler(e) {
        e.preventDefault()
        
        const data = new FormData()
        data.append("firstname", firstname)
        data.append("lastname", lastname)
        data.append("email", email)
        data.append("phone", phone)
        data.append("password", password)
        data.append("type", type)
        const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/accounts/register`, data, { headers: { "Content-Type": "application/json" } })
        if (subscribe===true) {
            await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/emails/submit-email`, {email})
        }
        if (res.data===false) {
            toastErrorNotification()
        }
        if (res.data===true) {
            toastSuccessNotification(type)
            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
            setPhone("")
            setCheckPassword("")
            setType("Customer")
            setChecked(false)
            setSubscribe(true)
        }
    }

    return (
        <div>
            <Navbar/>
            <div style={{backgroundImage: `url(${img2})`}} className="bg-cover bg-no-repeat bg-center min-h-screen h-auto w-full mt-16 bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-4">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Account Registration
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name:</label>
                                    <input required onChange={e => setFirstName(e.target.value)} value={firstname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Juan, Pedro..." />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name:</label>
                                    <input required onChange={e => setLastName(e.target.value)} value={lastname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Dela Cruz, Garcia..." />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                                    <input onChange={e => setEmail(e.target.value)} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Number:</label>
                                    <input onChange={e => setPhone(e.target.value)} value={phone} type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09239648273" required/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                                    <div className="relative flex items-center">
                                        <input onChange={e => setPassword(e.target.value)} value={password} type={showPassword===false ? "password" : "text"} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                        {showPassword===false ? 
                                            <svg onClick={()=>setShowPassword(true)} className="absolute right-2 z-10 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/></svg>
                                        :
                                            <svg onClick={()=>setShowPassword(false)} className="absolute right-2 z-10 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.319 1.83c.966.943 1.803 2.014 2.474 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.297 0-2.553-.313-3.729-.849l1.247-1.096c.795.285 1.626.445 2.482.445 3.516 0 6.576-2.622 8.413-5.5-.595-.932-1.318-1.838-2.145-2.637zm-3.434 3.019c.03.197.046.399.046.605 0 2.208-1.792 4-4 4-.384 0-.756-.054-1.107-.156l1.58-1.389c.895-.171 1.621-.821 1.901-1.671zm-.058-3.818c-1.197-.67-2.512-1.077-3.898-1.077-3.465 0-6.533 2.632-8.404 5.5.853 1.308 1.955 2.567 3.231 3.549l1.728-1.519c-.351-.595-.553-1.289-.553-2.03 0-2.208 1.792-4 4-4 .925 0 1.777.315 2.455.843zm-2.6 2.285c-.378-.23-.822-.362-1.296-.362-1.38 0-2.5 1.12-2.5 2.5 0 .36.076.701.213 1.011z"/></svg>
                                        }
                                    </div>
                                    {password!=="" && password.length<6 ?
                                        <p className="text-red-500 font-semibold w-full my-2 text-center">Password should be atlest 6 characters!</p>
                                    :null}
                                    {password!=="" && password.length>16 ?
                                        <p className="text-red-500 font-semibold w-full my-2 text-center">Password should not exceed 16 characters!</p>
                                    :null}
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password:</label>
                                    <div className="relative flex items-center">
                                        <input onChange={e => setCheckPassword(e.target.value)} value={checkPassword} type={showConfirmPassword===false ? "password" : "text"} name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                        {showConfirmPassword===false ? 
                                            <svg onClick={()=>setShowConfirmPassword(true)} className="absolute right-2 z-10 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/></svg>
                                        :
                                            <svg onClick={()=>setShowConfirmPassword(false)} className="absolute right-2 z-10 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.319 1.83c.966.943 1.803 2.014 2.474 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.297 0-2.553-.313-3.729-.849l1.247-1.096c.795.285 1.626.445 2.482.445 3.516 0 6.576-2.622 8.413-5.5-.595-.932-1.318-1.838-2.145-2.637zm-3.434 3.019c.03.197.046.399.046.605 0 2.208-1.792 4-4 4-.384 0-.756-.054-1.107-.156l1.58-1.389c.895-.171 1.621-.821 1.901-1.671zm-.058-3.818c-1.197-.67-2.512-1.077-3.898-1.077-3.465 0-6.533 2.632-8.404 5.5.853 1.308 1.955 2.567 3.231 3.549l1.728-1.519c-.351-.595-.553-1.289-.553-2.03 0-2.208 1.792-4 4-4 .925 0 1.777.315 2.455.843zm-2.6 2.285c-.378-.23-.822-.362-1.296-.362-1.38 0-2.5 1.12-2.5 2.5 0 .36.076.701.213 1.011z"/></svg>
                                        }
                                    </div>
                                    {password!=="" && checkPassword!=="" && password!==checkPassword ?
                                        <p className="text-red-500 font-semibold w-full my-2 text-center">Password does not match!</p>
                                    :null}
                                </div>
                                <div className='flex justify-center items-center'>
                                    <label className="inline-flex items-center mb-5 cursor-pointer">
                                        <input type="checkbox" checked={subscribe===true ? true : false} onChange={()=>setSubscribe(!subscribe)} value={subscribe} className="sr-only peer"/>
                                        <div className="relative w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 sm:text-sm text-xs font-bold text-gray-900 dark:text-gray-300">Recieve discounts and newsletter through email</span>
                                    </label>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" onChange={()=> {
                                            if (checked===false) {
                                                setChecked(true)
                                            } else if (checked===true) {
                                                setChecked(false)
                                            }
                                        }} checked={checked===false ? false : true} aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 cursor-pointer" required/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link to="/terms-of-use" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-500">Terms and Conditions</Link></label>
                                    </div>
                                </div>
                                <button disabled={
                                    password!=="" && password.length>=6 && password.length<16 && checkPassword!=="" && password===checkPassword && checked===true ? 
                                    false : true
                                } type="submit" className={`w-full text-white ${password!=="" && password.length>=6 && checkPassword!=="" && password===checkPassword && checked===true ? 'hover:bg-blue-600 bg-blue-500' : 'bg-gray-500'} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-500">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
  }

export default Register