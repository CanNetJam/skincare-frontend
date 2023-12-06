import { FaRegClock } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";

export default function Usage({usage, extra, moreimage}) {
    console.log(moreimage)
    return (
        <>
            <div className="min-h-screen h-auto w-full items-center sm:py-16 py-8 px-4 bg-blue-300">
                <div className="container mx-auto h-auto bg-white lg:flex sm:grid sm:grid-cols-3 grid">

                    <div className="grid h-full w-full">
                        <div className="h-[40vh] w-full sm:p-8 pt-10 px-10">
                            <span><TbNotes className="flex justify-center h-12 w-12 bg-yellow-200 p-2 rounded-full" /></span>
                            <h3 className="my-2 font-bold sm:text-3xl text-2xl">How to use?</h3>
                            <p className="sm:text-md text-sm">{usage} <br/><br/><span className="italic">Note: {extra}</span></p>
                        </div>
                        {moreimage[0]!==undefined ? 
                            <div className="h-[40vh] w-full flex">
                                <img loading="lazy" className='w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${moreimage[0]}.jpg`}></img>
                            </div>
                        :null} 
                    </div>

                    <div className="flex sm:flex-col-reverse flex-col h-full w-full">
                        <div className="h-[40vh] w-full sm:p-8 pt-10 px-10">
                            <span><FaRegClock className="flex justify-center h-12 w-12 bg-yellow-200 p-2 rounded-full" /></span>
                            <h3 className="my-2 font-bold sm:text-3xl text-2xl">When to use?</h3>
                            <p className="sm:text-md text-sm">Night Only <br/><br/><span className="font-bold">For beginners</span>: Start with 2-3 times a week and slowly increase use once your skin can tolerate it.</p>
                        </div>
                        {moreimage[1]!==undefined ? 
                            <div className="h-[40vh] w-full flex">
                                <img loading="lazy" className='w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${moreimage[1]}.jpg`}></img>
                            </div>
                        :null}
                    </div>

                    <div className="grid h-full w-full">
                        <div className="h-[40vh] w-full sm:p-8 pt-10 px-10">
                            <span><FaBoxOpen className="flex justify-center h-12 w-12 bg-yellow-200 p-2 rounded-full" /></span>
                            <h3 className="my-2 font-bold sm:text-3xl text-2xl">Storage</h3>
                            <p className="sm:text-md text-sm">Place in it a cool, dry, and well-ventilated place away from sunlight.</p>
                        </div>
                        {moreimage[2]!==undefined ? 
                            <div className="h-[40vh] w-full flex">
                                <img loading="lazy" className='w-full object-bottom object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${moreimage[2]}.jpg`}></img>
                            </div>
                        :null}
                    </div>
                    
                </div>
            </div>
        </>
    )
}