import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Customer Excellence/i1.png';
import img2 from '../assets/Knowledge Base/Customer Excellence/i2.png';
import img3 from '../assets/Knowledge Base/Customer Excellence/i3.png';
import img4 from '../assets/Knowledge Base/Customer Excellence/i4.png';
import img5 from '../assets/Knowledge Base/Customer Excellence/i5.png';
import img6 from '../assets/Knowledge Base/Customer Excellence/i6.png';
import img7 from '../assets/Knowledge Base/Customer Excellence/i7.png';
import img8 from '../assets/Knowledge Base/Customer Excellence/i8.png';
import img9 from '../assets/Knowledge Base/Customer Excellence/i9.png';

import img10 from '../assets/Knowledge Base/Customer Excellence/j1.png';
import img11 from '../assets/Knowledge Base/Customer Excellence/j2.png';
import img12 from '../assets/Knowledge Base/Customer Excellence/j3.png';
import img13 from '../assets/Knowledge Base/Customer Excellence/j4.png';
import img14 from '../assets/Knowledge Base/Customer Excellence/j5.png';
import img15 from '../assets/Knowledge Base/Customer Excellence/j6.png';
import img16 from '../assets/Knowledge Base/Customer Excellence/j7.png';
import img17 from '../assets/Knowledge Base/Customer Excellence/j8.png';
import img18 from '../assets/Knowledge Base/Customer Excellence/j9.png';

import img19 from '../assets/Knowledge Base/Customer Excellence/k1.png';
import img20 from '../assets/Knowledge Base/Customer Excellence/k2.png';
import img21 from '../assets/Knowledge Base/Customer Excellence/k3.png';
import img22 from '../assets/Knowledge Base/Customer Excellence/k4.png';

import img23 from '../assets/Knowledge Base/Customer Excellence/l1.png';
import img24 from '../assets/Knowledge Base/Customer Excellence/l2.png';
import img25 from '../assets/Knowledge Base/Customer Excellence/l3.png';
import img26 from '../assets/Knowledge Base/Customer Excellence/l4.png';

import img27 from '../assets/Knowledge Base/Customer Excellence/m1.png';
import img28 from '../assets/Knowledge Base/Customer Excellence/m2.png';
import img29 from '../assets/Knowledge Base/Customer Excellence/m3.png';
import img30 from '../assets/Knowledge Base/Customer Excellence/m4.png';
import img31 from '../assets/Knowledge Base/Customer Excellence/m5.png';
import img32 from '../assets/Knowledge Base/Customer Excellence/m6.png';
import img33 from '../assets/Knowledge Base/Customer Excellence/m7.png';
import img34 from '../assets/Knowledge Base/Customer Excellence/m8.png';

