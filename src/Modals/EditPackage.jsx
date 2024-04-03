import { Fragment, useState, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductReview from "../Components/ProductReview";

export default function EditPackage({isEdit, setIsEdit, toEdit, submitted, setSubmitted}) {
    const [ packageSet, setPackageSet ] = useState(toEdit)
    const [ morstep, setMorstep ] = useState("")
    const [ nigstep, setNigstep ] = useState("")
    const [ availableProductItems, setAvailableProductItems ] = useState([])
    const [ word, setWord ] = useState("")
    const CreatePhotoField = useRef()
    const [ percentage, setPercentage ] = useState(false)

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [submitted])

    useEffect(()=> {
        const getProducts = async () => {
            try {
                const products = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/product/get-all-products`)
                setAvailableProductItems(products.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [submitted])

    async function submitHandler(e) {
        e.preventDefault()
        const loadingNotif = async function myPromise() {
            try {
                const data = new FormData()
                
                if (packageSet.displayimage!==undefined) {
                    if (typeof packageSet.displayimage!=="string"){
                        const signatureResponse = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/get-signature` )
                        
                        const image = new FormData()
                        image.append("file", packageSet.displayimage)
                        image.append("api_key", import.meta.env.VITE_CLOUDAPIKEY)
                        image.append("signature", signatureResponse.data.signature)
                        image.append("timestamp", signatureResponse.data.timestamp)

                        const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNAME}/auto/upload`, image, {
                        headers: { "Content-Type": "multipart/form-data" },
                        // onUploadProgress: function (e) {
                        //     console.log(e.loaded / e.total)
                        // }
                        })
                        let cloud_image = cloudinaryResponse.data.public_id
                        data.append("displayimage", cloud_image)
                    }
                }

                if (packageSet.moreimage[0]!==undefined) {
                    for (let i =0; i <packageSet.moreimage.length; i++) {
                        if (typeof packageSet.moreimage[i]!=="string") {
                            const signatureResponse = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/get-signature` )
                            const image = new FormData()
                            image.append("file", packageSet.moreimage[i])
                            image.append("api_key", import.meta.env.VITE_CLOUDAPIKEY)
                            image.append("signature", signatureResponse.data.signature)
                            image.append("timestamp", signatureResponse.data.timestamp)

                            const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNAME}/auto/upload`, image, {
                            headers: { "Content-Type": "multipart/form-data" }})

                            let cloud_image = cloudinaryResponse.data.public_id
                            data.append("moreimage[]", cloud_image)
                        } else if (typeof packageSet.moreimage[i]==="string") {
                            data.append("moreimage[]", packageSet.moreimage[i])
                        }
                    }
                }

                data.append("_id", packageSet._id)
                data.append("name", packageSet.name)
                data.append("maindesc", packageSet.maindesc)
                data.append("moredesc", packageSet.moredesc)
                data.append("stock", packageSet.stock)
                data.append("origprice", percentage===false ? packageSet.origprice :packageSet.disprice*(packageSet.origprice/100))
                data.append("disprice", packageSet.disprice)
                data.append("items", JSON.stringify(packageSet.items))
                data.append("shopeelink", packageSet.packagelinks.shopee)
                data.append("tiktoklink", packageSet.packagelinks.tiktok)
                data.append("lazadalink", packageSet.packagelinks.lazada)
                data.append("routines", JSON.stringify(packageSet.routines))

                const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/package/update-package`, data, { headers: { "Content-Type": "application/json" } })
 
                
                setPackageSet({
                    _id: "",
                    name: "",
                    maindesc: "",
                    moredesc: "",
                    stock: "",
                    origprice: "",
                    disprice: "",
                    displayimage: "",
                    packagelinks: {
                        shopee: "",
                        tiktok: "",
                        lazada: "",
                    },
                    routines: {
                        morning: [],
                        night: []
                    }, 
                    moreimage: [],
                    items: []
                })
                setMorstep("")
                setNigstep("")
                setWord("")
                setPercentage(false)
                setMorstep("")
                setNigstep("")
                CreatePhotoField.current.value = ""
                setSubmitted(!submitted)
                setIsEdit(false)
            } catch (err) {
                console.log(err)
            }
        }
        toast.promise(
            loadingNotif,
            {
            pending: 'Updating package data...',
            success: 'Package data updated.',
            error: 'Package update failed!'
            }
        )
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setPackageSet((prev)=> {
            return {...prev, [name]: value}
        })
    }
    
    function removeMorstep(props) {
        let list = packageSet.routines.morning
        list.splice(props, 1)
        setPackageSet({...packageSet, routines: {
            ...packageSet.routines, morning: list
        }})
    }

    function removeNigstep(props) {
        let list = packageSet.routines.night
        list.splice(props, 1)
        setPackageSet({...packageSet, routines: {
            ...packageSet.routines, night: list
        }})
    }

    function removeItem(props) {
        const list2 = packageSet.items.filter((a)=> a._id!==props)
        setPackageSet({...packageSet, items: list2})
    }
    
    const filteredProducts = 
    word === '' ? 
    availableProductItems
    : availableProductItems.filter((product) =>
        product.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(word?.toLowerCase().replace(/\s+/g, ''))
    )

    return (
        <>
            <Transition appear show={isEdit} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={()=>setIsEdit(false)}>
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
                                Edit Package
                                </Dialog.Title>
                                <br/>
                                <form onSubmit={submitHandler} className="relative container mx-auto">
                                    <div className="space-y-12">
                                        <div className="pb-12">
                                            <h2 className="text-xl font-semibold leading-7 text-gray-900">Package Information</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">This data will be displayed on the website after submission.</p>

                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-2 h-[190px] w-full">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Display image</label>
                                                    {packageSet?.displayimage ? 
                                                        <div className="relative h-56 w-56 border overflow-hidden">
                                                            <label className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white hover:bg-opacity-90">
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
                                                                <input ref={CreatePhotoField} onChange={e => {
                                                                    setPackageSet({...packageSet, displayimage: e.target.files[0]})
                                                                }
                                                                } type="file" className="sr-only"/>
                                                            </label>
                                                            {typeof packageSet.displayimage==="string" ? 
                                                                <img className='h-full w-full object-contain' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${packageSet.displayimage}.jpg`}></img>
                                                            :
                                                                <img className="h-full w-full object-contain" src={URL.createObjectURL(packageSet.displayimage)}></img>
                                                            }
                                                        </div>  
                                                    :null}
                                                </div>
                                                <div className="sm:col-span-4">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Additional image</label>
                                                    {packageSet?.moreimage[0]!==undefined ? 
                                                        <div className="w-full grid grid-cols-3 gap-2 items-center">
                                                        {packageSet.moreimage.map((a, index)=> {
                                                            return (
                                                                <div className="col-span-1 h-56 w-56 border relative" key={index}>
                                                                    <label className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white hover:bg-opacity-90">
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
                                                                        <input onChange={e => {
                                                                            let tempList = packageSet.moreimage
                                                                            tempList[index] = e.target.files[0]
                                                                            setPackageSet({...packageSet, moreimage: tempList })
                                                                        }} type="file" className="sr-only"/>
                                                                    </label>
                                                                    {typeof a==="string" ? 
                                                                        <img className='h-full w-full object-contain' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${a}.jpg`}></img>
                                                                    :
                                                                        <img className="h-full w-full object-contain" src={URL.createObjectURL(a)}></img>
                                                                    }
                                                                </div>
                                                            )
                                                        })}

                                                        </div>
                                                    :null}
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Package Name</label>
                                                    <div className="mt-2">
                                                        <input onChange={handleChange} value={packageSet.name} type="text" name="name" id="package-name" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Original Price</label>
                                                    <div className="mt-2">
                                                        <input onChange={handleChange} value={packageSet.disprice} placeholder={0} type="text" name="disprice" id="disprice" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Discounted Price</label>
                                                    <div className="mt-2 relative">
                                                        <input onChange={handleChange} value={packageSet.origprice} placeholder={0} type="text" name="origprice" id="origprice" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                        <button onClick={()=>{
                                                            if (percentage===false){
                                                                setPercentage(true)
                                                            } else if (percentage===true){
                                                                setPercentage(false)
                                                            }
                                                        }} type='button' className="absolute top-1/2 -translate-y-1/2 right-5 bg-blue-500 hover:bg-blue-400 rounded-lg px-1 text-white">{percentage===true ? '%' : '.00'}</button>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Stock</label>
                                                    <div className="mt-2">
                                                        <input onChange={handleChange} value={packageSet.stock} placeholder={0} type="text" name="stock" id="stock" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                    
                                                <div className="sm:col-span-3">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Package Description</label>
                                                    <div className="mt-2 w-full">
                                                        <textarea onChange={handleChange} value={packageSet.maindesc} rows={5} id="maindesc" name="maindesc" type="text" required className="resize-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">More Description</label>
                                                    <div className="mt-2 w-full">
                                                        <textarea onChange={handleChange} value={packageSet.moredesc} rows={5} id="moredesc" name="moredesc" type="text" required className="resize-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                    
                                                <div className="sm:col-span-3">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Package Items</label>
                                                    <div className="mt-2 relative">
                                                        <input onChange={e=>{
                                                            setWord(e.target.value)
                                                        }} value={word} type="text" name="word" id="word" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                                                        {word!=="" ?
                                                            <div className="grid gap-2 absolute bg-slate-100 h-auto max-h-[150px] w-full overflow-y-scroll rounded-b-xl no-scrollbar">
                                                                {filteredProducts.map((a, index)=> {
                                                                    return <label onClick={()=>{
                                                                        setPackageSet({...packageSet, items: packageSet.items.concat([a])})
                                                                        setWord("")
                                                                    }} className="h-10 w-auto p-2 cursor-pointer hover:bg-gray-200" key={index}>{a.name}</label>
                                                                })}
                                                            </div>
                                                        :null}
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Items List</label>
                                                    {packageSet.items[0]!==undefined ?
                                                        <div className="grid gap-2">
                                                            {packageSet.items.map((a, index)=> {
                                                                return (
                                                                    <div className="bg-blue-300 w-auto p-2 rounded-lg relative" key={index}>
                                                                        <label onClick={()=>removeItem(a._id)} className="absolute right-0 top-0 pr-4 cursor-pointer font-bold hover:text-gray-600">x</label>
                                                                        <label>{a.name}</label>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    :<span>No items yet</span>}
                                                </div>
                                                        
                                                <div className="sm:grid sm:col-span-6 sm:grid-cols-2 sm:gap-8 border border-black rounded-lg p-8">
                                                    <div className="col-span-2 w-full grid grid-cols-6">
                                                        <div className="col-span-4 flex items-center">
                                                            <label className="block font-medium leading-6 text-gray-900 text-base">Package Routine</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1 w-full">
                                                        <label className="block font-medium leading-6 text-gray-900 text-base">Morning Routine</label>
                                                        <div className="sm:col-span-6 gap-x-6 gap-y-8 sm:grid sm:grid-cols-6 w-full p-2">
                                                            <div className="sm:col-span-4">
                                                                <label className="block text-sm font-medium leading-6 text-gray-900">Product to Use</label>
                                                                <div className="mt-2 w-full">
                                                                    <input onChange={e => setMorstep(e.target.value)} value={morstep} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-2">
                                                                <label className="block text-sm font-medium leading-6 text-white">Placeholder</label>
                                                                <div className="mt-2 w-full">
                                                                    <button onClick={()=> {
                                                                        setPackageSet({...packageSet, routines: {
                                                                            ...packageSet.routines, morning: packageSet.routines.morning.concat([morstep])
                                                                        } })
                                                                        setMorstep("")
                                                                    }} type="button" disabled={morstep!=="" ? false : true} className={`rounded-md bg-indigo-600 p-[6px] text-sm font-semibold text-white shadow-sm ${morstep!=="" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                                                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"/></svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-6 border-t-2">
                                                                <label className="block text-base font-medium py-4 leading-6 text-gray-900">Morning Routine List</label>
                                                                <div>
                                                                    {packageSet.routines?.morning[0]!==undefined ? 
                                                                        <div className="grid grid-cols-6 gap-2">
                                                                            <div className="grid gap-2 col-span-6">
                                                                                {packageSet.routines.morning.map((a, index)=> {
                                                                                    return (
                                                                                        <div className="max-w-[col-span-4] p-2 rounded-lg bg-blue-400 relative" key={index}>
                                                                                            <label onClick={()=>removeMorstep(index)} className="absolute right-0 top-0 pr-4 cursor-pointer font-bold hover:text-gray-600">x</label>
                                                                                            <label>Step{index+1}: {a}</label>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    :
                                                                        <div className="my-2">
                                                                            <label className="font-bold">No routine selected yet.</label>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1 w-full">
                                                        <label className="block font-medium leading-6 text-gray-900 text-base">Night Routine</label>
                                                        <div className="sm:col-span-6 gap-x-6 gap-y-8 sm:grid sm:grid-cols-6 w-full p-2">
                                                            <div className="sm:col-span-4">
                                                                <label className="block text-sm font-medium leading-6 text-gray-900">Product to Use</label>
                                                                <div className="mt-2 w-full">
                                                                    <input onChange={e => setNigstep(e.target.value)} value={nigstep} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-2">
                                                                <label className="block text-sm font-medium leading-6 text-white">Placeholder</label>
                                                                <div className="mt-2 w-full">
                                                                    <button onClick={()=> {
                                                                        setPackageSet({...packageSet, routines: {
                                                                            ...packageSet.routines, night: packageSet.routines.night.concat([nigstep])
                                                                        }})
                                                                        setNigstep("")
                                                                    }} type="button" disabled={nigstep!=="" ? false : true} className={`rounded-md bg-indigo-600 p-[6px] text-sm font-semibold text-white shadow-sm ${nigstep!=="" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                                                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"/></svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-6 border-t-2 ">
                                                                <label className="block text-base font-medium py-4 leading-6 text-gray-900">Night Routine List</label>
                                                                <div>
                                                                    {packageSet.routines?.night[0]!==undefined ? 
                                                                        <div className="grid grid-cols-6 gap-2">
                                                                            <div className="grid gap-2 col-span-6">
                                                                                {packageSet.routines?.night.map((a, index)=> {
                                                                                    return (
                                                                                        <div className="max-w-[col-span-4] p-2 rounded-lg bg-blue-400 relative" key={index}>
                                                                                            <label onClick={()=>removeNigstep(index)} className="absolute right-0 top-0 pr-4 cursor-pointer font-bold hover:text-gray-600">x</label>
                                                                                            <label>Step{index+1}: {a}</label>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    :
                                                                    <div className="my-2">
                                                                        <label className="font-bold">No product(s) added yet.</label>
                                                                    </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                                
                                            </div>
                                        </div>
                                    </div>
                                                                
                                    <div className="h-min whitespace-nowrap bg-white px-6 py-2 rounded-lg mt-6 flex items-center justify-center gap-x-6">
                                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Package</button>
                                        <button onClick={()=>setIsEdit(false)} type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                    </div>
                                </form>

                                <br/>
                                {packageSet?._id ?
                                    <> 
                                        <h3>Edit reviews for {packageSet.name}</h3>
                                        <ProductReview id={packageSet?._id} secondid={packageSet?._id} mode={"Edit"}/>
                                    </>
                                :null}
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}