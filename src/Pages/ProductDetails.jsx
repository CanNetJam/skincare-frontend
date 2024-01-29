import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/TopNav';
import Category from "../Details/Category";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductDetails() {
    const [ cartNumber, setCartNumber ] = useState(0)
    
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
        <div>
            <div>
                <Navbar cartNumber={cartNumber}/>
            </div>
            <div className="min-h-screen h-auto w-full mt-16 grid gap-2"> 
                <div className='flex justify-center'>
                    <h1 className='font-bold sm:text-4xl text-2xl text-black sm:py-6 py-4'>Klued Products List</h1>
                </div>
                <Category cartNumber={cartNumber} setCartNumber={setCartNumber}/>
            </div>  
            <div>
                <Footer/>
            </div>
            <ToastContainer/>
        </div>
    )
}