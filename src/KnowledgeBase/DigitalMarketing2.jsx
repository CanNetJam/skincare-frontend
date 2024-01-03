import React, { useEffect } from 'react';
import img1 from '../assets/Knowledge Base/Creative Tigers/New/b1.jpg';
import img2 from '../assets/Knowledge Base/Creative Tigers/New/b2.jpg';
import img3 from '../assets/Knowledge Base/Creative Tigers/New/b3.jpg';
import img4 from '../assets/Knowledge Base/Creative Tigers/New/b4.jpg';
import img5 from '../assets/Knowledge Base/Creative Tigers/New/b5.jpg';
import img6 from '../assets/Knowledge Base/Creative Tigers/New/b6.jpg';
import img7 from '../assets/Knowledge Base/Creative Tigers/New/b7.jpg';
import img8 from '../assets/Knowledge Base/Creative Tigers/New/b8.jpg';
import img9 from '../assets/Knowledge Base/Creative Tigers/New/b9.jpg';
import img10 from '../assets/Knowledge Base/Creative Tigers/New/b10.jpg';
import img11 from '../assets/Knowledge Base/Creative Tigers/New/b11.jpg';
import img12 from '../assets/Knowledge Base/Creative Tigers/New/b12.jpg';
import img13 from '../assets/Knowledge Base/Creative Tigers/New/b13.jpg';
import img14 from '../assets/Knowledge Base/Creative Tigers/New/b14.jpg';
import img15 from '../assets/Knowledge Base/Creative Tigers/New/b15.jpg';
import img16 from '../assets/Knowledge Base/Creative Tigers/New/b16.jpg';
import img17 from '../assets/Knowledge Base/Creative Tigers/New/b17.jpg';
import img18 from '../assets/Knowledge Base/Creative Tigers/New/b18.jpg';

export default function DigitalMarketing2() {
    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])

    return (
        <div className='bg-blue-200 h-auto w-full text-base sm:text-lg sm:p-8 p-4'>
            <section className='my-2'>
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Digital Marketing Training 2<br/>(KB-015)</h1>
            </section>
            <br/>
            <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2 sm:rounded-[30px] rounded-[10px]'>
                <div className='col-span-1 grid justify-center'>
                    <img src={img1}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img2}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img3}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img4}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img5}/>
                </div>
                <br/>

                <div className='col-span-1 grid justify-center'>
                    <img src={img6}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img7}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img8}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img9}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img10}/>
                </div>
                <br/>

                <div className='col-span-1 grid justify-center'>
                    <img src={img11}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img12}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img13}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img14}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img15}/>
                </div>
                <br/>

                <div className='col-span-1 grid justify-center'>
                    <img src={img16}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img17}/>
                </div>
                <br/>
                <div className='col-span-1 grid justify-center'>
                    <img src={img18}/>
                </div>
            </section>
        </div>
    )
}
