import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Customer Excellence/a1.png';
import img2 from '../assets/Knowledge Base/Customer Excellence/a2.png';
import img3 from '../assets/Knowledge Base/Customer Excellence/a3.png';
import img4 from '../assets/Knowledge Base/Customer Excellence/a4.png';

export default function ProductsToShip() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Floating Parcel (Products To Ship)<br/>(KB-007)</h1>
                <p><b>Written on:</b> October 20, 2023 <br/> <b>Updated on:</b> November 26, 2023</p>
            </section>
            <br/>
            <div className='h-auto sm:rounded-[30px] rounded-[10px] overflow-hidden'>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2'>
                    <p className='sm:text-xl text-base'>Floating parcels are orders that have been packed and are just awaiting the courier to handover for dispatch. These parcels would show on the seller page after the waybills are printed and the orders are arranged for shipment</p>
                    <h1 className='font-bold contentHeading my-4'>Shopee</h1>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img1}/>
                    </div>
                    <p className='sm:text-xl text-base'>Go to Orders tab {'>'} To Ship {'>'} Processed. Filter out the orders by courier and you will see the number of parcels that need to be dispatch to the corresponding courier.</p>
                </section>
                
                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Tiktok</h1>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img2}/>
                    </div>
                    <p className='sm:text-xl text-base'>Head to Manage Orders {'>'} To Ship then select Awaiting Collection. Click on the More filters dropdown to see all options.</p>
                    <br/>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img3}/>
                    </div>
                    <p className='sm:text-xl text-base'>Select a courier to sort the orders, and you will see the number of orders to be dispatched on the left side of the page.</p>
                </section>

                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Lazada</h1>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img4}/>
                    </div>
                    <p className='sm:text-xl text-base'>Go to Orders tab {'>'} To Ship {'>'} To Handover. Choose a courier to sort, and the quantity of parcels that need to be dispatched to the relevant courier will be displayed on the left side of the page.</p>
                </section>
            </div>
        </div>
    )
}
