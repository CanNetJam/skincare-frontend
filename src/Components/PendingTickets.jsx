import React, { useState, useContext } from 'react';
import {UserContext} from "../App";
import moment from "moment";
import ImageZoom from '../Modals/ImageZoom';
import { Link } from 'react-router-dom';
import PageButtons from './PageButtons';
import EmptyContent from './EmptyContent';

export default function PendingtTickets({tickets, page, setPage, pages, pageEntries, total, setPageEntries, tab}) {
    const { userData, setUserData } = useContext(UserContext)
    const [ openPageCount, setOpenPageCount ] = useState(false)
    const [ toZoom, setToZoom] = useState("")
    const [ zoomId, setZoomId] = useState("")
    const [ isZoom, setIsZoom ] = useState(false)
    const [ showMore, setShowMore ] = useState(false)
    const [ showMoreId, setShowMoreId ] = useState("")
    const [ pageButtons, setPageButtons] = useState([])
    const [ displayedPages, setDisplayedPages ] = useState(5)
    const [ zoomType, setZoomType] = useState("")

    return (
        <div className='h-full sm:w-auto w-screen pb-6 px-4'>
            {isZoom && (
                <ImageZoom isZoom={isZoom} setIsZoom={setIsZoom} toZoom={toZoom} zoomId={zoomId} setZoomId={setZoomId} zoomType={zoomType}/>
            )}  
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Ticket Details
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Waybill
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Parcel Images
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets?.length>0 ? 
                            <>
                                {tickets.map((a, index)=> {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td scope="row" className="px-6 py-4">
                                                <b className='whitespace-nowrap'>Order Id</b>: {a.orderid._id}<br/>
                                                <b>Submitted on</b>: {moment(a.createdAt).format('MMM-DD-YYYY on h:mm A')}<br/>
                                                <b>Reason</b>: <span className='text-red-400 font-semibold'>{a.mainreason}</span><br/>
                                                <b>Description</b>:<br/>
                                                <span className={`${showMore===true && showMoreId===a._id ? 'line-clamp-none' : 'line-clamp-3'} whitespace-pre-line px-2`}>
                                                    {a.description}
                                                </span>
                                                {showMore!==true || showMoreId!==a._id ? 
                                                    <b onClick={()=>{
                                                        setShowMoreId(a._id)
                                                        setShowMore(true)
                                                        }} className='cursor-pointer px-2'>Read more</b> 
                                                :null}
                                                {showMore===true && showMoreId===a._id ? 
                                                    <b onClick={()=>{
                                                        setShowMore(false)
                                                        }} className='cursor-pointer px-2'>Read less</b> 
                                                :null}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='h-40 w-40 rounded-md overflow-hidden'>
                                                    <img onClick={()=> {
                                                        setIsZoom(true)
                                                        setToZoom(a?.waybillimage)
                                                        setZoomId(a._id)
                                                        setZoomType("String")
                                                    }} className='h-full w-full object-cover cursor-pointer' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a?.waybillimage}.jpg`}></img>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='flex items-center gap-2'>
                                                    <div className='h-40 w-40 rounded-md overflow-hidden'>
                                                        <img onClick={()=> {
                                                        setIsZoom(true)
                                                        setToZoom(a?.productimage1)
                                                        setZoomId(a._id)
                                                        setZoomType("String")
                                                        }} className='h-full w-full object-cover cursor-pointer' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a?.productimage1}.jpg`}></img>
                                                    </div>
                                                    <div className='h-40 w-40 rounded-md overflow-hidden'>
                                                        <img onClick={()=> {
                                                        setIsZoom(true)
                                                        setToZoom(a?.productimage2)
                                                        setZoomId(a._id)
                                                        setZoomType("String")
                                                        }} className='h-full w-full object-cover cursor-pointer' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a?.productimage2}.jpg`}></img>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='h-40 w-40 rounded-md overflow-hidden'>
                                                    <b>Status</b>: <span className={`${a.status==="Pending" ? 'text-blue-400' : a.status==="Approved" ? 'text-green-400' : 'text-red-400'} font-semibold`}>{a.status}</span><br/>
                                                    {a.status==="Rejected" ? 
                                                        <>
                                                            <b>Response</b>: <span className='text-blue-400 font-semibold'>{a.response}</span>
                                                        </>
                                                    :null}
                                                    {a.status==="Pending" && userData.user?._id===a.orderid.userid ?
                                                        <label className='italic py-2 text-center'>Note: Please send back the item to the Klued headquarters to further amplify your chances of a successful refund.</label>
                                                    :null}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap grid w-auto justify-center items-center">
                                                <button className="font-medium text-blue-500 dark:text-blue-400 hover:underline"><Link to={`/order-details/${a.orderid._id}`} className='hover:underline cursor-pointer'>View Order Details</Link></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                        :null}
                    </tbody>
                </table>
            </div>
            {tickets.length<=0 ?
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
                                            <label onClick={()=>setPageEntries(5)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">5</label>
                                        </li>
                                        <li>
                                            <label onClick={()=>setPageEntries(10)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">10</label>
                                        </li>
                                        <li>
                                            <label onClick={()=>setPageEntries(50)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">50</label>
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
