import React, { useState, useEffect, useContext } from 'react';
import img1 from '../assets/Policy/n1.png';
import {UserContext} from "../App";
import PolicyEmail from '../Components/PolicyEmail';
import ImageZoom from '../Modals/ImageZoom';

export default function Fragile() {
    const { userData, setUserData } = useContext(UserContext)
    const [ toZoom, setToZoom] = useState("")
    const [ isZoom, setIsZoom ] = useState(false)
    const [ zoomType, setZoomType] = useState("")

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])

    return (
        <div className='bg-blue-200 h-auto w-full text-base sm:text-lg sm:p-8 p-4'>
            {isZoom && (
                <ImageZoom isZoom={isZoom} setIsZoom={setIsZoom} toZoom={toZoom} zoomType={zoomType}/>
            )}  
            <section className='my-2'>
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Placement of Waybill and Fragile Sticker<br/>(IP-014)</h1>
                <p className='text-center'><b>Written on:</b> January 14, 2024</p>
            </section>
            <br/>
            <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2 sm:rounded-[30px] rounded-[10px]'>
                <div className='col-span-1 grid justify-center'>
                    <img onClick={()=> {
                            setIsZoom(true)
                            setToZoom(img1)
                            setZoomType("File")
                        }} className='cursor-pointer' src={img1}/>
                    <label className='text-center'>Page 1 of 2</label>
                </div>
                <PolicyEmail userData={userData?.user} policytitle={["Placement of Waybill and Fragile Sticker (IP-014)"]}/>
            </section>
        </div>
    )
}