import React, {useState, useRef} from 'react';
import ReactPlayer from 'react-player';

export default function FloatingVideo({videos, floatingVideo, setFloatingVideo}) {
    const [ showIcon, setShowIcon ] = useState(false)
    const [ vidMuted, setVidMuted ] = useState(true)
    const [stop, setStop] = useState(true)
    const vidRef = useRef(null)

    const handleVideo = () => {
        setStop(!stop)
        if (stop === true) {
            vidRef.current.pause()
            setShowIcon(true)
        } else {
            vidRef.current.play()
            setShowIcon(true)
            const show = setTimeout(() => {
                setShowIcon(false)
            }, 800)
            show
        }
    }

    return (
        <>
            {videos[0]!==undefined ?
                <>
                    {videos.map((a)=> {
                        return (
                            <div key={a} className="sm:h-[350px] sm:w-[250px] h-[200px] w-[125px] rounded-md overflow-hidden relative">
                                <div className=' drop-shadow-[0_5px_5px_rgba(0,0,0,1)] absolute z-20 top-0 sm:h-8 sm:w-8 h-6 w-6 sm:m-4 m-2 right-0 sm:text-4xl text-3xl grid justify-center items-center cursor-pointer' onClick={()=> {
                                    setFloatingVideo(false)
                                    setStop(true)
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill='white' d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                                </div>
                                <video
                                    onClick={handleVideo}
                                    className="bg-gray-400 h-full w-full object-cover"
                                    loop
                                    autoPlay={true}
                                    ref={vidRef}
                                    muted={vidMuted===true ? true: false}
                                    src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/video/upload/f_auto,q_65/${a}.mp4`}
                                    type="video/mp4"
                                />
                                {//Mute/Unmute Icon
                                    <>
                                        {vidMuted===true ?
                                            <div className="absolute sm:h-8 sm:w-8 h-6 w-6 sm:m-4 m-2 flex items-center justify-center top-0 sm:right-0 left-0">
                                                <svg  onClick={()=>setVidMuted(false)} className="drop-shadow-[0_5px_5px_rgba(0,0,0,1)] cursor-pointer z-20" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path fill='white' d="M3 9v6h-1v-6h1zm13-7l-9 5v2.288l7-3.889v13.202l-7-3.889v2.288l9 5v-20zm-11 5h-5v10h5v-10zm17.324 4.993l1.646-1.659-1.324-1.324-1.651 1.67-1.665-1.648-1.316 1.318 1.67 1.657-1.65 1.669 1.318 1.317 1.658-1.672 1.666 1.653 1.324-1.325-1.676-1.656z"/></svg>
                                            </div>
                                        :
                                            <div className="absolute sm:h-8 sm:w-8 h-6 w-6 sm:m-4 m-2 flex items-center justify-center top-0 sm:right-0 left-0">
                                                <svg  onClick={()=>setVidMuted(true)} className="drop-shadow-[0_5px_5px_rgba(0,0,0,1)] cursor-pointer z-20" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path fill='white' d="M3 9v6h-1v-6h1zm13-7l-9 5v2.288l7-3.889v13.202l-7-3.889v2.288l9 5v-20zm-11 5h-5v10h5v-10zm13.008 2.093c.742.743 1.2 1.77 1.198 2.903-.002 1.133-.462 2.158-1.205 2.9l1.219 1.223c1.057-1.053 1.712-2.511 1.715-4.121.002-1.611-.648-3.068-1.702-4.125l-1.225 1.22zm2.142-2.135c1.288 1.292 2.082 3.073 2.079 5.041s-.804 3.75-2.096 5.039l1.25 1.254c1.612-1.608 2.613-3.834 2.616-6.291.005-2.457-.986-4.681-2.595-6.293l-1.254 1.25z"/></svg>
                                            </div>
                                        }
                                    </>
                                }
                                {//Play/Pause video 
                                    <>
                                        {stop!==true ?
                                            <>
                                            {showIcon===true ?
                                            <span onClick={handleVideo} className="h-[40px] w-[40px] rounded-full grid justify-center pl-1 items-center absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl bg-blue-500 cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" height='24' width='24' viewBox="0 0 24 24"><path fill='white' d="M3 22v-20l18 10-18 10z"/></svg>
                                            </span>
                                            :null}
                                            </>
                                        :
                                            <>
                                                {showIcon===true ?
                                                <span className="animate-ping h-[40px] w-[40px] rounded-full grid justify-center items-center absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl bg-blue-500 cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height='24' width='24' viewBox="0 0 24 24"><path fill='white' d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z"/></svg>
                                                </span>
                                                :null}
                                            </>
                                        }
                                    </>
                                }
                            </div>
                        )
                    })}
                </>
            :null}
        </>
    )
}

/*
                            <div key={a} className="sm:h-[350px] sm:w-[250px] h-[200px] w-[125px] sm:rounded-md overflow-hidden relative bg-blue-300">
                                <ReactPlayer volume={1} loop={true} muted={true} playing={true} height={'100%'} width={'100%'} controls={true} url={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/video/upload/f_auto,q_60/${a}.mp4`}/>
                            </div>

                            
                            */