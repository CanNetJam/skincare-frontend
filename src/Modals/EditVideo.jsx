import { Fragment, useState, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditVideo({isEdit, setIsEdit, toEdit, submitted, setSubmitted}) {
    const [ video, setVideo ] = useState(toEdit)
    const videoField = useRef()
    const [ availableItems, setAvailableItems ] = useState([])
    const [ word, setWord ] = useState("")

    useEffect(()=> {
        const getProducts = async () => {
            try {
                const products = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/product/get-all-products`)
                setAvailableItems(products.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [])

    const filteredProducts = 
    word === '' ? 
    availableItems
    : availableItems.filter((product) =>
        product.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(word?.toLowerCase().replace(/\s+/g, ''))
    )

    const handleChange = (e) => {
        const {name, value} = e.target
        setVideo((prev)=> {
            return {...prev, [name]: value}
        })
    }

    async function submitHandler(e) {
        e.preventDefault()
        const loadingNotif = async function myPromise() {
            const data = new FormData()
            let cloudinaryResponse = ""
            if (typeof video.source!=="string"){
                const signatureResponse = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/get-signature` )
                const image = new FormData()
                image.append("file", video?.source)
                image.append("api_key", import.meta.env.VITE_CLOUDAPIKEY)
                image.append("signature", signatureResponse.data.signature)
                image.append("timestamp", signatureResponse.data.timestamp)

                cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNAME}/auto/upload`, image, {
                headers: { "Content-Type": "multipart/form-data" }})
            }
            data.append("_id", toEdit._id)
            data.append("title", video.title)
            data.append("description", video.description)
            data.append("videolink", video.videolink)
            data.append("source", typeof video.source!=="string" ? cloudinaryResponse.data.public_id : video.source)
            data.append("items", JSON.stringify(video.items))
            
            const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/videos/update-video`, data, { headers: { "Content-Type": "application/json" } })
            console.log(res.data)
            setSubmitted(!submitted)
            setIsEdit(false)
        }
        toast.promise(
            loadingNotif,
            {
                pending: 'Uploading Tiktok video...',
                success: 'Tiktok video uploaded.',
                error: 'Tiktok video upload failed!'
            }
        )
    }

    function videoErr1() {
        toast.error('File size too large, please select a file that is lower than 15 mb.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    function videoErr2() {
        toast.error('Please select mp4 video formats only.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    const handleVideoUpload = (e) => {
        let file = e.target.files[0];
        let fileType = file.type; 
        let fileSize = file.size; 
        if (fileSize > 15 * 1000000) {
            videoErr1()
            videoField.current.value=""
            return
        } else {
            if (fileType==="video/mp4") {
                setVideo({...video, source: file})
            } else {
                videoErr2()
                videoField.current.value=""
                return
            }
        }
    }

    function removeItem(props) {
        const list2 = video.items.filter((a)=> a._id!==props._id)
        setVideo({...video, items: list2})
    }

    return (
        <>
            <Transition appear show={isEdit} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={()=>""}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex h-auto items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                            <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white sm:p-10 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg border-b pb-2 font-semibold leading-6 text-gray-900 grid grid-cols-2 items-center">
                                Edit Video
                                </Dialog.Title>
                                <br/>
                                <form onSubmit={submitHandler} className="container mx-auto">
                                    <div className="space-y-12">
                                        <div className="border-b border-gray-900/10 pb-12">
                                            <h2 className="text-xl font-semibold leading-7 text-gray-900">Video Information</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">This data will be displayed on the website after submission.</p>
                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                                                <div className="sm:col-span-2 sm:row-span-2 h-full w-full">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Tiktok Video</label>
                                                    <div className="relative h-60 w-full border rounded-md overflow-hidden mt-2">
                                                        <label className="z-10 absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white hover:bg-opacity-90">
                                                            <svg
                                                                className="fill-current"
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 14 14"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                                                                    fill=""
                                                                />
                                                            </svg>
                                                            <input ref={videoField} onChange={(e)=>{ handleVideoUpload(e)}} type="file" className="sr-only"/>
                                                        </label>
                                                        {video?.source!=="" ? 
                                                            <>
                                                                {typeof video?.source==="string" ? 
                                                                    <video
                                                                        src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/video/upload/f_auto,q_50/${video.source}.mp4`}
                                                                        className="h-full w-full object-contain"
                                                                    />
                                                                :
                                                                    <video className="h-full w-full object-contain" src={URL.createObjectURL(video?.source)}></video>
                                                                }
                                                            </>
                                                        : null}
                                                    </div>                                                   
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor='title' className="block text-sm font-medium leading-6 text-gray-900">Video title</label>
                                                    <div className="mt-2">
                                                        <input onChange={handleChange} value={video.title} type="text" name="title" id="title" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor='videolink' className="block text-sm font-medium leading-6 text-gray-900">Tiktok link</label>
                                                    <div className="mt-2">
                                                        <input required onChange={handleChange} value={video.videolink} type="text" name="videolink" id="videolink" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-4">
                                                    <label htmlFor='description' className="block text-sm font-medium leading-6 text-gray-900">Video Description</label>
                                                    <div className="mt-2 w-full">
                                                        <textarea required onChange={handleChange} value={video.description} rows={5} id="description" name="description" type="text" className="resize-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-6 sm:grid-cols-6 sm:grid sm:gap-4 border border-black rounded-lg p-8">
                                                    <div className="sm:col-span-3">
                                                        <label className="block font-medium leading-6 text-gray-900">Product List </label>
                                                        <div className="mt-2 relative">
                                                            <input onChange={e=>{
                                                                setWord(e.target.value)
                                                            }} value={word} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                            
                                                            {word!=="" ?
                                                                <div className="grid gap-2 absolute bg-slate-100 h-auto max-h-[150px] w-full overflow-y-scroll rounded-b-xl no-scrollbar">
                                                                    {filteredProducts.map((a, index)=> {
                                                                        return <label onClick={()=>{
                                                                            setVideo({...video, items: video.items.concat([a])})
                                                                            setWord("")
                                                                        }} className="h-auto w-auto p-2 cursor-pointer hover:bg-gray-200" key={index}>{a.name}</label>
                                                                    })}
                                                                </div>
                                                            :null}
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-3">
                                                        <label className="text-sm font-medium leading-6 text-gray-900 opacity-0	">Products List</label>
                                                        {video.items[0]!==undefined ?
                                                            <div className="mt-2 grid gap-2">
                                                                {video.items.map((a, index)=> {
                                                                    return (
                                                                        <div className="bg-blue-300 w-auto py-1.5 px-4 rounded-lg relative" key={index}>
                                                                            <label onClick={()=>removeItem(a)} className="absolute right-0 top-0 pr-4 cursor-pointer font-bold hover:text-gray-600">x</label>
                                                                            <label>{a.name}</label>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        :<span>No products yet</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-center gap-x-6">
                                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Video</button>
                                        <button onClick={()=>setIsEdit(false)} type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}