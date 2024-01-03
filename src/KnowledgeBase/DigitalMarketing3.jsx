import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Creative Tigers/New/c1.jpg';
import img2 from '../assets/Knowledge Base/Creative Tigers/New/c2.jpg';
import img3 from '../assets/Knowledge Base/Creative Tigers/New/c3.jpg';
import img4 from '../assets/Knowledge Base/Creative Tigers/New/c4.jpg';
import img5 from '../assets/Knowledge Base/Creative Tigers/New/c5.jpg';

export default function DigitalMarketing3() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Digital Marketing Training 3<br/>(KB-016)</h1>
            </section>
            <br/>
            <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2 sm:rounded-[30px] rounded-[10px]'>
                <div className='col-span-1 grid justify-center'>
                    <img src={img1}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img2}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img3}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img4}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img5}/>
                </div>
                <br/>
            </section>
        </div>
    )
}
