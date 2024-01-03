import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Customer Excellence/f1.png';
import img2 from '../assets/Knowledge Base/Customer Excellence/f2.png';
import img3 from '../assets/Knowledge Base/Customer Excellence/f3.png';
import img4 from '../assets/Knowledge Base/Customer Excellence/f4.png';
import img5 from '../assets/Knowledge Base/Customer Excellence/f5.png';
import img6 from '../assets/Knowledge Base/Customer Excellence/f6.png';
import img7 from '../assets/Knowledge Base/Customer Excellence/f7.png';
import img8 from '../assets/Knowledge Base/Customer Excellence/f8.png';
import img9 from '../assets/Knowledge Base/Customer Excellence/f9.png';
import img10 from '../assets/Knowledge Base/Customer Excellence/f10.png';

import img11 from '../assets/Knowledge Base/Customer Excellence/g1.png';
import img12 from '../assets/Knowledge Base/Customer Excellence/g2.png';
import img13 from '../assets/Knowledge Base/Customer Excellence/g3.png';
import img14 from '../assets/Knowledge Base/Customer Excellence/g4.png';
import img15 from '../assets/Knowledge Base/Customer Excellence/g5.png';
import img16 from '../assets/Knowledge Base/Customer Excellence/g6.png';
import img17 from '../assets/Knowledge Base/Customer Excellence/g7.png';
import img18 from '../assets/Knowledge Base/Customer Excellence/g8.png';
import img19 from '../assets/Knowledge Base/Customer Excellence/g9.png';
import img20 from '../assets/Knowledge Base/Customer Excellence/g10.png';
import img21 from '../assets/Knowledge Base/Customer Excellence/g11.png';
import img22 from '../assets/Knowledge Base/Customer Excellence/g12.png';
import img23 from '../assets/Knowledge Base/Customer Excellence/g13.png';

import img24 from '../assets/Knowledge Base/Customer Excellence/h1.png';
import img25 from '../assets/Knowledge Base/Customer Excellence/h2.png';
import img26 from '../assets/Knowledge Base/Customer Excellence/h3.png';
import img27 from '../assets/Knowledge Base/Customer Excellence/h4.png';
import img28 from '../assets/Knowledge Base/Customer Excellence/h5.png';
import img29 from '../assets/Knowledge Base/Customer Excellence/h6.png';
import img30 from '../assets/Knowledge Base/Customer Excellence/h7.png';
import img31 from '../assets/Knowledge Base/Customer Excellence/h8.png';
import img32 from '../assets/Knowledge Base/Customer Excellence/h9.png';

