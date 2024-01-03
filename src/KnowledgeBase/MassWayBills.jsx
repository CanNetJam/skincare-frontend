import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Mountain Movers/a1.png';
import img2 from '../assets/Knowledge Base/Mountain Movers/a2.png';
import img3 from '../assets/Knowledge Base/Mountain Movers/a3.png';
import img4 from '../assets/Knowledge Base/Mountain Movers/a4.png';
import img5 from '../assets/Knowledge Base/Mountain Movers/a5.png';
import img6 from '../assets/Knowledge Base/Mountain Movers/a6.png';
import img7 from '../assets/Knowledge Base/Mountain Movers/a7.png';

import img8 from '../assets/Knowledge Base/Mountain Movers/b1.png';
import img9 from '../assets/Knowledge Base/Mountain Movers/b2.png';
import img10 from '../assets/Knowledge Base/Mountain Movers/b3.png';
import img11 from '../assets/Knowledge Base/Mountain Movers/b4.png';
import img12 from '../assets/Knowledge Base/Mountain Movers/b5.png';
import img13 from '../assets/Knowledge Base/Mountain Movers/b6.png';

import img14 from '../assets/Knowledge Base/Mountain Movers/c1.png';
import img15 from '../assets/Knowledge Base/Mountain Movers/c2.png';
import img16 from '../assets/Knowledge Base/Mountain Movers/c3.png';
import img17 from '../assets/Knowledge Base/Mountain Movers/c4.png';

import MyImage from  '../Components/MyImage';

