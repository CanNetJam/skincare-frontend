import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function EmailVerification() {
    const {id} = useParams()
    const {uniqueString} = useParams()
    const [ serverMessage, setServerMessage ] = useState("")

    useEffect(()=> {
        const checkUrl = async () => {
            try {
                const verifyEmail = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/emails/verify-email/${id}/${uniqueString}`)
                setServerMessage(verifyEmail.data)
            } catch (err) {
                console.log(err)
            }
        }
        checkUrl()
    }, [])

    return (
        <div className='min-h-screen h-auto w-full bg-blue-400 px-4 flex justify-center items-center z-50'>
            <div className='border rounded-2xl p-10'>
                <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>Email Verification</h1>
                <div className='w-full flex justify-center items-center'>
                    {serverMessage==="Successfully verified your Klued Employee Portal Account" ?
                        <svg height={75} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"/></svg>
                    :
                        <svg height={75} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z"/></svg>
                    } 
                </div>
                <p className='text-white text-center my-4'>
                    <span className='font-semibold'>{serverMessage}</span>
                    <br/>
                    {serverMessage==="Successfully verified your Klued Employee Portal Account" ?
                        <>Click to login your account.</>
                    :
                        <>Click to register an account.</>
                    }
                   
                </p>
                <div className='w-full flex justify-center items-center'>
                    <Link to={serverMessage==="Successfully verified your Klued Employee Portal Account" ? "/login" : "/register"} className={`${true===true ? 'hover:bg-blue-700 dark:hover:bg-primary-700' : 'bg-gray-400'} w-auto text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:focus:ring-primary-800`}>Proceed</Link>
                </div>
            </div>
        </div>
    )
}