export default function UndeliveredProducts() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>RTS (Undelivered Products)<br/>(KB-009)</h1>
                <p><b>Written on:</b> October 24, 2023 <br/> <b>Updated on:</b> November 26, 2023</p>
            </section>
            <br/>
            <div className='h-auto sm:rounded-[30px] rounded-[10px] overflow-hidden'>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid'>
                    <p className='sm:text-xl text-base'>
                    Processing an order to be shipped is an important thing, however, we often forget that no matter how good your shipping procedure and packaging there’s still some things that we can’t control such as loss of parcel in transit due to logistics fault, customer refusing to accept the order Return, and return fraud. Return to seller is a common occurrence in the shipping industry and can be caused by various reasons such as incorrect address provided by the customer or delivery attempts made when the customer is unavailable. In such cases, it is crucial for sellers to have efficient communication channels to address these issues promptly and ensure customer satisfaction.
                    <br/>
                    <br/>
                    <b>What is Return To Seller?</b>
                    <br/>
                    <br/>
                    <b>Return to Seller</b> is when the order will be sent back to the seller due to the customer not complying to receive the very order they made. It’s also when the customer could not be contacted by the courier that resulted in delivery attempts failure that forced the courier to return the item to the sorting facility and be shipped back to us, where it will be held until further instructions are provided by the customer. This process can occur due to various reasons such as incorrect address, refusal to accept the package, or unavailability of the recipient at the time of delivery.
                    <br/>
                    <br/>
                    <b>Return to Seller</b> doesn't always fall on the side of the customer. Some couriers are irresponsible and lazy, and they do not deliver the items to the customer, which is unacceptable as it goes against the agreed-upon service. In such instances, it is important for customers to reach out with their issues to the shipping company or product shop to get proper delivery of their package.
                    <br/>
                    <br/>
                    <b>What do we do about the RTS Orders?</b>
                    <br/>
                    <br/>
                    RTS orders should be carefully monitored since it’s a matter of resources to the company. We cannot just send the items and assume they are returned undamaged and in good condition. Occasionally, packages that are being returned to us get lost in transit, costing us yet another loss of inventory with which we could have generated more revenue for the company.
                    <br/>
                    <br/>
                    There are times that the parcel still hasn't been brought to the sorting facility where we could still escalate it to the courier’s team to push the delivery when we tracked that did not fulfill the rightful delivery attempts.
                    </p>
                </section>

                <section className='container bg-white mx-auto sm:p-10 p-2 grid'>
                    <h1 className='font-bold contentHeading my-4'>Shopee</h1>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>To find the RTS parcels in Shopee platform. Head to My Orders {'>'} Failed Delivery. <br/><br/>Adjust the date range from first day to the present day of the month.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img1}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Click Export to download the excel file of the failed deliveries.Click Export to download the excel file of the failed deliveries.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img2}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Open the downloaded file and copy the whole Tracking Number column.<br/><br/>Adjust the date range from first day to the present day of the month.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img3}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Paste in on a new sheet. Go to the Data ribbon and Remove Duplicates.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img4}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Copy the remaining tracking number and paste them on the empty space in RTS Tracking Records MS Excel file.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img5}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Highlight all the Tracking IDs then find the Conditional Formatting tab {'>'} Highlight Cell Rules {'>'} Duplicate Values.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img6}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Duplicate values would show up in red/green color. Delete the duplicates and go back to the Shopee Seller Center to search for the Tracking numbers.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img7}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Search for the order using the tracking number. After finding it, check the details to see the logistics status.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img8}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Check the number of attempts made and the reason for RTS.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img9}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Place the Tracking number to the corresponding reason and courier.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img10}/>
                        </div>
                    </div>
                    <br/>
                </section>

                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid'>
                    <h1 className='font-bold contentHeading my-4'>Tiktok</h1>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Go to Manage Orders. Click the View Orders link beside the bullet that says Delivery failed & return to seller. Then Export Orders</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img11}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Select Excel format {'>'} Export {'>'} Download</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img12}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Open the Excel file you just downloaded.<br/><br/>Copy the whole Tracking ID row.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img13}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Paste in on a new sheet. Go to the Data ribbon and Remove Duplicates.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img14}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Copy the remaining tracking number and paste them on the empty space in RTS Tracking Records MS Excel file.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img15}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>And paste it on the RTS Tracking Records.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img16}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Some of the Tracking IDs shows up as a decimal number. To see the whole tracking, right click to find the Number Format option. Pick Number on the left side tabs. Set the decimal place to 0. Click OK to apply the changes.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img17}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>As you can see, the whole Tracking IDs can now be seen.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img18}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>After that, highlight all the Tracking IDs recorded in the sheet. Find the Conditional Formatting tab {'>'} Highlight Cell Rules {'>'} Duplicate Values.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img19}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>All the Tracking IDs with duplicates will be highlighted in red/green. Delete the duplicates and the remaining tracking numbers will be recorded in today’s date.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img20}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Copy the remaining Tracking IDs one-by-one then go back to the TikTok Seller Center to find the corresponding tracking number. Press Ctrl F or F3 to open the search bar and paste the Tracking number you copied.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img21}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>After you found the it, click the View logistics button to see the status of the parcel. Look for the reason of the RTS parcel which you can find through the tracking results.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img22}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Paste the corresponding Tracking ID to the designated courier. Put it under column stating the reason and under today’s date.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img23}/>
                        </div>
                    </div>
                    <br/>
                </section>

                <section className='container bg-white mx-auto sm:p-10 p-2 grid'>
                    <h1 className='font-bold contentHeading my-4'>Lazada</h1>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Go to Orders, then click the Failed Delivery tab.<br/>Press Ctrl F or F3 to open the search bar. Then type in the search bar ‘in transit’ to find the RTS parcels that are still being delivered back to us.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img24}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Copy the Tracking number of the highlighted parcels.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img25}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Go to the Excel file of RTS Tracking and paste the tracking numbers you copied on an empty space below the tables. Make sure that the sheet you are on is named Lazada.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img26}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>When pasting a pure number tracking the whole number doesn’t show up. To make it appear, highlight all the tracking numbers you pasted then right click.<br/><br/>Select Number Format.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img27}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Select Number in the Category section. The decimal place is automatically indicated as ‘2’ so we have to replace it with the number ‘0’. Press Okay to confirm.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img28}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>After the complete tracking number appeared, highlight all the tracking numbers including the ones on the table.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img29}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Home Tab {'>'} Conditional Formatting {'>'} Highlight Cell Rules {'>'} Duplicate Values</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img30}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Click Done. Duplicate values would show up in red/green color. Delete the duplicates and go back to the Lazada Seller Center to check the Logistics Status of the remaining tracking numbers.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img31}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Find the reason the parcel was returned.</p>
                        <br/>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img32}/>
                        </div>
                        <p className='sm:text-xl text-base'>Place the corresponding Tracking Number on the table according to the reason for RTS. The date indicated would be the same day you checked the RTS parcel.</p>
                    </div>
                    <br/>
                </section>
            </div>
        </div>
    )
}
