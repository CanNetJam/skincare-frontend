import { useState, useEffect, Fragment,  } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditOrder({isEdit, setIsEdit, toEdit}) {
    const [tracking, setTracking] = useState(toEdit?.trackingnumber ? toEdit.trackingnumber : "")
    const [status, setStatus] = useState(toEdit.deliverystatus)
    const [reason, setReason] = useState("")
    const [ loading, setLoading ] = useState(false)

    async function submitHandler(e) {
        e.preventDefault()
        const loadingNotif = async function myPromise() {
            setLoading((prevBool) => !prevBool)
            const data = new FormData()
            data.append("tracking", tracking)
            data.append("status", status)
            if (status==="Returned to Seller" || status==="Cancel Order") {
                data.append("paymentid", toEdit.paymentid)
                data.append("netamount", toEdit?.netamount)
            }
            data.append("paymentoption", toEdit?.paymentoption)
            data.append("reason", reason)
            let token = localStorage.getItem("auth-token")
            const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/orders/update-order/${toEdit._id}`, data, 
            { headers: { "Content-Type": "application/json", "auth-token": token } })
            if (res.data===true) {
                setTracking("")
                setStatus("")
                setLoading(false)
                setIsEdit(false)
            }
        }
        toast.promise(
            loadingNotif,
            {
                pending: 'Updating order...',
                success: 'Successfully updated the order.',
                error: 'Updating order error!'
            }
        )
    }

    return (
        <>
            <Transition appear show={isEdit} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={()=>setIsEdit(false)}>
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg border-b pb-2 font-semibold leading-6 text-gray-900 flex items-center">
                                    Update Order 
                                </Dialog.Title>
                                <div className='grid grid-cols-3 text-sm py-1'>
                                    <label className='col-span-1'>Order ID:</label>
                                    <label className='col-span-2 text-right'>{toEdit._id}</label>
                                </div>
                                <div className='grid grid-cols-3 text-sm py-1'>
                                    <label className='col-span-1'>Name:</label>
                                    <label className='col-span-2 text-right'>{toEdit.owner}</label>
                                </div>
                                <div className='grid grid-cols-3 text-sm py-1'>
                                    <label className='col-span-1'>Total amount paid:</label>
                                    <label className='col-span-2 text-right'>₱ {toEdit.amountpaid.toFixed(2)}</label>
                                </div>
                                <div className='grid grid-cols-3 text-sm py-1'>
                                    <label className='col-span-1'>Payment option:</label>
                                    <label className='col-span-2 text-right'>{toEdit.paymentoption}</label>
                                </div>
                                <div className='grid grid-cols-3 text-sm py-1'>
                                    <label className='col-span-1'>Billing address:</label>
                                    <label className='col-span-2 text-right'>{toEdit.billingaddress.street + ", " + toEdit.billingaddress.barangay + ", " + toEdit.billingaddress.city + ", " + toEdit.billingaddress.province + ", " + toEdit.billingaddress.region + ", " + toEdit.billingaddress.postal }</label>
                                </div>
                                <form onSubmit={submitHandler}>
                                    <div className='grid grid-cols-3 text-sm py-1'>
                                        <label className='col-span-1'>Tracking number:</label>
                                        <input required={status==="Seller Processing" || status==="Cancel Order"? false : true} onChange={e => setTracking(e.target.value)} value={tracking} type="text" className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                    </div>
                                    <div className="grid grid-cols-3 text-sm py-2 items-center">
                                        <label className='col-span-1'>Order status: </label>
                                        <select required onChange={e=>setStatus(e.target.value)} name="type" value={status} className="font-bold col-span-2 py-1 block w-auto rounded-md border-0 shadow-sm sm:max-w-xs sm:text-sm text-sm sm:leading-6 text-gray-900 dark:text-white cursor-pointer">
                                            <option value="" disabled>Select Status</option>
                                            <option>Seller Processing</option>
                                            <option>In Transit</option>
                                            <option>Delivered</option>
                                            <option>Returned to Seller</option>
                                            <option>Cancel Order</option>
                                        </select>
                                    </div>
                                    {status==="Cancel Order" ?
                                        <div className='pb-4 grid gap-2 px-4'>
                                            <div className="flex items-center">
                                                <input onChange={()=>setReason("Billing address out of reach")} id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label htmfor="default-radio-1" className="text-sm font-medium text-gray-900 dark:text-gray-300">Billing address out of reach.</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onChange={()=>setReason("Item is out of stock")} id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label htmfor="default-radio-2" className="text-sm font-medium text-gray-900 dark:text-gray-300">Item is out of stock.</label>
                                            </div>
                                        </div>
                                    :null}

                                    <div className='col-span-4 flex gap-2 justify-center border-t items-center py-2'>
                                        <button type="submit" disabled={(status==="Cancel Order" && reason==="") || status==="Seller Processing" ? true : false} className={`${(status==="Cancel Order" && reason==="") || status==="Seller Processing" ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} w-auto text-white  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>
                                            {loading===true ? 
                                                <div role="status">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                    </svg>
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            :null}
                                            Confirm
                                        </button>
                                        <button onClick={()=>setIsEdit(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
