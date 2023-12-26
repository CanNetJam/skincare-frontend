import React, { useEffect, useState } from 'react';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import KBBody from '../KnowledgeBase/KBBody';

export default function KnowledgeBase() {
    const [ openTab, setopenTab ] = useState("Mountain Movers")
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
                <h1 className='pageTitle'>Klued Knowledge Base</h1>
                <div className="z-10 sticky top-16 text-sm font-medium shadow-lg text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 bg-white">
                    <ul className="grid grid-cols-4 justify-center -mb-px">
                        <li className="me-2">
                            <label onClick={()=>{
                                setopenTab("Mountain Movers")
                                if(openMenu===false) {
                                    setOpenMenu(true)
                                }
                                }} className={`inline-block px-4 py-2 ${openTab==="Mountain Movers" ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500': 'cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent'}  rounded-t-lg active `}>Mountain Movers</label>
                        </li>
                        <li className="me-2">
                            <label onClick={()=>{
                                setopenTab("Customer Excellence")
                                if(openMenu===false) {
                                    setOpenMenu(true)
                                }
                                }} className={`inline-block px-4 py-2 ${openTab==="Customer Excellence" ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500': 'cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent'}  rounded-t-lg active `}>Customer Excellence</label>
                        </li>
                        <li className="me-2">
                            <label onClick={()=>{
                                setopenTab("Mountain Excellence")
                                if(openMenu===false) {
                                    setOpenMenu(true)
                                }
                                }} className={`inline-block px-4 py-2 ${openTab==="Mountain Excellence" ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500': 'cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent'}  rounded-t-lg active `}>Movers/ Excellence</label>
                        </li>
                        <li className="me-2">
                            <label onClick={()=>{
                                setopenTab("Creative Tigers")
                                if(openMenu===false) {
                                    setOpenMenu(true)
                                }
                                }} className={`inline-block px-4 py-2 ${openTab==="Creative Tigers" ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500': 'cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent'}  rounded-t-lg active `}>Creative Tigers</label>
                        </li>
                    </ul>
                </div>
                <div className='h-auto'>
                    <KBBody openMenu={openMenu} setOpenMenu={setOpenMenu} openTab={openTab}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
