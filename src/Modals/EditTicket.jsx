import { useState, Fragment,  } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";

export default function EditTicket({isEdit, setIsEdit, toEdit}) {
    const [status, setStatus] = useState(toEdit.status)
    const [reason, setReason] = useState("")

    async function submitHandler(e) {
        e.preventDefault()
        const loadingNotif = async function myPromise() {
            const data = new FormData()
            data.append("status", status==="Approve" ? "Approved" : "Rejected")
            data.append("reason", reason)
            data.append("orderid", toEdit?.orderid?._id)
            data.append("netamount", toEdit?.orderid?.netamount)
            data.append("paymentid", toEdit?.orderid?.paymentid)
            data.append("paymentoption", toEdit?.orderid?.paymentoption)
            let token = localStorage.getItem("auth-token")
            const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/tickets/ticket-response/${toEdit._id}`, data, 
            { headers: { "Content-Type": "application/json", "auth-token": token } })
            if (res.data===true) {
                setStatus("")
                setIsEdit(false)
            }
        }
        toast.promise(
            loadingNotif,
            {
                pending: 'Processing response...',
                success: 'Successfully responded to the Return/Refund request.',
                error: 'Error submitting response!'
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
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white sm:p-6 p-2 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg pb-2 font-semibold leading-6 text-gray-900 flex justify-center items-center">
                                    {toEdit.type}
                                </Dialog.Title>
                                <div className='border-2 border-blue-400 rounded-xl p-4 relative my-4'>
                                    <h1 className='absolute -top-3 bg-white px-2 font-bold text-blue-400'>Ticket Details</h1>
                                    <div className='grid grid-cols-3 text-sm py-1'>
                                        <label className='col-span-1'>Ticket ID:</label>
                                        <label className='col-span-2 text-right'>{toEdit._id}</label>
                                    </div>
                                    <div className='grid grid-cols-3 text-sm py-1'>
                                        <label className='col-span-1'>Submitted by:</label>
                                        <label className='col-span-2 text-right'>{toEdit.owner}</label>
                                    </div>
                                    <div className='grid grid-cols-3 text-sm py-1'>
                                        <label className='col-span-1'>Reason:</label>
                                        <label className='col-span-2 text-right'>{toEdit.mainreason}</label>
                                    </div>
                                    <div className='grid grid-cols-3 text-sm py-1'>
                                        <label className='col-span-1'>Description:</label>
                                        <label className='col-span-2 text-justify whitespace-pre-line'>{toEdit.description}</label>
                                    </div>
                                    <div className='grid sm:grid-cols-3 text-sm py-1'>
                                        <div className='col-span-1 h-48 w-48 grid overflow-hidden'>
                                            <label>Waybill:</label>
                                            <img className='h-full w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${toEdit?.waybillimage}.jpg`}></img>
                                        </div>
                                        <div className='col-span-1 h-48 w-48 grid overflow-hidden'>
                                            <label>Parcel Image 1:</label>
                                            <img className='h-full w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${toEdit?.productimage1}.jpg`}></img>
                                        </div>
                                        <div className='col-span-1 h-48 w-48 grid overflow-hidden'>
                                            <label>Parcel Image 2:</label>
                                            <img className='h-full w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${toEdit?.productimage2}.jpg`}></img>
                                        </div>
                                    </div>
                                </div>
                                <div className='border-2 border-yellow-400 rounded-xl p-4 relative my-4'>
                                    <h1 className='absolute -top-3 bg-white px-2 font-bold text-yellow-400'>Order Details</h1>
                                    <div className='grid grid-cols-3 text-sm py-1'>
                                        <label className='col-span-1'>Order ID:</label>
                                        <label className='col-span-2 text-right'>{toEdit.orderid._id}</label>
                                    </div>
                                    <div className='grid grid-cols-3 text-sm py-1'>
                                        <label className='col-span-1'>Ordered on:</label>
                                        <label className='col-span-2 text-right'>{moment(toEdit.orderid.createdAt).format('MMM-DD-YYYY on h:mm A')}</label>
                                    </div>

                                    <div className='grid grid-cols-3 text-sm py-1'>
                                        <label className='col-span-1'>Amount total:</label>
                                        <label className='col-span-2 text-right'>₱{toEdit.orderid.amounttotal}.00</label>
                                    </div>
                                    <div className='grid grid-cols-3 text-sm py-1'>
                                        <label className='col-span-1'>Amount Paid:</label>
                                        <label className='col-span-2 text-right'>₱{toEdit.orderid.amountpaid}.00</label>
                                    </div>
                                    <div className='grid grid-cols-3 text-sm py-1'>
                                        <label className='col-span-1'>Billing status:</label>
                                        <label className='col-span-2 text-right'>{toEdit.orderid.billingstatus}</label>
                                    </div>
                                    <div className='grid grid-cols-3 text-sm py-1'>
                                        <label className='col-span-1'>Payed through:</label>
                                        <label className='col-span-2 text-right'>{toEdit.orderid.paymentoption}</label>
                                    </div>
                                    <div className='grid grid-cols-3 text-sm py-1'>
                                        <label className='col-span-1'>Payed on:</label>
                                        <label className='col-span-2 text-right'>{moment(toEdit.orderid.paidat).format('MMM-DD-YYYY on h:mm A')}</label>
                                    </div>
                                </div>
                                <form onSubmit={submitHandler}>
                                    <div className="grid grid-cols-3 text-sm py-2 items-center">
                                        <label className='col-span-1'>Select response: </label>
                                        <select required onChange={e=>setStatus(e.target.value)} name="type" value={status} className="col-span-2 py-1 block w-full rounded-md border-0 shadow-sm sm:text-sm text-sm sm:leading-6 font-medium text-gray-900 dark:text-white cursor-pointer">
                                            <option value="" disabled>Select response:</option>
                                            <option>Pending</option>
                                            <option>Approve</option>
                                            <option>Reject</option>
                                        </select>
                                    </div>
                                    {status==="Reject" ? 
                                        <div className='col-span-2'>
                                            <textarea required onChange={(e)=>setReason(e.target.value)} rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please specify..."></textarea>
                                        </div>
                                    :null}
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
