import React, { useState } from 'react';
import moment from "moment";
import DateRangePickerComp from './DateRangePickerComp';
import ImageZoom from '../Modals/ImageZoom';
import EditTicket from '../Modals/EditTicket';
import PageButtons from './PageButtons';

export default function AdminPendingTickets({tickets, page, setPage, status, setStatus, pages, pageEntries, total, setPageEntries, tab, setDateRange, isEdit, setIsEdit}) {
    const [ openPageCount, setOpenPageCount ] = useState(false)
    const [ toEdit, setToEdit ] = useState("")
    const [ toZoom, setToZoom] = useState("")
    const [ zoomId, setZoomId] = useState("")
    const [ zoomType, setZoomType] = useState("")
    const [ isZoom, setIsZoom ] = useState(false)
    const [ showMore, setShowMore ] = useState(false)
    const [ showMoreId, setShowMoreId ] = useState("")
    const [ pageButtons, setPageButtons] = useState([])
    const [ displayedPages, setDisplayedPages ] = useState(5)

    return (
        <div className='h-full sm:w-auto w-screen pb-6 px-4'>
            {isEdit && (
                <EditTicket isEdit={isEdit} setIsEdit={setIsEdit} toEdit={toEdit}/>
            )}  
            {isZoom && (
                <ImageZoom isZoom={isZoom} setIsZoom={setIsZoom} toZoom={toZoom} zoomId={zoomId} setZoomId={setZoomId} zoomType={zoomType}/>
            )}  
            <div className='relative'>
                <DateRangePickerComp setDateRange={setDateRange}/>
            </div>
            <div className='w-full z-20 py-2 sm:flex sm:justify-between grid gap-4'>
                {tab==="Pending Tickets" ? 
                    <div className='group'>

                    </div>
                :
                    <div className='group'>
                        <div className="relative bg-blue-400 text-white text-sm font-bold py-2 px-4 min-w-[150px] whitespace-nowrap flex justify-center items-center">
                            {status!== "" ? 
                                <>
                                    {status}
                                    <svg onClick={()=>setStatus("")} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill='white' d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                                </>
                            : "Select Status"}
                            <div className="absolute left-0 top-9 w-full bg-gray-200 text-black z-10 hidden group-hover:block">
                                <label onClick={()=>setStatus("Approved")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                    Approved
                                </label>
                                <label onClick={()=>setStatus("Rejected")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                    Rejected
                                </label>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ticket Details
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Waybill
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Parcel Images
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length>0 ? 
                            <>
                                {tickets.map((a, index)=> {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">
                                                <b>{(pageEntries*page)+(index+1)}</b>
                                            </td>
                                            <td scope="row" className="px-6 py-4">
                                                <b className='whitespace-nowrap'>Ticket Id</b>: {a._id}<br/>
                                                <b className='whitespace-nowrap'>Order Id</b>: {a.orderid._id}<br/>
                                                {tab==="Pending Tickets" ? 
                                                    <div className='whitespace-nowrap'>
                                                        <b>Status</b>: <span className={`${a.status==="Pending" ? 'text-blue-400' : a.status==="Approved" ? 'text-green-400' : 'text-red-400'} font-semibold`}>{a.status}</span><br/>
                                                    </div>
                                                :null}
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
                                                        setZoomType("String")
                                                        setZoomId(a._id)
                                                    }} className='h-full w-full object-cover cursor-pointer' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a?.waybillimage}.jpg`}></img>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='flex items-center gap-2'>
                                                    <div className='h-40 w-40 rounded-md overflow-hidden'>
                                                        <img onClick={()=> {
                                                        setIsZoom(true)
                                                        setToZoom(a?.productimage1)
                                                        setZoomType("String")
                                                        setZoomId(a._id)
                                                        }} className='h-full w-full object-cover cursor-pointer' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a?.productimage1}.jpg`}></img>
                                                    </div>
                                                    <div className='h-40 w-40 rounded-md overflow-hidden'>
                                                        <img onClick={()=> {
                                                        setIsZoom(true)
                                                        setToZoom(a?.productimage2)
                                                        setZoomType("String")
                                                        setZoomId(a._id)
                                                        }} className='h-full w-full object-cover cursor-pointer' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a?.productimage2}.jpg`}></img>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 grid w-auto justify-center items-center">
                                                {tab==="Pending Tickets" ? 
                                                    <button onClick={()=>{
                                                        setIsEdit(true)
                                                        setToEdit(a)
                                                    }} className="font-medium text-blue-400 dark:text-blue-200 hover:underline whitespace-nowrap">Respond</button>
                                                :null}
                                                {tab!=="Pending Tickets" ? 
                                                    <div>
                                                        <b>Status</b>: <span className={`${a.status==="Pending" ? 'text-blue-400' : a.status==="Approved" ? 'text-green-400' : 'text-red-400'} font-semibold whitespace-nowrap`}>{a.status}</span><br/>
                                                        {a.status==="Rejected" ? 
                                                        <>
                                                            <b>Response</b>: <span className='text-blue-400 font-semibold'>{a.response}</span>
                                                        </>
                                                    :null}
                                                    </div>
                                                :null}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                        :null}
                    </tbody>
                </table>
            </div>
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
