import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/TopNav';
import Category from "../Details/Category";
import EmailSubscription from '../Modals/EmailSubscription';

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
            <div>
                <Navbar cartNumber={cartNumber}/>
            </div>
            {isOpen && (
                <EmailSubscription isOpen={isOpen} setIsOpen={setIsOpen}/>
            )}
            <div className="min-h-screen h-auto w-full mt-16 grid gap-2"> 
                <div className='flex justify-center'>
                    <h1 className='font-bold sm:text-4xl text-2xl text-black sm:py-6 py-4'>Klued Products List</h1>
                </div>
                <Category cartNumber={cartNumber} setCartNumber={setCartNumber}/>
            </div>  
            <div>
                <Footer/>
            </div>
        </div>
    )
}