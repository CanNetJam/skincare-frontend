import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import {UserContext} from "../App";
import { useNavigate, Link } from 'react-router-dom';
import img2 from '../assets/Compressed-Webp/3-min.webp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

function Login() {
    const navigate = useNavigate()
    const { userData, setUserData } = useContext(UserContext)
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [ showPassword, setShowPassword ] = useState(false)

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
        toast.error('Wrong credentials!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    }

    function toastWarningNotification() {
        toast.warn('User not verified! Check your email to continue.', {
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const newUser = {
                email: user.email,
                password: user.password,
            }
            const loginResponse = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/accounts/login`, newUser, { headers: { "Content-Type": "application/json" } })
            if (loginResponse.data) {
                if (loginResponse.data.user.verified===false) {
                    toastWarningNotification()
                } else {
                    if (loginResponse.data.user.type==="Customer") {
                            let cart = JSON.parse(localStorage.getItem("items"))
    
                            if (cart === null || cart.length<1){
                                setUserData({
                                    token: loginResponse.data.token,
                                    user: loginResponse.data.user,
                                    cartNumber: loginResponse.data.cartNumber,
                                })
                                localStorage.setItem("auth-token", loginResponse.data.token)
                                localStorage.setItem("user-type", loginResponse.data.user.type)
                                localStorage.setItem("user-verified", loginResponse.data.user.verified)
                                localStorage.setItem("items", JSON.stringify(loginResponse.data.user.cart))
                            } 
                            else {
                                let token = loginResponse.data?.token
                                const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/accounts/combine-cart/${loginResponse.data?.user?._id}`, JSON.stringify(cart), 
                                { headers: { "Content-Type": "application/json", "auth-token": token } })
                                if (res.data) {
                                    let num1 = 0
                                    if (res.data.cart.length>0) {
                                        console.log(res.data.cart)
                                        for(let i=0; i<res.data.cart.length; i++){
                                            num1 = num1+res.data.cart[i]?.quantity
                                        }
                                    }
                                    setUserData({
                                        token: loginResponse.data.token,
                                        user: loginResponse.data.user,
                                        cartNumber: num1,
                                    })
                                    localStorage.setItem("auth-token", loginResponse.data.token)
                                    localStorage.setItem("user-type", loginResponse.data.user.type)
                                    localStorage.setItem("user-verified", loginResponse.data.user.verified)
                                    localStorage.setItem("items", JSON.stringify(res.data.cart))
                                }
                            }

                    } else {
                        setUserData({
                            token: loginResponse.data.token,
                            user: loginResponse.data.user,
                            cartNumber: loginResponse.data.cartNumber,
                        })
                        localStorage.setItem("items", JSON.stringify([]))
                        localStorage.setItem("auth-token", loginResponse.data.token)
                        localStorage.setItem("user-type", loginResponse.data.user.type)
                        localStorage.setItem("user-verified", loginResponse.data.user.verified)
                    }
                    setUser({
                        email: "",
                        password: "",
                    })
                    navigate("/")
                }
            } else {
                toastErrorNotification()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login to Start Shopping</title>
                <link rel="canonical" href={`${import.meta.env.DEV ? 'http://localhost:5173/' : 'https://kluedskincare.com/'}login`} />
                <meta name="description" content="Enjoy lower prices and exclusive offers when you login your account." />
                <meta name="theme-color" content="#38bdf8"/>

                <meta property="og:title" content="Login to Start Shopping"/>
                <meta property="og:type" content="website"/>
                <meta property="og:description" content="Enjoy lower prices and exclusive offers when you login your account."/>
                <meta property="og:image" content="https://kluedskincare.com/Klued-logo.xml"/>
                <meta property="og:url" content="https://kluedskincare.com/login"/>
            </Helmet>

            <div style={{backgroundImage: `url(${img2})`}} className="bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center px-6 sm:py-16 pt-32 pb-16 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input onChange={e=>setUser({...user, email: e.target.value})} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <div className="relative grid items-center">
                            <input onChange={e=>setUser({...user, password: e.target.value})} type={showPassword===false ? "password" : "text"} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                            {showPassword===false ? 
                                <svg onClick={()=>setShowPassword(true)} className="absolute right-2 z-10 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/></svg>
                            :
                                <svg onClick={()=>setShowPassword(false)} className="absolute right-2 z-10 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.319 1.83c.966.943 1.803 2.014 2.474 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.297 0-2.553-.313-3.729-.849l1.247-1.096c.795.285 1.626.445 2.482.445 3.516 0 6.576-2.622 8.413-5.5-.595-.932-1.318-1.838-2.145-2.637zm-3.434 3.019c.03.197.046.399.046.605 0 2.208-1.792 4-4 4-.384 0-.756-.054-1.107-.156l1.58-1.389c.895-.171 1.621-.821 1.901-1.671zm-.058-3.818c-1.197-.67-2.512-1.077-3.898-1.077-3.465 0-6.533 2.632-8.404 5.5.853 1.308 1.955 2.567 3.231 3.549l1.728-1.519c-.351-.595-.553-1.289-.553-2.03 0-2.208 1.792-4 4-4 .925 0 1.777.315 2.455.843zm-2.6 2.285c-.378-.23-.822-.362-1.296-.362-1.38 0-2.5 1.12-2.5 2.5 0 .36.076.701.213 1.011z"/></svg>
                            }
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <Link to="/forget-password" className="text-sm font-medium text-blue-500 hover:underline dark:text-primary-500">Forgot password?</Link>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link to="/register" className="font-medium text-blue-500 hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login
