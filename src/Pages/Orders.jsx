import React, { useState, useEffect } from 'react';
import PendingOrders from '../Components/PendingOrders';
import DeliveryDetails from '../Components/DeliveryDetails';
import { useParams } from 'react-router';
import axios from "axios";

export default function Orders() {
    const {id} = useParams()
    const [ tab, setTab ] = useState("Pending Orders")
    const [ orders, setOrders ] = useState([])
    const [ page, setPage ] = useState(0)
    const [ pages, setPages ] = useState(0)
    const [ pageEntries, setPageEntries ] = useState(10)
    const [ total, setTotal ] = useState(0)
    const [ isEdit, setIsEdit ] = useState(false)
    const [ isReview, setIsReview ] = useState(false)
    const [ toReview, setToReview ] = useState(false)
    const [ openReminder, setOpenReminder ] = useState(true)

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
        const openReminder = () => {   
            setTimeout(()=> {
                setOpenReminder(true)
            }, 60000)
        }
        openReminder()
    }, [orders, openReminder===false])

    useEffect(()=> {
        const getOrders = async () => {   
            try {
                let token = localStorage.getItem("auth-token")
                const res = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/orders/${id}/${tab}`, 
                { headers: { "Content-Type": "application/json", "auth-token": token }, params: {
                    page: page,
                    limit: pageEntries
                }})

                if (res.data) {
                    setOrders(res.data.sortedOrders)
                    setPages(res.data.totalOrders)
                    setTotal(res.data.total)
                    setToReview(res.data.toReview)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getOrders()
    }, [tab, page, pageEntries, isEdit, isReview])

    return (
        <>
            <div className='pt-16 min-h-screen h-auto grid items-center'>
                <div className='h-full py-2 w-full container mx-auto'>
                    <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>Manage your Orders</h1>
                    <ul className="sm:flex sm:flex-wrap grid grid-cols-3 sm:text-sm text-xs font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        <li className="">
                            <button onClick={()=> {
                                setTab("Pending Orders")
                                setPage(0)
                            }} aria-current="page" className={`${tab==="Pending Orders" ? 'text-blue-600 bg-gray-100' : null} inline-block sm:p-4 p-2 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>Pending Orders</button>
                        </li>
                        <li className="">
                            <button onClick={()=> {
                                setTab("Purchase History")
                                setPage(0)
                            }} aria-current="page" className={`${tab==="Purchase History" ? 'text-blue-600 bg-gray-100' : null} inline-block sm:p-4 p-2 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>Purchase History</button>
                        </li>
                        <li className="">
                            <button onClick={()=> setTab("Delivery Details")} aria-current="page" className={`${tab==="Delivery Details" ? 'text-blue-600 bg-gray-100' : null} inline-block sm:p-4 p-2 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>Delivery Details</button>
                        </li>
                    </ul>
                    <br/>
                    {tab==="Pending Orders" || tab==="Purchase History" ?
                        <PendingOrders 
                            orders={orders} 
                            page={page}
                            setPage={setPage}
                            pages={pages}
                            pageEntries={pageEntries}
                            setPageEntries={setPageEntries}
                            total={total}
                            tab={tab}
                            isEdit={isEdit}
                            setIsEdit={setIsEdit}
                            isReview={isReview}
                            setIsReview={setIsReview}
                        />
                    : null}
                    {tab==="Delivery Details" ? 
                        <DeliveryDetails/>
                    : null}
                </div>
                    <div className={`${toReview===true && openReminder===true ? 'scale-100' : 'scale-0' } transition-transform duration-500 ease-in-out h-auto sm:w-96 w-[96%] sm:mx-0 mx-2 py-4 px-2 bg-slate-800 text-white text-base grid items-center text-center rounded-lg fixed top-20 sm:right-4`}>
                        <svg onClick={()=>setOpenReminder(false)} className='absolute top-2 right-2 sm:h-6 sm:w-6 h-4 w-4 cursor-pointer fill-current text-gray-300 hover:text-white' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                        <p className='sm:text-base text-sm'>An item in your inventory has not been reviewed yet. Hurry now and review it to gain up to ₱10.00 discount voucher.</p>
                    </div>
            </div>
        </>
    )
}