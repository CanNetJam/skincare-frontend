import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Creative Tigers/a1.png';

export default function ContentMetrics() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Content Metrics<br/>(KB-011)</h1>
            </section>
            <br/>
            <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2 sm:rounded-[30px] rounded-[10px]'>
                    <div className='grid justify-center'>
                        <h1 className='font-bold contentHeading my-4 text-center'>Daily Posting</h1>
                        <p className='sm:text-xl text-base text-center'>This is our standard for creating Tiktok and Instagram contents.</p>
                    </div>
                    <br/>
                    <div className='grid sm:grid-cols-2 gap-6'>
                        <div>
                            <h1 className='font-bold contentHeading my-4'>TIKTOK</h1>
                            <ul className='ml-4 list-disc sm:text-xl text-base'>
                                <li className='my-2'>When creating a Tiktok content, always make sure that the video shots is bright and clear. We have softbox lights and we can also shoot a video outside for a better video quality. </li>
                                <li className='my-2'>Offensive jokes, phrases, and filters are strictly prohibited when creating a meme or content. Uploading videos with these can lead to disciplinary action. </li>
                                <li className='my-2'>Always double check the music, thumbnail, link and caption. </li>
                                <li className='my-2'>Always wait for the approval for the Tiktok posting. (If not, make sure that the details and quality of the video is correct) </li>
                                <li className='my-2'>Ask anyone to four-eye the captions and texts to avoid deleting and re-uploading due to mistakes. </li>
                            </ul>
                        </div>
                        <div>
                            <h1 className='font-bold contentHeading my-4'>INSTAGRAM FEED / STORY</h1>
                            <ul className='ml-4 list-disc sm:text-xl text-base'>
                                <li className='my-2'>When creating an Instagram content, always make sure that the design and color palette is matched to the brand color and theme. </li>
                                <li className='my-2'>Offensive jokes, phrases, and filters are strictly prohibited when creating a meme or content. Uploading content with these can lead to disciplinary action. </li>
                                <li className='my-2'>Always wait for the approval for the Instagram posting. (If not, make sure that the details and captions is correct) </li>
                                <li className='my-2'>Ask anyone to four-eye the captions and texts to avoid deleting and re-uploading due to mistakes. </li>
                            </ul>
                        </div>
                        <p className='italic font-semibold sm:col-span-2 text-center'>Note:    Failure to follow these rules will lead to disciplinary action.</p>
                    </div>
                    <br/>
                    <div className='grid justify-center'>
                        <h1 className='font-bold contentHeading my-4 text-center'>Daily Posting</h1>
                        Morning Shift and Night Shift should post 5 TikTok contents per shift (10 videos in all) ( 3 Memes and 2 Quality Video/Informative)
                        <p className='italic font-semibold text-center py-2'>Note that TikTok Videos should be uploaded in Shopee Video and YouTube Shorts</p>
                        <div className='grid justify-center'>
                            <img draggable={false} src={img1}/>
                        </div>
                        <br/>
                        <p className='text-center sm:text-2xl text-lg'>
                            INCENTIVE POSTINGS IN TIKTOK<br/>
                            100K VIEWS - <b>3,000 PHP</b><br/>
                            200K VIEWS - <b>5,000 PHP</b><br/>
                            300K VIEWS - <b>7,000 PHP</b><br/>
                            500K VIEWS - <b>10,000 PHP</b>
                        </p>
                    </div>
            </section>
        </div>
    )
}
