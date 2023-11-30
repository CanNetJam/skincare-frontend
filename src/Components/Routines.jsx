import { FaCheck } from "react-icons/fa";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Routines() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <>
            <div className="min-h-screen h-auto w-full sm:px-20 px-4 py-8 ">
                <div className="container mx-auto">
                    <div className="py-4 sm:px-0 px-4">
                        <h1 className="subHeading py-2">Normal Skin</h1>
                        <p className="smallText">‘Normal’ is a term widely used to refer to well-balanced skin. The T-zone (forehead, chin and nose) may be a bit oily, but overall sebum and moisture is balanced and the skin is neither too oily nor too dry.</p>
                    </div>
                    <div className="sm:flex grid">
                        <div className="w-full bg-yellow-300 text-black grid px-10 pb-8">
                            <div className="flex justify-center p-6">
                                <h3 className="font-bold text-2xl">Morning Routine</h3>
                            </div>
                            <div className="grid">
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-700">Step 1</p>
                                        <p><b>2% Salicylic Cleanser</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base  text-gray-700">Step 2</p>
                                        <p><b>Vitamin C 15% Serum</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-700">Step 3</p>
                                        <p><b>5% Niacinamide</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-700">Step 4</p>
                                        <p><b>Double Oat Moisturizer</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-700">Step 5</p>
                                        <p><b>Sunscreen</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-black text-white grid px-10 pb-8">
                            <div className="flex justify-center p-6">
                                <h3 className="font-bold text-2xl">Evening Routine</h3>
                            </div>
                            <div className="grid">
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-400">Step 1</p>
                                        <p><b>2% Salicylic Cleanser</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base  text-gray-400">Step 2</p>
                                        <p><b>5% Mandelic Toner</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-400">Step 3</p>
                                        <p><b>5% Niacinamide</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-400">Step 4</p>
                                        <p><b>Double Oat Moisturizer</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto">
                    <div className="py-4 sm:px-0 px-4">
                        <h1 className="subHeading py-2">Dry Skin</h1>
                        <p className="smallText">Dry is used to describe a skin type that produces less sebum than normal skin. As a result of the lack of sebum, dry skin lacks the lipids that it needs to retain moisture and build a protective shield against external influences.</p>
                    </div>
                    <div className="sm:flex grid">
                        <div className="w-full bg-yellow-300 text-black grid px-10 pb-8">
                            <div className="flex justify-center p-6">
                                <h3 className="font-bold text-2xl">Morning Routine</h3>
                            </div>
                            <div className="grid">
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-700">Step 1</p>
                                        <p><b>2% Salicylic Cleanser</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base  text-gray-700">Step 2</p>
                                        <p><b>5% Niacinamide</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-700">Step 3</p>
                                        <p><b>Double Oat Moisturizer</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-700">Step 4</p>
                                        <p><b>Sunscreen</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-black text-white grid px-10 pb-8">
                            <div className="flex justify-center p-6">
                                <h3 className="font-bold text-2xl">Evening Routine</h3>
                            </div>
                            <div className="grid">
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-400">Step 1</p>
                                        <p><b>2% Salicylic Cleanser</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base  text-gray-400">Step 2</p>
                                        <p><b>5% Mandelic Toner</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-400">Step 3</p>
                                        <p><b>5% Niacinamide</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-400">Step 4</p>
                                        <p><b>Double Oat Moisturizer</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>

                <div className="container mx-auto">
                    <div className="py-4 sm:px-0 px-4">
                        <h1 className="subHeading py-2">Oily Skin</h1>
                        <p className="smallText">You have shiny skin, enlarged pores, prone to blackheads and breakout but at times your skin feels tight. Often caused by overproduction of sebum, this skin type can have visible excess oil on the skin and blocked pores which can cause increased breakouts, blemishes, and blackheads.</p>
                    </div>
                    <div className="sm:flex grid">
                        <div className="w-full bg-yellow-300 text-black grid px-10 pb-8">
                            <div className="flex justify-center p-6">
                                <h3 className="font-bold text-2xl">Morning Routine</h3>
                            </div>
                            <div className="grid">
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-700">Step 1</p>
                                        <p><b>2% Salicylic Cleanser</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base  text-gray-700">Step 2</p>
                                        <p><b>5% Niacinamide</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-700">Step 3</p>
                                        <p><b>Double Oat Moisturizer</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-700">Step 4</p>
                                        <p><b>Sunscreen</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-black text-white grid px-10 pb-8">
                            <div className="flex justify-center p-6">
                                <h3 className="font-bold text-2xl">Evening Routine</h3>
                            </div>
                            <div className="lg:w-[400px] md:w-[300px] sm:w-[250px] w-[250px]">
                                <Slider {...settings}>
                                    <div className="grid">
                                        <div className="flex justify-center">
                                            <h3 className="text-white normalText font-semibold">Monday/Wednesday/Friday</h3>
                                        </div>
                                        <div className="flex w-full gap-2 p-2 overflow-hidden">
                                            <div className="w-[60px] grid justify-center gap-4">
                                                <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                <div className="flex">
                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                    <div className="w-full"></div>
                                                </div>
                                            </div>
                                            <div className="grid px-2">
                                                <p className="font-semibold text-base text-gray-400">Step 1</p>
                                                <p><b>2% Salicylic Cleanser</b></p>
                                            </div>
                                        </div>
                                        <div className="flex w-full gap-2 p-2 overflow-hidden">
                                            <div className="w-[60px] grid justify-center gap-4">
                                                <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                <div className="flex">
                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                    <div className="w-full"></div>
                                                </div>
                                            </div>
                                            <div className="grid px-2">
                                                <p className="font-semibold text-base  text-gray-400">Step 2</p>
                                                <p><b>5% Mandelic Toner</b></p>
                                            </div>
                                        </div>
                                        <div className="flex w-full gap-2 p-2 overflow-hidden">
                                            <div className="w-[60px] grid justify-center gap-4">
                                                <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                <div className="flex">
                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                    <div className="w-full"></div>
                                                </div>
                                            </div>
                                            <div className="grid px-2">
                                                <p className="font-semibold text-base text-gray-400">Step 3</p>
                                                <p><b>5% Niacinamide</b></p>
                                            </div>
                                        </div>
                                        <div className="flex w-full gap-2 p-2 overflow-hidden">
                                            <div className="w-[60px] grid justify-center gap-4">
                                                <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                            </div>
                                            <div className="grid px-2">
                                                <p className="font-semibold text-base text-gray-400">Step 4</p>
                                                <p><b>Double Oat Moisturizer</b></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid">
                                        <div className="flex justify-center">
                                            <h3 className="text-white normalText font-semibold">Tuesday/Thursday</h3>
                                        </div>
                                        <div className="flex w-full gap-2 p-2 overflow-hidden">
                                            <div className="w-[60px] grid justify-center gap-4">
                                                <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                <div className="flex">
                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                    <div className="w-full"></div>
                                                </div>
                                            </div>
                                            <div className="grid px-2">
                                                <p className="font-semibold text-base text-gray-400">Step 1</p>
                                                <p><b>2% Salicylic Cleanser</b></p>
                                            </div>
                                        </div>
                                        <div className="flex w-full gap-2 p-2 overflow-hidden">
                                            <div className="w-[60px] grid justify-center gap-4">
                                                <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                <div className="flex">
                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                    <div className="w-full"></div>
                                                </div>
                                            </div>
                                            <div className="grid px-2">
                                                <p className="font-semibold text-base  text-gray-400">Step 2</p>
                                                <p><b>2% BHA Toner</b></p>
                                            </div>
                                        </div>
                                        <div className="flex w-full gap-2 p-2 overflow-hidden">
                                            <div className="w-[60px] grid justify-center gap-4">
                                                <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                <div className="flex">
                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                    <div className="w-full"></div>
                                                </div>
                                            </div>
                                            <div className="grid px-2">
                                                <p className="font-semibold text-base text-gray-400">Step 3</p>
                                                <p><b>5% Niacinamide</b></p>
                                            </div>
                                        </div>
                                        <div className="flex w-full gap-2 p-2 overflow-hidden">
                                            <div className="w-[60px] grid justify-center gap-4">
                                                <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                            </div>
                                            <div className="grid px-2">
                                                <p className="font-semibold text-base text-gray-400">Step 4</p>
                                                <p><b>Double Oat Moisturizer</b></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid">
                                        <div className="flex justify-center">
                                            <h3 className="text-white normalText font-semibold">Sunday</h3>
                                        </div>
                                        <div className="flex w-full gap-2 p-2 overflow-hidden">
                                            <div className="w-[60px] grid justify-center gap-4">
                                                <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                <div className="flex">
                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                    <div className="w-full"></div>
                                                </div>
                                            </div>
                                            <div className="grid px-2">
                                                <p className="font-semibold text-base text-gray-400">Step 1</p>
                                                <p><b>2% Salicylic Cleanser</b></p>
                                            </div>
                                        </div>
                                        <div className="flex w-full gap-2 p-2 overflow-hidden">
                                            <div className="w-[60px] grid justify-center gap-4">
                                                <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                                <div className="flex">
                                                    <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                                    <div className="w-full"></div>
                                                </div>
                                            </div>
                                            <div className="grid px-2">
                                                <p className="font-semibold text-base text-gray-400">Step 2</p>
                                                <p><b>5% Niacinamide</b></p>
                                            </div>
                                        </div>
                                        <div className="flex w-full gap-2 p-2 overflow-hidden">
                                            <div className="w-[60px] grid justify-center gap-4">
                                                <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                            </div>
                                            <div className="grid px-2">
                                                <p className="font-semibold text-base text-gray-400">Step 3</p>
                                                <p><b>Double Oat Moisturizer</b></p>
                                            </div>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto">
                    <div className="py-4 sm:px-0 px-4">
                        <h1 className="subHeading py-2">Combination Skin</h1>
                        <p className="smallText">Combination skin is characterized by having an oily T-zone (forehead, chin, and nose), enlarged pores in this area perhaps with some impurities, and normal to dry cheeks</p>
                    </div>
                    <div className="sm:flex grid">
                        <div className="w-full bg-yellow-300 text-black grid px-10 pb-8">
                            <div className="flex justify-center p-6">
                                <h3 className="font-bold text-2xl">Morning Routine</h3>
                            </div>
                            <div className="grid">
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-700">Step 1</p>
                                        <p><b>2% Salicylic Cleanser</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base  text-gray-700">Step 2</p>
                                        <p><b>Vitamin C 15% Serum</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-700">Step 3</p>
                                        <p><b>5% Niacinamide</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-700">Step 4</p>
                                        <p><b>Double Oat Moisturizer</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='yellow' className="h-[28px] w-[28px] p-2 text-4xl bg-black rounded-full"/>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-700">Step 5</p>
                                        <p><b>Sunscreen</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-black text-white grid px-10 pb-8">
                            <div className="flex justify-center p-6">
                                <h3 className="font-bold text-2xl">Evening Routine</h3>
                            </div>
                            <div className="grid">
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-400">Step 1</p>
                                        <p><b>2% Salicylic Cleanser</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base  text-gray-400">Step 2</p>
                                        <p><b>5% Mandelic Toner</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                        <div className="flex">
                                            <div className="h-[25px] w-full border-dashed border-r-2 border-gray-600"></div>
                                            <div className="w-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-400">Step 3</p>
                                        <p><b>5% Niacinamide</b></p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 p-2 overflow-hidden">
                                    <div className="w-[60px] grid justify-center gap-4">
                                        <FaCheck color='black' className="h-[28px] w-[28px] p-2 text-4xl bg-white rounded-full"/>
                                    </div>
                                    <div className="grid px-2">
                                        <p className="font-semibold text-base text-gray-400">Step 4</p>
                                        <p><b>Double Oat Moisturizer</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}