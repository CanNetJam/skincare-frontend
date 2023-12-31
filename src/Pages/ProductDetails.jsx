import React, { useEffect } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/TopNav';
import Category from "../Details/Category";

export default function ProductDetails() {
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
            </div>
            <div className="min-h-screen h-auto w-full sm:p-10 p-2 pt-16 grid gap-2"> 
                <div className='flex justify-center'>
                    <h1 className='font-bold sm:text-4xl text-2xl text-black'>Klued Products List</h1>
                </div>
                <Category/>
            </div>  
            <Footer/>
        </div>
    )
}