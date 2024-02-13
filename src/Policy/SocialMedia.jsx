import React, { useState, useEffect, useContext  } from 'react';
import {UserContext} from "../App";
import PolicyEmail from '../Components/PolicyEmail';
import ImageZoom from '../Modals/ImageZoom';
import PdfViewer from '../Components/PdfViewer';
import pdf from '../assets/Policy/Social Media.pdf'

export default function SocialMedia() {
    const { userData, setUserData } = useContext(UserContext)
    const [ toZoom, setToZoom] = useState("")
    const [ zoomId, setZoomId] = useState("")
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
                <ImageZoom isZoom={isZoom} setIsZoom={setIsZoom} toZoom={toZoom} zoomId={zoomId} setZoomId={setZoomId} zoomType={zoomType}/>
            )}  
            <section className='my-2'>
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Social Media Policy<br/>(IP-004)</h1>
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
                <PolicyEmail userData={userData?.user} policytitle={["Social Media Policy (IP-004)"]}/>
            </section>
        </div>
    )
}
