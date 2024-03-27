import React from 'react';

export default function Usage({usage, extra, moreimage}) {
    return (
        <>
            <div className="h-auto w-full items-center py-8 px-4 bg-blue-300">
                <div className="container mx-auto h-auto max-w-6xl rounded-lg overflow-hidden bg-white lg:flex sm:grid sm:grid-cols-3 grid">

                    <div className="sm:grid flex h-full w-full">
                        <div className="sm:h-[45vh] min-h-[30vh] h-auto sm:w-full w-1/2 sm:p-8 p-6">
                            <div className="sm:grid gap-2 flex items-center">
                                <div className="h-12 w-12 bg-yellow-200 p-2 rounded-full flex justify-center items-center">
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6C6 5.44772 6.44772 5 7 5H17C17.5523 5 18 5.44772 18 6C18 6.55228 17.5523 7 17 7H7C6.44771 7 6 6.55228 6 6Z" fill="currentColor" /><path d="M6 10C6 9.44771 6.44772 9 7 9H17C17.5523 9 18 9.44771 18 10C18 10.5523 17.5523 11 17 11H7C6.44771 11 6 10.5523 6 10Z" fill="currentColor" /><path d="M7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44771 15 7 15H17C17.5523 15 18 14.5523 18 14C18 13.4477 17.5523 13 17 13H7Z" fill="currentColor" /><path d="M6 18C6 17.4477 6.44772 17 7 17H11C11.5523 17 12 17.4477 12 18C12 18.5523 11.5523 19 11 19H7C6.44772 19 6 18.5523 6 18Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M2 4C2 2.34315 3.34315 1 5 1H19C20.6569 1 22 2.34315 22 4V20C22 21.6569 20.6569 23 19 23H5C3.34315 23 2 21.6569 2 20V4ZM5 3H19C19.5523 3 20 3.44771 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44771 3 5 3Z" fill="currentColor" /></svg>
                                </div>
                                <h2 className="my-2 font-bold sm:text-3xl text-base">How to use?</h2>
                            </div>
                            <p className={usage?.length<=250 ? `sm:text-md text-sm text-justify mt-4` : `text-xs text-justify mt-4`}>{usage} </p>
                        </div>
                        {moreimage[0]!==undefined ? 
                            <div className="sm:h-[45vh] min-h-[30vh] h-auto sm:w-full w-1/2 flex">
                                <img height={'400px'} width={'400px'} title='Product usage' alt='Product usage 1' loading='lazy' className='h-full w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_40/${moreimage[0]}.jpg`}></img>
                            </div>
                        :null} 
                    </div>

                    <div className="flex sm:flex-col-reverse flex-row-reverse  h-full w-full">
                        <div className="sm:h-[45vh] min-h-[30vh] h-auto sm:w-full w-1/2 sm:p-8 p-6">
                            <div className="sm:grid flex gap-2 items-center">
                                <div className="h-12 w-12 bg-yellow-200 p-2 rounded-full flex justify-center items-center">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 7H11V12H16V14H9V7Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="currentColor" /></svg>
                                </div>
                                <h2 className="my-2 font-bold sm:text-3xl text-base">When to use?</h2>
                            </div>
                            <p className="sm:text-md text-sm mt-4"><span className="font-bold">For beginners</span>: Start with 2-3 times a week and slowly increase use once your skin can tolerate it.</p>
                        </div>
                        {moreimage[1]!==undefined ? 
                            <div className="sm:h-[45vh] min-h-[30vh] h-auto sm:w-full w-1/2 flex">
                                <img height={'400px'} width={'400px'} title='Product usage' alt='Product usage 2' loading='lazy' className='w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_40/${moreimage[1]}.jpg`}></img>
                            </div>
                        :null}
                    </div>

                    <div className="sm:grid flex h-full w-full">
                        <div className="sm:h-[45vh] min-h-[30vh] h-auto sm:w-full w-1/2 sm:p-8 p-6">
                            <div className="sm:grid flex gap-2 items-center">
                                <div className="h-12 w-12 bg-yellow-200 p-2 rounded-full flex justify-center items-center">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 12C9.44769 12 9 12.4477 9 13C9 13.5523 9.44769 14 10 14H14C14.5522 14 15 13.5523 15 13C15 12.4477 14.5522 12 14 12H10Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M4 2C2.34314 2 1 3.34314 1 5V19C1 20.6569 2.34314 22 4 22H20C21.6569 22 23 20.6569 23 19V5C23 3.34314 21.6569 2 20 2H4ZM20 4H4C3.44769 4 3 4.44769 3 5V8H21V5C21 4.44769 20.5522 4 20 4ZM3 19V10H21V19C21 19.5523 20.5522 20 20 20H4C3.44769 20 3 19.5523 3 19Z" fill="currentColor" /></svg>
                                </div>
                                <h2 className="my-2 font-bold sm:text-3xl text-base">Storage</h2>
                            </div>
                            <p className="sm:text-md text-sm mt-4">Place in it a cool, dry, and well-ventilated place away from sunlight.</p>
                        </div>
                        {moreimage[2]!==undefined ? 
                            <div className="sm:h-[45vh] min-h-[30vh] h-auto sm:w-full w-1/2 flex">
                                <img height={'400px'} width={'400px'} title='Product usage' alt='Product usage 3' loading='lazy' className='w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_40/${moreimage[2]}.jpg`}></img>
                            </div>
                        :null}
                    </div>
                    
                </div>
            </div>
        </>
    )
}

//<br/><br/> {extra ? <span className="italic">Note: {extra}</span>:null}
//video fetch: `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/video/upload/f_auto,q_50/${moreimage[2]}.mp4`