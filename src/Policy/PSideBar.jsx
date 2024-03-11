import React from 'react';

export default function PSideBar({openMenu, setOpenMenu, openTab, openLink, setOpenLink}) {

    return (
        <>
            {openMenu===true ? 
                <div className='min-h-screen h-auto sm:w-[300px] w-[250px] bg-gray-800 sticky sm:top-[100px] top-[100px] left-0 duration-200 ease-linear lg:translate-x-0'>
                    <section className='flex justify-end items-center p-4'>
                        <svg onClick={()=>{
                            if (openMenu===true) {
                                setOpenMenu(false)
                            } 
                        }} className='cursor-pointer' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path fill='white' d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/></svg>
                    </section>

                    {openTab==="General Rules" &&
                        <section className='h-screen sm:px-6 px-2'>
                            <h1 className='subHeading text-white mb-6'>Contents</h1>
                            <ul className='text-gray-400 sm:ml-2 sm:text-base text-sm list-decimal px-4'>
                                <li onClick={()=> setOpenLink("Loitering")} className={openLink==="Loitering" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Loitering</li>
                                <li onClick={()=> setOpenLink("Progressive Corrective")} className={openLink==="Progressive Corrective" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Progressive Corrective</li>
                                <li onClick={()=> setOpenLink("Safeguard Premises")} className={openLink==="Safeguard Premises" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Safeguard Premises</li>
                                <li onClick={()=> setOpenLink("Social Media Policy")} className={openLink==="Social Media Policy" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Social Media Policy</li>
                                <li onClick={()=> setOpenLink("Streaming Line Communication")} className={openLink==="Streaming Line Communication" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Streaming Line Communication</li>
                                <li onClick={()=> setOpenLink("Confidentiality")} className={openLink==="Confidentiality" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Confidentiality</li>
                                <li onClick={()=> setOpenLink("Critical Work Day")} className={openLink==="Critical Work Day" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Critical Work Day</li>
                                <li onClick={()=> setOpenLink("Dress Code")} className={openLink==="Dress Code" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Dress Code</li>
                                <li onClick={()=> setOpenLink("KPI New Hire")} className={openLink==="KPI New Hire" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>KPI New Hire</li>
                                <li onClick={()=> setOpenLink("Fragile")} className={openLink==="Fragile" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Waybill and Fragile Sticker</li>
                                <li onClick={()=> setOpenLink("Laptop")} className={openLink==="Laptop" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Laptop Audit</li>
                            </ul>
                            <br/>
                            
                        </section>
                    }
                    {openTab==="Code of Conduct" &&
                        <section className='h-screen sm:px-6 px-2'>
                            <h1 className='subHeading text-white mb-6'>Contents</h1>
                            <ul className='text-gray-400 sm:ml-2 sm:text-base text-sm list-decimal px-4'>
                                <li onClick={()=> setOpenLink("Code of Discipline")} className={openLink==="Code of Discipline" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Code of Discipline</li>
                                <li onClick={()=> setOpenLink("Attendance & Punctuality")} className={openLink==="Attendance & Punctuality" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Attendance & Punctuality</li>
                                <li onClick={()=> setOpenLink("Work Place Decorum 1")} className={openLink==="Work Place Decorum 1" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Work Place Decorum 1</li>
                                <li onClick={()=> setOpenLink("Work Place Decorum 2")} className={openLink==="Work Place Decorum 2" ? 'text-white' : `cursor-pointer hover:text-gray-200 my-2`}>Work Place Decorum 2</li>
                            </ul>
                            <br/>
                            
                        </section>
                    }
                </div>
            :
                <div className='h-screen w-[45px] bg-gray-800 sticky sm:top-[100px] top-[100px] left-0 duration-200 ease-linear lg:translate-x-100'>
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

//<PolicyEmail userData={userData?.user} policytitle={["Loitering and Malingering (IP-001)", "Progressive Corrective Action (IP-002)", "Safeguarding Premises (IP-003)", "Social Media Policy (IP-004)", "Streaming Line Communication (IP-005)", "Confidentiality (IP-006)", "Critical Work Day (IP-007)", "Dress Code (IP-008)", "Key Performance Indicator (IP-009)"]}/>
//<PolicyEmail userData={userData?.user} policytitle={["Code of Discipline (IP-010)", "Attendance & Punctuality (IP-011)", "Work Place Decorum 1 (IP-012)", "Work Place Decorum 2 (IP-013)"]}/>