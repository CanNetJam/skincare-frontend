import React, { useEffect, useState } from 'react';
import Category from "../Details/Category";
import EmailSubscription from '../Modals/EmailSubscription';
import { Helmet } from 'react-helmet-async';

export default function ProductDetails() {
    const [ cartNumber, setCartNumber ] = useState(0)
    const [ isOpen, setIsOpen ] = useState(false)
    
    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])

    useEffect(()=> {
        const showPopup = () => {
        let token = localStorage.getItem("auth-token")
        if (token === null){
            localStorage.setItem("auth-token", "")
            token = ""
        }

        if (token==="" || token===null || token===undefined) {
            setTimeout(()=>{
                setIsOpen(true)
            }, 5000)
        }
        }
        showPopup()
    }, [])

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Klued Products</title>
                <link rel="canonical" href={`${import.meta.env.DEV ? 'http://localhost:5173/' : 'https://kluedskincare.com/'}products`} />
                <meta name="description" content="New Klued products and packages available for your every skin care needs."/>
                <meta name="theme-color" content="#38bdf8"/>

                <meta property="og:title" content="Klued Products"/>
                <meta property="og:type" content="website"/>
                <meta property="og:description" content="New Klued products and packages available for your every skin care needs."/>
                <meta property="og:image" content="https://kluedskincare.com/Klued-logo.xml"/>
                <meta property="og:url" content="https://kluedskincare.com/products"/>
            </Helmet>
            {isOpen && (
                <EmailSubscription isOpen={isOpen} setIsOpen={setIsOpen}/>
            )}
            <div className="min-h-screen h-auto w-full mt-16 grid gap-2"> 
                <div className='flex justify-center'>
                    <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>Klued Products and Packages</h1>
                </div>
                <Category cartNumber={cartNumber} setCartNumber={setCartNumber}/>
            </div>  
        </div>
    )
}