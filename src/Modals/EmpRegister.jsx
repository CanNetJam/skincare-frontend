import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Example({isOpen, setIsOpen}) {
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [type, setType] = useState("")
    const [job, setJob] = useState("")
    const [department, setDepartment] = useState("")
    const [number, setNumber] = useState("")

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
        data.append("firstname", firstname)
        data.append("lastname", lastname)
        data.append("email", email)
        data.append("password", password)
        data.append("type", type)
        data.append("job", job)
        data.append("department", department)
        data.append("phone", number)
        const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://skincare-backend.onrender.com'}/accounts/register`, data, { headers: { "Content-Type": "application/json" } })
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
            setType("")
            setJob("")
            setDepartment("")
            setNumber("")
            setIsOpen(false)
        }
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={()=>setIsOpen(false)}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex sm:h-screen h-auto items-center justify-center p-4 text-center">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                            >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white sm:p-10 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg border-b pb-2 font-medium leading-6 text-gray-900 grid grid-cols-2 items-center">
                                Account Registration
                                </Dialog.Title>

                                <form className="grid grid-cols-4 gap-x-4 gap-y-2 mt-2" onSubmit={submitHandler}>
                                    <div className="col-span-4 flex justify-end mb-2">
                                        <select required onChange={e=>setType(e.target.value)} name="type" value={type} className="block w-auto mt-2 rounded-md border-0 p-1.5 shadow-sm sm:max-w-xs sm:text-sm text-sm sm:leading-6 font-medium text-gray-900 dark:text-white cursor-pointer">
                                            <option value="" disabled>Select Account Type</option>
                                            <option>Admin</option>
                                            <option>Customer</option>
                                            <option>Staff</option>
                                        </select>
                                    </div>
                                    <div className='col-span-2'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name:</label>
                                        <input required onChange={e => setFirstName(e.target.value)} value={firstname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Juan, Pedro..." />
                                    </div>
                                    <div className='col-span-2'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name:</label>
                                        <input required onChange={e => setLastName(e.target.value)} value={lastname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Dela Cruz, Garcia..." />
                                    </div>
                                    <div className='col-span-2'>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department:</label>
                                        <select required onChange={e=>setDepartment(e.target.value)} name="department" value={department} className="block w-auto mt-2 rounded-md border-0 p-1.5 shadow-sm sm:max-w-xs sm:text-sm text-sm sm:leading-6 font-medium text-gray-900 dark:text-white cursor-pointer">
                                            <option value="" disabled>Select Department</option>
                                            <option>Mountain Movers</option>
                                            <option>Customer Excellence</option>
                                            <option>Creative Tigers</option>
                                        </select>
                                    </div>
                                    <div className='col-span-2'>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job:</label>
                                        <input onChange={e => setJob(e.target.value)} value={job} type="text" name="job" id="job" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ex: Team Leader, Packer " required/>
                                    </div>
                                    <div className='col-span-2'>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact number:</label>
                                        <input onChange={e => setNumber(e.target.value)} value={number} type="text" name="number" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09029374987" required/>
                                    </div>
                                    <div className='col-span-2'>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email:</label>
                                        <input onChange={e => setEmail(e.target.value)} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                                    </div>
                                    <div className='col-span-2'>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                                        <input onChange={e => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                    </div>
                                    <div className='col-span-2'>
                                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password:</label>
                                        <input onChange={e => setCheckPassword(e.target.value)} value={checkPassword} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                    </div>
                                    <br/>
                                    <div className='col-span-4'>
                                        {password!=="" && checkPassword!=="" && password!==checkPassword ?
                                            <p className="text-red-500 font-semibold w-full my-2 text-center">Password does not match!</p>
                                        :null}
                                        <button disabled={password!=="" && checkPassword!=="" && password!==checkPassword ? true : false} type="submit" className={`w-full text-white bg-blue-500 ${password!=="" && checkPassword!=="" && password!==checkPassword ? 'hover:bg-blue-600' : null} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Create an account</button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <ToastContainer />
        </>
    )
}