import React, { useEffect } from 'react';
import img1 from '../assets/Policy/k1.png';
import img2 from '../assets/Policy/k2.png';

export default function WorkplaceDecorum1() {
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
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Code of Discipline on Workplace Decorum 1<br/>(IP-012)</h1>
            </section>
            <br/>
            <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2 sm:rounded-[30px] rounded-[10px]'>
                <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg p-4">
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
                                Using of personal mobile
    phones/gadgets on time of
    work

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
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    2
                                </th>
                                <td className="px-6 py-4 max-w-sm">
                                Failure to comply with the
    Dress Code policy
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
                                    3
                                </th>
                                <td className="px-6 py-4 max-w-sm">
                                Failure or refusal to
    cooperate with others in
    completion of task or project

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
                                Engaging in horseplay or
    disorderly conduct in the
    workplace that may disrupt
    the operations of the
    company or create
    annoyance to another
    employee.
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
                                Engaging in Bullying such as
    harass, or bully another
    employee through words or
    actions

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
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    6
                                </th>
                                <td className="px-6 py-4 max-w-sm">
                                Any act constituting theft or
    robbery or any attempt to
    commit theft or robbery of
    any property within or
    outside Company premises
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
                                <td scope="row" className="px-6 py-4">
                                7
                                </td>
                                <td className="px-6 py-4 max-w-sm">
                                Disregarding, forgetting or
    failure to log-in or log-out in
    any time keeping systems of
    the company
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
                                Refusal to render overtime
    without valid reason when
    the exigency of the work
    requires it
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
                                9
                                </td>
                                <td className="px-6 py-4 max-w-sm">
                                Sleeping while on duty
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
                                10
                                </td>
                                <td className="px-6 py-4 max-w-sm">
                                Challenging, quarreling or
    engaging in a fight within
    company premises, or
    uncontrolled temper or
    discourtesy with your
    colleague, supervisor or
    any member of the
    management or any
    conduct unbecoming of a
    decent Klued employee
    within or outside company
    premises.
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
                                <td scope="row" className="px-6 py-4">
                                11
                                </td>
                                <td className="px-6 py-4 max-w-sm">
                                Insubordination: Refusing,
    without justifiable cause,
    to obey, abide and/or
    implement any lawful rule,
    regulation, order,
    instruction, or policy issues
    by the company or by the
    employee’s
    superior/manager and
    authorized senior
    officer of the company.
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
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}
