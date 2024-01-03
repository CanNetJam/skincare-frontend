import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Customer Excellence/b2.png';
import img2 from '../assets/Knowledge Base/Customer Excellence/b3.png';
import img3 from '../assets/Knowledge Base/Customer Excellence/b4.png';
import img4 from '../assets/Knowledge Base/Customer Excellence/b5.png';
import img5 from '../assets/Knowledge Base/Customer Excellence/b6.png';

import img6 from '../assets/Knowledge Base/Customer Excellence/c1.png';
import img7 from '../assets/Knowledge Base/Customer Excellence/c2.png';
import img8 from '../assets/Knowledge Base/Customer Excellence/d1.png';
import img9 from '../assets/Knowledge Base/Customer Excellence/d2.png';
import img10 from '../assets/Knowledge Base/Customer Excellence/d3.png';

import img11 from '../assets/Knowledge Base/Customer Excellence/e1.png';
import img12 from '../assets/Knowledge Base/Customer Excellence/e2.png';
import img13 from '../assets/Knowledge Base/Customer Excellence/e3.png';
import img14 from '../assets/Knowledge Base/Customer Excellence/e4.png';
import img15 from '../assets/Knowledge Base/Customer Excellence/e5.png';
import img16 from '../assets/Knowledge Base/Customer Excellence/e6.png';
import img17 from '../assets/Knowledge Base/Customer Excellence/e7.png';
import img18 from '../assets/Knowledge Base/Customer Excellence/e8.png';
import img19 from '../assets/Knowledge Base/Customer Excellence/e9.png';
import img20 from '../assets/Knowledge Base/Customer Excellence/e10.png';

import MyImage from  '../Components/MyImage';

