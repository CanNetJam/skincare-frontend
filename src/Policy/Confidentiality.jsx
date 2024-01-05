import React, { useEffect, useContext } from 'react';
import img1 from '../assets/Policy/f1.png';
import {UserContext} from "../App";
import PolicyEmail from '../Components/PolicyEmail';

export default function Confidentiality() {
    const { userData, setUserData } = useContext(UserContext)

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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Confidentiality<br/>(IP-006)</h1>
                <p className='text-center'><b>Written on:</b> October 23, 2023</p>
            </section>
            <br/>
            <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2 sm:rounded-[30px] rounded-[10px]'>
                <div className='col-span-1 grid justify-center'>
                    <img className='' src={img1}/>
                    <label className='text-center'>Page 1 of 1</label>
                </div>
                <PolicyEmail userData={userData?.user} policytitle={"Confidentiality (IP-006)"}/>
            </section>
        </div>
    )
}
