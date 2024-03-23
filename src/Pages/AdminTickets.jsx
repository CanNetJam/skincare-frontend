import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from "axios";
import { addDays } from 'date-fns';
import AdminPendingTickets from '../Components/AdminPendingTickets';

export default function AdminTickets() {
    const {id} = useParams()
    const [ tab, setTab ] = useState("Pending Tickets")
    const [ tickets, setTickets ] = useState([])
    const [ page, setPage ] = useState(0)
    const [ pages, setPages ] = useState(0)
    const [ pageEntries, setPageEntries ] = useState(5)
    const [ total, setTotal ] = useState(0)
    const [ status, setStatus ] = useState("Investigating")
    const [ dateRange, setDateRange] = useState({
        startDate: addDays(new Date(), -7),
        endDate: new Date
    })
    const [ isEdit, setIsEdit ] = useState(false)
    const [ search, setSearch ] = useState("")
    
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
    }, [pageEntries, search])

    useEffect(()=> {
        let isCancelled = false
        const getTickets = async () => {   
            try {
                let token = localStorage.getItem("auth-token")
                const res = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/tickets/all-tickets`, 
                { 
                    headers: { "Content-Type": "application/json", "auth-token": token }, 
                    params: {
                        page: page,
                        limit: pageEntries,
                        tab: tab,
                        status: status,
                        start: dateRange.startDate,
                        end: dateRange.endDate,
                        searchString: search
                    }
                })

                if (res.data) {
                    setTickets(res.data.sortedTickets)
                    setPages(res.data.totalTickets)
                    setTotal(res.data.total)
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (search.length === 0 || search.length > 2) getTickets()
        return ()=> {
            isCancelled = true
        }
    }, [tab, page, status, pageEntries, dateRange, isEdit, search])

    return (
        <>
            <div className='pt-16 min-h-screen h-auto grid items-center'>
                <div className='h-full py-2 w-full container mx-auto'>
                <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>Manage All Tickets</h1>

                    <ul className="relative sm:flex sm:flex-wrap grid grid-cols-2 gap-1 sm:grid-cols-3 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        <li className="order-2 me-2">
                            <button onClick={()=> {
                                setTab("Pending Tickets")
                                setStatus("Investigating")
                                setPage(0)
                            }} aria-current="page" className={`${tab==="Pending Tickets" ? 'text-blue-600 bg-gray-100' : null} inline-block sm:p-4 p-2 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>Pending Tickets</button>
                        </li>
                        <li className="order-3 me-2">
                            <button onClick={()=> {
                                setTab("Ticket Records")
                                setStatus("")
                                setPage(0)
                            }} aria-current="page" className={`${tab==="Ticket Records" ? 'text-blue-600 bg-gray-100' : null} inline-block sm:p-4 p-2 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>Ticket Records</button>
                        </li>
                        <div className='order-1 col-span-2 sm:w-auto w-full flex justify-center items-center sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2'>
                            <div className="relative h-full">
                                <label htmlFor="table-search" className="sr-only">Search</label>
                                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input onChange={(e)=>setSearch(e.target.value)} type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Ticket Id..."/>
                            </div> 
                        </div>
                    </ul>
                    <br/>
                    <AdminPendingTickets
                        tickets={tickets} 
                        page={page}
                        setPage={setPage}
                        pages={pages}
                        status={status}
                        setStatus={setStatus}
                        pageEntries={pageEntries}
                        setPageEntries={setPageEntries}
                        total={total}
                        tab={tab}
                        setDateRange={setDateRange}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                    />
                </div>
            </div>
        </>
    )
}

