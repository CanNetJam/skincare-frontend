import React, { useState } from 'react';
import CancelOrder from '../Modals/CancelOrder';
import { Link } from 'react-router-dom';
import PageButtons from './PageButtons';
import EmptyContent from './EmptyContent';
import Review from '../Modals/Review';

export default function PendingOrders({orders, page, setPage, pages, pageEntries, total, setPageEntries, tab, isEdit, setIsEdit, isReview, setIsReview}) {
    const [ openPageCount, setOpenPageCount ] = useState(false)
    const [ toEdit, setToEdit ] = useState("")
    const [ pageButtons, setPageButtons] = useState([])
    const [ displayedPages, setDisplayedPages ] = useState(5)
    const [ toReview, setToReview ] = useState("")

    return (
        <div className='h-auto sm:w-auto w-screen pb-6 px-4'>
            {isEdit && (
                <CancelOrder isEdit={isEdit} setIsEdit={setIsEdit} toEdit={toEdit}/>
            )} 
            {isReview && (
                <Review isReview={isReview} setIsReview={setIsReview} toReview={toReview}/>
            )} 
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
                            <th scope="col" className="px-6 py-3 text-center">
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
                                                                <label className='col-span-1 border-l px-2 grid text-center'>{b.quantity}pc(s) <br/>

                                                                </label>
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
                                                    <span className={`${a.deliverystatus==="Seller Processing" || a.deliverystatus==="In Transit" ? `text-blue-500` : a.deliverystatus==="Cancelled" ?  'text-red-500': a.deliverystatus==="Delivered" ?  'text-green-500': `text-yellow-500` } font-semibold`}>{a.deliverystatus}</span>
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
                                            <td className="px-6 py-4 grid whitespace-nowrap text-center">
                                                <button className="font-medium text-blue-500 dark:text-blue-400 hover:underline"><Link to={`/order-details/${a._id}`} className='hover:underline cursor-pointer'>View Order Details</Link></button>
                                                {a.deliverystatus==="In Transit" || a.deliverystatus==="Delivered" ?
                                                    <button className="font-medium text-blue-500 dark:text-blue-400 hover:underline"><a href={`https://www.flashexpress.ph/fle/tracking?se=${a?.trackingnumber}`} target='_blank' className='hover:underline cursor-pointer'>View Pickup Details</a></button>
                                                :null}
                                                {tab==="Pending Orders" ?
                                                    <>
                                                        {a.deliverystatus==="Seller Processing" ? 
                                                            <button onClick={()=>{
                                                                setIsEdit(true)
                                                                setToEdit(a)
                                                            }} className="font-medium text-red-500 dark:text-red-400 hover:underline">Cancel</button>
                                                        :null}
                                                    </>
                                                :
                                                    <>
                                                        {a.reviewed===false && a.deliverystatus==="Delivered" ? 
                                                            <button onClick={()=>{
                                                                setIsReview(true)
                                                                setToReview(a)
                                                            }} className="font-medium text-blue-500 dark:text-blue-400 hover:underline">Review</button>
                                                        :null}
                                                    </>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                        :
                            null
                        }
                    </tbody>
                </table>
            </div>
            {orders.length<=0 ?
                <EmptyContent/>
            : null}
            
            <nav className="sm:flex sm:flex-row-reverse grid justify-center gap-2 w-full items-center sm:justify-between pt-4" aria-label="Table navigation">
                <PageButtons
                    page={page}
                    pages={pages}
                    setPage={setPage}
                    displayedPages={displayedPages}
                    setDisplayedPages={setDisplayedPages}
                    pageButtons={pageButtons}
                    setPageButtons={setPageButtons}
                />
                <div>
                    <span className="text-sm text-center font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing{" "}
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
                                            <label onClick={()=>setPageEntries(10)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">10</label>
                                        </li>
                                        <li>
                                            <label onClick={()=>setPageEntries(50)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">50</label>
                                        </li>
                                        <li>
                                            <label onClick={()=>setPageEntries(100)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">100</label>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </button> of 
                        <span className="font-semibold text-gray-900 dark:text-white">{" "+total}</span>
                    </span>
                </div>
            </nav>
        </div>
    )
}
