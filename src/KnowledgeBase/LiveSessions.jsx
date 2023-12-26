import React, { useEffect } from 'react';

import img1 from '../assets/Knowledge Base/Creative Tigers/c1.png';
import img2 from '../assets/Knowledge Base/Creative Tigers/c2.png';
import img3 from '../assets/Knowledge Base/Creative Tigers/d1.png';
import img4 from '../assets/Knowledge Base/Creative Tigers/d2.png';
import img5 from '../assets/Knowledge Base/Creative Tigers/e1.png';
import img6 from '../assets/Knowledge Base/Creative Tigers/e2.png';
import img7 from '../assets/Knowledge Base/Creative Tigers/f1.png';
import img8 from '../assets/Knowledge Base/Creative Tigers/f2.png';
import img9 from '../assets/Knowledge Base/Creative Tigers/g1.png';

export default function LiveSessions() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Live Sessions<br/>(KB-013)</h1>
            </section>
            <br/>
            <div className='h-auto sm:rounded-[30px] rounded-[10px] overflow-hidden'>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Live Session Day Checklist</h1>
                    <ul className='ml-4 list-disc sm:text-xl text-base'>
                        <li className='my-2'>The Tiktok Live Event and the Greenscreens shall be prepared the day before the Live Session. If we will have any changes due to event, vouchers and discount details, it should finished an hour before the live. </li>
                        <li className='my-2'>Posts (IG Story, IG Feed, Tiktok Ad Video) should be prepared the day before the Live Session. This will be uploaded 15 minutes before the live. If we will have any changes due to event, vouchers and discount details, it should finished an hour before the live. </li>
                        <li className='my-2'>Lights, Reflector, Phone stands, Backdrop, Table & Product set-up, Props, Products for texture, Microphones, Tissue, Bell, Chargers must be done an hour before the Live. </li>
                        <li className='my-2'>All Microphones should be checked before the Live. </li>
                        <li className='my-2'>All chargers must be plugged in the extensions to prevent phone and microphoone shutdown during the Live Session. </li>
                        <li className='my-2'>Phones used in the Livestream and phones to be used to watch the Live must be prepared and charged before the Live.</li>
                    </ul>
                </section>
                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Tiktok Live Event</h1>
                    <div className='grid justify-center gap-4'>
                        <img src={img1}/>
                        <img src={img2}/>
                    </div>
                </section>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Live Setup</h1>
                    <p className='sm:text-xl text-base'>This is our standard for the table, product and lighting set up. Failure to do every step of this will lead to disciplinary action.</p>
                    <div className='grid justify-center grid-cols-2'>
                        <div className='w-full grid justify-center'>
                            <img src={img3}/>
                            <label><i>The lighting set up should look like this.</i></label>
                        </div>
                        <div className='w-full grid justify-center'>
                            <img src={img4}/>
                            <label><i>The products should be set up like this.</i></label>
                        </div>
                    </div>
                </section>
                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid gap-2'>
                    <h1 className='font-bold contentHeading my-4'>How to go Live on Tiktok</h1>
                    <div className='grid justify-center gap-4'>
                        <img src={img5}/>
                        <img src={img6}/>
                    </div>
                    <div className='grid justify-center'>
                        <ul className='ml-4 list-disc sm:text-xl text-base'>
                            <li className='my-2'>Always set up the Greenscreen effect for the Live Background. </li>
                            <li className='my-2'>To set up our Yellow Basket, Tap the Business icon and add all products. </li>
                            <li className='my-2'>The Livestream should start at least 5 minutes before the scheduled Live. </li>
                            <li className='my-2'>Always pin the best selling product on the Live. </li>
                        </ul>
                    </div>
                </section>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2'>
                    <h1 className='font-bold contentHeading my-4'>How to go Live on Shopee</h1>
                    <div className='grid justify-center gap-4'>
                        <img src={img7}/>
                        <img src={img8}/>
                    </div>
                    <div className='grid justify-center'>
                        <ul className='ml-4 list-disc sm:text-xl text-base'>
                            <li className='my-2'>Always update the Cover, Title and Description of the Livestream. </li>
                            <li className='my-2'>Add all products for our Live, you can check the ‘select all’ </li>
                            <li className='my-2'>Effect or Greenscreen should be added (design is depending on the event) </li>
                            <li className='my-2'>Always put the best selling product on ‘show’</li>
                        </ul>
                    </div>
                </section>
                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid gap-2'>
                    <h1 className='font-bold contentHeading my-4'>How to go Live on Lazada</h1>
                    <div className='grid justify-center'>
                        <img src={img9}/>
                    </div>
                    <div className='grid justify-center'>
                        <ul className='ml-4 list-disc sm:text-xl text-base'>
                            <li className='my-2'>Go to Lazada Seller Centre. </li>
                            <li className='my-2'>On the Tools section, select Live Stream.</li> 
                            <li className='my-2'>Tap Schedule Live. </li>
                            <li className='my-2'>Always update the Cover, Title and Description of the Livestream. </li>
                            <li className='my-2'>Add all products. </li>
                            <li className='my-2'>Go Live.</li>
                        </ul>
                    </div>
                </section>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2 sm:grid-cols-2'>
                    <div className='grid justify-center'>
                        <h1 className='font-bold contentHeading my-4'>Do's</h1>
                        <ul className='ml-4 list-disc sm:text-xl text-base'>
                            <li className='my-2'>Make a presentable appearance. (Tidy hair and clean make up look) </li>
                            <li className='my-2'>Always remind about the event including the discounts and deals every 15 minutes. </li>
                            <li className='my-2'>Remind about the Flash Sale & Hoarding disclaimer</li>
                        </ul>
                    </div>
                    <div className='grid justify-center'>
                        <h1 className='font-bold contentHeading my-4'>Don'ts</h1>
                        <ul className='ml-4 list-disc sm:text-xl text-base'>
                            <li className='my-2'>Don’t show unnecessary movements during live. </li>
                            <li className='my-2'>Don’t wear any printed shirts showing branded clothing. </li>
                            <li className='my-2'>Don’t fully mention Shopee, Lazada, Instagram and during live. (It may cause account banning) </li>
                            <li className='my-2'>Cursing and offensive jokes are prohibited during the livestream</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    )
}
