import React, { useState, useEffect } from 'react';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import { useParams } from 'react-router';
import axios from "axios";
import PendingTickets from '../Components/PendingTickets';

export default function Tickets() {
    const {id} = useParams()
    const [ tab, setTab ] = useState("Pending Tickets")
    const [ tickets, setTickets ] = useState([])
    const [ page, setPage ] = useState(0)
    const [ pages, setPages ] = useState(0)
    const [ pageEntries, setPageEntries ] = useState(5)
    const [ total, setTotal ] = useState(0)

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [tab, pageEntries, page])

    useEffect(()=> {
        const resetPage = () => {   
            setPage(0)
        }
        resetPage()
    }, [pageEntries])

    useEffect(()=> {
        const getOrders = async () => {   
            try {
                let token = localStorage.getItem("auth-token")
                const res = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/tickets/${id}/${tab}`, 
                { headers: { "Content-Type": "application/json", "auth-token": token }, params: {
                    page: page,
                    limit: pageEntries
                }})

                if (res.data) {
                    setTickets(res.data.sortedTickets)
                    setPages(res.data.totalTickets)
                    setTotal(res.data.total)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getOrders()
    }, [tab, page, pageEntries])

    return (
        <>
            <Navbar/>
            <div className='pt-16 min-h-screen h-auto grid items-center'>
                <div className='h-full py-2 w-full container mx-auto'>
                <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>My Tickets</h1>

                    <ul className="sm:flex sm:flex-wrap grid grid-cols-2 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        <li className="me-2">
                            <button onClick={()=> {
                                setTab("Pending Tickets")
                                setPage(0)
                            }} aria-current="page" className={`${tab==="Pending Tickets" ? 'text-blue-600 bg-gray-100' : null} inline-block sm:p-4 p-2 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>Pending Tickets</button>
                        </li>
                        <li className="me-2">
                            <button onClick={()=> {
                                setTab("Ticket Records")
                                setPage(0)
                            }} aria-current="page" className={`${tab==="Ticket Records" ? 'text-blue-600 bg-gray-100' : null} inline-block sm:p-4 p-2 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>Ticket Records</button>
                        </li>
                    </ul>
                    <br/>
                    <PendingTickets 
                        tickets={tickets} 
                        page={page}
                        setPage={setPage}
                        pages={pages}
                        pageEntries={pageEntries}
                        setPageEntries={setPageEntries}
                        total={total}
                        tab={tab}
                    />
                </div>
            </div>
            <Footer/>
        </>
    )
}
