import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Creative Tigers/New/d1.png';
import img2 from '../assets/Knowledge Base/Creative Tigers/New/d2.png';
import img3 from '../assets/Knowledge Base/Creative Tigers/New/d3.png';
import img4 from '../assets/Knowledge Base/Creative Tigers/New/d4.png';
import img5 from '../assets/Knowledge Base/Creative Tigers/New/d5.png';
import img6 from '../assets/Knowledge Base/Creative Tigers/New/d6.png';
import img7 from '../assets/Knowledge Base/Creative Tigers/New/d7.png';
import img8 from '../assets/Knowledge Base/Creative Tigers/New/d8.png';
import img9 from '../assets/Knowledge Base/Creative Tigers/New/d9.png';
import img10 from '../assets/Knowledge Base/Creative Tigers/New/d10.png';
import img11 from '../assets/Knowledge Base/Creative Tigers/New/d11.png';
import img12 from '../assets/Knowledge Base/Creative Tigers/New/d12.png';
import img13 from '../assets/Knowledge Base/Creative Tigers/New/d13.png';
import img14 from '../assets/Knowledge Base/Creative Tigers/New/d14.png';
import img15 from '../assets/Knowledge Base/Creative Tigers/New/d15.png';
import img16 from '../assets/Knowledge Base/Creative Tigers/New/d16.png';
import img17 from '../assets/Knowledge Base/Creative Tigers/New/d17.png';
import img18 from '../assets/Knowledge Base/Creative Tigers/New/d18.png';
import img19 from '../assets/Knowledge Base/Creative Tigers/New/d19.png';
import img20 from '../assets/Knowledge Base/Creative Tigers/New/d20.png';
import img21 from '../assets/Knowledge Base/Creative Tigers/New/d21.png';
import img22 from '../assets/Knowledge Base/Creative Tigers/New/d22.png';
import img23 from '../assets/Knowledge Base/Creative Tigers/New/d23.png';
import img24 from '../assets/Knowledge Base/Creative Tigers/New/d24.png';
import img25 from '../assets/Knowledge Base/Creative Tigers/New/d25.png';
import img26 from '../assets/Knowledge Base/Creative Tigers/New/d26.png';
import img27 from '../assets/Knowledge Base/Creative Tigers/New/d27.png';
import img28 from '../assets/Knowledge Base/Creative Tigers/New/d28.png';
import img29 from '../assets/Knowledge Base/Creative Tigers/New/d29.png';
import img30 from '../assets/Knowledge Base/Creative Tigers/New/d30.png';
import img31 from '../assets/Knowledge Base/Creative Tigers/New/d31.png';

