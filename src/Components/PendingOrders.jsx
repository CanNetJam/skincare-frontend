import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PendingOrders({orders, page, setPage, pages, pageEntries, total, setPageEntries, tab}) {
    const [ openPageCount, setOpenPageCount ] = useState(false)

    function createElements(pages, page){
        var elements = [];
        for(let i =0; i < pages; i++){
            elements.push(
                <li key={i}>
                    <button disabled={page===i ? true : false} onClick={()=>setPage(i)} className={`${page===i ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700' } flex items-center justify-center px-3 h-8 leading-tight  border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                        {i+1}
                    </button>
                </li>
            )
        }
        return elements;
    }

    function toastInfoNotification() {
        toast.info(`To cancel your order, please contact hello@kluedskincare.com`, {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    function toastInfoNotification2() {
        toast.info(`Coming soon!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    return (
        <div className='h-full sm:w-auto w-screen pb-6 px-4'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Items
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payment Details
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Details
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length>0 ? 
                            <>
                                {orders.map((a, index)=> {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                <div className='min-w-[300px] grid gap-2'>
                                                    {a.items.map((b, index)=>{
                                                        return (
                                                            <div key={index} className='grid grid-cols-5 gap-2'>
                                                                <div className='flex h-[40px] w-[40px] items-center justify-center border overflow-hidden rounded-md'>
                                                                    <img className='h-full w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${b.item.displayimage}.jpg`}></img>
                                                                </div>
                                                                <label className='col-span-3'>{b.item.name}</label>
                                                                <label className='col-span-1 border-l px-2 flex items-center'>{b.quantity}pc(s)</label>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='grid gap-2'>
                                                    <label className='font-semibold'>₱{a.amountpaid}.00</label>
                                                    <label>{a.paymentoption}</label>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='grid gap-2'>
                                                    <span className='font-semibold text-blue-500'>{a.deliverystatus}</span>
                                                    <label>{a.deliveryoption}</label>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='grid gap-2'>
                                                    <label className='whitespace-nowrap'><b>Order Id</b>: {a._id}</label>
                                                    {a.trackingnumber ? 
                                                        <label className='whitespace-nowrap'><b>Tracking</b>: <a href={`https://www.flashexpress.ph/fle/tracking?se=${a.trackingnumber}`} target='_blank' className='hover:underline cursor-pointer'>{a.trackingnumber}</a></label>
                                                    :null}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {tab==="Pending Orders" ?
                                                    <button onClick={()=>toastInfoNotification()} className="font-medium text-red-500 dark:text-red-400 hover:underline">Cancel</button>
                                                :
                                                    <button onClick={()=>toastInfoNotification2()} className="font-medium text-blue-500 dark:text-blue-400 hover:underline">Review</button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                        :null}
                    </tbody>
                </table>
            </div>
            <nav className="flex w-full items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <div>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing{" "}
                        <button onClick={()=> {
                            if (openPageCount===false) {
                                setOpenPageCount(true)
                            } else {
                                setOpenPageCount(false)
                            }
                        }}className="font-semibold text-gray-900 dark:text-white px-3 rounded-md bg-gray-200 relative">
                            {(pageEntries*(page+1))-(pageEntries-1)}-{pageEntries*(page+1)}
                            
                            {openPageCount===true && (
                                <div id="dropdown" className="absolute top-5 left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <button onClick={()=>setPageEntries(10)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">10</button>
                                        </li>
                                        <li>
                                            <button onClick={()=>setPageEntries(50)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">50</button>
                                        </li>
                                        <li>
                                            <button onClick={()=>setPageEntries(100)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">100</button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </button> of 
                        <span className="font-semibold text-gray-900 dark:text-white">{" "+total}</span>
                    </span>
                </div>

                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <button disabled={page===0? true : false} onClick={()=>setPage(prev=>prev-1)} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg ${page!==0? 'hover:bg-gray-100 hover:text-gray-700' : null } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>Previous</button>
                    </li>
                    {createElements(pages, page)}
                    <li>
                        <button disabled={page===(pages-1)? true : false} onClick={()=>setPage(prev=>prev+1)} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${page!==(pages-1)? 'hover:bg-gray-100 hover:text-gray-700' : null } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>Next</button>
                    </li>
                </ul>
            </nav>
            <ToastContainer/>
        </div>
    )
}
