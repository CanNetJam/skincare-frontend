import React, { useEffect, useState } from 'react';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import PBody from '../Policy/PBody';

export default function Policy() {
    const [ openTab, setopenTab ] = useState("General Rules")
    const [ openMenu, setOpenMenu ] = useState(true)

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [openTab])

    return (
        <div>
            <Navbar/>
            <div className='h-auto pt-16'>
                <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>Klued's Internal Policies</h1>
                <div className="z-10 sticky top-16 sm:text-lg text-xs font-semibold shadow-lg text-center text-gray-900 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 bg-white">
                    <ul className="grid grid-cols-2 justify-center -mb-px">
                        <li className="me-2">
                            <label onClick={()=>{
                                setopenTab("General Rules")
                                if(openMenu===false) {
                                    setOpenMenu(true)
                                }
                                }} className={`inline-block px-4 py-2 ${openTab==="General Rules" ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500': 'cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent'}  rounded-t-lg active `}>General Rules</label>
                        </li>
                        <li className="me-2">
                            <label onClick={()=>{
                                setopenTab("Code of Conduct")
                                if(openMenu===false) {
                                    setOpenMenu(true)
                                }
                                }} className={`inline-block px-4 py-2 ${openTab==="Code of Conduct" ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500': 'cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent'}  rounded-t-lg active `}>Code of Discipline</label>
                        </li>
                    </ul>
                </div>
                <div className='h-auto'>
                    <PBody openMenu={openMenu} setOpenMenu={setOpenMenu} openTab={openTab}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
