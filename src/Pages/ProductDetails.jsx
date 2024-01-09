import React, { useEffect, useRef  } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/TopNav';
import Category from "../Details/Category";
import SubscriptionRedirect from '../Components/SubscriptionRedirect';

export default function ProductDetails() {
    const footerRef = useRef()

    const handleClick =() => {
      footerRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    
    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])

    return (
        <div className='mt-8'>
            <div>
                <Navbar/>
                <SubscriptionRedirect  handleClick={handleClick}/>
            </div>
            <div className="min-h-screen h-auto w-full sm:p-10 p-2 mt-24 grid gap-2"> 
                <div className='flex justify-center'>
                    <h1 className='font-bold sm:text-4xl text-2xl text-black'>Klued Products List</h1>
                </div>
                <Category/>
            </div>  
            <div ref={footerRef}>
                <Footer/>
            </div>
        </div>
    )
}