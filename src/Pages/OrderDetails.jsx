import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { useLocation, useParams } from 'react-router';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import moment from "moment";
import Refund from "../Modals/Refund";

export default function OrderDetails() {
    const { userData, setUserData } = useContext(UserContext)
    const location = useLocation()
    const {id} = useParams()
    const [ orderData, setOrderData ] = useState({})
    const [ isEdit, setIsEdit ] = useState(false)
    const [ toEdit, setToEdit ] = useState("")

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
        const getOrder = async () => {
            try {
                let token = localStorage.getItem("auth-token")
                const order = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/orders/get-order`, 
                { headers: { "Content-Type": "application/json", "auth-token": token }, params: {
                    orderid: id ? id : location.state.orderid
                }})
                setOrderData(order.data)
            } catch (err) {
                console.log(err)
            }
        }
        getOrder()
    }, [])
    console.log(orderData)
    return (
        <div>
            <Navbar/>
            {isEdit && (
                <Refund isEdit={isEdit} setIsEdit={setIsEdit} toEdit={toEdit}/>
            )} 
            <div className="container mx-auto min-h-screen pt-16 py-4 sm:px-0 px-4 grid gap-4">
                <h3 className='font-bold lg:text-4xl text-3xl lg:py-2 py-1 text-center'>Order Details<br/><label className={orderData.deliverystatus==="Delivered" ? `bg-green-400 text-white rounded-full px-4 text-2xl` : orderData.deliverystatus==="Cancelled" ? `bg-red-400 text-white rounded-full px-4 text-2xl` : 'bg-blue-400 text-white rounded-full px-4 text-2xl'}>{orderData.deliverystatus}</label></h3>
                <div className="h-auto w-full bg-gray-50 rounded-md p-4">
                    <h4 className="font-semibold mb-4 sm:text-xl text-lg">Customer Information</h4>
                    <div className="grid sm:grid-cols-3 gap-1 w-full">
                        <div className="col-span-1 grid grid-cols-5">
                            <p className="col-span-1 text-blue-400">Name:</p>
                            <p className="col-span-4 sm:text-start text-end">{orderData.owner}</p>
                            <p className="col-span-1 text-blue-400">ID:</p>
                            <p className="col-span-4 sm:text-start text-end">{orderData.userid}</p>
                        </div>
                        <div className="col-span-1 grid grid-cols-5">
                            <p className="col-span-1 text-blue-400">Email:</p>
                            <p className="col-span-4 sm:text-start text-end">{orderData.email}</p>
                            <p className="col-span-1 text-blue-400">Phone:</p>
                            <p className="col-span-4 sm:text-start text-end">{orderData.phone}</p>
                        </div>
                        <div className="col-span-1 grid grid-cols-5">
                            <p className="col-span-1 text-blue-400">Address:</p>
                            <p className="col-span-4 sm:text-justify text-end">
                                {orderData?.billingaddress?.street!=='Not applicable' ? orderData?.billingaddress?.street+", " : null}
                                {orderData?.billingaddress?.barangay!=='Not applicable' ? orderData?.billingaddress?.barangay+", " : null} 
                                {orderData?.billingaddress?.city!=='Not applicable' ? orderData?.billingaddress?.city+", " : null} 
                                {orderData?.billingaddress?.province!=='Not applicable' ? orderData?.billingaddress?.province+", " : null} 
                                {orderData?.billingaddress?.region!=='Not applicable' ? orderData?.billingaddress?.region+", " : null} 
                                {orderData?.billingaddress?.postal+"."}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 w-full">
                    <div className="sm:col-span-2 h-auto w-full bg-gray-50 rounded-md p-6">
                        <div className="grid sm:flex sm:justify-between">
                            <h4 className="font-semibold sm:text-xl text-lg">Order Details</h4>
                            <h4 className="font-semibold sm:text-xl text-sm py-2">Order Id: <label className="text-blue-400">{orderData._id}</label></h4>
                        </div>
                        <div className="py-4 sm:w-full w-[80vw] sm:overflow-hidden overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-2 py-3">
                                            No.
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Image
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Subtotal
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderData?.items?.map((a, index)=> {
                                        return (
                                            <tr key={index}>
                                                <td className="px-2 py-3 text-center">{index+1}</td>
                                                <td className="px-2 py-3">
                                                    <div className='flex h-[50px] w-[50px] items-center justify-center border overflow-hidden rounded-md'>
                                                        <img className='h-full w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a.item.displayimage}.jpg`}></img>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 text-blue-400 w-auto text-center">{a.item.name}</td>
                                                <td className="px-2 py-3 text-center">{a.quantity} pc(s)</td>
                                                <td className="px-2 py-3 text-center">₱{a.price}.00</td>
                                                <td className="px-2 py-3 text-center">₱{a.quantity*a.price}.00</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-full border-t flex justify-end px-2 py-3">
                            <p><span className="font-bold mr-10">Total:</span>₱{orderData.amounttotal}.00</p>
                        </div>
                    </div>
                    <div className="sm:col-span-1 h-auto w-full bg-gray-50 rounded-md p-6">
                        <h4 className="font-semibold sm:text-xl text-lg">Payment Details <label className={orderData.billingstatus==="Paid" ? `bg-green-400 text-white rounded-full px-4` : `bg-red-400 text-white rounded-full px-4`}>{orderData.billingstatus}</label></h4>
                        <div className="p-4">
                            <div className="flex justify-between py-1">
                                <p>Paid through:</p>
                                <p>{orderData.paymentoption}</p>
                            </div>
                            {orderData.billingstatus!=="Refunded" && orderData.billingstatus!=="Cancelled" ?
                                <div className="flex justify-between py-1">
                                    <p>Paid at:</p>
                                    <p>{orderData.paidat ? moment(orderData.paidat).format('MMM-DD-YYYY on h:mm A') : "Payment pending"}</p>
                                </div>
                            : null}
                            {orderData.billingstatus==="Refunded" ? 
                                <div className="flex justify-between py-1">
                                    <p>Refunded at:</p>
                                    <p>{moment(orderData?.refundedat).format('MMM-DD-YYYY on h:mm A')}</p>
                                </div>
                            :null}
                            {orderData.billingstatus==="Cancelled" ? 
                                <div className="flex justify-between py-1">
                                    <p>Cancelled at:</p>
                                    <p>{moment(orderData?.refundedat).format('MMM-DD-YYYY on h:mm A')}</p>
                                </div>
                            :null}
                        </div>
                        <div className="p-4 border-t">
                            <div className="flex justify-between py-1">
                                <p>Items subtotal:</p>
                                <p>₱{orderData.amounttotal}.00</p>
                            </div>
                            <div className="flex justify-between py-1">
                                <p>Shipping fee:</p>
                                <p>₱{orderData?.shippingfee}.00</p>
                            </div>
                            <div className="flex justify-between py-1">
                                <p>Voucher:</p>
                                <p>--</p>
                            </div>
                            <div className="flex justify-between py-1">
                                <p><b>Total amount:</b></p>
                                <p>₱{orderData.amountpaid}.00</p>
                            </div>
                        </div>
                    </div>
                </div>
                {userData?.user?._id===orderData.userid ? 
                    <>
                        {orderData.deliverystatus==="Delivered" && orderData.refundedat===undefined ?
                            <div className="h-auto w-full bg-gray-50 rounded-md p-4 grid sm:flex sm:justify-between">
                                <h4 className="my-2 sm:text-xl text-lg"> Is there something wrong with your order? Submit a ticket now.</h4>
                                <button onClick={()=>{
                                    setToEdit(orderData)
                                    setIsEdit(true)
                                    }} className="relative text-center font-semibold py-1 w-auto sm:px-12 px-1 rounded-xl bg-slate-900 text-slate-50 hover:bg-slate-800">Return/Refund</button>
                            </div>
                        :null}
                    </>
                :null}
            </div>
            <Footer/>
        </div>
    )
}