export default function CustomerSupport() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Customer Support<br/>(KB-008)</h1>
                <p><b>Written on:</b> October 20, 2023 <br/> <b>Updated on:</b> November 26, 2023</p>
            </section>
            <br/>

            <div className='h-auto sm:rounded-[30px] rounded-[10px] overflow-hidden'>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid'>
                    <h1 className='font-bold contentHeading my-4'>Shopee</h1>
                        <div className='col-span-1'>
                            <h1 className='font-bold contentSubHeading my-4'>Chat Interface Navigation</h1>
                            <p className='sm:text-xl text-base'>As qualified customer service support, we have to be the last touch for every message. This can make the customers feel that we have heard and responded to their concerns providing them with great service by addressing their chat and giving it a conclusion. It is also important to take note that failure to respond to a customer’s message within the given time limit would automatically close the chat thread which in turn could affect the overall Chat Response Rate of the seller account.
                            <br/>
                            <br/>
                            Maintaining the score of 85% Chat Response Rate on all platforms is required in order not to lose the privileges acquired. There would also be a higher chance of converting the person into a buyer and boosting the sales of the company by replying to them promptly thus speeding up their buying decision.</p>
                            <br/>
                            <div className='col-span-1'>
                                <MyImage className='' src={img1}/>
                            </div>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Sticker - Use this to send a sticker as response to the customers.</li>
                                <li className='my-2'>Image - Here is where you can browse for the photo you want to send the customer.</li>
                                <li className='my-2'>Video - Here is where you can browse for the video you want to send the customer.</li>
                                <li className='my-2'>Rating Invitation - Use this to ask a customer to evaluate your service.</li>
                                <li className='my-2'>Order - You can see here the current and previous order/s of the customer.</li>
                                <li className='my-2'>Product - You will see here the products listed in the shop. By sending it to the customer, they can be directed to the checkout link of that product.</li>
                                <li className='my-2'>Voucher - Use this to send the customers an available voucher.</li>
                                <li className='my-2'>Shortcut - This is where you can see the answer spiel available for quick responses in certain scenarios.</li>
                                <li className='my-2'>Parcel Status - The current status of the order is indicated here, whether it is unpaid, shipped, or canceled.</li>
                                <li className='my-2'>Order ID & Mode of Payment - The generated Order ID and the customer’s payment method is indicated here.</li>
                                <li className='my-2'>Order Creation Date - This pertains to the date and time the customer made their order.</li>
                                <li className='my-2'>Cancel - Used to cancel an order.</li>
                                <li className='my-2'>Details - Click here to see more details regarding the customer’s order.</li>
                                <li className='my-2'>Send - Use this to send the customer their order link.</li>
                            </ol>
                        </div>
                        <br/>
                        <div className='col-span-1'>
                            <div className='col-span-1'>
                                <MyImage className='' src={img2}/>
                            </div>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Order ID - This is the generated Order ID of the customer’s order.</li>
                                <li className='my-2'>Buyer Details - Here you can view the name, contact number, and address of the receiver.</li>
                                <li className='my-2'>Courier - You can see here the shipping courier of the order.</li>
                                <li className='my-2'>Tracking Number - This is the corresponding tracking ID for the order.</li>
                                <li className='my-2'>Shipping Status - You can track here the movement of the parcel shipped.</li>
                            </ol>
                        </div>

                        <br/>
                        <div className='col-span-1'>
                            <MyImage className='' src={img3}/>
                        </div>
                        <div className='col-span-1'>
                            <ol start='11' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Product/s Ordered & Quantity - The item/s and the quantity the customer order.</li>
                                <li className='my-2'>Payment Information - The detailed price of the product and shipping fee including the seller discount, seller vouchers, and Shopee vouchers used.</li>
                                <li className='my-2'>Final Amount - The total amount to be paid by the buyer after discounts.</li>
                            </ol>
                        </div>
                        <br/>

                        <div className='col-span-1'>
                            <h1 className='font-bold contentHeading my-4'>Chat Transfer: To Another Agent</h1>
                            <br/>
                            <p className='sm:text-xl text-base'>To transfer chats on Shopee, simply click the drop down icon beside the customer username then select Forward. You can also transfer chats by clicking the Forward button on the upper right side of the interface.</p>
                            <MyImage className='' src={img4}/>
                        </div>
                        <br/>

                        <div className='col-span-1'>
                            <p className='sm:text-xl text-base'>The list of agents you can choose from would show and after choosing the agent, click the Forward to Member button to transfer the chat.</p>
                            <MyImage className='' src={img5}/>
                        </div>
                </section>

                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid'>
                    <h1 className='font-bold contentHeading my-4'>Tiktok</h1>
                        <div className='col-span-1'>
                            <h1 className='font-bold contentSubHeading my-4'>Chat Interface Navigation</h1>
                            <br/>

                            <div className='col-span-1'>
                                <MyImage className='' src={img6}/>
                            </div>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Open - Current chats threads.</li>
                                <li className='my-2'>Unread - Chats that haven’t been opened yet.</li>
                                <li className='my-2'>Unreplied - Current chats that we haven’t replied.</li>
                                <li className='my-2'>Due Soon - Chat threads that haven’t been replied yet within 24 hours.</li>
                                <li className='my-2'>Starred - These are pinned messages.</li>
                                <li className='my-2'>Closed - These are chat threads that are already closed.</li>
                                <li className='my-2'>Unassigned - Chats that are not assigned to any agents.</li>
                                <li className='my-2'>Send GIFs - Shows the stickers we can send in the chat.</li>
                                <li className='my-2'>Send photos - Click to browse images you want to send.</li>
                                <li className='my-2'>Send videos - Click to browse videos you need to send.</li>
                                <li className='my-2'>Saved Reply - Premade responses to certain situations.</li>
                                <li className='my-2'>Collapse - Click to collapse the Order page on the right.</li>
                                <li className='my-2'>Star - Use this to pin the customer.</li>
                                <li className='my-2'>Transfer chat - Used to transfer chats to other agents.</li>
                                <li className='my-2'>Close - Click to close the current open chat threads.</li>
                                <li className='my-2'>Orders - This shows all the orders made by customer</li>
                                <li className='my-2'>Products - This lists the products we offer. We can send the product link to the customers to invite them to checkout.</li>
                                <li className='my-2'>Coupons - Available vouchers we can offer to the customers.</li>
                                <li className='my-2'>Order Status - States the current status of the order.</li>
                                <li className='my-2'>Order ID - The generated personal order id of the order.</li>
                                <li className='my-2'>Order Creation Date - The date and time the customer made the order.</li>
                                <li className='my-2'>View - Click to see a summary of logistics tracking of the parcel.</li>
                                <li className='my-2'>Send - Click this to send the customer their order details.</li>
                                <li className='my-2'>Total and Mode of Payment - Total amount the customer has to pay and their payment method.</li>
                                <li className='my-2'>Add Note - You can use this to add your notes related to the buyer or their order.</li>
                                <li className='my-2'>View details - Click this to see more information regarding the customer’s order.</li>
                                <li className='my-2'>Send - Click to send the customer their order details.</li>
                            </ol>
                        </div>
                        <br/>
                        <div className='col-span-1'>
                            <div className='col-span-1'>
                                <MyImage className='' src={img7}/>
                            </div>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Order Details - Includes the date & time the order was made and the auto-cancellation date if the order was not dispatched.</li>
                                <li className='my-2'>Logistic Information - Contains the tracking status of the parcel.</li>
                                <li className='my-2'>Package List - Indicates the item they ordered and its quantity.</li>
                                <li className='my-2'>Payment Method - How the customer will pay for their order.</li>
                                <li className='my-2'>Payment Information - The detailed calculation of the customer’s order including discounts, vouchers, and shipping fee.</li>
                                <li className='my-2'>Customer Information - Contains the receiver’s private information including their name, contact number, and address.</li>
                            </ol>
                        </div>
                        <br/>

                        <div className='col-span-1'>
                            <h1 className='font-bold contentHeading my-4'>Chat Transfer: To Another Agent</h1>
                            <br/>
                            <MyImage className='' src={img8}/>
                            <p className='sm:text-xl text-base'>Click the human shape icon at the top right of the chat then choose the agent who you want to transfer the chat to.</p>
                        </div>
                        <br/>
                        <div className='col-span-1'>
                            <h1 className='font-bold contentHeading my-4'>Chat Transfer: From Another Agent</h1>
                            <br/>
                            <MyImage className='' src={img9}/>
                            <p className='sm:text-xl text-base'>Mark the checkbox beside the chat you want to transfer. Click on the Transfer Chats button.</p>
                        </div>
                        <br/>

                        <div className='col-span-1'>
                            <MyImage className='' src={img10}/>
                            <p className='sm:text-xl text-base'>After clicking, the agents available will show in a list. Choose the agent you want to transfer the chat to.</p>
                        </div>
                </section>

                <section className='container bg-white mx-auto sm:p-10 p-2 grid'>
                    <h1 className='font-bold contentHeading my-4'>Lazada</h1>
                        <div className='col-span-1'>
                            <h1 className='font-bold contentSubHeading my-4'>Chat Interface Navigation</h1>
                            <p className='sm:text-xl text-base'>The orders checked out by the customer will show on the right side of the page. This includes the product/s, quantity, order creation date, order status, order ID, and the total amount they paid.</p>
                            <br/>
                            <div className='col-span-1'>
                                <MyImage className='' src={img11}/>
                            </div>
                            <p className='sm:text-xl text-base'>By clicking on Check Logistics, you will see this page below.</p>
                        </div>
                        <br/>
                        <div className='col-span-1'>
                            <div className='col-span-1'>
                                <MyImage className='' src={img12}/>
                            </div>
                            <p className='sm:text-xl text-base'>The Order ID, Tracking number, courier, and the Shipping Status is indicated in this page.
                            <br/>
                            <br/>
                            If you click on the icon with an arrow pointing right, more detailed information regarding the customer’s order.</p>
                        </div>
                        <br/>
                        <div className='col-span-1'>
                            <div className='col-span-1'>
                                <MyImage className='' src={img13}/>
                            </div>
                            <p className='sm:text-xl text-base'>It will direct you to this page.</p>
                        </div>
                        <br/>
                        <div className='col-span-1'>
                            <div className='col-span-1'>
                                <MyImage className='' src={img14}/>
                            </div>
                            <p className='sm:text-xl text-base'>To see the complete shipping status, click the Logistics Status button.
                            <br/>
                            <br/>
                            The voucher discounts that the customer claimed will show in the Buyer Payment Information section.</p>
                        </div>
                        <br/>

                        <div className='col-span-1'>
                            <h1 className='font-bold contentHeading my-4'>Chat Transfer: To Another Agent</h1>
                            <br/>
                            <p className='sm:text-xl text-base'>On the right side of the page, click the button that says Assign.</p>
                            <MyImage className='' src={img15}/>
                            <br/>
                            <p className='sm:text-xl text-base'>Select an agent to whom you want to hand over the chat. Click Confirm.</p>
                            <MyImage className='' src={img16}/>
                        </div>
                        <br/>

                        <div className='col-span-1'>
                            <h1 className='font-bold contentHeading my-4'>Chat Transfer: From Another Agent</h1>
                            <br/>
                            <MyImage className='' src={img17}/>
                            <p className='sm:text-xl text-base'>Click the gear icon, to direct you to this page shown below.</p>
                            <br/>
                            <MyImage className='' src={img18}/>
                            <p className='sm:text-xl text-base'>Among the various options, select the Agent Status tab.</p>
                            <br/>
                            <MyImage className='' src={img19}/>
                            <p className='sm:text-xl text-base'>You will see the number of unreplied chats the agents have and to transfer it, click on the hyperlink with the word Transfer located beside the MMR list.</p>
                            <br/>
                            <MyImage className='' src={img20}/>
                            <p className='sm:text-xl text-base'>Select an available agent to transfer the chat, then Confirm.</p>
                            <br/>
                        </div>
                </section>
            </div>
        </div>
    )
}
