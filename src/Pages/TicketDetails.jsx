import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from 'react-router';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import moment from "moment";
import { Link } from 'react-router-dom';

export default function TicketDetails() {
    const location = useLocation()
    const {id} = useParams()
    const [ ticketData, setTicketData ] = useState({})

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])
    
    useEffect(()=> {
        const getTicket = async () => {
            try {
                let token = localStorage.getItem("auth-token")
                const ticket = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/tickets/get-ticket`, 
                { headers: { "Content-Type": "application/json", "auth-token": token }, params: {
                    ticketid: id ? id : location.state.ticketid
                }})
                setTicketData(ticket.data)
            } catch (err) {
                console.log(err)
            }
        }
        getTicket()
    }, [])

    return (
        <div>
            <Navbar/>

            <div className="container mx-auto min-h-screen pt-16 py-4 sm:px-0 px-4 grid gap-4">
                <h3 className='font-bold lg:text-4xl text-3xl lg:py-2 py-1 text-center'>Ticket Details<br/><label className={ticketData.status==="Approved" ? `bg-green-400 text-white rounded-full px-4 text-2xl` : ticketData.status==="Rejected" ? `bg-red-400 text-white rounded-full px-4 text-2xl` : 'bg-blue-400 text-white rounded-full px-4 text-2xl'}>{ticketData.status}</label></h3>
                <div className="h-auto w-full bg-gray-50 rounded-md p-4">
                    <h4 className="font-semibold mb-4 sm:text-xl text-lg">Customer Information</h4>
                    <div className="grid sm:grid-cols-3 gap-1 w-full">
                        <div className="col-span-1 grid grid-cols-5">
                            <p className="col-span-1 text-blue-400">Name:</p>
                            <p className="col-span-4 sm:text-start text-end">{ticketData?.owner}</p>
                            <p className="col-span-1 text-blue-400">ID:</p>
                            <Link to={`/accounts/profile/${ticketData?.userid?._id}`} className="hover:text-blue-400 hover:underline">{ticketData?.userid?._id}</Link>
                        </div>
                        <div className="col-span-1 grid grid-cols-5">
                            <p className="col-span-1 text-blue-400">Email:</p>
                            <p className="col-span-4 sm:text-start text-end">{ticketData?.userid?.email}</p>
                            <p className="col-span-1 text-blue-400">Phone:</p>
                            <p className="col-span-4 sm:text-start text-end">{ticketData?.userid?.phone}</p>
                        </div>
                        <div className="col-span-1 grid grid-cols-5">
                            <p className="col-span-1 text-blue-400">Address:</p>
                            <p className="col-span-4 sm:text-justify text-end">
                                {ticketData?.userid?.billingaddress?.street!=='Not applicable' ? ticketData?.userid?.billingaddress?.street+", " : null}
                                {ticketData?.userid?.billingaddress?.barangay!=='Not applicable' ? ticketData?.userid?.billingaddress?.barangay+", " : null} 
                                {ticketData?.userid?.billingaddress?.city!=='Not applicable' ? ticketData?.userid?.billingaddress?.city+", " : null} 
                                {ticketData?.userid?.billingaddress?.province!=='Not applicable' ? ticketData?.userid?.billingaddress?.province+", " : null} 
                                {ticketData?.userid?.billingaddress?.region!=='Not applicable' ? ticketData?.userid?.billingaddress?.region+", " : null} 
                                {ticketData?.userid?.billingaddress?.postal+"."}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 w-full">
                    <div className="sm:col-span-2 h-auto w-full bg-gray-50 rounded-md p-6">
                        <div className="grid sm:flex sm:justify-between">
                        <h4 className="font-semibold sm:text-xl text-sm">Ticket Id: <label className="text-blue-400">{ticketData?._id}</label></h4>
                            <h4 className="font-semibold sm:text-xl text-sm">Order Id: <Link to={`/order-details/${ticketData?.orderid?._id}`} className="text-blue-400 hover:underline">{ticketData?.orderid?._id}</Link></h4>
                        </div>
                        <br/>
                        <h4 className="w-full font-semibold sm:text-xl text-lg">Items to Refund</h4>
                        
                        <div className="py-2 sm:w-full w-[80vw] sm:overflow-hidden overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr >
                                        <th scope="col" className="border px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="border px-2 py-3">
                                            Quantity
                                        </th>
                                        <th scope="col" className="border px-2 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="border px-2 py-3">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-6 py-3 text-blue-400 w-auto text-center">{ticketData?.item?.name}</td>
                                        <td className="px-2 py-3 text-center">{ticketData?.item?.quantity} pc(s)</td>
                                        <td className="px-2 py-3 text-center">₱{ticketData?.item?.price.toFixed(2)}</td>
                                        <td className="px-2 py-3 text-center">₱{(ticketData?.item?.quantity*ticketData?.item?.price).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="sm:flex sm:justify-between grid gap-2 my-4">
                            <div className="sm:flex grid sm:gap-2">
                                <p><b>Ticket sumbitted on:</b></p>
                                <p>{moment(ticketData?.createdAt).format('MMM-DD-YYYY on h:mm A')}</p>
                            </div>
                            {ticketData?.expiresAt ? 
                                <div className="sm:flex grid sm:gap-2">
                                    <p><b>Ticket expires on:</b></p>
                                    <p>{moment(ticketData?.expiresAt).format('MMM-DD-YYYY on h:mm A')}</p>
                                </div>
                            :null}
                        </div>
                    </div>

                    <div className="sm:col-span-1 h-auto w-full bg-gray-50 rounded-md p-6">
                        <h4 className="font-semibold sm:text-xl text-lg">Refund Details <label className={ticketData.status==="Approved" ? `bg-green-400 text-white rounded-full px-4 text-2xl` : ticketData.status==="Rejected" ? `bg-red-400 text-white rounded-full px-4 text-2xl` : 'bg-blue-400 text-white rounded-full px-4 text-2xl'}>{ticketData.status}</label></h4>
                        <div className="p-4">

                            {ticketData.status==="Approved" ?
                                <div className="flex justify-between py-1">
                                    <p>Refunded at:</p>
                                    <p>{ticketData.respondedAt ? moment(ticketData.respondedAt).format('MMM-DD-YYYY on h:mm A') : "Payment pending"}</p>
                                </div>
                            : null}
                            {ticketData.billingstatus==="Refunded" ? 
                                <div className="flex justify-between py-1">
                                    <p>Refunded at:</p>
                                    <p>{moment(ticketData?.refundedat).format('MMM-DD-YYYY on h:mm A')}</p>
                                </div>
                            :null}
                            {ticketData.billingstatus==="Cancelled" ? 
                                <div className="flex justify-between py-1">
                                    <p>Cancelled at:</p>
                                    <p>{moment(ticketData?.refundedat).format('MMM-DD-YYYY on h:mm A')}</p>
                                </div>
                            :null}
                        </div>
                        <div className="p-4 border-t">
                            <div className="flex justify-between py-1">
                                <p>Item subtotal:</p>
                                <p>₱{(ticketData?.item?.quantity*ticketData?.item?.price).toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between py-1">
                                <p>Transaction fee:</p>
                                <p>{ticketData?.transactionfee!==0 ? '- ₱'+(ticketData?.transactionfee) : '--'}</p>
                            </div>
                            <div className="flex justify-between py-1">
                                <p><b>Refund total:</b></p>
                                <p className="font-bold text-blue-500 text-lg">₱{((ticketData?.item?.quantity*ticketData?.item?.price)-ticketData?.transactionfee).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
