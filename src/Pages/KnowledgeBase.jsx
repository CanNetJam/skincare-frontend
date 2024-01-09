import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import KBBody from '../KnowledgeBase/KBBody';
import { UserContext } from "../App";

export default function KnowledgeBase() {
    const { userData, setUserData } = useContext(UserContext)
    const [ openTab, setopenTab ] = useState(undefined)
    const [ openMenu, setOpenMenu ] = useState(false)

    const [ mountain, setMountain ] = useState(false)
    const [ excellence, setExcellence ] = useState(false)
    const [ mountainExcellence, setMountainExcellence ] = useState(false)
    const [ tigers, setTigers ] = useState(false)
    let tabs = userData.user?.access?.length || 1
    
    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [openTab])

    useEffect(()=> {
        const allAccess = () => {   
            for(let i=0; i<userData.user?.access?.length; i++) {
                if(userData.user?.access[i]==="Mountain Movers") {
                    setMountain(true)
                } else if(userData.user?.access[i]==="Customer Excellence") {
                    setExcellence(true)
                } else if(userData.user?.access[i]==="Mountain Excellence") {
                    setMountainExcellence(true)
                } else if(userData.user?.access[i]==="Creative Tigers") {
                    setTigers(true)
                }
            }
        }
        allAccess()
    }, [userData?.user?.access])

    return (
        <div>
            <Navbar/>
            <div className='h-auto pt-16'>
                <h1 className='pageTitle'>Klued Knowledge Base</h1>
                <div className="z-10 sticky top-16 sm:text-lg text-xs font-semibold shadow-lg text-center text-gray-900 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 bg-white">
                    
                    <ul className={`grid grid-cols-${tabs} justify-center -mb-px`}>
                        {mountain===true ? 
                            <li className="me-2">
                                <label onClick={()=>{
                                    setopenTab("Mountain Movers")
                                    if(openMenu===false) {
                                        setOpenMenu(true)
                                    }
                                    }} className={`inline-block px-4 py-2 ${openTab==="Mountain Movers" ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500': 'cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent'}  rounded-t-lg active `}>Mountain Movers</label>
                            </li>
                        :null}
                        {excellence===true ? 
                            <li className="me-2">
                                <label onClick={()=>{
                                    setopenTab("Customer Excellence")
                                    if(openMenu===false) {
                                        setOpenMenu(true)
                                    }
                                    }} className={`inline-block px-4 py-2 ${openTab==="Customer Excellence" ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500': 'cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent'}  rounded-t-lg active `}>Customer Excellence</label>
                            </li>
                        :null}
                        {mountainExcellence===true ? 
                            <li className="me-2">
                                <label onClick={()=>{
                                    setopenTab("Mountain Excellence")
                                    if(openMenu===false) {
                                        setOpenMenu(true)
                                    }
                                    }} className={`inline-block px-4 py-2 ${openTab==="Mountain Excellence" ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500': 'cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent'}  rounded-t-lg active `}>Movers/ Excellence</label>
                            </li>
                        :null}
                        {tigers===true ? 
                            <li className="me-2">
                                <label onClick={()=>{
                                    setopenTab("Creative Tigers")
                                    if(openMenu===false) {
                                        setOpenMenu(true)
                                    }
                                    }} className={`inline-block px-4 py-2 ${openTab==="Creative Tigers" ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500': 'cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent'}  rounded-t-lg active `}>Creative Tigers</label>
                            </li>
                        :null}
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
