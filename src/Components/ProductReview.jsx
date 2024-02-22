import React, { useEffect, useState } from 'react';
import moment from "moment";
import PageButtons from './PageButtons';
import axios from 'axios';
import ReadMore from './ReadMore';

export default function ProductReview({id, secondid, mode}) {
    
    const ratings = [1,2,3,4,5]
    const [ reviews, setReviews ] = useState([])
    const [ allReviews, setAllReviews ] = useState([])
    const [ page, setPage ] = useState(0)
    const [ pages, setPages ] = useState(0)
    const [ pageEntries, setPageEntries ] = useState(5)
    const [ total, setTotal ] = useState(0)
    const [ fiveCount, setFiveCount ] = useState(0)
    const [ fourCount, setFourCount ] = useState(0)
    const [ threeCount, setThreeCount ] = useState(0)
    const [ twoCount, setTwoCount ] = useState(0)
    const [ oneCount, setOneCount ] = useState(0)
    const [ average, setAverage ] = useState(0)
    const [ roundedAverage, setRoundedAverage ] = useState(0)
    const [ pageButtons, setPageButtons] = useState([])
    const [ displayedPages, setDisplayedPages ] = useState(5)
    const [ openPageCount, setOpenPageCount ] = useState(false)
    const [ sortBy, setSortBy ] = useState("Newest first")
    const [ filterBy, setFilterBy ] = useState("")
    const [ toUpvote, setToUpvote ] = useState(false)
    const [ mostUpvote, setMostUpvote ] = useState(undefined)

    useEffect(()=> {
        const resetPage = () => {   
            setPage(0)
        }
        resetPage()
    }, [pageEntries, sortBy, filterBy])

    useEffect(()=> {
        let isCancelled = false
        const getReviews = async () => {   
            try {
                let token = localStorage.getItem("auth-token")
                const res = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/reviews/${id ? id : secondid}`, 
                { 
                    headers: { "Content-Type": "application/json", "auth-token": token }, 
                    params: {
                        sortBy: sortBy,
                        filterBy: filterBy,
                        page: page,
                        limit: pageEntries,
                    }
                })

                if (res.data) {
                    setAllReviews(res.data.allreviews)
                    setReviews(res.data.sortedReviews)
                    setPages(res.data.totalReviews)
                    setTotal(res.data.total)
                    setFiveCount(res.data.fiveCount)
                    setFourCount(res.data.fourCount)
                    setThreeCount(res.data.threeCount)
                    setTwoCount(res.data.twoCount)
                    setOneCount(res.data.oneCount)
                    setMostUpvote(res.data.mostUpvote)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getReviews()
        return ()=> {
            isCancelled = true
        }
    }, [ page, pageEntries, sortBy, filterBy, toUpvote ])

    useEffect(() => {
        const computeTotal = async () => {
            try {
                let summary = []
                allReviews?.map((a)=> {
                    summary.push(a.rating)
                })

                let total = 0
                function computeSum(){
                    if (summary.length>1) {
                        for (let i=0; i<summary.length; i++){
                            total = summary[i] + total
                        }
                        return total
                    }
                    if (summary.length===1) {
                        total = summary[0]
                        return total
                    }
                    return total
                }
                computeSum()
                
                total = total===0 ? total : total/summary.length
                setAverage(total)
            } catch (error) {
                console.error('Error computing data:', error);
            }
        }
        computeTotal()
    }, [allReviews])

    useEffect(() => {
        const computeTotal = async () => {
            try {
                let a = Math.floor(average/1)
                let b = average%1

                if (b!==0) {
                    a=a+1
                }
                setRoundedAverage(a)
            } catch (error) {
                console.error('Error computing data:', error);
            }
        }
        computeTotal()
    }, [average])

    async function submitHandler(e, props) {
        e.preventDefault()
        if (toUpvote===false) {
            try {
                const data = new FormData()
                data.append("reviewid", props)
                const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/reviews/add-upvote`, data, 
                { headers: { "Content-Type": "application/json" } })
                if (res.data) {
                    setToUpvote(!toUpvote)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className='h-auto w-full bg-gray-100'>
            <div className='container mx-auto max-w-6xl grid gap-8 py-16 px-4'>
                <section className='grid gap-2 h-auto'>
                    <div>
                        <h3 className='font-bold text-lg '>Product Rating</h3>
                    </div>
                    <div className='grid lg:grid-cols-4 grid-cols-2 gap-6'>
                        <div className='sm:h-[45vh] sm:col-span-1 col-span-2 border shadow-sm rounded-md grid gap-4 p-6 bg-white'>
                            <h3 className='font-bold text-blue-400'>Overall rating</h3>
                            <p className='text-6xl text-center text-gray-600'><b className='text-blue-500'>{average!==0 ? average%total!==0 ? average.toFixed(1) :average : average}</b>/5</p>
                            <div className='flex w-full gap-2 justify-center items-center'>
                                {ratings.map((a, index)=> {
                                    return (
                                        <label type="button" className='rounded-full bg-gray-100 hover:shadow-sm' key={index}>
                                            {roundedAverage>=a ?
                                                <svg fill='#facc15' className='h-8 w-8' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg>
                                            : 
                                                <svg fill='#9ca3af' className='h-8 w-8' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg>
                                            }
                                        </label>
                                    )
                                })}
                            </div>
                            
                            <p className='text-center'><span className='font-semibold'>{reviews.length}</span> total reviews</p>
                        </div>

                        <div className='sm:h-[45vh] sm:col-span-1 col-span-2 border shadow-sm rounded-md grid gap-4 p-6 bg-white'>
                            <h3 className='font-bold text-blue-400'>Ratings breakdown</h3>
                            <div className='grid grid-cols-7'>
                                <p className='col-span-1 text-center flex gap-1'>5 <svg fill='#facc15' className='h-auto w-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg></p>
                                <div className='relative z-0 col-span-5 border rounded-md ml-2 overflow-hidden shadow-sm  h-auto'>
                                    <div style={{width:`${Math.floor((fiveCount/allReviews?.length)*100)}%`}} className='absolute z-10 bg-green-400 h-full'></div>
                                </div>
                                <p className='col-span-1 text-center'>{fiveCount}</p>
                            </div>
                            <div className='grid grid-cols-7'>
                                <p className='col-span-1 text-center flex gap-1'>4 <svg fill='#facc15' className='h-auto w-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg></p>
                                <div className='relative z-0 col-span-5 border rounded-md ml-2 overflow-hidden shadow-sm h-auto'>
                                    <div style={{width:`${Math.floor((fourCount/allReviews?.length)*100)}%`}} className='absolute z-10 bg-green-400 h-full'></div>
                                </div>
                                <p className='col-span-1 text-center'>{fourCount}</p>
                            </div>
                            <div className='grid grid-cols-7'>
                                <p className='col-span-1 text-center flex gap-1'>3 <svg fill='#facc15' className='h-auto w-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg></p>
                                <div className='relative z-0 col-span-5 border rounded-md ml-2 overflow-hidden shadow-sm  h-auto'>
                                    <div style={{width:`${Math.floor((threeCount/allReviews?.length)*100)}%`}} className='absolute z-10 bg-green-400 h-full'></div>
                                </div>
                                <p className='col-span-1 text-center'>{threeCount}</p>
                            </div>
                            <div className='grid grid-cols-7'>
                                <p className='col-span-1 text-center flex gap-1'>2 <svg fill='#facc15' className='h-auto w-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg></p>
                                <div className='relative z-0 col-span-5 border rounded-md ml-2 overflow-hidden shadow-sm  h-auto'>
                                    <div style={{width:`${Math.floor((twoCount/allReviews?.length)*100)}%`}} className='absolute z-10 bg-green-400 h-full'></div>
                                </div>
                                <p className='col-span-1 text-center'>{twoCount}</p>
                            </div>
                            <div className='grid grid-cols-7'>
                                <p className='col-span-1 text-center flex gap-1'>1 <svg fill='#facc15' className='h-auto w-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg></p>
                                <div className='relative z-0 col-span-5 border rounded-md ml-2 overflow-hidden shadow-sm h-auto'>
                                    <div style={{width:`${Math.floor((oneCount/allReviews?.length)*100)}%`}} className='absolute z-10 bg-green-400 h-full'></div>
                                </div>
                                <p className='col-span-1 text-center'>{oneCount}</p>
                            </div>

                        </div>

                        <div className='col-span-2 border shadow-sm rounded-md grid gap-4 p-6 bg-white'>
                            <h3 className='font-bold text-blue-400'>Top rated review</h3>
                            {mostUpvote!==undefined ? 
                                <div className='w-full h-auto border shadow-sm bg-white grid sm:grid-cols-5 gap-2 p-2 rounded-md'>
                                    <div className='sm:col-span-1 w-full flex sm:flex-col justify-between h-auto'>
                                        <div className='grid gap-4 items-center'>
                                            <div className='h-10 w-10 flex justify-center'>
                                                {mostUpvote.userid?.displayimage ? 
                                                    <span className="h-10 w-10 cursor-pointer overflow-hidden rounded-full">
                                                        <img className='w-full h-full rounded-full mb-4 shrink-0 object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${mostUpvote.userid?.displayimage}.jpg`}></img>
                                                    </span>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" className='h-10 w-10' viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"/></svg>
                                                }
                                            </div>
                                            <div className='grid'>
                                                <b>{mostUpvote.userid.firstname}</b>
                                            </div>
                                        </div>
                                        <div className='h-full w-auto flex sm:items-end items-center'>
                                            <div className='flex justify-center gap-1 items-center'>{mostUpvote.upvotes} <svg xmlns="http://www.w3.org/2000/svg" className='fill-gray-400 h-4 w-4' viewBox="0 0 24 24"><path d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z"/></svg></div>
                                        </div>
                                    </div>
                                    <div className='sm:col-span-4 sm:border-l sm:border-t-0 border-l-0 border-t p-1'>
                                        <div className='sm:flex grid sm:gap-8 gap-2 items-center mb-2'>
                                            <div className='flex w-auto gap-2 items-center'>
                                                {ratings.map((b, index)=> {
                                                    return (
                                                        <label type="button" className='rounded-full bg-gray-100 hover:shadow-sm' key={index}>
                                                            {mostUpvote.rating>=b ?
                                                                <svg fill='#facc15' className='h-6 w-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg>
                                                            : 
                                                                <svg fill='#9ca3af' className='h-6 w-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg>
                                                            }
                                                        </label>
                                                    )
                                                })}
                                            </div>
                                            {mostUpvote.recommended===true ? 
                                                <div className='flex items-center gap-1 sm:text-sm text-xs bg-green-400 py-1 px-2 rounded-full text-white font-semibold h-auto'><svg className='h-5 w-5' fill='white' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"/></svg>Will recommend this product!</div>
                                            :null}
                                        </div>
                                        
                                        <div className='grid sm:flex h-auto items-end text-sm text-gray-500'>
                                            <p className='whitespace-nowrap'>{moment(mostUpvote.createdAt).format('MMM DD, YYYY')} | {moment(mostUpvote.createdAt).startOf().fromNow()}</p>
                                        </div>
                                        {mostUpvote?.description?.length>100 ? 
                                            <ReadMore text={mostUpvote.description}/>
                                        : 
                                            <p>{mostUpvote.description}</p>
                                        }
                                        
                                        <form onSubmit={(e)=> submitHandler(e, mostUpvote._id)} className='w-full flex justify-end mt-4'>
                                            <div className='flex h-full gap-1 text-gray-600 items-end'>
                                                <p className='text-xs'>Found this review helpful? Please leave a like.</p>
                                                <button className='flex justify-end cursor-pointer'>
                                                    <svg fill='#60a5fa' xmlns="http://www.w3.org/2000/svg" className='hover:fill-blue-400 h-5 w-5' viewBox="0 0 24 24"><path d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z"/></svg>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            :<span className='min-h-[20vh] bg-white rounded-md flex justify-center items-center border text-center font-bold'>No data.</span>}
                        </div>
                    </div>
                </section>

                <section className='grid gap-2 h-auto'>
                    <div className='sm:flex sm:justify-between grid gap-2'>
                        <h3 className='font-bold text-lg'>User Reviews</h3>
                        <div className='flex sm:justify-center justify-end gap-2'>
                            <div className='group'>
                                <div className="relative cursor-pointer bg-blue-300 text-sm font-bold whitespace-nowrap py-2 px-4 min-w-[150px] flex justify-center items-center">
                                    {sortBy!== "" ? 
                                        <>
                                            {sortBy}
                                            <svg onClick={()=>setSortBy("")} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill='white' d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                                        </>
                                    : 
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 24 24"><path d="M12 0l8 10h-16l8-10zm8 14h-16l8 10 8-10z"/></svg> Sort
                                        </>
                                    }
                                    <div className="absolute left-0 top-9 w-full bg-white border shadow-md text-black z-10 hidden group-hover:block">
                                        <label onClick={()=>setSortBy("Newest first")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                            Newest first
                                        </label>
                                        <label onClick={()=>setSortBy("Oldest first")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                            Oldest first
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='group'>
                                <div className="relative cursor-pointer bg-blue-300 text-sm font-bold whitespace-nowrap py-2 px-4 min-w-[50px] flex justify-center items-center">
                                    {filterBy!== "" ? 
                                        <>
                                            {filterBy} <svg fill='#facc15' className='h-4 w-4' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg>
                                            <svg onClick={()=>setFilterBy("")} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill='white' d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                                        </>
                                    : 
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 24 24"><path d="M19.479 2l-7.479 12.543v5.924l-1-.6v-5.324l-7.479-12.543h15.958zm3.521-2h-23l9 15.094v5.906l5 3v-8.906l9-15.094z"/></svg> Filter
                                        </>
                                    }
                                    <div className="absolute left-0 top-9 w-full bg-white border shadow-md text-black z-10 hidden group-hover:block">
                                        <label onClick={()=>setFilterBy("5")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                            5 <svg fill='#facc15' className='h-4 w-4' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg>
                                        </label>
                                        <label onClick={()=>setFilterBy("4")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                            4 <svg fill='#facc15' className='h-4 w-4' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg>
                                        </label>
                                        <label onClick={()=>setFilterBy("3")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                            3 <svg fill='#facc15' className='h-4 w-4' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg>
                                        </label>
                                        <label onClick={()=>setFilterBy("2")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                            2 <svg fill='#facc15' className='h-4 w-4' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg>
                                        </label>
                                        <label onClick={()=>setFilterBy("1")} className="cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100" >
                                            1 <svg fill='#facc15' className='h-4 w-4' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {reviews.length>0 ?
                        <>
                            {reviews.map((a)=> {
                                return (
                                    <div key={a._id} className='w-full h-auto border shadow-sm bg-white grid sm:grid-cols-5 gap-2 p-6 rounded-md'>
                                        <div className='sm:col-span-1 w-full flex sm:flex-col justify-between h-auto'>
                                            <div className='flex gap-4 items-center'>
                                                <div className='h-10 w-10 flex justify-center'>
                                                    {a.userid?.displayimage ? 
                                                        <span className="h-10 w-10 cursor-pointer overflow-hidden rounded-full">
                                                            <img className='w-full h-full rounded-full mb-4 shrink-0 object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${a.userid?.displayimage}.jpg`}></img>
                                                        </span>
                                                        :
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='h-10 w-10' viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"/></svg>
                                                    }
                                                </div>
                                                <div className='grid'>
                                                    <b>{a.userid.firstname}</b>
                                                </div>
                                            </div>
                                            <div className='h-full w-auto flex sm:items-end items-center'>
                                                <div className='flex justify-center gap-1 items-center'>{a.upvotes} <svg xmlns="http://www.w3.org/2000/svg" className='fill-gray-400 h-4 w-4' viewBox="0 0 24 24"><path d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z"/></svg></div>
                                            </div>
                                        </div>
                                        <div className='sm:col-span-4 sm:border-l sm:border-t-0 border-l-0 border-t sm:p-4 py-2'>
                                            <div className='sm:flex grid sm:gap-8 gap-2 items-center mb-2 relative'>
                                                <div className='flex w-auto gap-2 items-center'>
                                                    {ratings.map((b, index)=> {
                                                        return (
                                                            <label type="button" className='rounded-full bg-gray-100 hover:shadow-sm' key={index}>
                                                                {a.rating>=b ?
                                                                    <svg fill='#facc15' className='h-6 w-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg>
                                                                : 
                                                                    <svg fill='#9ca3af' className='h-6 w-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg>
                                                                }
                                                            </label>
                                                        )
                                                    })}
                                                </div>
                                                {mode==="Edit" ?
                                                    <button className='absolute top-0 right-0 border border-red-400 hover:bg-red-400 hover:text-white w-[100px] rounded-md text-red-400 font-bold'>Delete</button>
                                                :null}
                                                {a.recommended===true ? 
                                                    <div className='flex items-center gap-1 sm:text-sm text-xs bg-green-400 py-1 px-2 rounded-full text-white font-semibold h-auto'><svg className='h-5 w-5' fill='white' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"/></svg>Will recommend this product!</div>
                                                :null}
                                            </div>
                                            
                                            <div className='grid sm:flex h-auto items-end text-sm text-gray-500'>
                                                <p className='whitespace-nowrap'>{moment(a.createdAt).format('MMM DD, YYYY')} | {moment(a.createdAt).startOf().fromNow()}</p>
                                            </div>
                                            <br/>
                                            {a.description.length>100 ? 
                                                <ReadMore text={a.description}/>
                                            : 
                                                <p>{a.description}</p>
                                            }
                                            {a?.reviewimage ? 
                                                <div className="h-44 w-44 overflow-hidden">
                                                    <img className='h-full w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${a.reviewimage}.jpg`}></img>
                                                </div>
                                            :null}
                                            
                                            <form onSubmit={(e)=> submitHandler(e, a._id)} className='w-full flex justify-end mt-4'>
                                                <div className='flex h-full gap-1 text-gray-600 items-end'>
                                                    <p className='text-xs'>Found this review helpful? Please leave a like.</p>
                                                    <button className='flex justify-end cursor-pointer'>
                                                        <svg fill='#60a5fa' xmlns="http://www.w3.org/2000/svg" className='hover:fill-blue-400 h-5 w-5' viewBox="0 0 24 24"><path d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z"/></svg>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    : <span className='min-h-[20vh] bg-white rounded-md flex justify-center items-center border text-center font-bold'>No reviews yet.</span>}
                </section>

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

                    <span className="text-sm text-center font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto ">Showing{" "}
                        <button onClick={()=> {
                            if (openPageCount===false) {
                                setOpenPageCount(true)
                            } else {
                                setOpenPageCount(false)
                            }
                        }}className="font-semibold text-gray-900 bg-white dark:text-white px-3 rounded-md bg-gray-200 relative">
                            {(pageEntries*(page+1))-(pageEntries-1)}-{pageEntries*(page+1)}
                            
                            {openPageCount===true && (
                                <div id="dropdown" className="absolute top-5 left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <label onClick={()=>setPageEntries(5)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">5</label>
                                        </li>
                                        <li>
                                            <label onClick={()=>setPageEntries(10)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">10</label>
                                        </li>
                                        <li>
                                            <label onClick={()=>setPageEntries(20)} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">20</label>
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
        </div>
    )
}
