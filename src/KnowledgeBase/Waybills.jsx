import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Mountain Movers/i1.png';
import img2 from '../assets/Knowledge Base/Mountain Movers/i2.png';
import img3 from '../assets/Knowledge Base/Mountain Movers/i3.png';
import MyImage from  '../Components/MyImage';

export default function Waybills() {
    useEffect(() => {
        const handleContextmenu = e => {
            e.preventDefault()
        }
        document.addEventListener('contextmenu', handleContextmenu)
        return function cleanup() {
            document.removeEventListener('contextmenu', handleContextmenu)
        }
    }, [])

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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Waybills<br/>(KB-001)</h1>
                <p><b>Written on:</b> October 20, 2023 <br/> <b>Updated on:</b> December 05, 2023</p>
            </section>
            <br/>
            <div className='h-auto sm:rounded-[30px] rounded-[10px] overflow-hidden'>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2 sm:grid-cols-2'>
                    <div className='col-span-1'>
                        <h1 className='font-bold contentHeading my-4'>Shopee</h1>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Shipping Provider</li>
                            <li className='my-2'>Order ID</li>
                            <li className='my-2'>Total product quantity ordered</li>
                            <li className='my-2'>Tracking Number</li>
                            <li className='my-2'>Packing List</li>
                        </ol>
                    </div>
                    <div className='col-span-1 h-[75vh]'>
                        <MyImage src={img1}/>
                    </div>
                </section>
                
                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid gap-2 sm:grid-cols-2'>
                    <div className='col-span-1'>
                        <h1 className='font-bold contentHeading my-4'>Tiktok</h1>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Shipping Provider</li>
                            <li className='my-2'>Order ID</li>
                            <li className='my-2'>Tracking Number</li>
                            <li className='my-2'>Packing List</li>
                        </ol>
                    </div>
                    <div className='col-span-1 h-[75vh]'>
                        <MyImage src={img2}/>
                    </div>
                </section>

                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2 sm:grid-cols-2'>
                    <div className='col-span-1'>
                        <h1 className='font-bold contentHeading my-4'>Lazada</h1>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Shipping Provider</li>
                            <li className='my-2'>Order ID</li>
                            <li className='my-2'>Tracking Number</li>
                            <li className='my-2'>Packing List</li>
                        </ol>
                    </div>
                    <div className='col-span-1 h-[75vh]'>
                        <MyImage src={img3}/>
                    </div>
                </section>
            </div>
        </div>
    )
}
