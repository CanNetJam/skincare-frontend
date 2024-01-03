import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Mountain Movers/g1.png';
import img2 from '../assets/Knowledge Base/Mountain Movers/g2.png';
import img3 from '../assets/Knowledge Base/Mountain Movers/g3.png';
import img4 from '../assets/Knowledge Base/Mountain Movers/g4.png';
import img5 from '../assets/Knowledge Base/Mountain Movers/g5.png';

export default function ProductQuality() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Product Quality<br/>(KB-005)</h1>
                <p><b>Written on:</b> October 20, 2023 <br/> <b>Updated on:</b> December 05, 2023</p>
            </section>
            <br/>
            <div className='h-auto sm:rounded-[30px] rounded-[10px] overflow-hidden'>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2'>
                    <div className='grid justify'>
                        <h1 className='font-bold contentHeading my-4'><b>Steps:</b></h1>
                        <ol className='ml-4 list-decimal sm:text-xl text-base'>
                            <li className='my-2'>Make sure that the box is clean.</li>
                            <li className='my-2'>No sediments or stains inside the bottle.</li>
                            <li className='my-2'>Tighten the cap securely.</li>
                            <li className='my-2'>There should be no stains on the sticker.</li>
                            <li className='my-2'>Clean the bottle properly.</li>
                        </ol>
                        <br/>
                        <br/>
                        <h1 className='font-bold contentHeading my-4'><b>Examples of rejected items:</b></h1>
                        <MyImage className='' src={img1}/>
                        <label className='text-center'><i>Hair follicles can be seen inside the bottle.</i></label>
                        <br/>
                        <MyImage className='' src={img2}/>
                        <label className='text-center'><i>White strings are floating inside the bottle.</i></label>
                        <br/>
                        <MyImage className='' src={img3}/>
                        <label className='text-center'><i>Product was leaking because the packaging wasn’t sealed securely.</i></label>
                        <br/>
                        <MyImage className='' src={img4}/>
                        <label className='text-center'><i>The blue hue is different from the official company color.</i></label>
                        <br/>
                        <MyImage className='' src={img5}/>
                        <label className='text-center'><i>The box was badly damaged.</i></label>
                    </div>
                </section>
            </div>
        </div>
    )
}
