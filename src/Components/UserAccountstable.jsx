import React, { useState, useEffect, useContext } from 'react'
import axios from "axios";
import moment from "moment";
import { addDays } from 'date-fns';
import Register from '../Modals/EmpRegister';
import DeleteAccountModal from '../Modals/DeleteAccount';
import EditAccount from '../Modals/EditAccount';
import { IoPersonCircleOutline } from "react-icons/io5";
import PageButtons from './PageButtons';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function UserAccountsTable() {
    const { userData, setUserData } = useContext(UserContext)
    let navigate = useNavigate()
    const [ isOpen, setIsOpen ] = useState(false)
    const [ isDelete, setIsDelete ] = useState(false)
    const [ toDelete, setToDelete ] = useState("")
    const [ isEdit, setIsEdit ] = useState(false)
    const [ toEdit, setToEdit ] = useState("")
    const [ menu, setMenu ] = useState(false)
    const [ accounts, setAccounts] = useState([])
    const [ range, setRange ] = useState("Last year")
    const [dateRange, setDateRange] = useState({
        startDate: addDays(new Date(), -365),
        endDate: new Date()
    })
    const [ page, setPage ] = useState(0)
    const [ pages, setPages ] = useState(0)
    const [ pageEntries, setPageEntries ] = useState(100)
    const [ total, setTotal ] = useState(0)
    const [ pageButtons, setPageButtons] = useState([])
    const [ displayedPages, setDisplayedPages ] = useState(10)
    const [ openPageCount, setOpenPageCount ] = useState(false)
    const [ userType, setUserType ] = useState("")
    const [ search, setSearch ] = useState("")

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [page, pageEntries, accounts])
    
    useEffect(() => {
        let isCancelled = false
        const getAccounts = async () => {
            try {
                let token = localStorage.getItem("auth-token")
                const getAccounts = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/accounts/all-accounts`, 
                {params: {
                    type: userType,
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    page: page,
                    limit: pageEntries,
                    searchString: search
                }, 
                headers: {"auth-token": token}})
                setAccounts(getAccounts.data.sortedAccounts)
                setPages(getAccounts.data.totalAccounts)
                setTotal(getAccounts.data.total)
            } catch (err) {
                console.log(err)
            }
        }
        if (search.length === 0 || search.length > 2) getAccounts()
        return ()=> {
            isCancelled = true
        }
    }, [dateRange, page, pageEntries, isDelete, userType, search])

    return (
        <div className='h-auto w-full my-16 sm:p-10 py-4 px-4'>
            <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>User Accounts</h1>
            {isOpen && (
                <Register isOpen={isOpen} setIsOpen={setIsOpen} dateRange={dateRange} setDateRange={setDateRange}/>
            )}  
            {isDelete && (
                <DeleteAccountModal isDelete={isDelete} setIsDelete={setIsDelete} toDelete={toDelete} setToDelete={setToDelete}/>
            )}  
            {isEdit && (
                <EditAccount isEdit={isEdit} setIsEdit={setIsEdit} toEdit={toEdit} dateRange={dateRange} setDateRange={setDateRange}/>
            )}  
            <div className="grid w-full sm:grid-cols-2 gap-2 sm:flex sm:justify-between sm:space-y-0 items-center justify-between p-2 sm:px-0">
                <div className="relative grid justify-center items-center h-full">
                    <div className="absolute inset-y-0 left-4 sm:left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="white" d="M8.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm15.398 15.8c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z"/></svg>
                    </div>
                    <button onClick={()=>setIsOpen(true)} className="mt-1 w-full bg-blue-500 p-2 text-sm font-bold uppercase tracking-wide pl-8 text-white transition-none hover:bg-blue-600 sm:mt-0 sm:w-auto sm:shrink-0 rounded-md">Add Account</button>
                </div> 
                <div className='flex gap-2'>
                    <div className="relative h-full">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input onChange={(e)=>setSearch(e.target.value)} type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search name, email or number..."/>
                    </div> 
                    <div className='group'>
                        <div className="relative bg-blue-400 text-white text-sm font-bold whitespace-nowrap py-2 px-4 min-w-[150px] flex justify-center items-center rounded-md">
                            {userType!== "" ? 
                                <>
                                    {userType}
                                    <svg onClick={()=>setUserType("")} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill='white' d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                                </>
                            : "Select User Type"}
                            <div className="absolute left-0 top-9 w-full bg-gray-200 text-black z-10 hidden group-hover:block">
                                <label onClick={()=>setUserType("Klued Staff")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                    Klued Staff
                                </label>
                                <label onClick={()=>setUserType("Customer")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                    Customer
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='relative grid justify-center items-center h-full'>
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
            </div>
            <div className="relative w-auto overflow-x-auto shadow-md sm:rounded-lg p-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Picture
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Full Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Designation
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Contact Information
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date Registered
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
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
                                            <td onClick={()=>navigate(`/accounts/profile/${a._id}`)} className="px-2 py-4 cursor-pointer">
                                                <b>{(pageEntries*page)+(index+1)}</b>
                                            </td>
                                            <th onClick={()=>navigate(`/accounts/profile/${a._id}`)} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {a.type}
                                            </th>
                                            <td onClick={()=>navigate(`/accounts/profile/${a._id}`)} className="px-6 py-4 cursor-pointer">
                                                {a?.displayimage ? 
                                                    <div className="h-12 w-12 overflow-hidden rounded-full">
                                                        <img className='h-full w-full rounded-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a?.displayimage}.jpg`}></img>
                                                    </div>
                                                    :
                                                    <IoPersonCircleOutline className='h-12 w-12'/>
                                                }
                                            </td>
                                            <td onClick={()=>navigate(`/accounts/profile/${a._id}`)} className="px-6 py-4 cursor-pointer">
                                                {a.firstname+" "+a.lastname}
                                            </td>
                                            <td onClick={()=>navigate(`/accounts/profile/${a._id}`)} className="px-6 py-4 cursor-pointer">
                                                {a.job}<br/>
                                                {a.department ? `(${a.department})`:null}
                                            </td>
                                            <td onClick={()=>navigate(`/accounts/profile/${a._id}`)} className="px-6 py-4 cursor-pointer">
                                                {a.email}<br/>
                                                {a.phone}
                                            </td>
                                            <td onClick={()=>navigate(`/accounts/profile/${a._id}`)} className="px-6 py-4 cursor-pointer">
                                                {moment(a.createdAt).format('MM-DD-YYYY')}
                                            </td>
                                            <td onClick={()=>navigate(`/accounts/profile/${a._id}`)} className="px-6 py-4 cursor-pointer">
                                                {a.verified===true? <span className='font-semibold text-green-500'>Active</span> : <span className='font-semibold text-red-500'>Inactive</span>}
                                            </td>
                                            <td className="px-6 py-4 flex justify-center items-center gap-2">
                                                {a?.type==="Super Admin" ? 
                                                    <>
                                                    {userData.user?.type==="Super Admin" ?
                                                        <>
                                                        <button onClick={()=>{
                                                            setIsEdit(true)
                                                            setToEdit(a)
                                                            }}className='h-full cursor-pointer hover:text-blue-400'>Edit</button>
                                                        <button onClick={()=>{
                                                            setIsDelete(true)
                                                            setToDelete(a)
                                                            }} className='h-full cursor-pointer hover:text-blue-400'>Delete</button>
                                                        </>
                                                    :null}
                                                    </>
                                                :
                                                    <>
                                                    <button onClick={()=>{
                                                        setIsEdit(true)
                                                        setToEdit(a)
                                                        }}className='h-full cursor-pointer hover:text-blue-400'>Edit</button>
                                                    <button onClick={()=>{
                                                        setIsDelete(true)
                                                        setToDelete(a)
                                                        }} className='h-full cursor-pointer hover:text-blue-400'>Delete</button>
                                                    </>
                                                }

                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                        :null}
                    </tbody>
                </table>
            </div>
            <nav className="flex w-full items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <div>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing{" "}
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
                                            <button onClick={()=>setPageEntries(10)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">10</button>
                                        </li>
                                        <li>
                                            <button onClick={()=>setPageEntries(50)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">50</button>
                                        </li>
                                        <li>
                                            <button onClick={()=>setPageEntries(100)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">100</button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </button> of 
                        <span className="font-semibold text-gray-900 dark:text-white">{" "+total}</span>
                    </span>
                </div>
                <PageButtons
                    page={page}
                    pages={pages}
                    setPage={setPage}
                    displayedPages={displayedPages}
                    setDisplayedPages={setDisplayedPages}
                    pageButtons={pageButtons}
                    setPageButtons={setPageButtons}
                />
            </nav>
        </div>
    )
}