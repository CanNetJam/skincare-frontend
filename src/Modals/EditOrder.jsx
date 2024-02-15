import { useState, useEffect, Fragment,  } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditOrder({isEdit, setIsEdit, toEdit}) {
    const [tracking, setTracking] = useState(toEdit?.trackingnumber ? toEdit.trackingnumber : "")
    const [status, setStatus] = useState(toEdit.deliverystatus)

    function toastErrorNotification() {
        toast.error('Updating order issue!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
    }
  
    function toastSuccessNotification() {
        toast.success(`Successfully updated the order.`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
    }

    async function submitHandler(e) {
        e.preventDefault()
        const data = new FormData()
        data.append("tracking", tracking)
        data.append("status", status)
        if (status==="Returned to Seller") {
            data.append("paymentid", toEdit.paymentid)
            data.append("amountpaid", toEdit.amountpaid)
        }
        let token = localStorage.getItem("auth-token")
        const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/orders/update-order/${toEdit._id}/${toEdit.paymentoption}`, data, 
        { headers: { "Content-Type": "application/json", "auth-token": token } })
        if (res.data===false) {
            toastErrorNotification()
        }
        if (res.data===true) {
            toastSuccessNotification()
            setTracking("")
            setStatus("")
            setIsEdit(false)
        }
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
                                    <div className='grid grid-cols-3 text-sm py-1'>
                                        <label className='col-span-1'>Tracking number:</label>
                                        <input required={status!=="Seller Processing" ? true : false} onChange={e => setTracking(e.target.value)} value={tracking} type="text" className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                    </div>
                                    <div className="grid grid-cols-3 text-sm py-2 items-center">
                                        <label className='col-span-1'>Order status: </label>
                                        <select required onChange={e=>setStatus(e.target.value)} name="type" value={status} className="col-span-2 py-1 block w-auto rounded-md border-0 shadow-sm sm:max-w-xs sm:text-sm text-sm sm:leading-6 font-medium text-gray-900 dark:text-white cursor-pointer">
                                            <option value="" disabled>Select Status</option>
                                            <option>Seller Processing</option>
                                            <option>In Transit</option>
                                            <option>Delivered</option>
                                            <option>Returned to Seller</option>
                                        </select>
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
