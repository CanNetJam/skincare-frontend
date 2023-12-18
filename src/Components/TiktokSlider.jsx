import React, {useState, useEffect, useRef, lazy} from "react"
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';
import video4 from '../assets/video4.mp4';
import video5 from '../assets/video5.mp4';
import video6 from '../assets/video6.mp4';
import video7 from '../assets/video7.mp4';
import video8 from '../assets/video8.mp4';
import video9 from '../assets/video9.mp4';

import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { GoMute, GoUnmute } from "react-icons/go"
import { FaPlay, FaPause } from "react-icons/fa6"
import { Progress } from "@material-tailwind/react"

export default function TiktokSlider() {
    const ref = useRef(null);
    const vidRef = useRef(null);
    const videos = [video1, video2, video3, video4, video5, video6, video7, video8, video9]
    const [devidedVideos, setDevidedVideos] = useState([])
    const [ page, setPage ] = useState(0)
    const [ videoPlayer, setVideoPlayer ] = useState(false)
    const [ showIcon, setShowIcon ] = useState(false)
    const [ vidMuted, setVidMuted ] = useState(false)
    const [stop, setStop] = useState(true)
    const [progress, setProgress] = useState(0)
    const [remainingScroll, setRemainingScroll] = useState(window.innerWidth)
  
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

    const scroll = (scrollOffset) => {
        setRemainingScroll(ref.current.scrollLeft)
        ref.current.scrollLeft += scrollOffset
    }
    
    useEffect(()=> {
        const setSliderArray = async ()=> {
            try {
                let index = 0
                let length = videos.length
                let size = 1
                setDevidedVideos([])
                let slice = (source, index) => source.slice(index, index + size)
                while (index < length) {
                    let temp = [slice(videos, index)]
                    setDevidedVideos(prev=>prev.concat(temp))
                    index += size
                }
            } catch (err) {
                console.log(err)
            }
        }
        setSliderArray()
    }, [])

    return (
        <>
        <div className="h-full w-full bg-blue-400 ">
            <h1 className="text-white font-bold text-5xl text-center py-2">Tiktok Videos</h1>
            <div className="sm:min-h-screen sm:h-[80vh] h-[50vh] w-full bg-blue-400 relative z-10 grid items-center">
                <div ref={ref} className="sm:h-[70vh] h-[40vh] w-full flex overflow-x-scroll no-scrollbar scroll-smooth px-2 gap-2">
                    {videos.map((video, index)=> {
                        return (
                            <div key={index} className="sm:h-[65vh] h-[40vh] sm:w-[280px] w-[225px] flex-shrink-0 bg-gray-400">
                                <video
                                    className="h-full w-full object-cover cursor-pointer"
                                    preload="metadata"
                                    muted
                                    loop
                                    //poster="URL" for video thumbnail
                                    onMouseOver={event => event.target.play()}
                                    onMouseOut={event => event.target.pause()}
                                    onClick={()=> {
                                        setPage(index)
                                        setVideoPlayer(true)
                                    }}
                                >
                                    <source src={video} type="video/mp4" />
                                </video>
                            </div>
                        )
                    })}
                </div>
                {window.innerWidth >=639 ? 
                    <>

                {videoPlayer===false ?
                    <>
                        {remainingScroll===0 ? 
                            <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10">
                                <button className="sm:h-[50px] sm:w-[50px] h-[40px] w-[40px] rounded-full bg-gray-200 flex justify-center items-center" 
                                    onClick={()=>scroll(-window.innerWidth)}>
                                    <FaChevronLeft className='sm:h-[30px] sm:w-[30px] h-[25px] w-[25px] text-black'/>
                                </button>
                            </div>
                        :null}
                        {remainingScroll!==0 ?
                            <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
                                <button className="sm:h-[50px] sm:w-[50px] h-[40px] w-[40px] rounded-full bg-gray-200 flex justify-center items-center" 
                                    onClick={()=>scroll(window.innerWidth)}>
                                    <FaChevronRight className='sm:h-[30px] sm:w-[30px] h-[25px] w-[25px] text-black'/>
                                </button>
                            </div>
                        :null}
                    </>
                :null}
                                    </>
                :null}
                
                {videoPlayer===true ? 
                    <div className="absolute inset-0 top-0">
                        <div className="sm:min-h-screen h-[50vh] w-full bg-black flex justify-center relative overflow-hidden z-0 items-center backdrop-blur-sm bg-opacity-70">
                            <div className='absolute top-0 h-10 w-10 right-0 sm:text-4xl text-3xl text-gray-500 cursor-pointer sm:m-4 mt-2' onClick={()=> {
                                setVideoPlayer(false)
                                setShowIcon(false)
                                setStop(true)
                            }}>
                                <IoClose/>
                            </div>
                            
                            {devidedVideos[page] ? 
                                <>
                                    {devidedVideos[page-2] ? 
                                        <div onClick={()=> {
                                            setPage(page-2)
                                            setShowIcon(false)
                                            setStop(true)
                                        }} className="sm:h-[70%] h-[40vh] w-[300px] flex flex-shrink-0 py-2 absolute top-1/2 right-2/3 -translate-y-1/2 -z-10 cursor-pointer">
                                            {devidedVideos[page-2].map(function(video) {
                                                return ( 
                                                <div key={video+(page-2)} className="card h-full w-full rounded-xl overflow-hidden">
                                                    <video
                                                        className="h-full w-full object-cover"
                                                        preload="metadata"
                                                    >
                                                        <source src={video} type="video/mp4" />
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
                                            }} className="sm:h-[80%] h-[40vh] w-[300px] flex flex-shrink-0 py-2 absolute top-1/2 right-1/2 -translate-y-1/2 z-0 cursor-pointer">
                                                {devidedVideos[page-1].map(function(video) {
                                                    return (
                                                    <div key={video+(page-1)} className="card h-full w-full rounded-xl overflow-hidden">
                                                        <video
                                                            className="h-full w-full object-cover"
                                                            preload="metadata"
                                                        >
                                                            <source src={video} type="video/mp4" />
                                                        </video>
                                                    </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10">
                                                <button className="sm:h-[50px] sm:w-[50px] h-[40px] w-[40px] rounded-full bg-gray-300 flex justify-center items-center" disabled={page===0? true : false} onClick={()=>setPage(page-1)}>
                                                    <FaChevronLeft className='sm:h-[30px] sm:w-[30px] h-[25px] w-[25px] text-black'/>
                                                </button>
                                            </div>
                                        </>
                                    :null}
                            
                                    <div className="sm:h-[90%] h-[45vh] sm:w-[350px] w-[300px] flex flex-shrink-0 py-2 absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                    {devidedVideos[page].map(function(video) {
                                        return (
                                        <div key={video+page} className="card h-full w-full rounded-md overflow-hidden relative bg-gray-200">
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
                                                src={video}
                                                type="video/mp4"
                                            />

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
                                                        <div className="absolute top-0 right-0 p-3">
                                                            <div><GoMute onClick={()=>setVidMuted(false)} className="text-white text-3xl drop-shadow-[0_5px_5px_rgba(0,0,0,1)] cursor-pointer z-20"/></div>
                                                        </div>
                                                    :
                                                        <div className="absolute top-0 right-0 p-3">
                                                            <div><GoUnmute onClick={()=>setVidMuted(true)} className="text-white text-3xl drop-shadow-[0_5px_5px_rgba(0,0,0,1)] cursor-pointer z-20"/></div>
                                                        </div>
                                                    }
                                                </>
                                            }

                                            {//Play/Pause video 
                                                <>
                                                    {stop!==true ?
                                                        <>
                                                        {showIcon===true ?
                                                        <span className="h-[50px] w-[50px] rounded-full pl-1 flex justify-center items-center absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl bg-blue-500 cursor-pointer">
                                                            <FaPlay/>
                                                        </span>
                                                        :null}
                                                        </>
                                                    :
                                                        <>
                                                            {showIcon===true ?
                                                            <span className="animate-ping h-[50px] w-[50px] rounded-full flex justify-center items-center absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl bg-blue-500 cursor-pointer">
                                                                <FaPause/>
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

                                    {devidedVideos[page+1] ? 
                                        <>
                                        <div onClick={()=> {
                                            setPage(page+1)
                                            setShowIcon(false)
                                            setStop(true)
                                        }} className="sm:h-[80%] h-[40vh] w-[300px] flex flex-shrink-0 py-2 absolute top-1/2 left-1/2 -translate-y-1/2 z-0 cursor-pointer">
                                            {devidedVideos[page+1].map(function(video) {
                                                return ( 
                                                <div key={video+(page+1)} className="card h-full w-full rounded-xl overflow-hidden">
                                                    <video
                                                        className="h-full w-full object-cover"
                                                        preload="metadata"
                                                    >
                                                        <source src={video} type="video/mp4" />
                                                    </video>
                                                </div>
                                                )
                                            })}
                                        </div>
                                        <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
                                            <button className="sm:h-[50px] sm:w-[50px] h-[40px] w-[40px] rounded-full bg-gray-300 flex justify-center items-center" disabled={page===(devidedVideos.length-1)? true : false} onClick={()=>setPage(page+1)}>
                                                <FaChevronRight className='sm:h-[30px] sm:w-[30px] h-[25px] w-[25px] text-black'/>
                                            </button>
                                        </div>
                                        </>
                                    :null}

                                    {devidedVideos[page+2] ? 
                                        <>
                                            <div onClick={()=> {
                                                setPage(page+2)
                                                setShowIcon(false)
                                                setStop(true)
                                            }} className="sm:h-[70%] h-[40vh] w-[300px] flex flex-shrink-0 py-2 absolute top-1/2 left-2/3 -translate-y-1/2 -z-10 cursor-pointer">
                                                {devidedVideos[page+2].map(function(video) {
                                                    return ( 
                                                    <div key={video+(page+2)} className="card h-full w-full rounded-xl overflow-hidden">
                                                        <video
                                                            className="h-full w-full object-cover"
                                                            preload="metadata"
                                                        >
                                                            <source src={video} type="video/mp4" />
                                                        </video>
                                                    </div>
                                                    )
                                                })}
                                            </div>
                                        </>
                                    :null}
                                </>
                            :null}
                        </div>
                    </div>
                :null}
            </div>
        </div>
        </>
    )
}