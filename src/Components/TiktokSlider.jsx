import React, {useState, useRef } from "react";

export default function TiktokSlider({videos, videoPlayer, setVideoPlayer, setPage}) {
    const ref = useRef(null)
    const [remainingScroll, setRemainingScroll] = useState(window.innerWidth)

    const scroll = (scrollOffset) => {
        setRemainingScroll(ref.current.scrollLeft)
        ref.current.scrollLeft += scrollOffset
    }

    return (
        <>
        <div className="h-full w-full bg-blue-400 overflow-hidden">
            <h1 className="text-white font-bold text-5xl text-center py-2">Tiktok Videos</h1>
            <div className="h-auto py-6 w-full container mx-auto max-w-6xl bg-blue-400 relative z-10 grid items-center">
                <div ref={ref} className="sm:h-[70vh] h-[70vh] w-full flex items-center overflow-x-scroll no-scrollbar scroll-smooth px-2 gap-2">
                    {videos.map((video, index)=> {
                        return (
                            <div key={index} className="sm:h-[65vh] h-[70vh] sm:w-[260px] w-[280px] flex-shrink-0 bg-gray-400 rounded-md overflow-hidden">
                                <video
                                    className="h-full w-full object-cover cursor-pointer"
                                    preload="metadata"
                                    muted
                                    loop
                                    //poster="URL" for video thumbnail
                                    onMouseOver={event => {
                                        event.target.play()
                                    }}
                                    onMouseOut={event => event.target.pause()}
                                    onClick={()=> {
                                        setPage(index)
                                        setVideoPlayer(true)
                                    }}
                                >
                                    <source src={video.video} type="video/mp4" />
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
                                    <div className="absolute top-1/2 -left-6 -translate-y-1/2 z-10">
                                        <button className="sm:h-[50px] sm:w-[50px] h-[40px] w-[40px] rounded-full bg-gray-600 p-0.2 flex justify-center items-center" 
                                            onClick={()=>scroll(-window.innerWidth)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='h-full w-full' viewBox="0 0 24 24"><path fill='white' d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>
                                        </button>
                                    </div>
                                :null}
                                {remainingScroll!==0 ?
                                    <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-10">
                                        <button className="sm:h-[50px] sm:w-[50px] h-[40px] w-[40px] rounded-full bg-gray-600 p-0.2 flex justify-center items-center" 
                                            onClick={()=>scroll(window.innerWidth)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='h-full w-full' viewBox="0 0 24 24"><path fill='white' d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z"/></svg>
                                        </button>
                                    </div>
                                :null}
                            </>
                        :null}
                    </>
                :null}
                
                {videoPlayer===true ? 
                    null
                :null}
            </div>
        </div>
        </>
    )
}
/*
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
*/