export default function CustomerReturnRefund() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Customer Return/Refund<br/>(KB-010)</h1>
                <p><b>Written on:</b> October 20, 2023 <br/> <b>Updated on:</b> November 26, 2023</p>
            </section>
            <br/>

            <div className='h-auto sm:rounded-[30px] rounded-[10px] overflow-hidden'>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid'>
                    <div className='sm:text-xl text-base'>
                        An investigation should be done to confirm whether the customer's claim is valid or not. Following an investigation, the managed Return/Refund problem can be potentially resolved in several kinds of ways.
                        <br/>
                        <br/>
                        In certain instances, problems start to occur after the consumer receives their order. We must undertake investigations to regulate their expectations and provide customers with a better resolution.
                        <br/>
                        Please take note that Return to Seller differs from Manage Return/Refund. Return to Seller does not involve the customer in any way, since the order was not touched by the consumer.
                        <br/>
                        Examples of Return to Seller are:
                        <ul className='ml-8 list-disc sm:text-xl text-base'>
                            <li className='my-2'>Customer declines</li>
                            <li className='my-2'>Customer is not on location</li>
                            <li className='my-2'>Customer is unreachable through phone call or text</li>
                            <li className='my-2'>Location of the customer is out of serviceable area</li>
                            <li className='my-2'>Failed to deliver after three (3) attempts</li>
                        </ul>
                        These are the explanations for why the packages are automatically returned to the seller. When a consumer requests a return, refund, or return/refund to us, it means that the customer has interacted with the item such as by receiving the delivery from the rider.
                        <br/>
                        <br/>
                        Reasons may vary for example;
                        <br/>
                        <br/>
                        <b>Issue</b>: The customer claims that we have sent the wrong/incomplete/missing item to them.
                        <br/>
                        <b>Resolution</b>: We must communicate with the customer and request for other evidence that we will be needing. Such as copy of the waybill and escalate the matter to the production team for further investigation and action.
                        <br/>
                        <br/>
                        <b>Issue</b>: The courier failed to deliver the parcel on time or stated that it had been delivered, but the customer never received it.
                        <br/>
                        <b>Resolution</b>: We need to escalate it to the courier (J&T or Flash Express) and hand it in to the production team for further investigation and action.
                        <br/>
                        <br/>
                        <b>Issue</b>: Customer claims that the item is fake.
                        <br/>
                        <b>Resolution</b>: We need to escalate the issue to the production team for further investigation and action.
                        <br/>
                        <br/>
                        <b>Issue</b>: Customer claims that the item is damaged/defective.
                        <br/>
                        <b>Resolution</b>: Refund only and no return.
                    </div>
                </section>

                <section className='container bg-white mx-auto sm:p-10 p-2 grid'>
                    <h1 className='font-bold contentHeading my-4'>Shopee Return & Refund</h1>
                        <div className='col-span-1'>
                            <p className='sm:text-xl text-base'>You can view Return/Refund requests through the Return/Refund page in Shopee Seller Centre.</p>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Click here to see the Return/Refund tab in the dropdown option.</li>
                                <li className='my-2'>Return/Refund – here shows the lists of all the customers who requested a return and refund.</li>
                                <li className='my-2'>You can also click here to direct you to the Return/Refund tab.</li>
                                <li className='my-2'>Return Refund Details – this is where you can see the information you will need for investigation.</li>
                            </ol>
                            <div className='col-span-1'>
                                <img draggable={false} className='' src={img1}/>
                            </div>
                        </div>
                        <br/>
                        <div className='col-span-1'>
                            <ol start='5' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>All – this tab lists all the past and current return/refund requests.</li>
                                <li className='my-2'>New Request – this tab shows the new return/refund requested by customers today.</li>
                                <li className='my-2'>To Respond – this is where requests that haven’t been approved or rejected yet.</li>
                                <li className='my-2'>Responded – this tab shows the request that has been approved or rejected but is still waiting for the Shopee team’s review.</li>
                                <li className='my-2'>Completed – this tab lists all the return/refund requests that have been solved.</li>
                            </ol>
                            <div className='col-span-1'>
                                <img draggable={false} className='' src={img2}/>
                            </div>
                        </div>

                        <br/>

                        <div className='col-span-1'>
                            <p className='sm:text-xl text-base'>After clicking Return Refund Details, it will direct you to this page.</p>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>This is the Request ID generated by Shopee after the customer filed for a return/refund.</li>
                                <li className='my-2'>View Related Order – this will take you to the customer's order data for which they are asking for a return/refund.</li>
                                <li className='my-2'>Reason from Buyer – you can see here the detailed reason for customer request.</li>
                                <li className='my-2'>This is the New Tracking ID generated after the file for return and refund was approved.</li>
                            </ol>
                            <img draggable={false} className='' src={img3}/>
                        </div>
                        <br/>

                        <div className='col-span-1'>
                            <h1 className='font-bold contentSubHeading my-4'>Approving Request for Return/Refund</h1>
                            <p className='sm:text-xl text-base'>Once the investigation is complete and it has been determined that the customer's claim is legitimate, we may advise the customer that we would file either a return and refund or a refund only.
                            <br/>
                            <b>Return and Refund</b>
                            <br/>
                            If we file a return and refund to the customer’s request, we must wait for the item to return to us before giving a refund.
                            <br/>
                            <br/>
                            <span className='font-bold contentSubHeading my-4'>Refund Only</span>
                            <br/>
                            If the request only requires a refund after investigation, we can escalate it to Sir Miyo for approval.
                            <br/>
                            <br/>
                            <b>Shopee Accepting Return/Refund Requests</b> - Shopee, on certain occasions, would automatically approve requests for returns and refunds. We either failed to respond to the request in a timely manner or because Shopee's policies deemed the customer's justification for the request to be valid.
                            <br/>
                            <br/>
                            To counter this, we could file a dispute with Shopee and upload proof if their rationale wasn't credible in order to recover the loss we incurred as a result of their acknowledgment of the request.
                            </p>
                        </div>
                        <br/>
                        <div>
                            <h1 className='font-bold contentSubHeading my-4'>Returning Parcel</h1>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>New tracking number will be generated when the customer requests a return/refund. You can see it on the Return Refund Details.</li>
                                <li className='my-2'>The tracking number and the shipping provider is indicated on this page. Use this tracking number when monitoring the return parcel.</li>
                            </ol>
                            <img draggable={false} className='' src={img4}/>
                        </div>
                        <br/>
                        <div>
                            <h1 className='font-bold contentSubHeading my-4'>Rejecting Return/Refund Request</h1>
                            <br/>
                            <p className='sm:text-xl text-base'>This approach will be used when the reason for a customer's request for return/refund is not valid after the investigation.</p>
                            <br/>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>After escalating to the production team, they will send the evidence/proof you will use for dispute through Viber. You may also find evidence through other means (ie: the customer requesting copied the same photo from another customer, the customer requesting reused an old photo from their previous request for return/refund)</li>
                            </ol>
                            <img draggable={false} className='' src={img5}/>
                            <br/>
                            <ol start='2' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>To reject a request, click on the Dispute button.</li>
                            </ol>
                            <img draggable={false} className='' src={img6}/>
                            <br/>
                            <ol start='3' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Upload the necessary evidence needed for dispute. Select a reason for dispute and state the detailed description in the box provided.</li>
                            </ol>
                            <img draggable={false} className='' src={img7}/>
                            <br/>
                            <ol start='4' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Wait for Shopee Review Team’s response and results given to the dispute.</li>
                            </ol>
                        </div>
                        <br/>
                        <div>
                            <h1 className='font-bold contentSubHeading my-4'>Return Parcel Dispute</h1>
                            <p className='sm:text-xl text-base'>This approach is utilized when the returned item arrived in poor shape, having been used, damaged, etc</p>
                            <br/>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Escalate to Production Managers for the drama.</li>
                                <li className='my-2'>Click on Dispute to Shopee.</li>
                            </ol>
                            <img draggable={false} className='' src={img8}/>
                            <ol start='3' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Choose the reason for dispute and explain the reason in the description box.</li>
                            </ol>
                            <img draggable={false} className='' src={img9}/>
                            <ol start='4' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Upload the evidence that was gathered from the production managers' investigation.</li>
                                <li className='my-2'>Shopee will review the evidence and we wait for their response and result of the dispute.</li>
                            </ol>
                        </div>
                </section>

                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid'>
                    <h1 className='font-bold contentHeading my-4'>Tiktok Return & Refund</h1>
                        <div className='col-span-1'>
                            <p className='sm:text-xl text-base'>You can view Return/Refund requests through the Manage Returns page in TikTok Shop Seller Center.</p>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Orders – Click to see the ‘Manage Returns’ tab.</li>
                                <li className='my-2'>Manage Returns – This tab lists all the Return/Refund requests we received.</li>
                                <li className='my-2'>Here you can see the customer’s reason for requesting a Return/Refund.</li>
                                <li className='my-2'>View Return Records – Additional information will be shown regarding the customer’s request.</li>
                            </ol>
                            <div className='col-span-1'>
                                <img draggable={false} className='' src={img10}/>
                            </div>
                        </div>
                        <br/>
                        <div className='col-span-1'>
                        <div className='sm:text-xl text-base'>You can see in the View Return Records the Return order ID and the reason why the customer requested a return/refund.</div>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Return order ID – this is a newly generated ID after the customer made a request for return/refund.</li>
                                <li className='my-2'>You can view here detailed information of the customer’s reason for requesting a return/refund.</li>
                            </ol>
                            <div className='col-span-1'>
                                <img draggable={false} className='' src={img11}/>
                            </div>
                        </div>
                        <br/>

                        <div className='col-span-1'>
                            <h1 className='font-bold contentSubHeading my-4'>Approving Request for Return/Refund</h1>
                            <p className='sm:text-xl text-base'>Once the investigation is complete and it has been determined that the customer's claim is legitimate, we may advise the customer that we would file either a return and refund or a refund only.
                            <br/>
                            <b>Return and Refund</b>
                            <br/>
                            If we file a return and refund to the customer’s request, we must wait for the item to return to us before giving a refund.
                            </p>
                        </div>
                        <br/>

                        <div>
                            <h1 className='font-bold contentSubHeading my-4'>Returning Parcel</h1>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>New tracking number will generate when the customer request for a return/refund. Click on Check return logistics to see.</li>
                                <li className='my-2'>The tracking number and the shipping provider is indicated on this page. Use this tracking number when monitoring the return parcel.</li>
                            </ol>
                            <img draggable={false} className='' src={img12}/>
                        </div>
                        <br/>

                        <div>
                            <h1 className='font-bold contentSubHeading my-4'>Rejecting Return/Refund Request</h1>
                            <br/>
                            <p className='sm:text-xl text-base'>This approach will be used when the reason for a customer's request for return/refund is not valid after the investigation.</p>
                            <br/>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>After escalating to the production team, they will send the evidence/proof you will use for dispute through Viber. You may also find evidence through other means (ie: the customer requesting copied the same photo from another customer, the customer requesting reused an old photo from their previous request for return/refund)</li>
                            </ol>
                            <img draggable={false} className='' src={img13}/>
                            <br/>
                            <ol start='2' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>To reject a request, click on the Dispute button.</li>
                            </ol>
                            <img draggable={false} className='' src={img14}/>
                            <br/>
                            <ol start='3' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Upload the necessary evidence needed for dispute. Select a reason for dispute and state the detailed description in the box provided.</li>
                            </ol>
                            <img draggable={false} className='' src={img15}/>
                            <br/>
                            <ol start='4' className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>Wait for Tiktok Review Team’s response and results given to the dispute.</li>
                            </ol>
                        </div>
                        <br/>

                        <div>
                            <h1 className='font-bold contentSubHeading my-4'>Submitting a Ticket for ‘Lost Package’ on TikTok</h1>
                            <p className='sm:text-xl text-base'>To know where to submit a ticket, click on Help Center. Choose the Complaint & Disputes {'>'} Logistic Issues then click on the hyperlinked word ‘ticket’.</p>
                            <img draggable={false} className='' src={img16}/>
                            <br/>
                            <p className='sm:text-xl text-base'>Fill in the necessary information including the screenshot of the proof of your complaint (message from the courier, logistic information, customer’s complaint, etc.). Then click on Submit.</p>
                            <img draggable={false} className='' src={img17}/>
                            <br/>
                            <p className='sm:text-xl text-base'>After that, you monitor and wait for the result of the ticket you submitted.</p>
                            <img draggable={false} className='' src={img18}/>
                            <br/>
                        </div>
                </section>

                <section className='container bg-white mx-auto sm:p-10 p-2 grid'>
                    <h1 className='font-bold contentHeading my-4'>Lazada Return & Refund</h1>
                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>To submit a ticket on Lazada. Go to the Lazada Seller Center Homepage {'>'} Support {'>'} Help Center. <br/><br/>Click the word ‘form’ in hyperlink.</p>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img19}/>
                        </div>
                    </div>
                    <br/>

                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>Fill in the necessary details in the form, then click Submit.</p>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img20}/>
                            <img draggable={false} className='' src={img21}/>
                        </div>
                    </div>
                    <br/>

                    <div className='col-span-1'>
                        <p className='sm:text-xl text-base'>If you want to check on the case you submitted. You can find it on the My Cases tab and search for your Case ID.</p>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img22}/>
                        </div>
                    </div>
                </section>

                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid'>
                    <h1 className='font-bold subHeading my-4'>Escalating to the Shipping Provider</h1>
                    <p className='sm:text-xl text-base'>When a customer seeks a refund because a package wasn't delivered on time or the package was marked as delivered in the system, but the customer hadn't gotten it, this approach is used.</p>
                    
                    <div className='col-span-1'>
                        <h1 className='font-bold contentHeading my-4'>Shopee Express (Shopee)</h1>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Submit a Follow up on Order Status Form and fill out the necessary information. Then Submit.</li>
                        </ol>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img23}/>
                            <img draggable={false} className='' src={img24}/>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <h1 className='font-bold contentHeading my-4'>Flash Express (Shopee, TikTok & Lazada)</h1>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Message them through the Viber group chat FLASH x TikTok - Klued using the following template:</li>
                        </ol>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img25}/>
                        </div>
                        <div className='sm:text-xl text-base'>
                            ----------
                            <br/>
                            Hello Flash Team!
                            <br/>
                            Seeking your help on below:
                            <br/>
                            Initial Tracking number:
                            <br/>
                            Customer concern:
                            <br/>
                            Comment: Please coordinate with your team to fix this issue. Thank you!
                            <br/>
                            ----------
                            <br/>
                            Possible Responses:
                            <br/>
                            <ol className='ml-4 list-decimal sm:text-xl text-base'>
                                <li className='my-2'>They have informed the hub, and they would prioritize the delivery.</li>
                                <li className='my-2'>Inform the customer that you have communicated with the courier to deliver their package.</li>
                                <li className='my-2'>
                                    The package has been breached or the package has been lost.
                                    <ul className='ml-4 list-disc sm:text-xl text-base'>
                                        <li className='my-2'>Submit a ticket to TikTok about the situation. Then cascade it to your supervisor.</li>
                                        <li className='my-2'>Submit a webform on Shopee if it hasn’t been tagged as package lost yet. Then cascade it to your supervisor.</li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <br/>
                    <div className='col-span-1'>
                        <h1 className='font-bold contentHeading my-4'>J&T Express (TikTok & Lazada)</h1>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Send them a message through Messenger group chatKLUED x J&T – Operations or call their customer service using this hotline number (02) 8911-1888.</li>
                        </ol>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img26}/>
                        </div>
                        <br/>
                        <ol start='2' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Inform them of the tracking number as well as the current situation regarding the customer’s parcel.
                                <ul className='ml-4 list-disc sm:text-xl text-base'>
                                    <li className='my-2'>Submit a ticket to TikTok about the situation. Then cascade it to your supervisor.</li>
                                    <li className='my-2'>Submit a webform on Shopee if it hasn’t been tagged as package lost yet. Then cascade it to your supervisor.</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                </section>

                <section className='container bg-white mx-auto sm:p-10 p-2 grid'>
                    <h1 className='font-bold subHeading my-4'>Escalating to the Production Team</h1>
                    <p className='sm:text-xl text-base'>We would escalate the situation to the production team for further investigation when a customer requested a refund because the item/s they received was incorrect, incomplete, damaged, or fake. To escalate the order to the production, find its waybill first through the following instructions:</p>
                    
                    <div className='col-span-1'>
                        <h1 className='font-bold contentHeading my-4'>Shopee</h1>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>First take note of the Tracking ID and the Shipping provider.</li>
                            <li className='my-2'>Check the date the order was packed.</li>
                        </ol>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img27}/>
                        </div>
                    </div>
                    <br/>

                    <div className='col-span-1'>
                        <h1 className='font-bold contentHeading my-4'>TikTok</h1>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>First take note of the Tracking ID and the Shipping provider.</li>
                        </ol>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img28}/>
                        </div>
                        <br/>

                        <ol start='2' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Check the date the order was packed.</li>
                        </ol>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img29}/>
                        </div>
                        <br/>

                        <ol start='3' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Find in your email the Dispatch Report with the date the order was packed.</li>
                            <li className='my-2'>Then click on the Records of Waybill.</li>
                        </ol>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img30}/>
                        </div>
                        <br/>

                        <ol start='5' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>You will be taken to a Google Drive link where all the waybills scheduled for shipping on that day are stored. Select the platform and courier the waybill has been recorded.</li>
                        </ol>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img31}/>
                        </div>
                        <br/>

                        <ol start='6' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Open it one-by-one to search for the specific waybill.</li>
                        </ol>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img31}/>
                            <img draggable={false} className='' src={img32}/>
                        </div>
                        <p><i>Note: Remember the page number of the waybill you are searching for</i></p>
                        <br/>

                        <ol start='7' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Once you find the waybill, print only the page you need through Custom Pages then type the page number of the waybill. Use the Xprinter XP when printing waybills.</li>
                        </ol>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img33}/>
                        </div>
                        <ol start='8' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>After printing, hand out the waybill to the production team for them to investigate.</li>
                        </ol>
                        <div className='col-span-1'>
                            <img draggable={false} className='' src={img34}/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
