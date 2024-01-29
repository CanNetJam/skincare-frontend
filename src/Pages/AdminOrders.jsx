import React, { useState, useEffect } from 'react';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router';
import axios from "axios";
import AdminPendingOrders from '../Components/AdminPendingOrders';
import { addDays } from 'date-fns';

export default function AdminOrders() {
    const {id} = useParams()
    const [ tab, setTab ] = useState("Pending Orders")
    const [ orders, setOrders ] = useState([])
    const [ page, setPage ] = useState(0)
    const [ pages, setPages ] = useState(0)
    const [ pageEntries, setPageEntries ] = useState(10)
    const [ total, setTotal ] = useState(0)
    const [ deliveryType, setDeliveryType ] = useState("Flash Express")
    const [ dateRange, setDateRange] = useState({
        startDate: addDays(new Date(), -7),
        endDate: new Date
    })
    const [ isEdit, setIsEdit ] = useState(false)
    const [ deliveryStatus, setDeliveryStatus ] = useState("Seller Processing")
    
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
                const res = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/orders/all-orders`, 
                { 
                    headers: { "Content-Type": "application/json", "auth-token": token }, 
                    params: {
                        page: page,
                        limit: pageEntries,
                        tab: tab,
                        deliveryoption: deliveryType,
                        deliverystatus: deliveryStatus,
                        start: dateRange.startDate,
                        end: dateRange.endDate
                    }
                })

                if (res.data) {
                    setOrders(res.data.sortedOrders)
                    setPages(res.data.totalOrders)
                    setTotal(res.data.total)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getOrders()
    }, [tab, page, pageEntries, deliveryType, dateRange, deliveryStatus, isEdit])

    return (
        <>
            <Navbar/>
            <div className='pt-16 min-h-screen h-auto grid items-center'>
                <div className='h-full py-2 w-full container mx-auto'>
                <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>Manage All Orders</h1>

                    <ul className="sm:flex sm:flex-wrap grid grid-cols-3 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        <li className="me-2">
                            <button onClick={()=> {
                                setTab("Pending Orders")
                                setDeliveryStatus("Seller Processing")
                                setPage(0)
                            }} aria-current="page" className={`${tab==="Pending Orders" ? 'text-blue-600 bg-gray-100' : null} inline-block sm:p-4 p-2 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>Pending Orders</button>
                        </li>
                        <li className="me-2">
                            <button onClick={()=> {
                                setTab("Purchase History")
                                setDeliveryStatus("Delivered")
                                setPage(0)
                            }} aria-current="page" className={`${tab==="Purchase History" ? 'text-blue-600 bg-gray-100' : null} inline-block sm:p-4 p-2 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>Purchase Records</button>
                        </li>
                    </ul>
                    <br/>
                    {tab==="Pending Orders" || tab==="Purchase History" ?
                        <AdminPendingOrders 
                            orders={orders} 
                            page={page}
                            setPage={setPage}
                            pages={pages}
                            pageEntries={pageEntries}
                            setPageEntries={setPageEntries}
                            total={total}
                            tab={tab}
                            setDeliveryType={setDeliveryType}
                            deliveryType={deliveryType}
                            setDateRange={setDateRange}
                            isEdit={isEdit}
                            setIsEdit={setIsEdit}
                            deliveryStatus={deliveryStatus}
                            setDeliveryStatus={setDeliveryStatus}
                        />
                    : null}
                </div>
            </div>
            <Footer/>
            <ToastContainer/>
        </>
    )
}
