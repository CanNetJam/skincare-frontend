import { Fragment, useState, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../App";
import { addDays } from 'date-fns';

export default function Example({isOpen, setIsOpen, dateRange, setDateRange}) {
    const { userData, setUserData } = useContext(UserContext)
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [type, setType] = useState("")
    const [job, setJob] = useState("")
    const [department, setDepartment] = useState("")
    const [number, setNumber] = useState("")
    const [access, setAccess] = useState([])

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
        data.append("access", JSON.stringify(access))
        const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/accounts/register`, data, { headers: { "Content-Type": "application/json" } })
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
            setDateRange({...dateRange, endDate: addDays(new Date(), +1)})
        }
    }
    
    function handleCheckbox(props) {
        let dupe
        function haha () {
            if (access[0]===undefined) {
                setAccess(prev=>prev.concat([props]))
            } else if (access[0]!==undefined) {
                for (let i = 0 ; i < access.length ; i++) {
                    if (props!==access[i]) {
                        dupe = false
                    } else {
                        dupe = true
                        return dupe
                    }
                }
            }
        }
        haha()
        if (dupe===true) {
            const filteredAccess = access.filter((a)=> a!==props)
            setAccess(filteredAccess)
        } else if (dupe===false) {
            setAccess(prev=>prev.concat([props]))
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
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white sm:p-10 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg border-b pb-2 font-medium leading-6 text-gray-900 grid grid-cols-2 items-center">
                                Account Registration
                                </Dialog.Title>

                                <form className="grid grid-cols-4 gap-x-4 gap-y-2 mt-2" onSubmit={submitHandler}>
                                    <div className="col-span-4 flex justify-end mb-2">
                                        <select required onChange={e=>setType(e.target.value)} name="type" value={type} className="block w-auto mt-2 rounded-md border-0 p-1.5 shadow-sm sm:max-w-xs sm:text-sm text-sm sm:leading-6 font-medium text-gray-900 dark:text-white cursor-pointer">
                                            <option value="" disabled>Select Account Type</option>
                                            {userData.user?.type==="Super Admin" ? <option>Super Admin</option> : null}
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
                                        <select onChange={e=>setDepartment(e.target.value)} name="department" value={department} className="block w-auto mt-2 rounded-md border-0 p-1.5 shadow-sm sm:max-w-xs sm:text-sm text-sm sm:leading-6 font-medium text-gray-900 dark:text-white cursor-pointer">
                                            <option value="" disabled>Select Department</option>
                                            <option>Mountain Movers</option>
                                            <option>Customer Excellence</option>
                                            <option>Creative Tigers</option>
                                            <option>Others</option>
                                        </select>
                                    </div>
                                    <div className='col-span-2'>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job:</label>
                                        <input onChange={e => setJob(e.target.value)} value={job} type="text" name="job" id="job" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ex: Team Leader, Packer "/>
                                    </div>
                                    <div className='col-span-4'>
                                        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Knowledge Base Access</h3>
                                        <ul onChange={e => handleCheckbox(e.target.value)} value={access} className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                <div className="flex items-center ps-3">
                                                    <input id="Mountain-Movers-list" type="checkbox" value="Mountain Movers" name="acess" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                    <label htmlFor="Mountain-Movers-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mountain Movers</label>
                                                </div>
                                            </li>
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                <div className="flex items-center ps-3">
                                                    <input id="Customer-Excellence-list" type="checkbox" value="Customer Excellence" name="acess" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                    <label htmlFor="Customer-Excellence-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Customer Excellence</label>
                                                </div>
                                            </li>
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                <div className="flex items-center ps-3">
                                                    <input id="Mountain-Excellence-list" type="checkbox" value="Mountain Excellence" name="acess" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                    <label htmlFor="Mountain-Excellence-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mountain/<br/>Excellence</label>
                                                </div>
                                            </li>
                                            <li className="w-full dark:border-gray-600">
                                                <div className="flex items-center ps-3">
                                                    <input id="Creative-Tigers-list" type="checkbox" value="Creative Tigers" name="acess" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                    <label htmlFor="Creative-Tigers-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Creative Tigers</label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='col-span-2'>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact number:</label>
                                        <input onChange={e => setNumber(e.target.value)} value={number} type="text" name="number" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09029374987" />
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
                                    <div className='col-span-4 grid gap-2 justify-center items-center'>
                                        {password!=="" && checkPassword!=="" && password!==checkPassword ?
                                            <p className="text-red-500 font-semibold w-full my-2 text-center">Password does not match!</p>
                                        :null}
                                        <div className='flex gap-2 justify-center items-center'>
                                            <button disabled={password!=="" && checkPassword!=="" && password!==checkPassword ? true : false} type="submit" className={`w-full text-white bg-blue-500 ${password!=="" && checkPassword!=="" && password!==checkPassword ? 'hover:bg-blue-600' : null} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Create an account</button>
                                            <button onClick={()=>setIsOpen(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                                        </div>
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