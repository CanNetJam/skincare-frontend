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
import img10 from '../assets/Knowledge Base/Creative Tigers/h1.png';

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
                    <p className='italic font-semibold text-center'>Note:    Failure to follow these rules will lead to disciplinary action.</p>
                </section>
                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Tiktok Live Event</h1>
                    <div className='grid justify-center gap-4'>
                        <img draggable={false} src={img1}/>
                        <img draggable={false} src={img2}/>
                    </div>
                </section>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Live Setup</h1>
                    <p className='sm:text-xl text-base'>This is our standard for the table, product and lighting set up. Failure to do every step of this will lead to disciplinary action.</p>
                    <div className='grid justify-center grid-cols-2'>
                        <div className='w-full grid justify-center'>
                            <img draggable={false} src={img3}/>
                            <label><i>The lighting set up should look like this.</i></label>
                        </div>
                        <div className='w-full grid justify-center'>
                            <img draggable={false} src={img4}/>
                            <label><i>The products should be set up like this.</i></label>
                        </div>
                    </div>
                </section>
                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid gap-2'>
                    <h1 className='font-bold contentHeading my-4'>How to go Live on Tiktok</h1>
                    <div className='grid justify-center gap-4'>
                        <img draggable={false} src={img5}/>
                        <img draggable={false} src={img6}/>
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
                        <img draggable={false} src={img7}/>
                        <img draggable={false} src={img8}/>
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
                        <img draggable={false} src={img9}/>
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
                <section className='container bg-white mx-auto sm:p-10 p-2 grid sm:gap-10 gap-2 sm:grid-cols-2'>
                    <div className='grid justify-center'>
                        <h1 className='font-bold contentHeading my-4'>Do's</h1>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Make a presentable appearance. <br/>Tidy hair and clean make up look (NO LOUD MAKE UP)</li>
                            <li className='my-2'>Make sure you are prepared 1 hour before live</li>
                            <li className='my-2'>Always remind about the event including the discounts and deals every 15 minutes. </li>
                            <li className='my-2'>Remind about the Flash Sale & Hoarding disclaimer</li>
                            <li className='my-2'>Double check if the filter is exaggerating your look</li>
                            <li className='my-2'>Always prepare your needs(Water, Tissue and etc)</li>
                            <li className='my-2'>Always wear light colors/vibrant colors</li>
                            <li className='my-2'>15 minutes of practice is the allotted for warm up before going live.</li>
                            <li className='my-2'>Always start with a prayer before going live</li>
                        </ol>
                    </div>
                    <div className='grid justify-center'>
                        <h1 className='font-bold contentHeading my-4'>Don'ts</h1>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Don’t show unnecessary movements during live. </li>
                            <li className='my-2'>Don’t wear any printed shirts showing branded clothing. </li>
                            <li className='my-2'>Don’t fully mention Shopee, Lazada, Instagram and during live. (It may cause account banning) </li>
                            <li className='my-2'>Cursing and offensive jokes are prohibited during the livestream</li>
                            <li className='my-2'>Don’t flex the texture of Klued Vit C. 15% Serum during the livestream.</li>
                            <li className='my-2'>Don’t use the word oxidization, instead use discoloration.</li>
                            <li className='my-2'>No revealing outfit</li>
                            <li className='my-2'>Don’t use overdesigned earrings, it may cause distraction.</li>
                        </ol>
                    </div>
                    <p className='italic font-semibold text-center sm:col-span-2'>Note:    Failure to follow these rules will lead to disciplinary action.</p>
                </section>

                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid gap-2'>
                    <h1 className='font-bold text-center contentHeading my-4'>Product Flexing</h1>
                    <p>
                        Template when introducing a product on Live
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Purpose</li>
                            <li className='my-2'>Key Ingredients</li>
                            <li className='my-2'>How to use</li>
                            <li className='my-2'>Flex Texture</li>
                        </ol>
                    </p>
                    <br/>
                    <ul className='ml-4 list-disc sm:text-xl text-base'>
                        <li className='my-4'>
                            <b>Purpose</b><br/>
                            <p>When discussing the Product, always start with mentioning the skin concern relating to
                            the product. <b>Don’t forget to put the Brand name ( Klued ) in mentioning the product.</b><br/><br/>
                            EX: “para saan po yung <b>2% Salicylic Acid Gentle Cleanser</b>?”<br/><br/>
                            Start with “If you have <b>oily skin, acne prone skin and sensitive skin,</b> i highly
                            recommend...”<br/><br/>
                            Then explain why that product is recommended for that specific skin concern,
                            introduce the...
                            </p>
                        </li>
                        <li className='my-4'>
                            <b>Key Ingredients</b><br/>
                            <p>Explain the <b>key ingredients</b> that could help with their <b>skin concern</b>.</p>
                        </li>
                        <li className='my-4'>
                            <b>How to use?</b><br/>
                            <p><b>Key word for actives:</b> 2 to 3 times a week, only at night <br/>
                            <b>Key word for non-actives:</b> You can use this everyday, morning and night!</p>
                        </li>
                        <li className='my-4'>
                            <b>Flex the texture</b> of the product<br/>
                            <p>This can also be a great help when we have low numbers of viewers, so we can avoid dead air.</p>
                        </li>
                    </ul>
                </section>

                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2'>
                    <p className='sm:text-xl text-base'>
                    This is the standard hours of livestream for everyday/ regular days
                        <ul className='ml-4 list-disc'>
                            <li className='my-2'>Livestream everyday is 12 hours / 3 sessions</li>
                            <li className='my-2'>Every session contains 4 hours minimum a day (Shopee and TikTok)</li>
                            <li className='my-2'>Remaining hours should make contents</li>
                        </ul>
                    </p>
                    <div className='grid justify-center'>
                        <img draggable={false} src={img10}/>
                    </div>
                </section>
            </div>
        </div>
    )
}
