import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Mountain Movers/h1.png';
import img2 from '../assets/Knowledge Base/Mountain Movers/h2.png';
import img3 from '../assets/Knowledge Base/Mountain Movers/h3.png';
import img4 from '../assets/Knowledge Base/Mountain Movers/h4.png';
import img5 from '../assets/Knowledge Base/Mountain Movers/h5.png';
import img6 from '../assets/Knowledge Base/Mountain Movers/h6.png';
import img7 from '../assets/Knowledge Base/Mountain Movers/h7.png';
import img8 from '../assets/Knowledge Base/Mountain Movers/h8.png';
import img9 from '../assets/Knowledge Base/Mountain Movers/h9.png';
import img10 from '../assets/Knowledge Base/Mountain Movers/h10.png';
import MyImage from  '../Components/MyImage';

export default function PackagingRules() {
    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])

    useEffect(() => {
        const handleContextmenu = e => {
            e.preventDefault()
        }
        document.addEventListener('contextmenu', handleContextmenu)
        return function cleanup() {
            document.removeEventListener('contextmenu', handleContextmenu)
        }
    }, [])

    return (
        <div className='bg-blue-200 h-auto w-full text-base sm:text-lg sm:p-8 p-4'>
            <section className='my-2'>
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Packaging Rules<br/>(KB-004)</h1>
                <p><b>Written on:</b> October 20, 2023 <br/> <b>Updated on:</b> December 05, 2023</p>
            </section>
            <br/>

            <div className='h-auto sm:rounded-[30px] rounded-[10px] overflow-hidden'>
            <section className='container bg-white mx-auto sm:p-10 p-2 grid justify-center gap-2'>
                <p className='text-justify sm:text-xl text-base'>
                    Packing the product safely is one of the essentials when it comes to achieving successful deliveries. The product undergoes a very long process in logistics and will be put in a very harsh process of sorting that might result in the item being destroyed. That's the part where good packaging becomes important. It protects the product from being tossed, smashed, or subjected to severe temperatures. Good packaging serves as a defense against the environment and helps to avoid damage during transportation or storage.
                    <br/>
                    <br/>
                    If the customer receives a damaged item, it will result in negative reviews, refund or return/refund that will cause a loss of the company's revenue and prestige
                </p>
                <h1 className='font-bold contentHeading my-4'>This is the step-by-step procedure of safely packing an order:</h1>
                <div className='col-span-1'>
                    <ol className='ml-4 list-decimal sm:text-xl text-base'>
                        <li className='my-2'>Inflate the bubble wrap using an air pump.</li>
                    </ol>
                </div>
                <div className='col-span-1'>
                    <MyImage className='' src={img1}/>
                </div>
                <div className='col-span-1'>
                    <ol start='2' className='ml-4 list-decimal sm:text-xl text-base'>
                        <li className='my-2'>Enclose the product using the bubble wrap. The wrapping should fit nicely around it, not loose nor too tight.
                        <br/>
                        <br/>
                        <b><i>(Note: Be aware that if you wrap the item tightly, the bubble wrap will burst open and lose its cushion that serves as protection. The product will fall from the hold and no longer be secured if the wrapping is loose).</i></b>
                        </li>
                    </ol>
                </div>
                <div className='col-span-1 grid grid-cols-2 gap-2'>
                    <MyImage className='col-span-1' src={img2}/>
                    <MyImage className='col-span-1' src={img3}/>
                </div>

                <div className='col-span-1'>
                    <ol start='3' className='ml-4 list-decimal sm:text-xl text-base'>
                        <li className='my-2'>Cut the bubble wrap according to the number of orders. A single order will be shorter compared to multiple orders.</li>
                    </ol>
                </div>
                <div className='col-span-1'>
                    <MyImage className='' src={img4}/>
                </div>

                <div className='col-span-1'>
                    <ol start='4' className='ml-4 list-decimal sm:text-xl text-base'>
                        <li className='my-2'>Use packing tape to firmly hold the bubble wrap in place after you've wrapped the item in it.</li>
                    </ol>
                </div>
                <div className='col-span-1 grid grid-cols-2 gap-2'>
                    <MyImage className='col-span-1' src={img5}/>
                    <MyImage className='col-span-1' src={img6}/>
                </div>

                <div className='col-span-1'>
                    <ol start='5' className='ml-4 list-decimal sm:text-xl text-base'>
                        <li className='my-2'>Pouches come in two sizes: Single and Multi, with Single pouches ideal for smaller items, Multi pouches for multiple items.</li>
                    </ol>
                </div>
                <div className='col-span-1 grid grid-cols-2 gap-2'>
                    <MyImage className='col-span-1' src={img7}/>
                    <MyImage className='col-span-1' src={img8}/>
                </div>

                <div className='col-span-1'>
                    <ol start='6' className='ml-4 list-decimal sm:text-xl text-base'>
                        <li className='my-2'>Stick the waybill onto the pouch without crumpling or wrinkles to keep order details for easy scanning and monitoring by managers before passing the parcel to logistics partners.</li>
                    </ol>
                </div>
                <div className='col-span-1 grid grid-cols-2 gap-2'>
                    <MyImage className='col-span-1' src={img9}/>
                    <MyImage className='col-span-1' src={img10}/>
                </div>
            </section>
            </div>
        </div>
    )
}
