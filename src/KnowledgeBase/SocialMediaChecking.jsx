import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Creative Tigers/b1.png';
import img2 from '../assets/Knowledge Base/Creative Tigers/b1.png';
import img3 from '../assets/Knowledge Base/Creative Tigers/b1.png';

export default function SocialMediaChecking() {
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
            <section className='my-2'>
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Social Media Checking<br/>(KB-012)</h1>
            </section>
            <br/>
            <div className='h-auto sm:rounded-[30px] rounded-[10px] overflow-hidden'>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2 sm:grid-cols-2'>
                    <div className='col-span-1'>
                        <h1 className='font-bold contentHeading my-4'>Instagram</h1>
                        <p className='sm:text-xl text-base'>
                            <b>Primary</b> - the messages on this are the content creators we have partnered with. 
                            <br/><b>General</b> - the messages here mostly are inquiries and tagged stories. 
                            <br/><b>Requests</b> - unopened messages regards with the inquiries and tagged stories and must be open ahead of time. 
                            <br/><b>Comments</b> - must be replied ahead of time. Response can be emojis and react with the comment
                        </p>
                    </div>
                    <div className='col-span-1'>
                        <img src={img1}></img>
                    </div>
                </section>
                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid sm:gap-y-16 gap-y-2 sm:grid-cols-2'>
                    <div className='col-span-1'>
                        <h1 className='font-bold contentHeading my-4'>Tiktok</h1>
                        <p className='sm:text-xl text-base'>
                            <b>Message Requests</b> - must be opened within the day. Mostly inquiries with the product and UGC applications
                        </p>
                    </div>
                    <div className='col-span-1'>
                        <img src={img2}></img>
                    </div>
                    <div className='col-span-1'>
                        <img src={img3}></img>
                    </div>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>
                            In this section, it indicates all the activities/notification that must be checked on within the day. 
                            <br/>
                            <b>Comments</b> - you can answer directly or reply with a video. 
                            <br/>
                            All the mentions and tagged videos of us should be acknowledged immediately.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}
