import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import moment from "moment";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Vouchers({openVouchers, setOpenVouchers}) {
    const [ search, setSearch ] = useState("")
    const [ vouchers, setVouchers] = useState([])
    const [ isEdit, setIsEdit ] = useState(false)
    const [ status, setStatus ] = useState("")
    const [ expiration, setExpiration ] = useState("")
    const [ editId, setEditId] = useState("")

    useEffect(() => {
        let isCancelled = false
        const getVouchers = async () => {
            try {
                let token = localStorage.getItem("auth-token")
                const getAccounts = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/vouchers/all-vouchers`, 
                {params: {
                    searchString: search
                }, 
                headers: {"auth-token": token}})
                setVouchers(getAccounts.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (search.length === 0 || search.length > 2) getVouchers()
        return ()=> {
            isCancelled = true
        }
    }, [search, isEdit])

    async function submitHandler(e) {
        e.preventDefault()
        const loadingNotif = async function myPromise() {
            const data = new FormData()
            
            data.append("status", status)
            data.append("expiration", expiration)
            
            let token = localStorage.getItem("auth-token")
            const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/vouchers/update-voucher/${editId}`, data, 
            { headers: { "Content-Type": "application/json", "auth-token": token } })

            setStatus("")
            setExpiration("")
            setEditId("")
            setIsEdit(false)
        }
        toast.promise(
            loadingNotif,
            {
                pending: 'Updating voucher...',
                success: 'Voucher updated.',
                error: 'Voucher update failed!'
            }
        )
    }
    
    return (
        <>
            <Transition appear show={openVouchers} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={()=>setOpenVouchers(false)}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>
        
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                            >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="sm:flex justify-between grid text-lg border-b pb-2 font-semibold leading-6 text-gray-900 items-center">
                                    Voucher List
                                    <button onClick={()=>setOpenVouchers(false)} type="button" className="border px-3 py-2 rounded-md text-sm font-semibold leading-6 hover:text-gray-700 text-gray-900">Close</button>
                                </Dialog.Title>
                                
                                <div>
                                    <div className="relative h-full py-2">
                                        <label htmlFor="voucher-search" className="sr-only">Search</label>
                                        <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                        </div>
                                        <input onChange={(e)=>setSearch(e.target.value)} type="text" id="voucher-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search voucher..."/>
                                    </div> 
                                    <br/>
                                    <div className='grid grid-cols-2 gap-2 overflow-y-auto h-96 border border-slate-400 rounded-md p-4'>
                                        {vouchers.length>0 ?
                                            <>
                                                {vouchers.map((a)=> {
                                                    return (
                                                        <div key={a._id} className='text-sm p-4 h-min w-full rounded-lg bg-gray-100 shadow-md border'>
                                                            <div className='w-full flex justify-end'>
                                                                <button onClick={()=>[setIsEdit(true), setEditId(a._id), setStatus(a.status), setExpiration(a.expiration)]} className='text-blue-400 font-bold hover:underline cursor-pointer text-base'>
                                                                    Edit
                                                                </button>
                                                            </div>
                                                            {isEdit===true && editId===a._id ? 
                                                                <form onSubmit={(e)=>submitHandler(e)} className='bg-gray-200 p-3'>
                                                                    <div className="mt-2 w-full">
                                                                        <label htmlFor='status'>Status: </label>
                                                                        <select onChange={(e)=>setStatus(e.target.value)} value={status} required id='status' name="status" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                                            <option>Used</option>
                                                                            <option>Unused</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="mt-2 w-full">
                                                                        <label htmlFor='expiration'>Expiration: </label>
                                                                        <select onChange={(e)=>setExpiration(e.target.value)} value={expiration} required id='expiration' name="expiration" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                                            <option value={a.expiration}>Current ({moment(a.expiration).format('MMMM-DD-YYYY')})</option>
                                                                            <option value={new Date(new Date(a.expiration).getTime()+86400000).toISOString()}>1 day ({moment(new Date(a.expiration).getTime()+86400000).format('MMMM-DD-YYYY')})</option>
                                                                            <option value={new Date(new Date(a.expiration).getTime()+259200000).toISOString()}>3 days ({moment(new Date(a.expiration).getTime()+259200000).format('MMMM-DD-YYYY')})</option>
                                                                            <option value={new Date(new Date(a.expiration).getTime()+604800000).toISOString()}>7 days ({moment(new Date(a.expiration).getTime()+604800000).format('MMMM-DD-YYYY')})</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className='flex justify-center gap-2 mt-4'>
                                                                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Confirm</button>
                                                                        <button onClick={()=>[setIsEdit(false), setEditId("")]} type="button" className="border border-gray-400 px-3 py-2 rounded-md text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                                                    </div>
                                                                </form>
                                                            :
                                                                <div className='flex justify-between items-center'>
                                                                    <p className={`${a.status==="Used" ? 'text-red-400' : 'text-green-400'} font-bold text-lg`}>{a.status}</p>
                                                                    <p>Exp: {moment(a.expiration).format('MMMM-DD-YYYY')}</p>
                                                                </div>
                                                            }
                                                            <div className='bg-white p-4 my-4'>
                                                                <p className='text-4xl font-bold text-center py-2'>{a.encryptedvoucher} </p>
                                                                <div className='grid justify-center text-gray-700'>
                                                                    <p className='text-center'>{a.discounttype==="Flat" ? '₱'+(a.amount).toFixed(2)+" off" : a.amount+'% off'} </p>
                                                                    <p className='text-center'>Atleast {'₱'+(a.minimum).toFixed(2)} spent </p>
                                                                </div>
                                                            </div>
                                                            {a.status==="Used" ?
                                                                <div>
                                                                    <div>
                                                                        <b>Used by:</b> <br/>
                                                                        <Link target="_blank" to={`/accounts/profile/${a?.userid}`} className="text-blue-400 hover:underline">{a.userid}</Link>
                                                                    </div>
                                                                    <div>
                                                                        <b>Used on Order:</b> <br/>
                                                                        <Link target="_blank" to={`/order-details/${a.orderid}`} className="text-blue-400 hover:underline">{a.orderid}</Link>
                                                                    </div>
                                                                </div>
                                                            :null}
                                                        </div>
                                                    )
                                                })}
                                            </>
                                        :null}
                                    </div>
                                </div>
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