export default function AuditPosting() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Auditing Video Posting<br/>(KB-019)</h1>
                <p><b>Written on:</b> February 22, 2024</p>
            </section>
            <br/>
            <div className='h-auto sm:rounded-[30px] rounded-[10px] overflow-hidden'>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2'>
                    <h1 className='my-4'>
                        This is a step-by-step guide on how to audit the video posting schedules of the Creative Tiger’s. These are the things that you need take note of before you start auditing the postings:
                    </h1>
                    <ul className='sm:ml-8 ml-4 list-disc sm:text-xl text-base'>
                        <li className='my-2'>Open the platforms that you need to audit.</li>
                        <li className='my-2'>Check the date of the recent videos.</li>
                        <li className='my-2'>Make sure that the videos posted are the same on all platforms.</li>
                        <li className='my-2'>Check for the watermarks in the video.</li>
                        <li className='my-2'>Immediately send a personal message to Sir Miyo if there is no posting on the schedule you are auditing.</li>
                    </ul>        
                </section>
                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid justify-center gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Tiktok</h1>
                    <div className='col-span-1'>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Open the “TikTok” website. Search for ‘Klued’.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img1}/>
                    </div>
                    <div className='col-span-1'>
                        <ol start='2' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Locate the TikTok page with the username ‘@klued_’.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img2}/>
                    </div>

                    <div className='col-span-1'>
                        <ol start='3' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Select the most recent TikTok video besides the pinned video.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img3}/>
                    </div>

                    <div className='col-span-1'>
                        <ol start='4' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Check for the time the video was posted and if it’s the same as the other videos on different platforms. Copy the link once you confirm it then paste in the auditing template.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img4}/>
                    </div>
                </section>

                <section className='container bg-white mx-auto sm:p-10 p-2 grid justify-center gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Instagram</h1>
                    <div className='col-span-1'>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Go to the “Instagram” website. Search for the ‘Klued’ Instagram account and locate the page with the username ‘@klued_’.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img5}/>
                    </div>
                    <div className='col-span-1'>
                        <ol start='2' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Select ‘Reels’.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img6}/>
                    </div>

                    <div className='col-span-1'>
                        <ol start='3' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Open the latest video posted.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img7}/>
                    </div>

                    <div className='col-span-1'>
                        <ol start='4' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Check for the time the video was posted and if it’s the same as the other videos on different platforms. Copy the link once you confirm it then paste to the template.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img8}/>
                    </div>
                </section>

                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid justify-center gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Facebook</h1>
                    <div className='col-span-1'>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Go to the “Facebook” website. Search for the ‘Klued’ Facebook page.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img9}/>
                    </div>
                    <div className='col-span-1'>
                        <ol start='2' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Select the ‘Reels’.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img10}/>
                    </div>

                    <div className='col-span-1'>
                        <ol start='3' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Open the latest video posted.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img11}/>
                    </div>

                    <div className='col-span-1'>
                        <ol start='4' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Check if the video is the same as the other videos on different platforms. After affirming, look for the three horizontal dots on the top and click it to find the copy link option then paste the link on the auditing template.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img12}/>
                    </div>
                </section>

                <section className='container bg-white mx-auto sm:p-10 p-2 grid justify-center gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Youtube</h1>
                    <div className='col-span-1'>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Open the “Youtube” website. Search for ‘Klued’.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img13}/>
                    </div>
                    <div className='col-span-1'>
                        <ol start='2' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Locate the Youtube channel with the username @klued_skin and go to the ‘Shorts’ tab.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img14}/>
                    </div>

                    <div className='col-span-1'>
                        <ol start='3' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Click the most recent Youtube Shorts video.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img15}/>
                    </div>

                    <div className='col-span-1'>
                        <ol start='4' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Once the video is playing, press the button with three dots on the right side of the page. Select ‘Description’.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img16}/>
                    </div>

                    <div className='col-span-1'>
                        <ol start='5' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>You can see in the description how long the video was posted. After confirming that the video was posted within schedule, copy the link above and paste in the auditing template.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img17}/>
                    </div>
                </section>

                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid justify-center gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Shopee</h1>
                    <div className='col-span-1'>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Use the company phone and open the Shopee App.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img19}/>
                    </div>
                    <div className='col-span-1'>
                        <ol start='2' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Select ‘Video’ at the bottom of the page then click the icon at the top right to view Klued’s videos.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img20}/>
                    </div>

                    <div className='col-span-1'>
                        <ol start='3' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Open the latest video uploaded. Ensure that the recent video is the same in the other platforms.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img21}/>
                    </div>

                    <div className='col-span-1'>
                        <ol start='4' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Press the three horizontal dots on the right then find the ‘Copy Link’.</li>
                        </ol>
                    </div>
                    <div className='col-span-1 grid grid-cols-2 gap-2'>
                        <img draggable={false} className='col-span-1' src={img22}/>
                        <img draggable={false} className='col-span-1' src={img23}/>
                    </div>

                    <div className='col-span-1'>
                        <ol start='5' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>After copying the link, head back to the homepage and open the Viber App. Search for your Viber account to send the link.</li>
                        </ol>
                    </div>
                    <div className='col-span-1 grid grid-cols-2 gap-2'>
                        <img draggable={false} className='col-span-1' src={img24}/>
                        <img draggable={false} className='col-span-1' src={img25}/>
                    </div>

                    <div className='col-span-1'>
                        <ol start='6' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>After finding your account, paste the link then send.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img26}/>
                    </div>

                    <div className='col-span-1'>
                        <ol start='7' className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Open your Viber account on the laptop. Copy the Shopee link you sent and paste it on the auditing Template.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img27}/>
                    </div>
                </section>

                <section className='container bg-white mx-auto sm:p-10 p-2 grid justify-center gap-2'>
                    <h1 className='font-bold contentHeading my-4'>How to audit the posting schedule? </h1>
                    <div className='col-span-1'>
                        <p className='my-2'>Open the Auditing template: (<a target='_blank' className='cursor-poiter hover:underline' href='https://1drv.ms/x/s!AsN2LuMfrIEnhWXqD7o_cR6Q3kAP?e=GxvBuz'>https://1drv.ms/x/s!AsN2LuMfrIEnhWXqD7o_cR6Q3kAP?e=GxvBuz</a>)</p>
                    </div>

                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img28}/>
                    </div>
                    <div className='col-span-1'>
                        You will see that the tables are divided by Morning Shift/Night Shift and by platforms.
                        <ul className='ml-4 list-disc sm:text-xl text-base'>
                            <li className='my-2'><b>Schedule</b> - this is the supposed time of posting of Creative Tigers.</li>
                            <li className='my-2'><b>Timestamp</b> - it indicated the time you audited the platform postings.</li>
                            <li className='my-2'><b>Link</b> - paste here the video links according to the timestamp of your audit.</li>
                        </ul>
                    </div>

                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img29}/>
                    </div>
                    <div className='col-span-1'>
                        <p className='ml-4 list-decimal sm:text-xl text-base'>
                            When there are still no post on a certain platform during your audit, put a red highlight on the Timestamp and leave the link blank.
                        </p>
                    </div>

                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img30}/>
                    </div>
                    <div className='col-span-1'>
                        <p className='ml-4 list-decimal sm:text-xl text-base'>
                            After that, open your Microsoft Teams and report about the delay in posting on the ‘VIDEO MONITORING GC’ group chat.
                        </p>
                    </div>
                </section>

                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid justify-center gap-2'>
                    <h1 className='font-bold contentHeading my-4'>Emailing your audit </h1>
                    
                    <div className='col-span-1'>
                        At the end of your shift, create a separate email for your audit report.
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Write a heading and body for your email.</li>
                            <li className='my-2'>Copy the table for the shift you are auditing.</li>
                            <li className='my-2'>For your subject, use this format: POSTING SCHEDULE AUDIT {'<DATE>'}</li>
                            <li className='my-2'>In your “To:” include Sir Miyo and Sir Max while on “CC:” would be all the members of the Customer Excellence & Creative Tigers Team.</li>
                        </ol>
                    </div>
                    <div className='col-span-1'>
                        <img draggable={false} className='' src={img31}/>
                    </div>
                </section>
            </div>
        </div>
    )
}
