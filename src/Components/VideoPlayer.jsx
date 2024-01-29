import React, {useState, useEffect, useRef, useMemo, useContext } from 'react';
import { Progress } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { UserContext } from "../App";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function VideoPlayer({setVideoPlayer, setPage, page, devidedVideos, productData}) {
    const sentProductData = useMemo(()=>productData)
    const { userData, setUserData } = useContext(UserContext)
    const vidRef = useRef(null)
    const [ showIcon, setShowIcon ] = useState(false)
    const [ vidMuted, setVidMuted ] = useState(false)
    const [stop, setStop] = useState(true)
    const [progress, setProgress] = useState(0)
    const elmnt = document.getElementById("items")
    const ref = useRef(null)
    const [remainingScroll, setRemainingScroll] = useState(elmnt?.offsetWidth)
    const [ quantity, setQuantity ] = useState(1)

    const scroll = (scrollOffset) => {
        setRemainingScroll(ref.current.scrollLeft)
        ref.current.scrollLeft += scrollOffset
    }

    useEffect(() => {
      setRemainingScroll(elmnt?.offsetWidth)
      const getwidth = () => {
        setRemainingScroll(elmnt?.offsetWidth)
      }
      window.addEventListener("resize", getwidth)
      return () => window.removeEventListener("resize", getwidth)
    }, [productData])

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = ""
        }
    }, [])

    function toastSuccessNotification(props) {
        toast.success(`Added ${props} to your cart.`, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
    }

    function toastErrorNotification() {
        toast.error('An error happened while adding an item to your cart.', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
    }

    const handleAddToCart = async (pack) => {
        try {
            let cart = localStorage.getItem("items")
            const obj = {
                type: pack.price ? "single" : "package",
                product: {
                    _id: pack._id,
                    name: pack.name,
                    displayimage: pack.displayimage,
                    price: pack.price ? pack.price : pack.origprice,
                    stock: pack.stock,
                },
                quantity: quantity
            }
            if (userData.user) {
                let token = localStorage.getItem("auth-token")
                const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/accounts/update-add-cart/${userData?.user?._id}`, obj, 
                { headers: { "Content-Type": "application/json", "auth-token": token } })
                if (res.data===true) {
                    toastSuccessNotification(pack.name) 
                } else {
                    toastErrorNotification()
                }
            }

            if ( cart === null) {
                localStorage.setItem("items", JSON.stringify([obj]))
                setUserData({...userData, cartNumber: userData.cartNumber+quantity})
                if (!userData.user) {
                    toastSuccessNotification(obj.product.name)
                }
            }
            if (cart !== null) {
                let currentCart = JSON.parse(localStorage.getItem("items"))
                let dupe = false

                function duplicateCheck() {
                    currentCart.map((a, index )=> {
                        if (a.product._id === pack._id){
                            currentCart[index] = {
                                type: pack.price ? "single" : "package",
                                product: {
                                    _id: pack._id,
                                    name: pack.name,
                                    displayimage: pack.displayimage,
                                    price: pack.price ? pack.price : pack.origprice,
                                    stock: pack.stock,
                                },
                                quantity: a.quantity+quantity
                            }
                            setUserData({...userData, cartNumber: userData.cartNumber+quantity})
                            if (!userData.user) {
                                toastSuccessNotification(obj.product.name)
                            }
                            dupe = true
                            return dupe
                        }
                        return dupe
                    })
                }
                duplicateCheck()
                if (dupe===false) {
                    currentCart.push(obj)
                    setUserData({...userData, cartNumber: userData.cartNumber+quantity})
                    if (!userData.user) {
                        toastSuccessNotification(obj.product.name)
                    }
                }
                localStorage.setItem("items", JSON.stringify(currentCart))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleVideo = () => {
        setStop(!stop)
        if (stop === true) {
            vidRef.current.pause()
            setShowIcon(true)
        } else {
            vidRef.current.play()
            //vidRef.current.muted = true;
            setShowIcon(true)
            const show = setTimeout(() => {
                // After 3 seconds set the show value to false
                setShowIcon(false)
            }, 800)
            show
        }
    }

    return (
        <div className="fixed inset-0 z-50">
            <div className="sm:min-h-screen h-screen w-full bg-black flex justify-center relative overflow-hidden items-center backdrop-blur-sm bg-opacity-70">
                <div className='drop-shadow-[0_5px_5px_rgba(0,0,0,1)] absolute z-20 top-0 h-8 w-8 m-4 right-0 sm:text-4xl text-3xl grid justify-center items-center cursor-pointer' onClick={()=> {
                    setVideoPlayer(false)
                    setShowIcon(false)
                    setStop(true)
                }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill='white' d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                </div>
                
                {devidedVideos[page] ? 
                    <>
                        {devidedVideos[page-1] ? 
                            <div className="absolute top-1/2 left-0 -translate-y-1/2 z-20">
                                <button className="sm:h-[50px] sm:w-[50px] h-[40px] w-[40px] rounded-full bg-gray-600 p-0.2 flex justify-center items-center" disabled={page===0? true : false} 
                                    onClick={()=>{
                                        setPage(page-1)
                                        if(stop===false) {
                                            handleVideo()
                                        }
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='h-full w-full' viewBox="0 0 24 24"><path fill='white' d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>
                                </button>
                            </div>
                        :null}
                        {/* 
                        {devidedVideos[page-3] ? 
                            <div onClick={()=> {
                                setPage(page-3)
                                setShowIcon(false)
                                setStop(true)
                            }} className="sm:h-[60%] h-[50vh] w-[300px] flex flex-shrink-0 py-2 absolute top-1/2 left-0 -translate-y-1/2 -z-10 cursor-pointer">
                                {devidedVideos[page-3].map(function(video) {
                                    return ( 
                                    <div key={video+(page-3)} className="card h-full w-full overflow-hidden">
                                        <video
                                            className="h-full w-full object-cover"
                                            preload="metadata"
                                        >
                                            <source src={video.video} type="video/mp4" />
                                        </video>
                                    </div>
                                    )
                                })}
                            </div>
                        :null}
                        */}
                        {window.innerWidth >=639 ?
                            <>
                                {devidedVideos[page-2] ? 
                                    <div onClick={()=> {
                                        setPage(page-2)
                                        setShowIcon(false)
                                        setStop(true)
                                    }} className="sm:h-[80vh] h-[60vh] w-[300px] flex flex-shrink-0 py-2 absolute top-1/2 right-2/4 -translate-x-1/3 -translate-y-1/2 -z-10 cursor-pointer">
                                        {devidedVideos[page-2].map(function(video) {
                                            return ( 
                                            <div key={video+(page-2)} className="card h-full w-full rounded-md overflow-hidden">
                                                <video
                                                    className="h-full w-full object-cover"
                                                    preload="metadata"
                                                >
                                                    <source src={video.video} type="video/mp4" />
                                                </video>
                                            </div>
                                            )
                                        })}
                                    </div>
                                :null}
                                {devidedVideos[page-1] ? 
                                    <>
                                        <div onClick={()=> {
                                            setPage(page-1)
                                            setShowIcon(false)
                                            setStop(true)
                                        }} className="sm:h-[90vh] h-[70vh] w-[300px] flex flex-shrink-0 py-2 absolute top-1/2 right-1/2 -translate-y-1/2 z-0 cursor-pointer">
                                            {devidedVideos[page-1].map(function(video) {
                                                return (
                                                <div key={video+(page-1)} className="card h-full w-full rounded-md overflow-hidden">
                                                    <video
                                                        className="h-full w-full object-cover"
                                                        preload="metadata"
                                                    >
                                                        <source src={video.video} type="video/mp4" />
                                                    </video>
                                                </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                :null}
                            </>
                        :null}

                        <div className="sm:h-screen h-screen sm:w-[350px] w-screen flex flex-shrink-0 absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            {devidedVideos[page].map(function(video) {
                                return (
                                    <div key={video+page} className="card h-full w-full sm:rounded-md overflow-hidden relative bg-gray-200">
                                        <video
                                            onClick={handleVideo}
                                            className="h-full w-full object-cover"
                                            loop
                                            autoPlay={true}
                                            ref={vidRef}
                                            muted={vidMuted===true ? true: false}
                                            onTimeUpdate={(e) => {
                                                setProgress(((e.target.currentTime / e.target.duration)*100).toFixed())
                                            }}
                                            src={video.video}
                                            type="video/mp4"
                                        />

                                        <div className='absolute bottom-4'>
                                            <div className='h-50 sm:w-[350px] w-screen relative'>
                                                <div ref={ref} id='items' className={`px-6 flex overflow-x-scroll no-scrollbar scroll-smooth gap-4`}>
                                                    {sentProductData.length>0 ? 
                                                        <>
                                                            {sentProductData.map((a, index)=> {
                                                                return (
                                                                    <div key={index} className='col-span 1 h-42 sm:w-[300px] w-full flex-shrink-0 bg-gray-100 rounded-md p-2'>
                                                                        <div className='grid grid-cols-3 gap-2'>
                                                                            <div className='col-span-1 h-full w-full'>
                                                                                <img className='rounded-md h-full w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${a?.displayimage}.jpg`}/>
                                                                            </div>
                                                                            <div className='col-span-2 grid gap-1'>
                                                                                <Link target='_blank' to={a?.price ? `/details/product/${a?._id}` : `/details/package/${a?._id}`} className='font-semibold hover:underline line-clamp-2'>{a?.name}</Link>
                                                                                <p className="tinyText">₱ {a?.price ? a?.price : a?.origprice}.00</p>
                                                                                <div className='h-auto w-full flex items-end'>
                                                                                    <button onClick={()=>handleAddToCart(a)} className="relative text-center py-1 h-full w-full sm:px-3 px-1 font-bold rounded-lg before:bg-yellow-200 before:-z-10 bg-blue-400 z-0 text-white transition-colors before:absolute before:left-0 before:top-0 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:duration-300 hover:text-black before:hover:scale-x-100 overflow-hidden">Add to Cart</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                            {sentProductData.length>1 ? 
                                                                <>
                                                                    {remainingScroll===0 ? 
                                                                        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10">
                                                                            <button className="sm:h-[35px] sm:w-[35px] h-[40px] w-[40px] rounded-full bg-gray-500 p-0.5 flex justify-center items-center" 
                                                                                onClick={()=>scroll(-elmnt?.offsetWidth)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className='h-full w-full' viewBox="0 0 24 24"><path fill='white' d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>
                                                                            </button>
                                                                        </div>
                                                                    :null}
                                                                    {remainingScroll>0 ?
                                                                        <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
                                                                            <button className="sm:h-[35px] sm:w-[35px] h-[40px] w-[40px] rounded-full bg-gray-500 p-0.5 flex justify-center items-center" 
                                                                                onClick={()=>scroll(elmnt?.offsetWidth)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className='h-full w-full' viewBox="0 0 24 24"><path fill='white' d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z"/></svg>
                                                                            </button>
                                                                        </div>
                                                                    :null}
                                                                </>
                                                            :null}
                                                        </>
                                                    :null}
                                                </div>
                                            </div>
                                        </div>
                                        {//Progress bar
                                            <>
                                                <div className="h-[5px] flex w-full absolute bottom-0 z-20">
                                                    <Progress value={Number(progress)} variant="filled" size="sm" className="bg-white bg-opacity-20"/>
                                                </div>
                                            </>
                                        }
                                        {//Mute/Unmute Icon
                                            <>
                                                {vidMuted===true ?
                                                    <div className="absolute h-8 w-8 m-4 flex items-center justify-center top-0 sm:right-0 left-0">
                                                        <svg  onClick={()=>setVidMuted(false)} className="drop-shadow-[0_5px_5px_rgba(0,0,0,1)] cursor-pointer z-20" width="30" height="30" xmlns="http://www.w3.org/2000/svg"><path fill='white' d="M3 9v6h-1v-6h1zm13-7l-9 5v2.288l7-3.889v13.202l-7-3.889v2.288l9 5v-20zm-11 5h-5v10h5v-10zm17.324 4.993l1.646-1.659-1.324-1.324-1.651 1.67-1.665-1.648-1.316 1.318 1.67 1.657-1.65 1.669 1.318 1.317 1.658-1.672 1.666 1.653 1.324-1.325-1.676-1.656z"/></svg>
                                                    </div>
                                                :
                                                    <div className="absolute h-8 w-8 m-4 flex items-center justify-center top-0 sm:right-0 left-0">
                                                        <svg  onClick={()=>setVidMuted(true)} className="drop-shadow-[0_5px_5px_rgba(0,0,0,1)] cursor-pointer z-20" width="30" height="30" xmlns="http://www.w3.org/2000/svg"><path fill='white' d="M3 9v6h-1v-6h1zm13-7l-9 5v2.288l7-3.889v13.202l-7-3.889v2.288l9 5v-20zm-11 5h-5v10h5v-10zm13.008 2.093c.742.743 1.2 1.77 1.198 2.903-.002 1.133-.462 2.158-1.205 2.9l1.219 1.223c1.057-1.053 1.712-2.511 1.715-4.121.002-1.611-.648-3.068-1.702-4.125l-1.225 1.22zm2.142-2.135c1.288 1.292 2.082 3.073 2.079 5.041s-.804 3.75-2.096 5.039l1.25 1.254c1.612-1.608 2.613-3.834 2.616-6.291.005-2.457-.986-4.681-2.595-6.293l-1.254 1.25z"/></svg>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {//Play/Pause video 
                                            <>
                                                {stop!==true ?
                                                    <>
                                                    {showIcon===true ?
                                                    <span onClick={handleVideo} className="h-[50px] w-[50px] rounded-full grid justify-center pl-1 items-center absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl bg-blue-500 cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height='32' width='32' viewBox="0 0 24 24"><path fill='white' d="M3 22v-20l18 10-18 10z"/></svg>
                                                    </span>
                                                    :null}
                                                    </>
                                                :
                                                    <>
                                                        {showIcon===true ?
                                                        <span className="animate-ping h-[50px] w-[50px] rounded-full grid justify-center items-center absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl bg-blue-500 cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" height='32' width='32' viewBox="0 0 24 24"><path fill='white' d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z"/></svg>
                                                        </span>
                                                        :null}
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                )
                            })}
                        </div>

                        {window.innerWidth >=639 ?
                            <>
                                {devidedVideos[page+1] ? 
                                    <>
                                    <div onClick={()=> {
                                        setPage(page+1)
                                        setShowIcon(false)
                                        setStop(true)
                                    }} className="sm:h-[90vh] h-[70vh] w-[300px] flex flex-shrink-0 py-2 absolute top-1/2 left-1/2 -translate-y-1/2 z-0 cursor-pointer">
                                        {devidedVideos[page+1].map(function(video) {
                                            return ( 
                                            <div key={video+(page+1)} className="card h-full w-full rounded-md overflow-hidden">
                                                <video
                                                    className="h-full w-full object-cover"
                                                    preload="metadata"
                                                >
                                                    <source src={video.video} type="video/mp4" />
                                                </video>
                                            </div>
                                            )
                                        })}
                                    </div>
                                    </>
                                :null}
                                {devidedVideos[page+2] ? 
                                    <>
                                        <div onClick={()=> {
                                            setPage(page+2)
                                            setShowIcon(false)
                                            setStop(true)
                                        }} className="sm:h-[80vh] h-[60vh] w-[300px] flex flex-shrink-0 py-2 absolute top-1/2 left-2/4 translate-x-1/3 -translate-y-1/2 -z-10 cursor-pointer">
                                            {devidedVideos[page+2].map(function(video) {
                                                return ( 
                                                <div key={video+(page+2)} className="card h-full w-full rounded-md overflow-hidden">
                                                    <video
                                                        className="h-full w-full object-cover"
                                                        preload="metadata"
                                                    >
                                                        <source src={video.video} type="video/mp4" />
                                                    </video>
                                                </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                :null}
                            </>
                        :null}
                        {/*
                        {devidedVideos[page+3] ? 
                            <div onClick={()=> {
                                setPage(page+3)
                                setShowIcon(false)
                                setStop(true)
                            }} className="sm:h-[60%] h-[50vh] w-[300px] flex flex-shrink-0 py-2 absolute top-1/2 right-0 -translate-y-1/2 -z-20 cursor-pointer">
                                {devidedVideos[page+3].map(function(video) {
                                    return ( 
                                    <div key={video+(page+3)} className="card h-full w-full overflow-hidden">
                                        <video
                                            className="h-full w-full object-cover"
                                            preload="metadata"
                                        >
                                            <source src={video.video} type="video/mp4" />
                                        </video>
                                    </div>
                                    )
                                })}
                            </div>
                        :null}
                        */}
                        {devidedVideos[page+1] ?
                            <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
                                <button className="sm:h-[50px] sm:w-[50px] h-[40px] w-[40px] rounded-full bg-gray-600 p-0.2 flex justify-center items-center" disabled={page===(devidedVideos.length-1)? true : false} 
                                    onClick={()=>{
                                        setPage(page+1)
                                        if(stop===false) {
                                            handleVideo()
                                        }
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className='h-full w-full' viewBox="0 0 24 24"><path fill='white' d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z"/></svg>
                                </button>
                            </div>
                        :null}
                    </>
                :null}
            </div>
        </div>
    )
}
