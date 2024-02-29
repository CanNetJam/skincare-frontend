import React, { useState, useContext } from 'react';
import CancelOrder from '../Modals/CancelOrder';
import { Link, useNavigate } from 'react-router-dom';
import PageButtons from './PageButtons';
import EmptyContent from './EmptyContent';
import Review from '../Modals/Review';
import { UserContext } from "../App";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PendingOrders({orders, page, setPage, pages, pageEntries, total, setPageEntries, tab, isEdit, setIsEdit, isReview, setIsReview}) {
    let navigate = useNavigate()
    const { userData, setUserData } = useContext(UserContext)
    const [ openPageCount, setOpenPageCount ] = useState(false)
    const [ toEdit, setToEdit ] = useState("")
    const [ pageButtons, setPageButtons] = useState([])
    const [ displayedPages, setDisplayedPages ] = useState(5)
    const [ toReview, setToReview ] = useState("")
    const [ itemToReview, setItemToReview ] = useState("")
    const [ quantity, setQuantity ] = useState(1)

    function toastSuccessNotification(props) {
        toast.success(`Added ${props} to your cart.`, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
    }

    function toastErrorNotification() {
        toast.error('An error happened while adding an item to your cart.', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
    }

    const handleAddToCart = async (pack) => {
        try {
            let cart = localStorage.getItem("items")
            const obj = {
                type:  pack.type,
                product: {
                    _id: pack.item._id,
                    name: pack.item.name,
                    displayimage: pack.item.displayimage,
                    price: pack.type==="single" ? pack.item.price : pack.item.origprice,
                    stock: pack.item.stock,
                },
                quantity: quantity
            }

            if (userData.user) {
                let token = localStorage.getItem("auth-token")
                const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/accounts/update-add-cart/${userData?.user?._id}`, obj,
                { headers: { "Content-Type": "application/json", "auth-token": token } })
                if (res.data===true) {
                    toastSuccessNotification(pack.item.name) 
                } else {
                    toastErrorNotification()
                }
            }
            
            if ( cart === null) {
                localStorage.setItem("items", JSON.stringify([obj]))
                setUserData({...userData, cartNumber: userData.cartNumber+1})
                if (!userData.user) {
                    toastSuccessNotification(obj.product.name)
                }
            }
            if (cart !== null) {
                let currentCart = JSON.parse(localStorage.getItem("items"))
                let dupe = false

                function duplicateCheck() {
                    currentCart.map((a, index )=> {
                        if (a.product._id === pack.item._id){
                            currentCart[index] = {
                                type:  pack.type,
                                product: {
                                    _id: pack.item._id,
                                    name: pack.item.name,
                                    displayimage: pack.item.displayimage,
                                    price: pack.type==="single" ? pack.item.price : pack.item.origprice,
                                    stock: pack.item.stock,
                                },
                                quantity: a.quantity+1
                            }
                            
                            if (!userData.user) {
                                toastSuccessNotification(obj.product.name)
                            }
                            dupe = true
                            return dupe
                        }
                        return dupe
                    })
                }

                duplicateCheck()
                if (dupe===false) {
                    currentCart.push(obj)
                    if (!userData.user) {
                        toastSuccessNotification(obj.product.name)
                    }
                }
                localStorage.setItem("items", JSON.stringify(currentCart))
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    
    return (
        <div className='h-auto sm:w-auto w-screen pb-6 px-4'>
            {isEdit && (
                <CancelOrder isEdit={isEdit} setIsEdit={setIsEdit} toEdit={toEdit}/>
            )} 
            {isReview && (
                <Review isReview={isReview} setIsReview={setIsReview} toReview={toReview} itemToReview={itemToReview} setItemToReview={setItemToReview}/>
            )} 
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
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
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length>0 ? 
                            <>
                                {orders.map((a, index)=> {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 z-0">    
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                <div className='min-w-[300px] grid gap-2'>
                                                    {a.items.map((b, index)=>{
                                                        return (
                                                            <div key={index} className='grid grid-cols-5 gap-2'>
                                                                <div className='flex h-[40px] w-[40px] items-center justify-center border overflow-hidden rounded-md'>
                                                                    <img className='h-full w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${b.item.displayimage}.jpg`}></img>
                                                                </div>
                                                                <label className='col-span-3'>{b.item.name}</label>
                                                                <label className='col-span-1 border-l px-2 grid text-center'>{b.quantity}pc(s) <br/>
                                                                    {b.reviewed===false && a.deliverystatus==="Delivered" ? 
                                                                        <button onClick={()=>{
                                                                            setIsReview(true)
                                                                            setToReview(a)
                                                                            setItemToReview(b)
                                                                        }} className="font-semibold text-blue-500 dark:text-blue-400 hover:underline">Review</button>
                                                                    :null}
                                                                </label>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </td>
                                            <td onClick={()=>navigate(`/order-details/${a._id}`)} className="cursor-pointer px-6 py-4">
                                                <div className='grid gap-2'>
                                                    <label className='font-semibold'>₱{a.amountpaid.toFixed(2)}</label>
                                                    <label>{a.paymentoption}</label>
                                                </div>
                                            </td>
                                            <td onClick={()=>navigate(`/order-details/${a._id}`)} className="cursor-pointer px-6 py-4">
                                                <div className='grid gap-2'>
                                                    <span className={`${a.deliverystatus==="Seller Processing" || a.deliverystatus==="In Transit" ? `text-blue-500` : a.deliverystatus==="Cancelled" ?  'text-red-500': a.deliverystatus==="Delivered" ?  'text-green-500': `text-yellow-500` } font-semibold`}>{a.deliverystatus}</span>
                                                    <label>{a.deliveryoption}</label>
                                                </div>
                                            </td>
                                            <td onClick={()=>navigate(`/order-details/${a._id}`)} className="cursor-pointer px-6 py-4">
                                                <div className='grid gap-2'>
                                                    <label className='whitespace-nowrap'><b>Order Id</b>: {a._id}</label>
                                                    {a.trackingnumber ? 
                                                        <label className='whitespace-nowrap'><b>Tracking</b>: <a href={`https://www.flashexpress.ph/fle/tracking?se=${a.trackingnumber}`} target='_blank' className='hover:underline cursor-pointer'>{a.trackingnumber}</a></label>
                                                    :null}
                                                    {a.deliverystatus==="Cancelled" ?
                                                        <p><b>Cancel reason:</b> {a.cancelreason}</p>
                                                    :null}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 grid whitespace-nowrap text-center">
                                                <button className="font-medium text-blue-500 dark:text-blue-400 hover:underline"><Link to={`/order-details/${a._id}`} className='hover:underline cursor-pointer'>View Order Details</Link></button>
                                                {a.deliverystatus==="In Transit" || a.deliverystatus==="Delivered" ?
                                                    <button className="font-medium text-blue-500 dark:text-blue-400 hover:underline"><a href={`https://www.flashexpress.ph/fle/tracking?se=${a?.trackingnumber}`} target='_blank' className='hover:underline cursor-pointer'>View Pickup Details</a></button>
                                                :null}
                                                {a.userid===userData.user?._id ? 
                                                    <>
                                                        {tab==="Pending Orders" ?
                                                            <>
                                                                {a.deliverystatus==="Seller Processing" ? 
                                                                    <button onClick={()=>{
                                                                        setIsEdit(true)
                                                                        setToEdit(a)
                                                                    }} className="z-30 font-medium text-red-500 dark:text-red-400 hover:underline">Cancel</button>
                                                                :null}
                                                            </>
                                                        :
                                                            <>
                                                                <button onClick={()=>{
                                                                    a.items.map((b)=>{
                                                                        handleAddToCart(b)
                                                                    })
                                                                    setUserData({...userData, cartNumber: userData.cartNumber+a.items.length})
                                                                }} className="font-medium text-blue-500 dark:text-blue-400 hover:underline">
                                                                    Buy Again
                                                                </button>
                                                            </>
                                                        }
                                                    </>
                                                :null}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                        :
                            null
                        }
                    </tbody>
                </table>
            </div>
            {orders.length<=0 ?
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
