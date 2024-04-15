import React, { useState, useEffect } from "react";
import axios from "axios";
import EditProduct from "../Modals/EditProduct";
import AddProduct from "../Modals/AddProduct";
import DeleteProduct from "../Modals/DeleteProduct";

export default function UpdateProduct() {
    const [ availableItems, setAvailableItems ] = useState([])
    const [ submitted, setSubmitted ] = useState(false)
    const [ isDelete, setIsDelete ] = useState(false)
    const [ toDelete, setToDelete ] = useState("")
    const [ isEdit, setIsEdit ] = useState(false)
    const [ toEdit, setToEdit ] = useState("")
    const [ isAdd, setIsAdd ] = useState(false)

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
        const getProducts = async () => {
            try {
                const products = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/product/get-all-products`)
                setAvailableItems(products.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [submitted, isAdd, isDelete])
    
    return (
        <div className="min-h-screen h-auto w-full">
            {isEdit===true ?
                <EditProduct isEdit={isEdit} setIsEdit={setIsEdit} toEdit={toEdit} submitted={submitted} setSubmitted={setSubmitted}/>
            :null}
            {isAdd===true ?
                <AddProduct isAdd={isAdd} setIsAdd={setIsAdd}/>
            :null}
            {isDelete===true ?
                <DeleteProduct isDelete={isDelete} setIsDelete={setIsDelete} toDelete={toDelete} setToDelete={setToDelete}/>
            :null}
            <div className="container mx-auto my-16 grid">
                <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>My Products</h1>
                <br/>
                <div className="w-full flex justify-end items-center">
                    <button onClick={()=>setIsAdd(true)} className="px-4 mt-1 w-full bg-blue-500 p-2 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-blue-600 sm:mt-0 sm:w-auto sm:shrink-0 rounded-md">
                        Add Product
                    </button>
                </div>
                <div className="relative w-auto overflow-x-auto shadow-md sm:rounded-lg p-4">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Stock
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {availableItems[0]!==undefined ? 
                                <>
                                    {availableItems.map((a, index)=> {
                                        return (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-2 py-4">
                                                    <b>{(index+1)}</b>
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="h-36 w-28 overflow-hidden rounded-md">
                                                        <img className='h-full w-full object-cover' src={`https://klued-uploads.s3.ap-southeast-1.amazonaws.com/${a.displayimage}`}></img>
                                                    </div>
                                                </th>
                                                <td className="px-6 py-4">
                                                    {a?.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    Original: ₱{a.disprice?.toFixed(2)}<br/>
                                                    Discounted: ₱{a.price?.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <b>{a.stock}</b> items left
                                                </td>
                                                <td >
                                                    <div className="flex justify-center items-center h-full gap-2">
                                                        <button onClick={()=>{
                                                            setIsEdit(true)
                                                            setToEdit(a)
                                                            }}className='h-full cursor-pointer text-blue-500 hover:text-blue-400'>
                                                            Edit
                                                        </button>
                                                        <button onClick={()=>{
                                                            setIsDelete(true)
                                                            setToDelete(a)
                                                            }}className='h-full cursor-pointer text-red-500 hover:text-red-400'>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                            :null}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}