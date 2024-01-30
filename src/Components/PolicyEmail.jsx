import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";

export default function PolicyEmail({userData, policytitle}) {
    const [ checked, setChecked ] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const loadingNotif = async function myPromise() {
                const emailInfo = {
                    useremail: userData?.email,
                    fullname: `${userData?.firstname +" "+ userData?.lastname}`,
                    policytitle: policytitle,
                    date: moment(new Date()).format('MMMM DD, YYYY')
                }
                let token = localStorage.getItem("auth-token")
                const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/emails/send-policy-email`, emailInfo, 
                { headers: { "Content-Type": "application/json", "auth-token": token } })
                if (res.data) {
                    setChecked(false)
                }
            }
            toast.promise(
                loadingNotif,
                {
                pending: 'Proccessing email info...',
                success: 'Email sent!',
                error: 'Email error!'
                }
            )
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <>
            <form onSubmit={handleSubmit} className='grid justify-center bg-white text-center border-2 rounded-lg p-4'>
                <div className="flex items-center">
                    <div className="flex items-center h-5">
                        <input onChange={()=>{
                            if (checked===false) {
                                setChecked(true)
                            } else if (checked===true) {
                                setChecked(false)
                            }
                        }} checked={checked===false ? false : true} id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                            You have read, understood and agreed to follow the rules and regulations written above.
                            <br/>
                            An email will be sent to your email account as a confirmation for your action.
                        </label>
                    </div>
                </div>
                <div className='flex justify-center mt-4'>
                    <button disabled={checked===true ? false : true} type='submit' className={`${checked===true ? 'hover:bg-blue-600 dark:hover:bg-primary-700' : 'bg-gray-400'} w-auto text-white bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:focus:ring-primary-800`}>Confirm</button>
                </div>
            </form>
        </>
    )
}
