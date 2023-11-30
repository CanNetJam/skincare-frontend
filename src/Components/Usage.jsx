import { FaRegClock } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";

export default function Products() {
    return (
        <>
            <div className="min-h-screen h-auto w-full items-center sm:py-16 py-8 px-4 bg-blue-300">
                <div className="container mx-auto h-auto bg-white lg:flex sm:grid sm:grid-cols-3 grid">

                    <div className="grid h-full w-full">
                        <div className="h-[40vh] w-full sm:p-8 pt-10 px-10">
                            <span><TbNotes className="flex justify-center h-12 w-12 bg-yellow-200 p-2 rounded-full" /></span>
                            <h3 className="my-2 font-bold sm:text-3xl text-2xl">How to use?</h3>
                            <p className="sm:text-md text-sm">Dispense 2-3 drops apply evenly on face and neck. <br/><br/><span className="italic">Note: This can also be used on elbow/knee with discoloration areas.</span></p>
                        </div>
                        <div className="h-[40vh] w-full flex">
                            <img className='w-full object-cover' src="https://images.pexels.com/photos/3762877/pexels-photo-3762877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                        </div>
                    </div>

                    <div className="flex sm:flex-col-reverse flex-col h-full w-full">
                        <div className="h-[40vh] w-full sm:p-8 pt-10 px-10">
                            <span><FaRegClock className="flex justify-center h-12 w-12 bg-yellow-200 p-2 rounded-full" /></span>
                            <h3 className="my-2 font-bold sm:text-3xl text-2xl">When to use?</h3>
                            <p className="sm:text-md text-sm">Night Only <br/><br/><span className="font-bold">For beginners</span>: Start with 2-3 times a week and slowly increase use once your skin can tolerate it.</p>
                        </div>
                        <div className="h-[40vh] w-full flex">
                            <img className='w-full object-cover' src="https://images.pexels.com/photos/3572/fashion-man-wristwatch-model.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                        </div>
                    </div>

                    <div className="grid h-full w-full">
                        <div className="h-[40vh] w-full sm:p-8 pt-10 px-10">
                            <span><FaBoxOpen className="flex justify-center h-12 w-12 bg-yellow-200 p-2 rounded-full" /></span>
                            <h3 className="my-2 font-bold sm:text-3xl text-2xl">Storage</h3>
                            <p className="sm:text-md text-sm">Place in it a cool, dry, and well-ventilated place away from sunlight.</p>
                        </div>
                        <div className="h-[40vh] w-full flex">
                            <img className='w-full object-bottom object-cover' src="https://images.pexels.com/photos/4202328/pexels-photo-4202328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}