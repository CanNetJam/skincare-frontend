import React, { useState, useEffect } from 'react'
import axios from "axios";
import moment from "moment";
import { addDays } from 'date-fns';
import Register from '../Modals/EmpRegister';
import DeleteAccountModal from '../Modals/DeleteAccount';

export default function UserAccountsTable() {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ isDelete, setIsDelete ] = useState(false)
    const [ toDelete, setToDelete ] = useState("")
    const [ menu, setMenu ] = useState(false)
    const [ accounts, setAccounts] = useState([])
    const [ range, setRange ] = useState("Last 7 days")
    const [dateRange, setDateRange] = useState({
        startDate: addDays(new Date(), -7),
        endDate: new Date()
    })
    const [ page, setPage ] = useState(0)
    const [ pages, setPages ] = useState(0)
    const [ pageEntries, setPageEntries ] = useState(10)
    const [ total, setTotal ] = useState(0)

    useEffect(() => {
        const getAccounts = async () => {
            try {
                let token = localStorage.getItem("auth-token")
                const getAccounts = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/accounts/all-accounts`, 
                {params: {
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    page: page,
                    limit: pageEntries
                }, 
                headers: {"auth-token": token}})
                setAccounts(getAccounts.data.sortedAccounts)
                setPages(getAccounts.data.totalAccounts)
                setTotal(getAccounts.data.total)
            } catch (err) {
                console.log(err)
            }
        }
        getAccounts()
    }, [dateRange, page, pageEntries, isOpen, isDelete])

    function createElements(pages, page){
        var elements = [];
        for(let i =0; i < pages; i++){
            elements.push(
                <li key={i}>
                    <button disabled={page===i ? true : false} onClick={()=>setPage(i)} className={`${page===i ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700' } flex items-center justify-center px-3 h-8 leading-tight  border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                        {i+1}
                    </button>
                </li>
            )
        }
        return elements;
    }

    return (
        <div className='h-auto w-full container mx-auto my-16 sm:p-10 py-4 px-4'>
            <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>User Accounts</h1>
            {isOpen && (
                <Register isOpen={isOpen} setIsOpen={setIsOpen}/>
            )}  
            {isDelete && (
                <DeleteAccountModal isDelete={isDelete} setIsDelete={setIsDelete} toDelete={toDelete} setToDelete={setToDelete}/>
            )}  
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 px-4 sm:px-0">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" d="M8.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm15.398 15.8c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z"/></svg>
                    </div>
                    <button onClick={()=>setIsOpen(true)} className="mt-1 w-full bg-blue-500 px-6 py-3 text-sm font-bold uppercase tracking-wide pl-10 text-white transition-none hover:bg-blue-600 sm:mt-0 sm:w-auto sm:shrink-0 rounded-md">Add User Account</button>
                </div> 
                <div className='relative'>
                    <button onClick={()=> menu===false ? setMenu(true) : setMenu(false)} id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                        </svg>
                        {range}
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    {menu===true ? 
                        <div id="dropdownRadio" className="z-10 top-10 right-0 absolute w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" styles={{position: "absolute", inset: "auto auto 0px 0px", margin: "0px"}}>
                            <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input onChange={e=> {
                                            setRange(e.target.value)
                                            setDateRange({...dateRange, startDate: addDays(new Date(), -1)})
                                            setMenu(false)
                                        }} defaultChecked={range==="Last day" ? true : false} id="filter-radio-example-1" type="radio" value="Last day" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        <label htmlFor="filter-radio-example-1" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last day</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input onChange={e=> {
                                            setRange(e.target.value)
                                            setDateRange({...dateRange, startDate: addDays(new Date(), -7)})
                                            setMenu(false)
                                        }} defaultChecked={range==="Last 7 days" ? true : false} id="filter-radio-example-2" type="radio" value="Last 7 days" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        <label htmlFor="filter-radio-example-2" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 7 days</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input onChange={e=> {
                                            setRange(e.target.value)
                                            setDateRange({...dateRange, startDate: addDays(new Date(), -30)})
                                            setMenu(false)
                                        }} defaultChecked={range==="Last 30 days" ? true : false} id="filter-radio-example-3" type="radio" value="Last 30 days" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        <label htmlFor="filter-radio-example-3" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 30 days</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input onChange={e=> {
                                            setRange(e.target.value)
                                            setDateRange({...dateRange, startDate: addDays(new Date(), -365)})
                                            setMenu(false)
                                        }} defaultChecked={range==="Last year" ? true : false} id="filter-radio-example-5" type="radio" value="Last year" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        <label htmlFor="filter-radio-example-5" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last year</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    :null}
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Contact Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Department
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Job
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date Registered
                            </th>
                            <th scope="col" className="px-6 py-3 flex justify-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts[0]!==undefined ? 
                            <>
                                {accounts.map((a, index)=> {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {a.type}
                                            </th>
                                            <td className="px-6 py-4">
                                                {a.firstname}
                                            </td>
                                            <td className="px-6 py-4">
                                                {a.lastname}
                                            </td>
                                            <td className="px-6 py-4">
                                                {a.phone}
                                            </td>
                                            <td className="px-6 py-4">
                                                {a.department}
                                            </td>
                                            <td className="px-6 py-4">
                                                {a.job}
                                            </td>
                                            <td className="px-6 py-4">
                                                {a.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {moment(a.createdAt).format('MM-DD-YYYY')}
                                            </td>
                                            <td className="px-6 py-4 flex justify-center items-center gap-2">
                                                <button className='h-full cursor-pointer hover:text-blue-400'>Edit</button>
                                                <button onClick={()=>{
                                                    setIsDelete(true)
                                                    setToDelete(a)
                                                    }} className='h-full cursor-pointer hover:text-blue-400'>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                        :null}
                    </tbody>
                </table>

                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-{pageEntries<total ? pageEntries : total}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total}</span></span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <button disabled={page===0? true : false} onClick={()=>setPage(prev=>prev-1)} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg ${page!==0? 'hover:bg-gray-100 hover:text-gray-700' : null } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>Previous</button>
                        </li>
                        {createElements(pages, page)}

                        <li>
                            <button disabled={page===(pages-1)? true : false} onClick={()=>setPage(prev=>prev+1)} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${page!==(pages-1)? 'hover:bg-gray-100 hover:text-gray-700' : null } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}