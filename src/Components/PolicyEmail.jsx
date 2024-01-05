import React from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";

export default function PolicyEmail({userData, policytitle}) {
    let currentDate = moment(new Date()).format('MMMM DD, YYYY')
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const loadingNotif = async function myPromise() {
                const emailInfo = {
                    useremail: userData?.email,
                    fullname: `${userData?.firstname +" "+ userData?.lastname}`,
                    policytitle: policytitle,
                    date: currentDate
                }
                let token = localStorage.getItem("auth-token")
                const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/emails/send-policy-email`, emailInfo, 
                { headers: { "Content-Type": "application/json", "auth-token": token } })
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
                You have read and agreed to follow the rules and regulations written above.
                <br/>
                An email will be sent to your email account as a confirmation for your action.
                <br/>
                <div className='flex justify-center mt-4'>
                    <button type='submit' className="w-auto text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Confirm</button>
                </div>
            </form>
            <ToastContainer/>
        </>
    )
}
