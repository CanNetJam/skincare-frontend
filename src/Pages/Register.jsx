import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img1 from '../assets/Klued-logo.png';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';

function Register() {
    const [file, setFile] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [middlename, setMiddleName] = useState("")
    const [age, setAge] = useState(0)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [sex, setSex] = useState("Male")
    const [type, setType] = useState("Staff")
    const [candidateType, setCandidateType] = useState()
    const [citizenship, setCitizenship] = useState("Filipino")
    const [phone, setPhone] = useState()
    const CreatePhotoField = useRef()
    const [ checkTerms, setCheckTerms] = useState(false)

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
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }

    function toastSuccessNotification(props) {
      toast.success(`Successfully registered a ${props} account.`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }

    async function submitHandler(e) {
        e.preventDefault()
        
        const data = new FormData()
        if (file) {
            data.append("photo", file)
        }
        data.append("firstname", firstname)
        data.append("lastname", lastname)
        data.append("email", email)
        data.append("password", password)
        data.append("type", type)
        const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://kluedskincare-backend.onrender.com'}/accounts/register`, data, { headers: { "Content-Type": "application/json" } })
        if (res.data===false) {
            toastErrorNotification()
        }
        if (res.data===true) {
            toastSuccessNotification(type)
            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
            setCheckPassword("")
            setType("Staff")
            setCheckTerms(false)
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="min-h-screen h-auto w-full mt-16 bg-gray-50 dark:bg-gray-900">
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
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email:</label>
                                    <input onChange={e => setEmail(e.target.value)} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                                    <input onChange={e => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password:</label>
                                    <input onChange={e => setCheckPassword(e.target.value)} value={checkPassword} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                    {password!=="" && checkPassword!=="" && password!==checkPassword ?
                                        <p className="text-red-500 font-semibold w-full my-2 text-center">Password does not match!</p>
                                    :null}
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" onChange={()=> {
                                            if (checkTerms===false){
                                                setCheckTerms(true)
                                            } else {
                                                setCheckTerms(false)
                                            }
                                        }} aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link to="/terms-of-use" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-500">Terms and Conditions</Link></label>
                                    </div>
                                </div>
                                <button disabled={password!=="" && checkPassword!=="" && password!==checkPassword ? true : false} type="submit" className={`w-full text-white bg-blue-500 ${password!=="" && checkPassword!=="" && password!==checkPassword ? 'hover:bg-blue-600' : null} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-500">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            <ToastContainer />
        </div>
    )
  }

export default Register