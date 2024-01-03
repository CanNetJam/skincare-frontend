import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Default.png';

export default function Default() {
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
        <div className='bg-blue-200 h-auto w-full sm:grid flex flex-col text-base sm:text-lg sm:p-8 p-4'>
            <div className=''>
                <h1 className='subHeading text-center mb-2'>Welcome Dear Employee</h1>
                <h2 className='font-semibold text-center sm:mb-6 mb-2'>Learning has never been this easy!</h2>
            </div>
            <div className='sm:h-[500px] h-[250px] w-full flex justify-center'>
                <img className='object-contain' name="Klued Knowledge Base" src={img1}/>
            </div>
        </div>
    )
}