import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Mountain Movers/d1.png';
import img2 from '../assets/Knowledge Base/Mountain Movers/d2.png';
import img3 from '../assets/Knowledge Base/Mountain Movers/d3.png';
import img4 from '../assets/Knowledge Base/Mountain Movers/d4.png';

import img5 from '../assets/Knowledge Base/Mountain Movers/e1.png';

import img6 from '../assets/Knowledge Base/Mountain Movers/f1.png';
import img7 from '../assets/Knowledge Base/Mountain Movers/f2.png';

export default function ProductPackaging() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Product Packaging<br/>(KB-003)</h1>
                <p><b>Written on:</b> October 20, 2023 <br/> <b>Updated on:</b> December 05, 2023</p>
            </section>
            <br/>

            <div className='h-auto sm:rounded-[30px] rounded-[10px] overflow-hidden'>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid'>
                    <h1 className='font-bold contentHeading my-4'>Shopee Packaging</h1>
                    <div className='col-span-1'>
                        <h1 className='font-bold contentSubHeading my-4'>Line 2</h1>
                        <div className='col-span-1'>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Separate Single and Multi Waybills.</li>
                                <li className='my-2'>Check the contents of the waybill.</li>
                                <li className='my-2'>Check the packing list. </li>
                                <li className='my-2'>Search for the Order ID on Shopee using the Klued cell phone.</li>
                                <li className='my-2'>Check if the products on the Order Details and waybill are correct. <br/><i>See the image below for comparison:</i></li>
                            </ol>
                        </div>
                        <div className='col-span-1 sm:flex grid gap-4 '>
                            <div className="h-auto w-auto sm:max-h-[75vh] max-h-[60vh] sm:max-w-[350px] border shadow-lg rounded-lg overflow-hidden">
                                <img className='h-full-w-full object-contain object-center' draggable={false} src={img1}/>
                            </div>
                            <div className="h-auto w-auto sm:max-h-[75vh] max-h-[60vh] sm:max-w-[300px] border shadow-lg rounded-lg overflow-hidden">
                                <img className='h-full-w-full object-cover ' draggable={false} src={img2}/>
                            </div>
                        </div>
                        <br/>

                        <div className='col-span-1'>
                            <ol start='6' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'><b>Gather the item/s</b> written on the waybill together.</li>
                                <li className='my-2'><b>Assure the quality and quantity</b> of the products.</li>
                                <li className='my-2'>Write the <b>initials of the Line 2</b> production staff on the waybill.</li>
                                <li className='my-2'><b>Send the customer</b> with the same Order ID on Shopee the <b>template message</b> provided.
                                <br/>
                                    --------------------------
                                    <br/>
                                    <b>Template:</b>
                                    <br/>
                                    “Hello luv 🤍🙈 I would like to let you know that we have packed your order and just waiting for the courier to pick it up. Thank you for choosing us. Please enjoy your purchase and we hope to see you again. Keep safe and blessed 🤍☁️
                                    <br/>
                                    In case of an issue with the order, PLEASE SEND A PICTURE OF WAYBILL for further investigation. Thank you!”
                                    <br/>
                                    --------------------------
                                </li>
                                <li className='my-2'><b>Take a picture</b> of the waybill together with the item/s the customer ordered and <b>send it to the customer</b> on Shopee.</li>
                                <li className='my-2'>Proceed by endorsing to <b>Line 3</b>.</li>
                            </ol>
                        </div>
                        <div className="h-auto w-auto sm:max-h-[75vh] max-h-[50vh] sm:max-w-[700px] border shadow-lg rounded-lg overflow-hidden">
                            <img className='h-full-w-full object-contain object-center' draggable={false} src={img3}/>
                        </div>
                    </div>

                    <div className='col-span-1'>
                        <h1 className='font-bold contentSubHeading my-4'>Line 3</h1>
                        <div className='col-span-1'>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'><b>Check the contents</b> of the waybill.</li>
                                <li className='my-2'>Bring the items/written on the waybill together</li>
                                <li className='my-2'><b>Check the packing list</b> to see if the item/s are correct.</li>
                                <li className='my-2'><b>Assure the quality and quantity</b> of the products.</li>
                                <li className='my-2'><b>Encircle the quantity of the product/s</b> written on the waybill if they are correct.</li>
                                <li className='my-2'><b>Write the initial of Line 3</b> under the initial of Line 2.</li>
                                <li className='my-2'><b>Put the item/s and waybill in the pouch</b> if Single or Multi.</li>
                                <li className='my-2'><b>Separately store Single and Multi</b> pouches in the hamper.</li>
                                <li className='my-2'><b>Proceed to Line 4</b>.</li>
                            </ol>
                        </div>
                    </div>

                    <div className='col-span-1'>
                        <h1 className='font-bold contentSubHeading my-4'>Line 4</h1>
                        <div className='col-span-1'>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Take out the item/s inside the pouch.</li>
                                <li className='my-2'>Check the contents of the waybill.</li>
                                <li className='my-2'>Check the packing list to see if the item/s are correct.</li>
                                <li className='my-2'>Assure the quality and quantity of the products.</li>
                                <li className='my-2'>Check the initials of Line 2 and Line 3.</li>
                                <li className='my-2'>Put a check on the waybill for each correct product.</li>
                                <li className='my-2'>Write the initial of Line 4 under the initial of Line 3.</li>
                                <li className='my-2'>Pump air into the bubble wrap.</li>
                                <li className='my-2'>Pack the item/s using bubble wrap and secure them with tape.</li>
                                <li className='my-2'>Place the wrapped order inside and seal the pouch. Finally, stick the waybill outside the parcel.</li>
                                <li className='my-2'>Separately store Single and Multi pouches in the hamper.
                                <br/>
                                <b>Example:</b>
                                <br/>
                                <br/>
                                As you can see, the initials of Line 2, 3, and 4 are indicated on the bottom right of the packing list. The quantity as well as the products are properly encircled and marked with a check.
                                </li>
                            </ol>
                        </div>
                        <div className="h-auto w-auto sm:max-h-[75vh] max-h-[50vh] sm:max-w-[400px] border shadow-lg rounded-lg overflow-hidden">
                            <img className='h-full-w-full object-contain object-center' draggable={false} src={img4}/>
                        </div>
                    </div>
                    <br/>
                    <div className='h-auto w-full sm:p-10 py-4 px-2 rounded-2xl border-4 border-dashed border-red-400'>
                        <p className='text-3xl font-bold'>Important!</p>
                        <br/>
                        <div>
                            <p className='sm:text-xl text-base'>The listed exemptions below are only allowed during our Sales or Events, we will do it only on Ex. Pay Day Sale, Double Digit Sales(11-11, 12-12 etc.) and also Beauty Fair.</p>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-6'>Taking photos of the waybill and product only in Camera. </li>
                                <li className='my-6'>No sending template message of Hi luv!</li>
                                <li className='my-6'>No sending pictures in Shoppe app. </li>
                            </ol>
                        </div>
                    </div>
                </section>

                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Tiktok Packaging</h1>
                    <div className='col-span-1'>
                        <h1 className='font-bold contentSubHeading my-4'>Line 2</h1>
                        <div className='col-span-1'>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Separate Single and Multi Waybills.</li>
                                <li className='my-2'>Check the contents of the waybill.</li>
                                <li className='my-2'>Check the packing list. </li>
                                <li className='my-2'>Check the packing list.</li>
                                <li className='my-2'>Bring the item/s written on the waybill together.</li>
                                <li className='my-2'>Assure the quality and quantity of the products.</li>
                                <li className='my-2'>Write the initials of the Line 2 production staff on the waybill.</li>
                                <li className='my-2'>Take a picture of the waybill together with the item/s the customer ordered.</li>
                                <li className='my-2'>Proceed to Line 3.</li>
                            </ol>
                        </div>
                    </div>

                    <div className='col-span-1'>
                        <h1 className='font-bold contentSubHeading my-4'>Line 3</h1>
                        <div className='col-span-1'>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Check the waybill.</li>
                                <li className='my-2'>Bring the items/written on the waybill together</li>
                                <li className='my-2'>Check the packing list to see if the item/s are correct. </li>
                                <li className='my-2'>Assure the quality and quantity of the products.</li>
                                <li className='my-2'>Encircle the quantity of the product/s if they are correct.</li>
                                <li className='my-2'>Write the initial of assigned staff on Line 3 under the initial of Line 2.</li>
                                <li className='my-2'>Put the item/s and waybill in the pouch if Single or Multi.</li>
                                <li className='my-2'>Separately store Single and Multi pouches in the hamper.</li>
                                <li className='my-2'>Proceed to Line 4.</li>
                            </ol>
                        </div>
                    </div>

                    <div className='col-span-1'>
                        <h1 className='font-bold contentSubHeading my-4'>Line 4</h1>
                        <div className='col-span-1'>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Check the waybill.</li>

                                <li className='my-2'>Take out the item/s in the pouch.</li>
                                <li className='my-2'>Check the waybill.</li>
                                <li className='my-2'>Check the packing list to see if the item/s are correct.</li>
                                <li className='my-2'>Assure the quality and quantity of the products.</li>
                                <li className='my-2'>Check the initials of Line 2 and Line 3.</li>
                                <li className='my-2'>Put a check on the waybill for each correct product.</li>
                                <li className='my-2'>Write the initial of Line 4 under the initial of Line 3.</li>
                                <li className='my-2'>Pump air into the bubble wrap.</li>
                                <li className='my-2'>Pack the item/s using bubble wrap and secure them with tape.</li>
                                <li className='my-2'>Place the wrapped order inside and seal the pouch. Finally, stick the waybill outside the parcel.</li>
                                <li className='my-2'>Separately store Single and Multi pouches in the hamper.
                                <br/>
                                <b>Example:</b>
                                <br/>
                                <br/>
                                This is how the final look package should have before handover to the courier. The initials of the Line 2, 3, and 4 are properly arranged vertically on the left side below the packing list on the waybill. The quantity and products are also properly marked as checked and encircled indicating that the order was correctly dispatched.</li>
                            </ol>
                        </div>
                        <div className="h-auto w-auto sm:max-h-[75vh] max-h-[50vh] sm:max-w-[600px] border shadow-lg rounded-lg overflow-hidden">
                            <img className='h-full-w-full object-contain object-center' draggable={false} src={img5}/>
                        </div>
                    </div>
                </section>

                <section className='container bg-white mx-auto sm:p-10 p-2 grid'>
                    <h1 className='font-bold contentHeading my-4'>Lazada Packaging</h1>
                    <div className='col-span-1'>
                        <h1 className='font-bold contentSubHeading my-4'>Line 2</h1>
                        <div className='col-span-1'>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Separate Single and Multi Waybills.</li>
                                <li className='my-2'>Check the contents of the waybill.</li>
                                <li className='my-2'>Bring the item/s written on the waybill together.</li>
                                <li className='my-2'>If the quantity written on the waybill is more than 3, search for the Order ID on Lazada using the Klued mobile phone.</li>
                                <li className='my-2'>Check the Order Details to see the complete order form.</li>
                                <li className='my-2'>Write the Code and quantity of the missing products not written on the waybill. <br/><b>Example: The product code and quantity are written below the packing list</b></li>
                            </ol>
                        </div>
                        <div className="h-auto w-auto sm:max-h-[75vh] max-h-[50vh] sm:max-w-[350px] border shadow-lg rounded-lg overflow-hidden">
                            <img className='h-full-w-full object-contain object-center' draggable={false} src={img6}/>
                        </div>
                        <div className='col-span-1'>
                            <ol start='5' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Gather the item/s written on the waybill together.</li>
                                <li className='my-2'>Assure the quality and quantity of the products.</li>
                                <li className='my-2'>Write the initials of the Line 2 production staff on the waybill.</li>
                                <li className='my-2'>Take a picture of the waybill together with the item/s the customer ordered.</li>
                                <li className='my-2'>Proceed to Line 3.</li>
                            </ol>
                        </div>
                    </div>

                    <div className='col-span-1'>
                        <h1 className='font-bold contentSubHeading my-4'>Line 3</h1>
                        <div className='col-span-1'>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Check the contents of the waybill.</li>
                                <li className='my-2'>If the quantity written on the waybill is more than 3, search for the Order ID on Lazada Seller Center using the Klued mobile phone.</li>
                                <li className='my-2'>Check the Order Details to see the complete order form.</li>
                                <li className='my-2'>Check the packing list to see if the item/s are correct.</li>
                                <li className='my-2'>Assure the quality and quantity of the products.</li>
                                <li className='my-2'>Encircle the quantity of the product/s written on the waybill if they are correct.</li>
                                <li className='my-2'>Write the initial of assigned staff on Line 3 under the initial of Line 2.</li>
                                <li className='my-2'>Put the item/s and waybill in the pouch if Single or Multi.</li>
                                <li className='my-2'>Separately store Single and Multi pouches in the hamper.</li>
                                <li className='my-2'>Proceed to Line 4.</li>
                            </ol>
                        </div>
                    </div>

                    <div className='col-span-1'>
                        <h1 className='font-bold contentSubHeading my-4'>Line 4</h1>
                        <div className='col-span-1'>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Take out the item/s in the pouch.</li>
                                <li className='my-2'>Check the contents of the waybill.</li>
                                <li className='my-2'>Check the packing list to see if the item/s are correct.</li>
                                <li className='my-2'>Assure the quality and quantity of the products.</li>
                                <li className='my-2'>Check the initials of Line 2 and Line 3.</li>
                                <li className='my-2'>Put a check on the waybill for each correct product.</li>
                                <li className='my-2'>Write the initial of Line 4 under the initial of Line 3.</li>
                                <li className='my-2'>Pump air into the bubble wrap.</li>
                                <li className='my-2'>Pack the item/s using bubble wrap and secure them properly with tape.</li>
                                <li className='my-2'>Place the wrapped order inside and seal the pouch. Finally, stick the waybill outside the parcel.</li>
                                <li className='my-2'>Separately store Single and Multi pouches in the hamper.
                                    <br/>
                                    <b>Example:</b>
                                </li>
                            </ol>
                        </div>
                        <div className="h-auto w-auto sm:max-h-[75vh] max-h-[50vh] sm:max-w-[350px] border shadow-lg rounded-lg overflow-hidden">
                            <img className='h-full-w-full object-contain object-center' draggable={false} src={img7}/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
