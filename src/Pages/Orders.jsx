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
    const [ allOrders, setAllOrders ] = useState([])
    const [ thereIsReview, setThereIsReview ] = useState(false)

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
                const res = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/orders/${id}/${tab}`, 
                { headers: { "Content-Type": "application/json", "auth-token": token }, params: {
                    page: page,
                    limit: pageEntries
                }})

                if (res.data) {
                    setOrders(res.data.sortedOrders)
                    setPages(res.data.totalOrders)
                    setTotal(res.data.total)
                    // for (let i=0; i<res.data.allOrders.length; i++) {
                    //     console.log(res.data.allOrders[i])
                    //     for (let n=0; res.data.allOrders[i].items.length; n++) {
                    //         console.log(res.data.allOrders[i].items[n])
                    //         if (res.data.allOrders[i].items[n].reviewed===false && res.data.allOrders[i].deliverystatus==="Delivered") {
                    //             setThereIsReview(true)
                    //         } else {
                    //             setThereIsReview(false)
                    //         }
                    //     }
                    // }
                    setAllOrders(res.data.allOrders)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getOrders()
    }, [tab, page, pageEntries, isEdit, isReview])
    //console.log(allOrders)
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
            </div>
        </>
    )
}

/*
                <div className='h-auto sm:w-96 w-full pt-6 pb-2 bg-slate-800 text-white text-lg flex items-center text-center rounded-lg fixed top-20 sm:right-4'>
                    <p>An item in your inventory has not been reviewed yet. Hurry and review it now to gain up to ₱10.00 discount.</p>
                </div>
*/