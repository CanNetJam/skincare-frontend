import React, { useEffect, useContext, useState } from 'react';
import {UserContext} from "../App";
import PolicyEmail from '../Components/PolicyEmail';
import ImageZoom from '../Modals/ImageZoom';
import PdfViewer from '../Components/PdfViewer';
import pdf from '../assets/Policy/Laptop.pdf'

export default function Laptop() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Auditing of Klued Laptops<br/>(IP-015)</h1>
                <p className='text-center'><b>Written on:</b> March 7, 2024</p>
            </section>
            <br/>
            <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2 sm:rounded-[30px] rounded-[10px]'>
                <div onClick={()=> {
                        setIsZoom(true)
                        setToZoom(pdf)
                        setZoomType("File")
                    }} className='cursor-pointer w-full grid justify-center'>
                    <PdfViewer pdfFile={pdf} />
                </div>
                <br/>
                <div className='container mx-auto w-2xl'>
                    <p className='text-center font-bold text-lg'>Proper storage of any cables:</p>
                    <iframe className='h-96 w-full' src="https://drive.google.com/file/d/1VL9lp0mO9h4qvAcnaGWIkMu2A0bm_jDD/preview" allow="autoplay"></iframe>
                </div>
                <PolicyEmail userData={userData?.user} policytitle={["Auditing of Klued Laptops (IP-015)"]}/>
            </section>
        </div>
    )
}