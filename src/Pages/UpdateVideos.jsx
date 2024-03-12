import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import EditVideo from "../Modals/EditVideo";
import AddVideo from "../Modals/AddVideo";
import DeleteVideo from "../Modals/DeleteVideo";

export default function UpdateVideos() {
    const [ availableItems, setAvailableItems ] = useState([])
    const [ submitted, setSubmitted ] = useState(false)
    const [ isDelete, setIsDelete ] = useState(false)
    const [ toDelete, setToDelete ] = useState("")
    const [ isEdit, setIsEdit ] = useState(false)
    const [ toEdit, setToEdit ] = useState("")
    const [ isAdd, setIsAdd ] = useState(false)

    useEffect(()=> {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/videos/all-videos`)
                setAvailableItems(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [submitted])
    
    return (
        <div>
            <Navbar/>
            {isEdit===true ?
                <EditVideo isEdit={isEdit} setIsEdit={setIsEdit} toEdit={toEdit} submitted={submitted} setSubmitted={setSubmitted}/>
            :null}
            {isAdd===true ?
                <AddVideo isAdd={isAdd} setIsAdd={setIsAdd} submitted={submitted} setSubmitted={setSubmitted}/>
            :null}
            {isDelete && (
                <DeleteVideo isDelete={isDelete} setIsDelete={setIsDelete} toDelete={toDelete} setToDelete={setToDelete}/>
            )} 
            <div className="container mx-auto my-16 grid">
                <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>My TikTok Videos</h1>
                <div className="w-full flex justify-end items-center px-4">
                    <button onClick={()=>setIsAdd(true)} className="px-4 mt-1 w-min whitespace-nowrap bg-blue-500 p-2 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-blue-600 sm:mt-0 sm:w-auto sm:shrink-0 rounded-md">
                        Add Video
                    </button>
                </div>
                <div className="flex gap-4 relative w-full overflow-x-auto shadow-md sm:rounded-lg p-4">
                    {availableItems.length>0 ?
                        <>
                            {availableItems.map((a)=>{
                                return (
                                    <div className="max-h-[75vh] bg-gray-100 p-2 flex-shrink-0 shadow-md shadow-gray-300" key={a._id}>
                                        <div className="py-2 flex justify-between">
                                            <button onClick={()=>{
                                                            setIsEdit(true)
                                                            setToEdit(a)
                                                            }} className="hover:text-blue-500 font-semibold text-blue-400">Edit</button>
                                            <button onClick={()=> [setToDelete(a), setIsDelete(true)]} className="hover:text-red-500 font-semibold text-red-400">Delete</button>
                                        </div>
                                        <video
                                            className="h-[90%] rounded-md w-full object-cover cursor-pointer"
                                            preload="metadata"
                                            muted
                                            loop
                                            //poster="URL" for video thumbnail
                                            onMouseOver={event => {
                                                event.target.play()
                                            }}
                                            onMouseOut={event => event.target.pause()}
                                        >
                                            <source src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/video/upload/f_auto,q_65/${a.source}.mp4`} type="video/mp4" />
                                        </video>
                                    </div>
                                )
                            })}
                        </>
                    :null}
                </div>
            </div>
            <Footer/>
        </div>
    )
}