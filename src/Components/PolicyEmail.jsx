import React, { useState } from 'react';
import axios from "axios";
import moment from "moment";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PolicyEmail({userData, policytitle}) {
    const [ checked, setChecked ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const loadingNotif = async function myPromise() {
                setLoading((prevBool) => !prevBool)
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
                    setLoading(false)
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
                    <button disabled={checked===true && loading===false ? false : true} type='submit' className={`${checked===true && loading===false ? 'hover:bg-blue-600 dark:hover:bg-primary-700' : 'bg-gray-400'} w-auto text-white bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:focus:ring-primary-800 flex gap-2`}>
                        {loading===true ? 
                            <div role="status">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        :null}
                        Confirm
                    </button>
                </div>
            </form>
        </>
    )
}
