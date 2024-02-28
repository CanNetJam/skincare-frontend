import React, { useState, useEffect, useCallback, useContext } from 'react'
import axios from "axios";
import moment from "moment";
import { addDays } from 'date-fns';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import { utils, writeFile } from 'xlsx';
import PageButtons from '../Components/PageButtons';
import DeleteEmail from '../Modals/DeleteEmail';
import {UserContext} from "../App";

export default function Email() {
    const { userData, setUserData } = useContext(UserContext)
    const [ menu, setMenu ] = useState(false)
    const [ emails, setEmails] = useState([])
    const [ range, setRange ] = useState("Last year")
    const [dateRange, setDateRange] = useState({
        startDate: addDays(new Date(), -365),
        endDate: new Date()
    })
    const [ page, setPage ] = useState(0)
    const [ pages, setPages ] = useState(0)
    const [ pageEntries, setPageEntries ] = useState(100)
    const [ total, setTotal ] = useState(0)
    const [ emailData, setEmailData] = useState([])
    const [ openPageCount, setOpenPageCount ] = useState(false)
    const [ search, setSearch ] = useState("")
    const [ pageButtons, setPageButtons] = useState([])
    const [ displayedPages, setDisplayedPages ] = useState(5)
    const [ isDelete, setIsDelete ] = useState(false)
    const [ toDelete, setToDelete ] = useState("")

    const exportFile = useCallback(() => {
        /* generate worksheet from state */
        const ws = utils.json_to_sheet(emailData.length>0 ? emailData : [])
        /* create workbook and append worksheet */
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Email List")
        /* export to XLSX */
        writeFile(wb, `Email-Subscriptions(${moment(Date.now()).format('MM-DD-YYYY')}).xlsx`)
    }, [emails])

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [pageEntries, page, emails])

    useEffect(()=> {
        const resetPage = () => {   
            setPage(0)
        }
        resetPage()
    }, [pageEntries, search])

    useEffect(() => {
        let isCancelled = false
        const getEmails = async () => {
            try {
                const getEmails = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/emails/all-emails`, {params: {
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    page: page,
                    limit: pageEntries,
                    searchString: search
                }})
                
                if (getEmails.data.sortedEmails.length>0) {
                    setEmailData([])
                    for (let i=0; i<getEmails.data.sortedEmails.length; i++){
                        
                        setEmailData(prev=>prev.concat([{ email: getEmails.data.sortedEmails[i].email }]))
                    }
                }
                setEmails(getEmails.data.sortedEmails)
                setPages(getEmails.data.totalEmails)
                setTotal(getEmails.data.total)
            } catch (err) {
                console.log(err)
            }
        }
        if (search.length === 0 || search.length > 2) getEmails()
        return ()=> {
            isCancelled = true
        }
    }, [dateRange, page, pageEntries, search, isDelete])

    return (
        <>
        <Navbar/>
        {isDelete && (
            <DeleteEmail isDelete={isDelete} setIsDelete={setIsDelete} toDelete={toDelete} setToDelete={setToDelete}/>
        )} 
        <div className='min-h-screen h-auto pt-16 w-full container mx-auto sm:p-10 p-4'>
            <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>Email Subscriptions</h1>
            <div className='grid sm:flex sm:justify-between'>
                
                <div className="relative h-full">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input onChange={(e)=>setSearch(e.target.value)} type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search email..."/>
                </div> 
            
                <div className="flex relative gap-2 flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-end pb-4">
                    <button onClick={()=>exportFile()} className='mt-1 w-full bg-blue-500 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-blue-600 sm:mt-0 sm:w-auto sm:shrink-0 rounded-md'>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" ><path fill='white' d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z"/></svg>
                    </button>
                    <div className='flex items-center justify-center h-full '>
                        <button onClick={()=> menu===false ? setMenu(true) : setMenu(false)} id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                            </svg>
                            {range}
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                    </div>
                    {menu===true ? 
                        <div id="dropdownRadio" className="z-10 top-10 m-0 absolute w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" styles={{position: "absolute", inset: "auto auto 0px 0px", margin: "0px"}}>
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
            <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg p-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Day
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            {userData.user?.type==="Super Admin" ? 
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            :null}
                        </tr>
                    </thead>
                    <tbody>
                        {emails[0]!==undefined ? 
                            <>
                                {emails.map((a, index)=> {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-2 py-4">
                                                <b>{(pageEntries*page)+(index+1)}</b>
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {a.email}
                                            </th>
                                            <td className="px-6 py-4">
                                                {moment(a.createdAt).format('LT')}
                                            </td>
                                            <td className="px-6 py-4">
                                                {moment(a.createdAt).format('dddd')}
                                            </td>
                                            <td className="px-6 py-4">
                                                {moment(a.createdAt).format('MM-DD-YYYY')}
                                            </td>
                                            {userData.user?.type==="Super Admin" ?
                                                <td className="px-6 py-4">
                                                    <button onClick={()=>{
                                                        setIsDelete(true)
                                                        setToDelete(a)
                                                        }} className='h-full cursor-pointer text-red-400 hover:text-red-500'>
                                                            Delete
                                                    </button>
                                                </td>
                                            :null}
                                        </tr>
                                    )
                                })}
                            </>
                        :null}
                    </tbody>
                </table>

            </div>
            <nav className="sm:flex sm:flex-row-reverse grid justify-center gap-2 w-full items-center sm:justify-between pt-4" aria-label="Table navigation">
                <PageButtons
                    page={page}
                    pages={pages}
                    setPage={setPage}
                    displayedPages={displayedPages}
                    setDisplayedPages={setDisplayedPages}
                    pageButtons={pageButtons}
                    setPageButtons={setPageButtons}
                />
                <div>
                    <span className="text-sm text-center font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing{" "}
                        <button onClick={()=> {
                            if (openPageCount===false) {
                                setOpenPageCount(true)
                            } else {
                                setOpenPageCount(false)
                            }
                        }}className="font-semibold text-gray-900 dark:text-white px-3 rounded-md bg-gray-200 relative">
                            {(pageEntries*(page+1))-(pageEntries-1)}-{pageEntries*(page+1)}
                            
                            {openPageCount===true && (
                                <div id="dropdown" className="absolute top-5 left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <label onClick={()=>setPageEntries(10)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">10</label>
                                        </li>
                                        <li>
                                            <label onClick={()=>setPageEntries(50)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">50</label>
                                        </li>
                                        <li>
                                            <label onClick={()=>setPageEntries(100)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">100</label>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </button> of 
                        <span className="font-semibold text-gray-900 dark:text-white">{" "+total}</span>
                    </span>
                </div>
            </nav>
        </div>
        <Footer/>
        </>
    )
}