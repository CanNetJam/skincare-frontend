import React, { useState, useEffect, useCallback } from 'react';
import moment from "moment";
import DateRangePickerComp from './DateRangePickerComp';
import EditOrder from '../Modals/EditOrder';
import { Link } from 'react-router-dom';
import PageButtons from './PageButtons';
import { utils, writeFile } from 'xlsx';

export default function AdminPendingOrders({orders, page, setPage, pages, pageEntries, total, setPageEntries, tab, deliveryType, setDeliveryType, setDateRange, isEdit, setIsEdit, deliveryStatus, setDeliveryStatus}) {
    const [ openPageCount, setOpenPageCount ] = useState(false)
    const [ convertedOrders, setConvertedOrders ] = useState([])
    const [ toEdit, setToEdit ] = useState("")
    const [ pageButtons, setPageButtons] = useState([])
    const [ displayedPages, setDisplayedPages ] = useState(5)

    const exportFile = useCallback(() => {
        /* generate worksheet from state */
        const ws = utils.json_to_sheet(convertedOrders)
        /* create workbook and append worksheet */
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Order Template")
        /* export to XLSX */
        writeFile(wb, `All ${tab} Orders (${moment(Date.now()).format('MM-DD-YYYY')}).xlsx`)
    }, [convertedOrders])

    useEffect(()=>{
        const convertOrders = () => {
            setConvertedOrders([])
            orders.map((a)=> {
                //for(let i=0; i<a.items.length; i++) {
                    let itemsArray = []
                    for (let i=0; i<a.items.length; i++) {
                        let itemPlusQuantity = a.items[i].item.name+" x"+a.items[i].quantity+` pc${a.items[i].quantity>1 ? 's' : ''}.`
                        itemsArray.push(itemPlusQuantity)
                    }

                    let obj = {
                        Customer_order_number: a._id,
                        '*Consignee_name': a.owner,
                        // item: a.items[i].item.name,
                        // quantity: a.items[i].quantity,
                        // price: a.items[i].price,
                        // amountpaid: a.amountpaid,
                        // amounttotal: a.amounttotal,
                        '*Address': `${a?.billingaddress?.street!=='Not applicable' ? a?.billingaddress?.street : ""} ${a?.billingaddress?.barangay!=='Not applicable' ? a?.billingaddress?.barangay : ""}  ${a?.billingaddress?.city!=='Not applicable' ? a?.billingaddress?.city : ""} ${a?.billingaddress?.province!=='Not applicable' ? a?.billingaddress?.province : ""} ${a?.billingaddress?.region!=='Not applicable' ? a?.billingaddress?.region : ""} ${a?.billingaddress?.postal}`,
                        // region: a.billingaddress.region, 
                        // province: a.billingaddress.province, 
                        // city: a.billingaddress.city, 
                        // barangay: a.billingaddress.barangay, 
                        // postal: a.billingaddress.postal,
                        // street: a.billingaddress.street,
                        '*Phone_number': a.phone,
                        Phone_number2: null,
                        COD: a.paymentoption==="COD" ? a.amountpaid : 0,
                        Item_type: null,
                        '*Weight_kg': 0.5,
                        '*Length': 1,
                        '*Width': 1,
                        '*Height': 1,
                        Remark: itemsArray.toString(),
                        // owner: a.owner.substring(0, 4) + '*'.repeat(a.owner.length-4),
                    }
                    setConvertedOrders(prev=>prev.concat([obj]))
                //}
            })
        }
        convertOrders()
    }, [orders])

    return (
        <div className='h-auto sm:w-auto w-screen pb-6 px-4'>
            {isEdit && (
                <EditOrder isEdit={isEdit} setIsEdit={setIsEdit} toEdit={toEdit}/>
            )}  
            <div className='relative'>
                <DateRangePickerComp setDateRange={setDateRange}/>
            </div>
            <div className='w-full z-20 py-2 sm:flex sm:justify-between grid gap-4'>
                <div className='grid sm:flex gap-2'>
                    <div className='group'>
                        <div className="relative bg-blue-400 text-white text-sm font-bold whitespace-nowrap py-2 px-4 min-w-[150px] flex justify-center items-center">
                            {deliveryType!== "" ? 
                                <>
                                    {deliveryType}
                                    <svg onClick={()=>setDeliveryType("")} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill='white' d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                                </>
                            : "Select Courier"}
                            <div className="absolute left-0 top-9 w-full bg-gray-200 text-black z-10 hidden group-hover:block">
                                <label onClick={()=>setDeliveryType("Flash Express")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                    Flash Express
                                </label>
                                <label onClick={()=>setDeliveryType("J&T Express")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                    J&T Express
                                </label>
                            </div>
                        </div>
                    </div>
                    {tab==="Pending Orders" ? 
                        <div className='group'>
                            <div className="relative bg-blue-400 text-white text-sm font-bold py-2 px-4 min-w-[220px] whitespace-nowrap flex justify-center items-center">
                                {deliveryStatus!== "" ? 
                                    <>
                                        {deliveryStatus}
                                        <svg onClick={()=>setDeliveryStatus("")} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill='white' d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                                    </>
                                : "Select Status"}
                                <div className="absolute left-0 top-9 w-full bg-gray-200 text-black z-10 hidden group-hover:block">
                                    <label onClick={()=>setDeliveryStatus("Seller Processing")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                        Seller Processing
                                    </label>
                                    <label onClick={()=>setDeliveryStatus("In Transit")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                        In Transit
                                    </label>
                                </div>
                            </div>
                        </div>
                    :
                        <div className='group'>
                            <div className="relative bg-blue-400 text-white text-sm font-bold py-2 px-4 min-w-[220px] whitespace-nowrap flex justify-center items-center">
                                {deliveryStatus!== "" ? 
                                    <>
                                        {deliveryStatus}
                                        <svg onClick={()=>setDeliveryStatus("")} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill='white' d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                                    </>
                                : "Select Status"}
                                <div className="absolute left-0 top-9 w-full bg-gray-200 text-black z-10 hidden group-hover:block">
                                    <label onClick={()=>setDeliveryStatus("Delivered")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                        Delivered
                                    </label>
                                    <label onClick={()=>setDeliveryStatus("Cancelled")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                        Cancelled
                                    </label>
                                    <label onClick={()=>setDeliveryStatus("Returned/Refunded")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                        Returned/Refunded
                                    </label>
                                    <label onClick={()=>setDeliveryStatus("Returned to Seller")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                        Returned to Seller
                                    </label>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {tab==="Pending Orders" && deliveryStatus==="Seller Processing" ? 
                    <div className='w-full flex sm:justify-end'>
                        <button onClick={()=>exportFile()} className='mt-1 w-full bg-blue-500 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-blue-600 sm:mt-0 sm:w-auto sm:shrink-0 rounded-md'>
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" ><path fill='white' d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z"/></svg>
                        </button>
                    </div>
                :null}
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No.
                            </th>
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
                                {deliveryStatus==="Cancelled" ? 'Reason' : 'Action'}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length>0 ? 
                            <>
                                {orders.map((a, index)=> {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">
                                                <b>{(pageEntries*page)+(index+1)}</b>
                                            </td>
                                            <td scope="row" className="px-6 py-4">
                                                <div className='min-w-[300px] grid gap-2'>
                                                    {a.items.map((b, index)=>{
                                                        return (
                                                            <div key={index} className='grid grid-cols-5 gap-2'>
                                                                <div className='flex h-[40px] w-[40px] items-center justify-center border overflow-hidden rounded-md'>
                                                                    <img className='h-full w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${b.item.displayimage}.jpg`}></img>
                                                                </div>
                                                                <label className='col-span-3'>{b.item.name}</label>
                                                                <label className='col-span-1 px-2 flex '>{b.quantity}pc(s)</label>
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
                                                    <label className={`${a.deliverystatus==="Seller Processing" || a.deliverystatus==="In Transit" ? `text-blue-500` : a.deliverystatus==="Cancelled" ?  'text-red-500': a.deliverystatus==="Delivered" ?  'text-green-500': `text-yellow-500` } font-semibold`}>{a.deliverystatus}</label>
                                                    <label>{a.deliveryoption}</label>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <b className='whitespace-nowrap'>Tracking</b>: {a?.trackingnumber ? a.trackingnumber : <i>None</i>}<br/>
                                                <b className='whitespace-nowrap'>Order Id</b>:{a._id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap grid w-auto justify-center items-center">
                                                {deliveryStatus==="Cancelled" ? 
                                                <>
                                                    <p>{a?.reason}</p>
                                                    <button className="font-medium text-blue-500 dark:text-blue-400 hover:underline"><Link to={`/order-details/${a._id}`} className='hover:underline cursor-pointer'>View Order Details</Link></button>
                                                </>
                                                : 
                                                    <>
                                                        {tab==="Pending Orders" ?
                                                            <>
                                                                <button onClick={()=>{
                                                                    setIsEdit(true)
                                                                    setToEdit(a)
                                                                    }} className="font-medium text-blue-500 dark:text-blue-400 hover:underline">Update Status</button>
                                                            </>
                                                        :
                                                            null
                                                        }
                                                        {deliveryStatus==="In Transit" || deliveryStatus==="Delivered" ? 
                                                            <button className="font-medium text-blue-500 dark:text-blue-400 hover:underline"><a href={`https://www.flashexpress.ph/fle/tracking?se=${a?.trackingnumber}`} target='_blank' className='hover:underline cursor-pointer'>View Pickup Details</a></button>
                                                        :null}
                                                        <button className="font-medium text-blue-500 dark:text-blue-400 hover:underline"><Link to={`/order-details/${a._id}`} className='hover:underline cursor-pointer'>View Order Details</Link></button>
                                                    </>
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
