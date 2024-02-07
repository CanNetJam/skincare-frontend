import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CancelOrder({isEdit, setIsEdit, toEdit}) {
    const [reason, setReason] = useState("")
    const [specificReason, setSpecificReason] = useState("")

    async function submitHandler(e) {
        e.preventDefault()
        const loadingNotif = async function myPromise() {
            const data = new FormData()
            data.append("reason", reason!=="Others" ? reason : specificReason)
            data.append("paymentid", toEdit?.paymentid)
            data.append("amountpaid", toEdit?.amountpaid)
            let token = localStorage.getItem("auth-token")
            const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/orders/cancel-order/${toEdit._id}`, data, 
            { headers: { "Content-Type": "application/json", "auth-token": token } })
            if (res.data===true) {
                setReason("")
                setSpecificReason("")
                setIsEdit(false)
            }
        }
        toast.promise(
            loadingNotif,
            {
                pending: 'Processing request...',
                success: 'Successfully cancelled your order.',
                error: 'Cancelling order issue!'
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
                                    Cancel Order 
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
                                    <label className='col-span-2 text-right'>₱ {toEdit.amountpaid}.00</label>
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
                                    <div className="grid grid-cols-2 text-sm py-2 items-center">
                                        <label className='col-span-1'>Reason for Order cancellation: </label>
                                        <select required onChange={e=>setReason(e.target.value)} name="type" value={reason} className="col-span-1 py-1 block w-auto rounded-md border-0 shadow-sm sm:max-w-xs sm:text-sm text-sm sm:leading-6 font-medium text-gray-900 dark:text-white cursor-pointer">
                                            <option value="" disabled>Select your reason</option>
                                            <option>Incorrect item</option>
                                            <option>Incorrect quantity</option>
                                            <option>Change of mind</option>
                                            <option>Others</option>
                                        </select>
                                        <br/>
                                        {reason==="Others" ? 
                                            <div className='col-span-2'>
                                                <textarea required onChange={(e)=>setSpecificReason(e.target.value)} rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please specify..."></textarea>
                                            </div>
                                        :null}
                                    </div>
                                    <div className='col-span-4 flex gap-2 justify-center border-t items-center py-2'>
                                        <button type="submit" className={`w-auto text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Confirm</button>
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
