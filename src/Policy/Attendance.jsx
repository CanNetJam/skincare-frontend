import React, { useEffect } from 'react';
import img1 from '../assets/Policy/j1.png';
import img2 from '../assets/Policy/j2.png';

export default function Attendance() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Code of Discipline on Attendance & Punctuality<br/>(IP-011)</h1>
            </section>
            <br/>
            <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2 sm:rounded-[30px] rounded-[10px]'>
                <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
                    <thead className="text-xs sticky top-24 text-gray-900 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Incident
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Verbal<br/>
                                Written<br/>
                                Final Written<br/>
                                Termination
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Written<br/>
                                Final Written<br/>
                                Termination
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Final Written<br/>
                                Termination
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Termination
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                1
                            </th>
                            <td className="px-6 py-4 max-w-sm">
                                <b>Tardiness</b><br/>
                                Tardiness occurs when an employee arrives late for the work shift or from returning from the one hour non-compensable meal period or the short compensable 15 minute "coffee" breaks.
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                <p className='w-full text-center'><b>X</b></p>
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                        </tr>
                        <tr className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td></td>
                            <td scope='row' className="px-6 py-4">
                                <b>NCNS / AWOL</b><br/>
                                In the event that an employee will be absent on any given day, it is a requirement to inform the Immediate Supervisor and or Manager for each instance of absence 2 hours prior to the start of the shift.
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                2
                            </th>
                            <td className="px-6 py-4 max-w-sm">
                                a. (1) One day of No Call, No Show (NCNS) thus, making the absence as unauthorized absence for the day
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                <p className='w-full text-center'><b>X</b></p>
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td scope="row" className="px-6 py-4">
                            
                            </td>
                            <td className="px-6 py-4 max-w-sm">
                            b. (2) Two consecutive days in a month of No Call, No Show (NCNS) thus, making the absence as unauthorized absence for the days
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                <p className='w-full text-center'><b>X</b></p>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                3
                            </th>
                            <td className="px-6 py-4 max-w-sm">
                                Unauthorized Under time (not completing one’s shift and without permission)
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                <p className='w-full text-center'><b>X</b></p>
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                4
                            </th>
                            <td className="px-6 py-4 max-w-sm">
                            Unscheduled absence: Failure to
update his immediate supervisor
or designated point person to
advice a valid sick or emergency
leave, at least 1 hour before the
start of his official schedule.
                            </td>
                            <td className="px-6 py-4">
                                <p className='w-full text-center'><b>X</b></p>
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                5
                            </th>
                            <td className="px-6 py-4 max-w-sm">
                            <b>Malingering</b><br/>
While on duty, habitually leaving
work assignment or work areas
without permission from his
immediate superior.

                            </td>
                            <td className="px-6 py-4">
                                <p className='w-full text-center'><b>X</b></p>
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                6
                            </th>
                            <td className="px-6 py-4 max-w-sm">
                            <b>Critical Work Day</b><br/>
A work day where attendance is
a must where absence to be
approved must be supported by
valid documents as reviewed by
Management. Being absent
without official leave during a
Critical Work Day.

                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                <p className='w-full text-center'><b>X</b></p>
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td scope="row" className="px-6 py-4">
                            7
                            </td>
                            <td className="px-6 py-4 max-w-sm">
                            Failure to comply with the
scheduled break without
justifiable reason
                            </td>
                            <td className="px-6 py-4">
                                <p className='w-full text-center'><b>X</b></p>
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td scope="row" className="px-6 py-4">
                            8
                            </td>
                            <td className="px-6 py-4 max-w-sm">
                            Failure, refusal or ignoring to
submit necessary documentary
proof of absence within a
reasonable period upon the
employee's return to work. (i.e.
sick leave, submit upon return,
bereavement leave - upon
availability of death
certificate), to name a few.
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                            <p className='w-full text-center'><b>X</b></p>
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}
