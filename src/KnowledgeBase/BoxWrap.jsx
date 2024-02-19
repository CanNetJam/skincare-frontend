import React, { useEffect } from 'react';

export default function BoxWrap() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Box Wrap<br/>(KB-018)</h1>
            </section>
            <br/>
            <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2 sm:rounded-[30px] rounded-[10px]'>
                <h1 className='font-bold contentHeading my-4'><b>Steps:</b></h1>
                <ol className='sm:ml-8 ml-4 list-decimal sm:text-xl text-base'>
                    <li className='my-2'>Measure the bubble wrap accordingly to the size of the box.</li>
                    <li className='my-2'>Secure the bottom of the box with packing tape.</li>
                    <li className='my-2'>Wrap the item/s with the bubbe wrap and secure it with the packing tape.</li>
                    <li className='my-2'>Put the wrapped items in the box and close the top of the box and secure it with packing tape.</li>
                    <li className='my-2'>Place the box in the center of the bubble wrap.</li>
                    <li className='my-2'>Make sure the box is facing the bumps of the bubble wrap.</li>
                    <li className='my-2'>Fold the sides of the bubble wrap to cover the box and secure it with the tape.</li>
                    <li className='my-2'>Fold the remaining sides of the bubble wrap to fully cover the box.</li>
                    <li className='my-2'>Secure it diagonally with packing tape.</li>
                    <li className='my-2'>Put the covered box in the plastic package then put the waybill and the fragile sticker in the upper corner of the parcel.</li>
                </ol>
                <iframe className='sm:min-h-[500px] h-auto w-full' src="https://drive.google.com/file/d/1Wk5fw2ZnMzSlUOlwb_yDNhD6V9dliUx5/preview" allow="autoplay"></iframe>
            </section>
        </div>
    )
}
