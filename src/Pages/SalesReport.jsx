import React, {useState, useEffect} from 'react';
import DateRangePickerComp from '../Components/DateRangePickerComp';
import { addDays } from 'date-fns';
import axios from "axios";
import BarChart from '../Charts/BarChart';
import moment from 'moment';
import PieChart from '../Charts/PieChat';

export default function SalesReport() {
    const [ dateRange, setDateRange] = useState({
        startDate: addDays(new Date(), -29),
        endDate: new Date
    })
    const [ fetchedData, setFetchedData ] = useState({})
    const [ topProducts, setTopProducts ] = useState([])
    const [ totalSales, setTotalSales ] = useState(0)
    const [ topCustomers, setTopCustomers ] = useState([])
    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const [ monthlySales, setMonthlySales ] = useState({
        title: "",
        labels: labels,
        datasets: [{
            label: "",
            data: "",
        }]
    })

    const [ monthlyBreakdown, setMonthlyBreakdown ] = useState({
        title: "",
        labels: "",
        datasets: [{
            label: "",
            data: [],
        }]
    })

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])

    useEffect(()=> {
        const getReports = async () => {   
            try {
                let token = localStorage.getItem("auth-token")
                const res = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/reports/all-orders`, 
                { 
                    headers: { "Content-Type": "application/json", "auth-token": token }, 
                    params: {
                        start: dateRange.startDate,
                        end: dateRange.endDate,
                        previous: addDays(dateRange.startDate, -29),
                    }
                })
                if (res.data) {
                    setFetchedData(res.data)
                }

                const res2 = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/reports/top-products`, 
                { 
                    headers: { "Content-Type": "application/json", "auth-token": token }, 
                    params: {
                        start: dateRange.startDate,
                        end: dateRange.endDate,
                    }
                })
                if (res2.data) {
                    setTopProducts(res2.data)
                }

                
                const res3 = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/reports/top-customers`, 
                { 
                    headers: { "Content-Type": "application/json", "auth-token": token }, 
                    params: {
                        start: dateRange.startDate,
                        end: dateRange.endDate,
                    }
                })
                
                if (res3.data) {
                    setTopCustomers([])
                    let topCustomersLimit = res3.data.length>5 ? 5 : res3.data.length
                    for (let i=0; i<topCustomersLimit; i++){
                        setTopCustomers(prev=>prev.concat(res3.data[i]))
                    }
                }

            } catch (err) {
                console.log(err)
            }
        }
        getReports()
    }, [ dateRange])
    
    useEffect(()=> {
        const getReports = async () => {   
            try {
                let token = localStorage.getItem("auth-token")
                const res = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/reports/all-monthly-sales`, 
                { 
                    headers: { "Content-Type": "application/json", "auth-token": token }, 
                    params: {
                        start: dateRange.startDate,
                        end: dateRange.endDate,
                    }
                })
                if (res.data) {
                    setMonthlySales({...monthlySales,    
                        title: `Monthly Sales and Net Amount of Year ${moment(dateRange.endDate).format('YYYY')}`,             
                        datasets: [
                            {
                                label: `Sales`,
                                data: res.data.mongthlySales?.map((data)=> data.sales),
                                borderColor: '#3b82f6',
                                backgroundColor: '#3b82f6',
                            },
                            {
                                label: `Net Amount`,
                                data: res.data.mongthlySales?.map((data)=> data.netamount),
                                borderColor: '#22c55e',
                                backgroundColor: '#22c55e',
                            },
                        ]
                    })
                    
                    setMonthlyBreakdown({...monthlySales,
                        labels: res.data?.mongthlyBreakdown?.map((data)=> data.name),
                        title: `Income Breakdown (${moment(dateRange.endDate).format('MMMM - YYYY')})`,             
                        datasets: [{
                            label: "",
                            data: res.data?.mongthlyBreakdown?.map((data)=> data.count)
                        }]
                    })
                }
            } catch (err) {
                console.log(err)
            }
        }
        getReports()
    }, [ dateRange])

    useEffect(()=> {
        const getTotalSales = async () => {   
            try {
                let total = 0
                for (let i=0; i<topProducts.length; i++){
                    total = total+topProducts[i].quantity
                }
                setTotalSales(total)
            } catch (err) {
                console.log(err)
            }
        }
        getTotalSales()
    }, [ topProducts])

    return (
        <div>
            <div className='container mx-auto min-h-screen h-auto max-w-6xl mt-16 px-4'>
                <h3 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>Klued Sales Reports</h3>
                <div className='relative h-10'>
                    <div className='absolute  top-0'>
                        <DateRangePickerComp dateRange={dateRange} setDateRange={setDateRange}/>
                    </div>
                </div>
                <div className='grid sm:grid-cols-4 gap-6 h-auto w-full py-6'>
                    <div className='h-auto w-full grid gap-2 rounded-lg shadow-lg p-5 border'>
                        <div className='grid grid-cols-3 gap-3'>
                            <div className='col-span-1 h-auto w-full flex justify-center items-center'>
                                <div className='h-10 w-10 rounded-full p-2 bg-blue-300'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4 14.083c0-2.145-2.232-2.742-3.943-3.546-1.039-.54-.908-1.829.581-1.916.826-.05 1.675.195 2.443.465l.362-1.647c-.907-.276-1.719-.402-2.443-.421v-1.018h-1v1.067c-1.945.267-2.984 1.487-2.984 2.85 0 2.438 2.847 2.81 3.778 3.243 1.27.568 1.035 1.75-.114 2.011-.997.226-2.269-.168-3.225-.54l-.455 1.644c.894.462 1.965.708 3 .727v.998h1v-1.053c1.657-.232 3.002-1.146 3-2.864z"/></svg>
                                </div>
                            </div>
                            <div className='col-span-2 grid'>
                                <p className={`${fetchedData?.AllSales?.toString().length>6 ? 'text-2xl' : 'text-3xl'} font-bold flex items-end`}>₱{fetchedData?.AllSales}</p>
                                <p className='text-base text-gray-600'>Total Revenue</p>
                            </div>
                        </div>
                        <p className='text-base font-semibold flex justify-center'>
                            {fetchedData?.AllPreviousSales!==0 ? 
                                <>
                                    <span className={`${(fetchedData?.AllSales-fetchedData?.AllPreviousSales)/fetchedData?.AllPreviousSales*100 >= 0 ? 'text-green-400' : 'text-red-400'}`}>{((fetchedData?.AllSales-fetchedData?.AllPreviousSales)/fetchedData?.AllPreviousSales*100)?.toFixed(2)}% </span> 
                                    {(fetchedData?.AllSales-fetchedData?.AllPreviousSales)/fetchedData?.AllPreviousSales*100 >= 0 ? 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center -rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#4ade80`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span> 
                                    : 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#f87171`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span>
                                    }
                                </>
                            :
                                <>
                                    <span className={`${fetchedData?.AllSales*100 >= 0 ? 'text-green-400' : 'text-red-400'}`}>{(fetchedData?.AllSales*100)?.toFixed(2)}%</span>
                                    {fetchedData?.AllSales*100 >= 0 ? 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center -rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#4ade80`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span> 
                                    : 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#f87171`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span>
                                    }
                                </>
                            }
                        </p>
                    </div>
                    <div className='h-auto w-full grid gap-2 rounded-lg shadow-lg p-5 border'>
                        <div className='grid grid-cols-3 gap-3'>
                            <div className='col-span-1 h-auto w-full flex justify-center items-center'>
                                <div className='h-10 w-10 rounded-full p-2 bg-blue-300'>
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path fill='' d="M13.5 18c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-3.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm13.257-14.5h-1.929l-3.473 12h-13.239l-4.616-11h2.169l3.776 9h10.428l3.432-12h4.195l-.743 2zm-13.537 4.183l-2.325-2.183-1.395 1.435 3.746 3.565 6.559-6.592-1.422-1.408-5.163 5.183z"/></svg>
                                </div>
                            </div>
                            <div className='col-span-2 grid'>
                                <p className='font-bold text-3xl flex items-end'>{fetchedData?.AllOrders}</p>
                                <p className='text-base text-gray-600'>Total Orders</p>
                            </div>
                        </div>
                        <p className='text-base font-semibold flex justify-center'>
                            {fetchedData?.AllPreviousOrders!==0 ? 
                                <>
                                    <span className={`${(fetchedData?.AllOrders-fetchedData?.AllPreviousOrders)/fetchedData?.AllPreviousOrders*100 >= 0 ? 'text-green-400' : 'text-red-400'}`}>{((fetchedData?.AllOrders-fetchedData?.AllPreviousOrders)/fetchedData?.AllPreviousOrders*100)?.toFixed(2)}%</span>
                                    {(fetchedData?.AllOrders-fetchedData?.AllPreviousOrders)/fetchedData?.AllPreviousOrders*100 >= 0 ? 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center -rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#4ade80`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span> 
                                    : 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#f87171`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span>
                                    }
                                </>
                            :
                                <>
                                    <span className={`${fetchedData?.AllOrders*100 >= 0 ? 'text-green-400' : 'text-red-400'}`}>{(fetchedData?.AllOrders*100)?.toFixed(2)}%</span>
                                    {fetchedData?.AllOrders*100 >= 0 ? 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center -rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#4ade80`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span> 
                                    : 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#f87171`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span>
                                    }
                                </>
                            }
                        </p>
                    </div>
                    <div className='h-auto w-full grid gap-2 rounded-lg shadow-lg p-5 border'>
                        <div className='grid grid-cols-3 gap-3'>
                            <div className='col-span-1 h-auto w-full flex justify-center items-center'>
                                <div className='h-10 w-10 rounded-full p-2 bg-blue-300'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/></svg>
                                </div>
                            </div>
                            <div className='col-span-2 grid'>
                                <p className='font-bold text-3xl flex items-end'>{fetchedData?.AllCustomers}</p>
                                <p className='text-base text-gray-600'>New Users</p>
                            </div>
                        </div>
                        <p className='text-base font-semibold flex justify-center'>
                            {fetchedData?.AllPreviousCustomers!==0 ? 
                                <>
                                    <span className={`${(fetchedData?.AllCustomers-fetchedData?.AllPreviousCustomers)/fetchedData?.AllPreviousCustomers*100 >= 0 ? 'text-green-400' : 'text-red-400'}`}>{((fetchedData?.AllCustomers-fetchedData?.AllPreviousCustomers)/fetchedData?.AllPreviousCustomers*100)?.toFixed(2)}%</span>
                                    {(fetchedData?.AllCustomers-fetchedData?.AllPreviousCustomers)/fetchedData?.AllPreviousCustomers*100 >= 0 ? 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center -rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#4ade80`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span> 
                                    : 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#f87171`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span>
                                    }
                                </>
                            :
                                <>
                                    <span className={`${fetchedData?.AllCustomers*100 >= 0 ? 'text-green-400' : 'text-red-400'}`}>{(fetchedData?.AllCustomers*100)?.toFixed(2)}%</span>
                                    {fetchedData?.AllCustomers*100 >= 0 ? 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center -rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#4ade80`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span> 
                                    : 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#f87171`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span>
                                    }
                                </>
                            }
                        </p>
                    </div>
                    <div className='h-auto w-full grid gap-2 rounded-lg shadow-lg p-5 border'>
                        <div className='grid grid-cols-3 gap-3'>
                            <div className='col-span-1 h-auto w-full flex justify-center items-center'>
                                <div className='h-10 w-10 rounded-full p-2 bg-blue-300'>
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M6.178 4c-.914-1.493-2.944-3-6.178-3v-1c4.011 0 6.415 2.11 7.314 4h6.159l10.527 10.625-9.375 9.375-10.625-10.581v-6.242l-.282-.128c-1.043-.476-2.226-1.015-3.718-1.015v-1c1.641 0 2.943.564 4 1.044v-2.078h2.178zm10.944 9.109c-.415-.415-.865-.617-1.378-.617-.578 0-1.227.241-2.171.804-.682.41-1.118.584-1.456.584-.361 0-1.083-.408-.961-1.218.052-.345.25-.697.572-1.02.652-.651 1.544-.848 2.276-.106l.744-.744c-.476-.476-1.096-.792-1.761-.792-.566 0-1.125.227-1.663.677l-.626-.627-.698.699.653.652c-.569.826-.842 2.021.076 2.938 1.011 1.011 2.188.541 3.413-.232.6-.379 1.083-.563 1.475-.563.589 0 1.18.498 1.078 1.258-.052.386-.26.763-.621 1.122-.451.451-.904.679-1.347.679-.418 0-.747-.192-1.049-.462l-.739.739c.463.458 1.082.753 1.735.753.544 0 1.087-.201 1.612-.597l.54.538.697-.697-.52-.521c.743-.896 1.157-2.209.119-3.247zm-9.405-7.109c-.051.445-.215.83-.49 1.114-.387.398-.797.57-1.227.599.008.932.766 1.685 1.699 1.685.938 0 1.699-.761 1.699-1.699 0-.932-.751-1.69-1.681-1.699z"/></svg>
                                </div>
                            </div>
                            <div className='col-span-2 grid'>
                                <p className='font-bold text-3xl flex items-end'>{fetchedData?.AllVouchers}</p>
                                <p className='text-base text-gray-600'>Total Vouchers</p>
                            </div>
                        </div>
                        <p className='text-base font-semibold flex justify-center'>
                            {fetchedData?.AllPreviousVouchers!==0 ? 
                                <>
                                    <span className={`${(fetchedData?.AllVouchers-fetchedData?.AllPreviousVouchers)/fetchedData?.AllPreviousVouchers*100 >= 0 ? 'text-green-400' : 'text-red-400'}`}>{((fetchedData?.AllVouchers-fetchedData?.AllPreviousVouchers)/fetchedData?.AllPreviousVouchers*100)?.toFixed(2)}%</span>
                                    {(fetchedData?.AllVouchers-fetchedData?.AllPreviousVouchers)/fetchedData?.AllPreviousVouchers*100 >= 0 ? 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center -rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#4ade80`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span> 
                                    : 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#f87171`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span>
                                    }
                                </>
                            :
                                <>
                                    <span className={`${fetchedData?.AllVouchers*100 >= 0 ? 'text-green-400' : 'text-red-400'}`}>{(fetchedData?.AllVouchers*100)?.toFixed(2)}%</span>
                                    {fetchedData?.AllVouchers*100 >= 0 ? 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center -rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#4ade80`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span> 
                                    : 
                                        <span className='h-[13px] w-[13px] flex justify-center items-center rotate-90'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path fill={`#f87171`} d="M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z"/></svg>
                                        </span>
                                    }
                                </>
                            }
                        </p>
                    </div>
                </div>
                
                <div className='grid sm:grid-cols-6 gap-6 h-auto w-full py-6'>
                    <div className='sm:col-span-4 rounded-lg border shadow-lg p-8 sm:h-auto sm:w-full h-[60vh] w-[85vw]'>
                        <BarChart chartData={monthlySales} />
                    </div>
                    <div className='sm:col-span-2 rounded-lg border shadow-lg p-8 sm:h-auto sm:w-full h-[60vh] w-[85vw]'>
                        <PieChart chartData={monthlyBreakdown}/>
                        <p className='py-4 text-lg font-semibold text-center text-gray-700'>
                            Total Income: ₱{Math.floor(monthlyBreakdown?.datasets[0]?.data?.reduce((total, dataPoint) => total + dataPoint, 0))}
                        </p>
                    </div>
                </div>

                <div className='grid sm:grid-cols-6 gap-6 py-6 h-auto w-full'>
                    <div className='sm:col-span-4 rounded-lg border shadow-lg p-8 overflow-x-auto'>
                        <h1 className='font-bold text-lg'>Top Performing Products</h1>
                        <br/>
                        <table className='w-full'>
                            <thead className='bg-gray-100'>
                                <tr className='text-gray-600'>
                                    <th scope="col" className="px-2 py-3">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sales
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Revenue
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Conversion
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {topProducts.length>0 ? 
                                    <>
                                        {topProducts.map((a)=> {
                                            return (
                                                <tr key={a._id} className='border-b'>
                                                    <td className="px-6 py-4 flex gap-2">
                                                        <div className='h-12 w-12 border overflow-hidden rounded-full flex-shrink-0'>
                                                            <img className='h-full w-full  object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a.item.displayimage}.jpg`}></img>
                                                        </div>
                                                        <p className='text-justify flex items-center'>{a.item.name}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {a.quantity}
                                                    </td>
                                                    <td className="px-6 py-4 text-green-400 font-semibold text-center">
                                                        ₱{(a.quantity*a.price).toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 text-blue-400 text-center">
                                                        {((a.quantity/totalSales)*100).toFixed(1)}%
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                :null}
                            </tbody>
                        </table>
                    </div>

                    <div className='sm:col-span-2 rounded-lg border shadow-lg p-8 h-min'>
                        <h1 className='font-bold text-lg'>Top Customers</h1>
                        <br/>
                        <div className='grid gap-6'>
                            {topCustomers.length>0 ? 
                                <>
                                    {topCustomers.map((a, index)=> {
                                        return (
                                            <div key={a?._id+index} className='grid grid-cols-4 gap-6'>
                                                <div className='col-span-1'>
                                                    {a?.displayimage ? 
                                                        <div className='h-16 w-16 border overflow-hidden rounded-full flex-shrink-0'>
                                                            <img className='h-full w-full  object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a.displayimage}.jpg`}></img>
                                                        </div>
                                                    :
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"/></svg>
                                                    }
                                                </div>
                                                <div className='col-span-3'>
                                                    <p className='font-semibold text-gray-700'>{a?.name}</p>
                                                    <p className='text-sm'><span className='font-bold text-base text-blue-500'>₱{(a?.totalamountpaid)?.toFixed(2)}</span> total spent</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            :null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
