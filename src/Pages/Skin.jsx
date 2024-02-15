import React, { useState, useEffect } from 'react';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import { PiNumberCircleOneFill, PiNumberCircleTwoFill, PiNumberCircleThreeFill } from "react-icons/pi";
import icon1 from '../assets/icons8-ok-hand-96.png';
import icon2 from '../assets/icons8-cure-96.png';
import icon3 from '../assets/icons8-confident-96.png';
import icon4 from '../assets/icons8-sprout-96.png';
import img1 from '../assets/Compressed-Webp/2-min.webp';
import EmailSubscription from '../Modals/EmailSubscription';
import { ToastContainer } from 'react-toastify';

function Skin() {
    const [opentab, setOpenTab] = useState("Normal")
    const [ isOpen, setIsOpen ] = useState(false)

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])

    useEffect(()=> {
        const showPopup = () => {
            let token = localStorage.getItem("auth-token")
            if (token === null){
                localStorage.setItem("auth-token", "")
                token = ""
            }

            if (token==="" || token===null || token===undefined) {
                setTimeout(()=>{
                    setIsOpen(true)
                }, 5000)
            }
        }
        showPopup()
    }, [])

    return (
        <div className='sm:mt-16 mt-8 bg-white relative'>
            <Navbar/>
            {isOpen && (
                <EmailSubscription isOpen={isOpen} setIsOpen={setIsOpen}/>
            )}
        <div className='h-full bg-white grid sm:pt-0 mt-16 justify-center py-4'>
            <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>Understanding your skin</h1>
            
            <div className='container mx-auto max-w-6xl grid sm:px-0 sm:grid sm:grid-cols-3'>
                <div className='sm:col-span-1 grid sm:max-h-[80vh] max-h-[30vh] h-full w-full'>
                <div className='h-full w-full overflow-hidden'>
                    <img className='h-full w-full object-cover' src={img1}></img>
                </div>
                </div>

                <div className='sm:col-span-2 grid h-full w-full sm:p-8 p-4'>
                <div className='h-full w-full p-0'>
                    <p className='text-justify text-base'>
                    <span className='font-bold text-xl text-justify'>Skin</span> is the largest organ in the body and covers the body's entire external surface. It is made up of three layers which vary significantly in their anatomy and function. It serves as a barrier to water, invasion by microorganisms, mechanical and chemical trauma, and damage from UV light.
                    </p>
                </div>

                <h1 className='font-bold text-xl text-center my-8'>Layers of Skin</h1>
                <div>
                    <div className="grid grid-cols-8 gap-4 py-0">
                    <div className="flex justify-end">
                        <PiNumberCircleOneFill className="col-span-1 text-blue-500 h-[45px] w-[45px]"/>
                    </div>
                    <div className="col-span-7 pb-6">
                        <h1 className="capitalize font-bold text-black text-lg my-0">Epidermis</h1>
                        <div className="grid grid-cols-4 items-center">
                        <p className="col-span-4 tinyText inline-block">The word “epidermis” combines the Ancient Greek prefix epi-, which means “outer,” and the Ancient Greek word derma, which means “skin.” So the word translates to “outer skin.”</p>
                        </div>
                    </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-8 gap-4 py-0">
                    <div className="flex justify-end">
                        <PiNumberCircleTwoFill className="col-span-1 text-blue-500 h-[45px] w-[45px]"/>
                    </div>
                    <div className="col-span-7 pb-6">
                        <h1 className="capitalize font-bold text-black text-lg my-1">Dermis</h1>
                        <div className="grid grid-cols-4 items-center">
                        <p className="col-span-4 tinyText inline-block">It houses the sweat glands, hair, hair follicles, muscles, sensory neurons, and blood vessels.</p>
                        </div>
                    </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-8 gap-4 py-0">
                    <div className="flex justify-end">
                        <PiNumberCircleThreeFill className="col-span-1 text-blue-500 h-[45px] w-[45px]"/>
                    </div>
                    <div className="col-span-7">
                        <h1 className="capitalize font-bold text-black text-lg my-1">Hypodermis</h1>
                        <div className="grid grid-cols-4 items-center">
                        <p className="col-span-4 tinyText inline-block">It is the deepest layer of skin and contains some skin appendages like the hair follicles, sensory neurons, and blood vessels.</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div className='w-full h-auto bg-gray-100 py-10'>
            <div className='min-h-screen h-auto w-full container mx-auto max-w-6xl py-8'>
            <h1 className='text-black font-bold subHeading py-4 text-center'>Different Skin Types</h1>
                <div className='h-[10vh] sticky top-16 bg-white z-30 w-full grid sm:grid-cols-4 grid-cols-2 sm:gap-2 gap-0 border-b border-black'>
                <section className={`h-full items-center flex justify-center font-bold sm:text-xl text-md text-center ${opentab==="Normal" ? "bg-blue-400 text-white" : null}`}>
                    <span onClick={()=> setOpenTab("Normal")} className='cursor-pointer sm:hover:text-gray-600 sm:hover:text-2xl'>Normal</span>
                </section>
                <section className={`h-full items-center flex justify-center font-bold sm:text-xl text-md text-center ${opentab==="Dry" ? "bg-blue-400 text-white" : null}`}>
                    <span onClick={()=> setOpenTab("Dry")} className='cursor-pointer sm:hover:text-gray-600 sm:hover:text-2xl'>Dry</span>
                </section>
                <section className={`h-full items-center flex justify-center font-bold sm:text-xl text-md text-center ${opentab==="Oily" ? "bg-blue-400 text-white" : null}`}>
                    <span onClick={()=> setOpenTab("Oily")} className='cursor-pointer sm:hover:text-gray-600 sm:hover:text-2xl'>Oily</span>
                </section>
                <section className={`h-full items-center flex justify-center font-bold sm:text-xl text-md text-center ${opentab==="Combination" ? "bg-blue-400 text-white" : null}`}>
                    <span onClick={()=> setOpenTab("Combination")} className='cursor-pointer sm:hover:text-gray-600 sm:hover:text-2xl'>Combination</span>
                </section>
                </div>
            <div className='container mx-auto h-full w-full sm:px-0 px-4'>

                {opentab==="Normal" &&
                <>
                    <div id='normal' className='h-full bg-white rounded-b-lg w-full grid sm:grid-cols-2 sm:px-10'>
                    <div className='sm:h-screen h-[30vh] w-full sm:sticky sm:top-0 items-center sm:py-[10vh] py-2 sm:px-10 px-2'>
                        <img className='h-full w-full object-cover z-10' src='https://images.pexels.com/photos/1435823/pexels-photo-1435823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
                    </div>
                    <div className='sm:min-h-[100vh] h-auto w-full sm:py-[10vh] py-2 sm:px-10 px-2'>
                        <h3 className='font-bold sm:text-5xl text-xl'>What is normal skin?</h3>
                        <br/>
                        <p className='smallText text-justify'>‘Normal’ is a term widely used to refer to well-balanced skin. The T-zone (forehead, chin and nose) may be a bit oily, but overall sebum and moisture is balanced and the skin is neither too oily nor too dry.</p>
                        <br/>

                        <div className='h-auto w-full bg-blue-300 rounded-xl py-2 px-4'>
                        <h3 className='font-bold sm:text-3xl text-xl my-2'>How to identify normal skin?</h3>
                        <div className='smallText'>Normal skin has:
                            <ul className='list-disc mx-8 font-semibold'>
                            <li>Fine pores</li>
                            <li>Good blood circulation</li>
                            <li>A velvety, soft, and smooth texture</li>
                            <li>A fresh, rosy color uniform transparency</li>
                            <li>No blemishes and is not prone to sensitivity.</li>
                            </ul>
                            As a person with normal skin ages, their skin can become dryer.
                        </div>
                        </div>
                    </div>
                    </div>
                </>
                }

                {opentab==="Dry" &&
                <>
                    <div className='h-full bg-white rounded-b-lg w-full grid sm:grid-cols-2 sm:px-10'>
                    <div className='sm:h-screen h-[30vh] w-full sm:sticky sm:top-0 items-center sm:py-[10vh] py-2 sm:px-10 px-2'>
                        <img className='h-full w-full object-cover z-10' src='https://images.pexels.com/photos/7480278/pexels-photo-7480278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
                    </div>
                    <div className='sm:min-h-[100vh] h-auto w-full sm:py-[10vh] py-2 sm:px-10 px-2'>
                        <h1 className='font-bold sm:text-5xl text-xl'>Dry skin</h1>
                        <br/>
                        <p className='smallText text-justify'>
                        Dry skin is caused by a lack of sebum as well as a lack of water in the upper layers of the skin. Be aware of the difference between dry and dehydrated skin to target your specific needs. With dry skin, we want to focus on adding the moisture back in as well repairing the skin barrier which can become compromised meaning moisture is not retained. Skin moisture depends on supply of water in the deeper skin layers and on perspiration.
                        </p>
                        <br/>

                        <div className='h-auto w-full bg-blue-300 rounded-xl py-2 px-4'>
                        <h3 className='font-bold sm:text-3xl text-xl my-2'>Dry skin is caused by a lack of:</h3>
                        <ul className='list-disc mx-8 smallText text-justify'>
                            <li><b>Natural moisturizing factors (NMFs)</b> - especially urea, amino acids, and lactic acid – that help to bind in water.</li>
                            <li><b>Epidermal lipids</b> such as ceramides, fatty acids and cholesterol which are needed for a healthy skin barrier function.</li>
                        </ul>
                        </div>
                        <br/>

                        <h3 className='font-bold sm:text-3xl text-xl my-4'>Skin is constantly losing water because of:</h3>
                        <div className='grid sm:grid-cols-2 gap-4 sm:gap-0'>
                        <div>
                            <ul className='list-disc mx-8 smallText'>
                            <li><span className='font-bold text-blue-500'>Perspiration</span>: active water loss from the glands caused by heat, stress, and activity.</li>
                            <li><span className='font-bold text-blue-500'>Trans-epidermal water loss (TEWL)</span>: the natural, passive way in which skin diffuses about half a liter of water a day from the deeper skin layers.</li>
                            </ul>
                        </div>
                        <div>
                            <img className='h-full w-full object-cover' src='https://images.pexels.com/photos/9165664/pexels-photo-9165664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
                        </div>
                        </div>
                        <br/>
                    
                    <h1 className='subHeading my-4 text-center'>2 dry skin types</h1>
                    <div className='h-auto w-full grid sm:grid-cols-2 gap-2'>

                        <div className='h-auto w-full bg-white rounded-xl p-2'>
                        <img className='object-cover max-h-[200px] w-full rounded-xl mb-4' src='https://images.pexels.com/photos/4046567/pexels-photo-4046567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
                        <h3 className='text-lg text-blue-500 font-bold'>Dry Skin</h3>
                        <p className='my-2'>Often feels tight, brittle, and rough and look dull. Skin elasticity is also low.</p>
                        <ul className='list-disc mx-4 font-semibold'>
                            <li>Tightness and a rough skin</li>
                            <li>Feeling often indicates</li>
                            <li>A dry skin</li>
                        </ul>
                        </div>

                        <div className='h-auto w-full bg-white rounded-xl p-2'>
                        <img className='object-cover max-h-[200px] w-full rounded-xl mb-4' src='https://images.pexels.com/photos/4046564/pexels-photo-4046564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
                        <h3 className='font-bold text-lg text-blue-500'>Very Dry Skin</h3>
                        <p className='my-2'>Atopic dermatitis, or eczema, is a chronic skin disease that mainly affects children</p>
                        <ul className='list-disc mx-4 font-semibold'>
                            <li>Mild scaling or flakiness in patches</li>
                            <li>A rough and blotchy appearance (sometimes it appears to be prematurely aged)</li>
                            <li>A feeling of tightness</li>
                            <li>Possible itchiness</li>
                            <li>It is also more sensitive to irritation, redness, and the risk of infection.</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                    </div>
                </>
                }

                {opentab==="Oily" &&
                <>
                    <div className='h-full bg-white rounded-b-lg w-full grid sm:grid-cols-2 sm:px-10'>
                    <div className='sm:h-screen h-[30vh] w-full sm:sticky sm:top-0 items-center sm:py-[10vh] py-2 sm:px-10 px-2'>
                        <img className='h-full w-full object-cover z-10' src='https://images.pexels.com/photos/7479960/pexels-photo-7479960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
                    </div>
                    <div className='sm:min-h-[100vh] h-auto w-full sm:py-[10vh] py-2 sm:px-10 px-2'>
                        <h1 className='font-bold sm:text-5xl text-xl'>Oily skin</h1>
                        <br/>
                        <p className='smallText text-justify'>Often caused by overproduction of sebum, this skin type can have visible excess oil on the skin and blocked pores which can cause increased breakouts, blemishes, and blackheads.</p>
                        <br/>

                        <div className='h-[50vh] w-full relative my-20'>
                        <div className='overflow-hidden rounded-lg bg-cover bg-center bg-[url(https://images.pexels.com/photos/14862083/pexels-photo-14862083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] h-1/2 w-1/2 absolute top-0 -translate-y-1/3 left-0 translate-x-1/4 z-10'></div>
                        <div className='overflow-hidden rounded-lg bg-cover bg-center bg-[url(https://images.pexels.com/photos/6338374/pexels-photo-6338374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] h-1/2 w-1/2 absolute top-1/2 -translate-y-1/2 right-0 -translate-x-1/4 z-20'></div>
                        <div className='overflow-hidden rounded-lg bg-cover bg-center bg-[url(https://images.pexels.com/photos/6476082/pexels-photo-6476082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] h-1/2 w-1/2 absolute bottom-0 translate-y-1/3 left-0 translate-x-1/4 z-10'></div>

                        <div className='overflow-hidden rounded-lg h-1/2 w-1/3 absolute top-0 -translate-y-1/3 right-0 z-0'>
                            <div className='h-full w-full flex items-center'>
                            <p className='italic text-sm font-semibold'>Oily skin can be characterized by enlarged and visible pores.</p>
                            </div>
                        </div>
                        <div className='overflow-hidden rounded-lg h-1/2 w-1/3 absolute top-1/2 -translate-y-1/2 left-0 z-0'>
                            <div className='h-full w-full flex items-center'>
                            <p className='italic text-sm text-right font-semibold'>Acne concerns often appear in the T-zone, especially during puberty.</p>
                            </div>
                        </div>
                        <div className='overflow-hidden rounded-lg h-1/2 w-1/3 absolute bottom-0 translate-y-1/3 right-0 z-0'>
                            <div className='h-full w-full flex items-center'>
                            <p className='italic text-sm font-semibold'>Oily skin tends to have blemishes.</p>
                            </div>
                        </div>
                        </div>

                        <div className='h-auto w-full bg-blue-300 rounded-xl py-2 px-4'>
                        <h3 className='font-bold sm:text-3xl text-xl my-2'>Several issues trigger the over production of sebum:</h3>
                        <ul className='list-disc mx-8 smallText'>
                            <li>Genetics</li>
                            <li>Hormonal changes and imbalances</li>
                            <li>Medication</li>
                            <li>Stress</li>
                            <li>Comedogenic cosmetics (make-up products that cause irritation)</li>
                        </ul>
                        </div>
                        <br/>

                        <p className='smallText text-justify'>
                        Oily skin is prone to comedones (blackheads and whiteheads) and to the varying forms of acne.
                        <br/><br/>With mild acne, a significant number of comedones appear on the face and frequently on the neck, shoulders, back and chest too. In moderate and severe cases, papules (small bumps with no visible white or black head) and pustules (medium sized bumps with a noticeable white or yellow dot at the center) appear and the skin becomes red and inflamed.
                        </p>
                        <br/>

                        <div className='h-auto w-full bg-blue-300 rounded-xl py-2 px-4'>
                        <h3 className='font-bold sm:text-3xl text-xl my-4'>Characteristics of oily skin:</h3>
                        <ul className='list-disc mx-8 smallText'>
                            <li>Enlarged, clearly visible pores</li>
                            <li>A glossy shine</li>
                            <li>Thicker, pale skin: blood vessels may not be visible</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </>
                }

                {opentab==="Combination" &&
                <>
                    <div className='h-full bg-white rounded-b-lg w-full grid sm:grid-cols-2 sm:px-10'>
                    <div className='sm:h-screen h-[30vh] w-full sm:sticky sm:top-0 items-center sm:py-[10vh] py-2 sm:px-10 px-2'>
                        <img className='h-full w-full object-cover z-10' src='https://images.pexels.com/photos/609549/pexels-photo-609549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
                    </div>
                    <div className='sm:min-h-[100vh] h-auto w-full sm:py-[10vh] py-2 sm:px-10 px-2'>
                        <h3 className='font-bold sm:text-5xl text-4xl'>Combination Skin</h3>
                        <br/>
                        <p className='smallText text-justify'>An oily T-Zone (forehead, nose, and chin) and dryer cheeks indicate the so-called combination skin.</p>
                        <br/>

                        <div className='h-auto w-full bg-blue-300 rounded-xl py-2 px-4'>
                        <h3 className='font-bold text-3xl my-2'>Characteristics of combination skin:</h3>
                        <ul className='list-disc mx-8 smallText'>
                            <li>An oily T-zone (forehead, chin, and nose)</li>
                            <li>Enlarged pores in this area perhaps with some impurities</li>
                            <li>Normal to dry cheeks</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </>
                }

            </div>
            </div>
        </div>
        <div className='min-h-screen h-auto w-full bg-white sm:p-6 p-0'>
            <div className='container mx-auto max-w-6xl px-0'>
            <div className='lg:h-[50vh] h-[30vh] w-full sm:rounded-[20px] px-10 overflow-hidden items-center bg-cover bg-fixed bg-[url(https://images.pexels.com/photos/3785806/pexels-photo-3785806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]'>
                <p className='font-bold h-full flex justify-center items-center text-blue-400 lg:text-5xl text-4xl text-center drop-shadow-[0_5px_5px_rgba(0,0,0,1)]'>Why is good skin care important?</p>
            </div>
            </div>

            <div className='grid-cols-2 grid gap-2 container mx-auto sm:w-[75%] w-full sm:grid-cols-4 p-4 -mt-[50px] sm:-mt-[80px]'>
            
            <div className='group sm:h-[50vh] h-[30vh] [perspective:10000px]'>
                <div className='transiton-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] h-full p-8 rounded-xl bg-white shadow-lg'>
                <div className='flex justify-center'>
                    <img className='h-16 w-16 object-center' src={icon1}></img>
                </div>
                <br/>
                <p className='sm:text-2xl text-sm text-center'><b>It helps your skin stay in good condition</b></p>
                
                <div className='bg-white absolute inset-0 h-full w-full rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]'>
                    <div className='h-full w-full flex items-center justify-center sm:p-8 p-2'>
                    <p className='sm:text-base text-xs font-semibold text-center'>You are shedding skin cells throughout the day, so it is important to keep your skin glowing and in good condition. An effective routine can help prevent acne, treat wrinkles, and help keep your skin looking its best.</p>
                    </div>
                </div>
                </div>
            </div>

            <div className='group sm:h-[50vh] h-[30vh] [perspective:10000px]'>
                <div className='transiton-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] h-full p-8 rounded-xl bg-white border shadow-lg'>
                <div className='flex justify-center'>
                    <img className='h-16 w-16 object-center' src={icon4}></img>
                </div>
                <br/>
                <p className='sm:text-2xl text-sm text-center'><b>Your skin will look more youthful</b></p>
                
                <div className='bg-white absolute inset-0 h-full w-full rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]'>
                    <div className='h-full w-full flex items-center justify-center sm:p-8 p-2'>
                    <p className='sm:text-base text-xs font-semibold text-center'>As you age, your skin’s cells turn over more slowly, make it look duller and less radiant. Using a quality skin care line can help remove dead skin cells so your body will replace them with newer, more youthful cells.</p>
                    </div>
                </div>
                </div>
            </div>

            <div className='group sm:h-[50vh] h-[30vh] [perspective:10000px]'>
                <div className='transiton-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] h-full p-8 rounded-xl bg-white border shadow-lg'>
                <div className='flex justify-center'>
                    <img className='h-16 w-16 object-center' src={icon2}></img>
                </div>
                <br/>
                <p className='sm:text-2xl text-sm text-center'><b>Prevention is easier than correction</b></p>
                
                <div className='bg-white absolute inset-0 h-full w-full rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]'>
                    <div className='h-full w-full flex items-center justify-center sm:p-8 p-2'>
                    <p className='sm:text-base text-xs font-semibold text-center'>Preventing skin problems is easier and less costly than trying to fix them in the future.</p>
                    </div>
                </div>
                </div>
            </div>

            <div className='group sm:h-[50vh] h-[30vh] [perspective:10000px]'>
                <div className='transiton-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] h-full p-8 rounded-xl bg-white border shadow-lg'>
                <div className='flex justify-center'>
                    <img className='h-16 w-16 object-center' src={icon3}></img>
                </div>
                <br/>
                <p className='sm:text-2xl text-sm text-center'><b>Your self-confidence will get a boost</b></p>
                
                <div className='bg-white absolute inset-0 h-full w-full rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]'>
                    <div className='h-full w-full flex items-center justify-center sm:p-8 p-2'>
                    <p className='sm:text-base text-xs font-semibold text-center'>When your skin looks better, you will feel better about yourself and have more self-confidence.</p>
                    </div>
                </div>
                </div>
            </div>

            </div>
        </div>

            <div>
                <Footer/>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Skin