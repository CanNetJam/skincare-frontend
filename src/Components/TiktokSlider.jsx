import React, {useState, useRef } from "react";

export default function TiktokSlider({videos, videoPlayer, setVideoPlayer, setPage}) {
    const ref = useRef(null)
    const [remainingScroll, setRemainingScroll] = useState(videos?.length*280)

    const addScroll = (scrollOffset) => {
        setRemainingScroll(remainingScroll-ref.current.offsetWidth)
        ref.current.scrollLeft += scrollOffset
    }
    const subScroll = (scrollOffset) => {
        setRemainingScroll(remainingScroll+ref.current.offsetWidth)
        ref.current.scrollLeft += scrollOffset
    }

    return (
        <div className="h-full w-full bg-white overflow-hidden py-2">
            <div className="h-auto w-full bg-white relative z-10 grid items-center">
                <div ref={ref} className="sm:h-[70vh] h-[55vh] w-full flex items-center overflow-x-scroll no-scrollbar scroll-smooth px-2 gap-2">
                    {videos.map((video, index)=> {
                        return (
                            <div key={index} className="sm:h-[65vh] h-[50vh] sm:w-[260px] w-[200px] flex-shrink-0 bg-gray-400 rounded-md shadow-md shadow-slate-400 overflow-hidden">
                                <video
                                    className="h-full w-full object-cover cursor-pointer"
                                    preload="metadata"
                                    muted
                                    loop
                                    //poster={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${video.thumbnail}.jpg`}
                                    onMouseOver={event => {
                                        event.target.play()
                                    }}
                                    onMouseOut={event => event.target.pause()}
                                    onClick={()=> {
                                        setPage(index)
                                        setVideoPlayer(true)
                                    }}
                                >
                                    <source src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/video/upload/f_auto,q_65/${video.source}.mp4`} type="video/mp4" />
                                </video>
                            </div>
                        )
                    })}
                </div>
                {window.innerWidth >=639 ? 
                    <>
                        {videoPlayer===false ?
                            <>
                                {remainingScroll<videos?.length*280 ? 
                                    <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10">
                                        <button className="sm:h-[50px] sm:w-[50px] h-[40px] w-[40px] rounded-full bg-blue-500 p-0.2 flex justify-center items-center border border-black" 
                                            onClick={()=>subScroll(-ref?.current?.offsetWidth)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='h-full w-full' viewBox="0 0 24 24"><path fill='white' d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>
                                        </button>
                                    </div>
                                :null}
                                {remainingScroll>ref?.current?.offsetWidth ?
                                    <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
                                        <button className="sm:h-[50px] sm:w-[50px] h-[40px] w-[40px] rounded-full bg-blue-500 p-0.2 flex justify-center items-center border border-black" 
                                            onClick={()=>addScroll(ref?.current?.offsetWidth)}>
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
    )
}