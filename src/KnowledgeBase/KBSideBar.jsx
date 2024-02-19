import React from 'react';

export default function KBSideBar({openMenu, setOpenMenu, openTab, openLink, setOpenLink}) {
    return (
        <>
            {openMenu===true ? 
                <div className='sm:h-screen h-auto sm:w-[300px] w-[250px] bg-gray-800 sticky sm:top-[100px] top-[120px] left-0 duration-200 ease-linear lg:translate-x-0'>
                    <section className='flex justify-end items-center p-4'>
                        <svg onClick={()=>{
                            if (openMenu===true) {
                                setOpenMenu(false)
                            } 
                        }} className='cursor-pointer' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path fill='white' d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/></svg>
                    </section>
                    {openTab==="Mountain Movers" ?
                        <section className='h-screen sm:px-8 px-2'>
                            <h1 className='subHeading text-white mb-6'>Contents</h1>
                            <ul className='text-gray-400 sm:ml-2 sm:text-base text-sm list-decimal px-4'>
                                <li onClick={()=> setOpenLink("Waybills")} className={openLink==="Waybills" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Waybills</li>
                                <li onClick={()=> setOpenLink("Mass Printing Waybills")} className={openLink==="Mass Printing Waybills" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Mass Printing Waybills</li>
                                <li onClick={()=> setOpenLink("Product Packaging")} className={openLink==="Product Packaging" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Product Packaging</li>
                                <li onClick={()=> setOpenLink("Packaging Rules")} className={openLink==="Packaging Rules" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Packaging Rules</li>
                                <li onClick={()=> setOpenLink("Product Quality")} className={openLink==="Product Quality" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Product Quality</li>
                                <li onClick={()=> setOpenLink("Product Inventory")} className={openLink==="Product Inventory" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Product Inventory</li>
                                <li onClick={()=> setOpenLink("Box Wrap")} className={openLink==="box Wrap" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Box Wrap</li>
                            </ul>
                        </section>
                    : null}
                    {openTab==="Customer Excellence" &&
                        <section className='h-screen sm:px-8 px-2'>
                            <h1 className='subHeading text-white mb-6'>Contents</h1>
                            <ul className='text-gray-400 sm:ml-2 sm:text-base text-sm list-decimal px-4'>
                                <li onClick={()=> setOpenLink("Customer Support")} className={openLink==="Customer Support" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Customer Support</li>
                                <li onClick={()=> setOpenLink("Order Income")} className={openLink==="Order Income" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Order Income</li>
                            </ul>
                        </section>
                    }
                    {openTab==="Mountain Excellence" &&
                        <section className='h-screen sm:px-8 px-2'>
                            <h1 className='subHeading text-white mb-6'>Contents</h1>
                            <ul className='text-gray-400 sm:ml-2 sm:text-base text-sm list-decimal px-4'>
                                <li onClick={()=> setOpenLink("Floating Parcel (Product to Ship)")} className={openLink==="Floating Parcel (Product to Ship)" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Floating Parcel (Product to Ship)</li>
                                <li onClick={()=> setOpenLink("RTS (Undelivered Products)")} className={openLink==="RTS (Undelivered Products)" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>RTS (Undelivered Products)</li>
                                <li onClick={()=> setOpenLink("Customer Return/Refund")} className={openLink==="Customer Return/Refund" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Customer Return/<br/>Refund</li>
                            </ul>
                        </section>
                    }
                    {openTab==="Creative Tigers" &&
                        <section className='h-screen sm:px-8 px-2'>
                            <h1 className='subHeading text-white mb-6'>Contents</h1>
                            <ul className='text-gray-400 sm:ml-2 sm:text-base text-sm list-decimal px-4'>
                                <li onClick={()=> setOpenLink("Content Metrics")} className={openLink==="Content Metrics" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Content Metrics</li>
                                <li onClick={()=> setOpenLink("Social Media Checking")} className={openLink==="Social Media Checking" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Social Media Checking</li>
                                <li onClick={()=> setOpenLink("Live Sessions")} className={openLink==="Live Sessions" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Live Sessions</li>
                                <li onClick={()=> setOpenLink("Digital Marketing Training 1")} className={openLink==="Digital Marketing Training 1" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Digital Marketing Training 1</li>
                                <li onClick={()=> setOpenLink("Digital Marketing Training 2")} className={openLink==="Digital Marketing Training 2" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Digital Marketing Training 2</li>
                                <li onClick={()=> setOpenLink("Digital Marketing Training 3")} className={openLink==="Digital Marketing Training 3" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Digital Marketing Training 3</li>
                            </ul>
                        </section>
                    }
                </div>
            :
                <div className='sm:h-screen h-auto w-[45px] bg-gray-800 sticky sm:top-[100px] top-[120px] left-0 duration-200 ease-linear lg:translate-x-100'>
                    <section className='flex justify-end items-center p-2'>
                        <svg onClick={()=>{
                            if (openMenu===false) {
                                setOpenMenu(true)
                            } 
                        }} className='cursor-pointer' clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill='white' d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z" fillRule="nonzero"/></svg>
                    </section>
                </div>
            }
        </>
    )
}
