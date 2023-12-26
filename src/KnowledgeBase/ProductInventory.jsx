import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Mountain Movers/j1.png';
import img2 from '../assets/Knowledge Base/Mountain Movers/j2.png';
import img3 from '../assets/Knowledge Base/Mountain Movers/j3.png';
import img4 from '../assets/Knowledge Base/Mountain Movers/j4.png';
import img5 from '../assets/Knowledge Base/Mountain Movers/j5.png';
import img6 from '../assets/Knowledge Base/Mountain Movers/j6.png';
import img7 from '../assets/Knowledge Base/Mountain Movers/j7.png';
import img8 from '../assets/Knowledge Base/Mountain Movers/j8.png';

export default function ProductInventory() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Product Inventory<br/>(KB-006)</h1>
            </section>
            <br/>
            <div className='h-auto sm:rounded-[30px] rounded-[10px] overflow-hidden'>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid justify-center gap-2'>
                    <p className='sm:text-xl text-base'>Product inventory needs to be accurately tallied or counted and passed the quality control before being stored in a rack or stock room and it should follow the first in and first out. It must be organizing the product and batch of product for product releasing purposes.</p>
                    <img className='' src={img1}/>
                    <p className='sm:text-xl text-base'>Before placing the products in the stock room, it should have the batch and box number paper which includes the following.</p>
                    <ul className='ml-4 list-disc sm:text-xl text-base'>
                        <li className='my-2'>Batch number & Box number</li>
                        <li className='my-2'>Product name</li>
                        <li className='my-2'>Number of Items</li>
                        <li className='my-2'>Checked by and Date "after quality control"</li>
                        <li className='my-2'>Boxed by and Date "after boxing"</li>
                        <li className='my-2'>Managers signed/approved "passed the quality control"</li>
                        <li className='my-2'>Dispatched by</li>
                        <li className='my-2'>Dispatch Date</li>
                    </ul>
                    <p className='sm:text-xl text-base'>Purpose of having a Batch and Box number is to make sure that the "first in" and "first out" policies are followed for products released, a batch and box number paper is necessary.</p>
                    <img className='' src={img2}/>
                    <br/>
                    <p className='sm:text-xl text-base'>They should be arranged in the rack after the managers have approved the quality control the production staff did. To make it easier to identify the ‘First in, First out’ products. 
                    <br/>
                    <br/>
                    Reminder: The first Box number should always be put on the top of the next Box number to easily determine the ‘First in, First out’.</p>
                    <img className='' src={img5}/>
                    <br/>
                    <div className='sm:text-xl text-base'><b>Product Inventory contains two different aspects of proper recording.</b>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'><b>Ready Products</b>
                                <ul className='ml-4 list-disc sm:text-xl text-base'>
                                    <li className='my-2'>Already passed the Quantity, Quality and Boxing "QQB" or Quality Control. It’s ready to dispatch and release.</li>
                                    <li className='my-2'>They already checked and separate the rejects to good quality products.</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                    <img className='' src={img3}/>
                    <br/>

                    <ol start='2' className='ml-4 list-decimal sm:text-xl text-base'>
                        <li className='my-2'><b>Not Ready Products</b>
                            <ul className='ml-4 list-disc sm:text-xl text-base'>
                                <li className='my-2'>Not yet qualified or check for Quantity, Quality and Boxing "QQB" or Quality Control. It’s not ready to dispatch and release.</li>
                            </ul>
                        </li>
                    </ol>
                    <img className='' src={img4}/>
                    <br/>

                    <p className='sm:text-xl text-base'>For inventory purposes, if all products have been released and if they notice that there are still products inside the box, Line 2 must put a new quantity in the Batch and Box numbers paper and easy to determine.
                    <br/>
                    <br/>
                    The product inventory should have to begin as soon as it is released the product for another recount or data.</p>
                    <br/>
                    <p className='sm:text-xl text-base'>
                    <b>Reminder:</b>
                    <br/>
                    When organizing delivery products, the ‘First in, First out’ product or first batch delivered must be on lead. It should be organized in the rack by following the ‘First in, First out’ or first deliver policy by inputting the Batch and Box number label to easily determine what is the first batch delivered for maintenance making sure that the ‘First in, First out’ procedure is followed.
                    </p>
                </section>
                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid justify-center gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Contacting Manufacturer and Packaging</h1>
                    <h1 className='font-bold contentSubHeading my-4'>Manufacturer</h1>
                    <ul>
                        <li>The manufacturer provides the goods and supply the products based on the needs of Klued.</li>
                        <li>Get the information of delivery time, delivery schedules, products to be delivered, and their quantity. We need to assure that the items would be delivered on time and always remind them by contacting them for a negotiation on product concerns.</li>
                    </ul>
                    <p className='sm:text-xl text-base'><i><b>Take note:</b> If we have concern or updates regarding the products, the assigned personnel will use Viber app to communicate with the manufacturer and also use emails for transaction.</i></p>
                    <img src={img6}/>
                    <p className='sm:text-xl text-base'>We must know the products with low numbers in stock before informing the manufacturer to prioritize that certain product’s delivery. Before dealing with the manufacturer regarding our concern, we need to communicate with our assigned contact person from the manufacturer, ask them if the concerned product/s still have stocks or is available.</p>
                    <p className='sm:text-xl text-base'>Among our concerns, the delivery of low stock products should be on top priority and need to update from time to time and get the information that they give to us.
                    <br/>
                    <br/>
                    Make sure to encode the data of the delivered products we received for accurately tallying of records. The manufacturer that delivered the products should be recorded in Record notebook dedicated for recording stocks.</p>
                    
                    <br/>
                    <h1 className='font-bold contentHeading my-4'>Record Book of the Manufacturer</h1>
                    <div className='grid grid-cols-2'>
                        <img className='col-span-1'src={img7}/>
                        <img className='col-span-1 rotate-90 translate-y-1/2'src={img8}/>
                    </div>
                    <p className='sm:text-xl text-center'><i><b>Take note:</b> Make sure the numbers in the receipt are equal to what we received.</i></p>
                </section>
            </div>
        </div>
    )
}
