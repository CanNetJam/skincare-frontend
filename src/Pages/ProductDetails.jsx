import React, { useEffect, useState } from 'react';
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
            {isOpen && (
                <EmailSubscription isOpen={isOpen} setIsOpen={setIsOpen}/>
            )}
            <div className="min-h-screen h-auto w-full mt-16 grid gap-2"> 
                <div className='flex justify-center'>
                    <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>Klued Products List</h1>
                </div>
                <Category cartNumber={cartNumber} setCartNumber={setCartNumber}/>
            </div>  
        </div>
    )
}