import { FaRegClock } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";

export default function Usage({usage, extra, moreimage}) {
    return (
        <>
            <div className="h-auto w-full items-center py-8 px-4 bg-blue-300">
                <div className="container mx-auto h-auto max-w-6xl rounded-lg overflow-hidden bg-white lg:flex sm:grid sm:grid-cols-3 grid">

                    <div className="sm:grid flex h-full w-full">
                        <div className="sm:h-[45vh] min-h-[30vh] h-auto sm:w-full w-1/2 sm:p-8 p-6">
                            <div className="sm:grid gap-2 flex items-center">
                                <span><TbNotes className="flex justify-center h-12 w-12 bg-yellow-200 p-2 rounded-full" /></span>
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
                                <span><FaRegClock className="flex justify-center h-12 w-12 bg-yellow-200 p-2 rounded-full" /></span>
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
                                <span><FaBoxOpen className="flex justify-center h-12 w-12 bg-yellow-200 p-2 rounded-full" /></span>
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