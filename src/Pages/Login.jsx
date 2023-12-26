import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import {UserContext} from "../App";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import img1 from '../assets/Klued-logo.png';
import img2 from '../assets/3.jpg';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';

function Login() {
  const navigate = useNavigate()
  const { userData, setUserData } = useContext(UserContext)
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  useEffect(()=> {
    const windowOpen = () => {   
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    windowOpen()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newUser = {
        email: user.email,
        password: user.password,
      }
      const loginResponse = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://skincare-backend.onrender.com'}/accounts/login`, newUser, { headers: { "Content-Type": "application/json" } })
      if (loginResponse.data) {
        setUserData({
          token: loginResponse.data.token,
          user: loginResponse.data.user,
        })
        localStorage.setItem("auth-token", loginResponse.data.token)
        localStorage.setItem("user-type", loginResponse.data.user.type)
        setUser({
          email: "",
          password: "",
        })
        navigate("/")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Navbar/>
      <div >
        <div style={{backgroundImage: `url(${img2})`}} className="bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center px-6 sm:py-16 pt-32 pb-16 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input onChange={e=>setUser({...user, email: e.target.value})} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input onChange={e=>setUser({...user, password: e.target.value})} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
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
                        <a href="#" className="text-sm font-medium text-blue-500 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                    {/*
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <Link to="/register" className="font-medium text-blue-500 hover:underline dark:text-primary-500">Sign up</Link>
                    </p>
                    */}
                </form>
              </div>
            </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Login
