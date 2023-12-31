import React, { useEffect } from 'react';
import img1 from '../assets/Policy/b1.png';
import img2 from '../assets/Policy/b3.png';

export default function ProgressiveCorrective() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Progressive Corrective Action<br/>(IP-002)</h1>
                <p className='text-center'><b>Written on:</b> October 23, 2023</p>
            </section>
            <br/>
            <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2 sm:rounded-[30px] rounded-[10px]'>
                <div className='col-span-1 grid justify-center'>
                    <img className='' src={img1}/>
                    <label className='text-center'>Page 1 of 2</label>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img className='' src={img2}/>
                    <label className='text-center'>Page 2 of 2</label>
                </div>
            </section>
        </div>
    )
}