export default function MassWayBills() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Mass Printing Waybills<br/>(KB-002)</h1>
                <p><b>Written on:</b> October 20, 2023 <br/> <b>Updated on:</b> December 05, 2023</p>
            </section>
            <br/>
            <div className='h-auto sm:rounded-[30px] rounded-[10px] overflow-hidden'>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid'>
                        <div className='col-span-1'>
                            <h1 className='font-bold contentHeading my-4'>Shopee</h1>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Go to <b>My Orders</b> tab.</li>
                                <li className='my-2'>Click the <b>To Ship</b> tab to view the most recent orders that haven't been dispatched.</li>
                                <li className='my-2'>Choose <b>To Process</b> to view.</li>
                                <li className='my-2'>Click <b>Mass Ship</b>.</li>
                            </ol>
                        </div>

                        <br/>
                        <div className='col-span-1'>
                            <MyImage className='' src={img1}/>
                        </div>
                        <div className='col-span-1'>
                            <ol start='5' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Choose a courier to filter orders.</li>
                                <li className='my-2'>Click the dropdown to select the number of orders per page.</li>
                                <li className='my-2'>Sort the orders by <b>Oldest Created Date - Oldest to Newest.</b></li>
                                <li className='my-2'>Mark the checkbox to select all the orders.</li>
                            </ol>
                        </div>

                        <br/>
                        <div className='col-span-1'>
                            <MyImage className='' src={img2}/>
                        </div>
                        <div className='col-span-1'>
                            <ol start='9' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>The total number of orders selected is indicated here.</li>
                                <li className='my-2'>Click <b>Mass Arrange Pickup.</b></li>
                            </ol>
                        </div>

                        <br/>
                        <div className='col-span-1'>
                            <MyImage className='' src={img3}/>
                        </div>
                        <div className='col-span-1'>
                            <ol start='11' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Pick a suitable date for pickup. (This feature is exclusive to shopee)</li>
                            </ol>
                        </div>
                        <br/>

                        <div className='col-span-1'>
                            <MyImage className='' src={img4}/>
                        </div>
                        <div className='col-span-1'>
                            <ol start='12' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Click <b>Confirm</b>.</li>
                            </ol>
                        </div>
                        <br/>

                        <div className='col-span-1'>
                            <MyImage className='' src={img5}/>
                        </div>
                        <div className='col-span-1'>
                            <ol start='13' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Click <b>Generate</b> to show the dropdown option.</li>
                                <li className='my-2'>Select <b>Manually select shipping documents</b>.</li>
                            </ol>
                        </div>

                        <br/>
                        <div className='col-span-1'>
                            <MyImage className='' src={img6}/>
                        </div>
                        <div className='col-span-1'>
                            <ol start='15' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Put a check mark on the <b>Air Waybill & Packing List</b>.</li>
                                <li className='my-2'>Click <b>Generate Selected Documents</b>.</li>
                            </ol>
                        </div>

                        <br/>
                        <div className='col-span-1'>
                            <MyImage className='' src={img7}/>
                        </div>
                        <div className='col-span-1'>
                            <ol start='17' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Click <b>Print the Document</b> button.</li>
                                <li className='my-2'>Select the right custom settings.</li>
                                <li className='my-2'>Start to <b>Print</b>.</li>
                            </ol>
                        </div>
                </section>

                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid'>
                        <div className='col-span-1'>
                            <h1 className='font-bold contentHeading my-4'>Tiktok</h1>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Go to <b>Manage Orders</b>.</li>
                                <li className='my-2'>Click <b>To Ship</b>.</li>
                                <li className='my-2'>Select <b>Awaiting Shipment</b>.</li>
                            </ol>
                        </div>
                        <div className='col-span-1'>
                            <MyImage className='' src={img8}/>
                        </div>

                        <br/>
                        <div className='col-span-1'>
                            <ol start='4' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Sort the orders by choosing a courier.</li>
                                <li className='my-2'>Sort by <b>Oldest to Newest</b>.</li>
                                <li className='my-2'>Mark the checkbox to select all orders on the page.</li>
                                <li className='my-2'>Select <b>Arrange for selected packages</b> (for total orders below 50) or <b>Arrange for filtered packages</b> (for total orders above 50).</li>
                            </ol>
                        </div>
                        <div className='col-span-1'>
                            <MyImage className='' src={img9}/>
                        </div>

                        <br/>
                        <div className='col-span-1'>
                            <ol start='8' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Select the <b>Pick-up</b> option.</li>
                                <li className='my-2'>Click <b>Next</b> to proceed.</li>
                            </ol>
                        </div>
                        <div className='col-span-1'>
                            <MyImage className='' src={img10}/>
                        </div>

                        <br/>
                        <div className='col-span-1'>
                            <ol start='10' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Agree to <b>Terms and conditions</b>.</li>
                                <li className='my-2'><b>Confirm</b> to proceed.</li>
                            </ol>
                        </div>
                        <div className='col-span-1'>
                            <MyImage className='' src={img11}/>
                        </div>

                        <br/>
                        <div className='col-span-1'>
                            <ol start='12' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Click on <b>Generate Documents</b> to show dropdown option.</li>
                                <li className='my-2'>Select <b>Print Shipping label & Packing list</b>.</li>
                            </ol>
                        </div>
                        <div className='col-span-1'>
                            <MyImage className='' src={img12}/>
                        </div>

                        <br/>
                        <div className='col-span-1'>
                            <ol start='14' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Click the <b>Printer</b> icon.</li>
                                <li className='my-2'>Select the right custom settings.</li>
                                <li className='my-2'>Click <b>Print</b> to start.</li>
                            </ol>
                        </div>
                        <div className='col-span-1'>
                            <MyImage className='' src={img13}/>
                        </div>
                </section>

                <section className='container bg-white mx-auto sm:p-10 p-2 grid'>
                    <div className='col-span-1'>
                        <h1 className='font-bold contentHeading my-4'>Lazada</h1>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Go to <b>Orders</b>.</li>
                            <li className='my-2'>Select <b>To Ship</b> tab.</li>
                            <li className='my-2'>Proceed to the <b>To Pack</b> option.</li>
                            <li className='my-2'>Filter the orders by <b>selecting a courier</b>.</li>
                        </ol>
                    </div> 
                    <div className='col-span-1'>
                        <MyImage className='' src={img14}/>
                    </div>
                    <br/>

                    <div className='col-span-1'>
                        <ol start='5' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Sort the orders by <b>Oldest Order Created</b>.</li>
                            <li className='my-2'><b>Mark the checkbox</b> to select all orders in the page.</li>
                            <li className='my-2'>Click <b>Pack & Print</b> to proceed to the next step.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <MyImage className='' src={img15}/>
                    </div>

                    <br/>
                    <div className='col-span-1'>
                        <ol start='8' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Pick the <b>AWB</b> (Air Waybill) option for printing.</li>
                            <li className='my-2'>Click <b>Ship & Print</b>.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <MyImage className='' src={img16}/>
                    </div>

                    <br/>
                    <div className='col-span-1'>
                        <ol start='10' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Click the <b>printer</b> icon.</li>
                            <li className='my-2'>Select the right settings.</li>
                            <li className='my-2'>Click <b>Print</b> to start.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <MyImage className='' src={img17}/>
                    </div>
                </section>
            </div>
        </div>
    )
}
