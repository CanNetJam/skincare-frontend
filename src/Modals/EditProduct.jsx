import { Fragment, useState, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateIngredient from './UpdateIngredient';
import ProductReview from "../Components/ProductReview";

export default function EditProduct({isEdit, setIsEdit, toEdit, submitted, setSubmitted}) {
    const [ product, setProduct ] = useState(toEdit)
    const [ tempRoutine, setTempRoutine ] = useState("")

    const [ dos, setDos ] = useState({
        title: "",
        desc: ""
    })
    const [ donts, setDonts ] = useState({
        title: "",
        desc: ""
    })
    const [ morrout, setMorrout ] = useState({
        skintype: "",
        steps: []
    })
    const [ morstep, setMorstep ] = useState("")
    const [ nigrout, setNigrout ] = useState({
        skintype: "",
        steps: []
    })
    const [ routine, setRoutine ] = useState({
        skintype: "",
        morning: [],
        night: []
    })
    const [ nigstep, setNigstep ] = useState("")
    const [ file, setFile ] = useState([])
    const CreatePhotoField = useRef()
    const [ isOpen, setIsOpen ] = useState(false)
    const [ updateIng, setUpdateIng ] = useState({
        index: "",
        data: {
            name: "",
            desc: "",
            photo: ""
        }
    })
    const [ updateIngList, setUpdateIngList ] = useState([])
    const [ percentage, setPercentage ] = useState(false)

    const [ videofile, setVideoFile ] = useState([])
    const videoField = useRef()

    const [ availableItems, setAvailableItems ] = useState([])
    const [ word, setWord ] = useState("")

    function toastError1Notif() {
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

    function toastError2Notif() {
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
            toastError1Notif()
            videoField.current.value=""
            return
        } else {
            if (fileType==="video/mp4") {
                setVideoFile([file])
                setProduct({...product, videos: [file]})
            } else {
                toastError2Notif()
                videoField.current.value=""
                return
            }
        }
    }

    useEffect(()=> {
        const getProducts = async () => {
            try {
                const products = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/product/get-all-products`)
                const availableProducts = products.data.filter((a)=> a._id!==toEdit._id)
                setAvailableItems(availableProducts)
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

    function removeItem(props) {
        const list2 = product.relatedproducts.filter((a)=> a!==props)
        setProduct({...product, relatedproducts: list2})
    }

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [submitted])

    async function submitHandler(e) {
        e.preventDefault()
        const loadingNotif = async function myPromise() {
            try {
            const data = new FormData()
            if (file){
                data.append("displayimage", file)
            }
            if (product.moreimage.length>0) {
                let collection = []
                for (let i=0; i<product.moreimage.length; i++) {
                    if (typeof product.moreimage[i]!=="string") {
                        data.append("moreimage", product.moreimage[i])
                        collection.push("file")
                    } else if (typeof product.moreimage[i]==="string") {
                        collection.push(product.moreimage[i])
                        data.append("moreimage", product.moreimage[i])
                    }
                }
                data.append("collection", JSON.stringify(collection))
            }
            if (product.ingredients.length>0) {
                let ingphotos = []
                for (let i=0; i<product.ingredients.length; i++) {
                    if (typeof product.ingredients[i].photo!=="string") {
                        data.append("ingphoto", product.ingredients[i].photo)
                        ingphotos.push({...product.ingredients[i], photo: "file"})
                    } else if (typeof product.ingredients[i].photo==="string") {
                        data.append("ingphoto", product.ingredients[i].photo)
                        ingphotos.push(product.ingredients[i])
                    }
                }
                data.append("ingphotos", JSON.stringify(ingphotos))
            }
            if (videofile.length>0) {
                for (let i=0; i<videofile.length; i++) {
                    data.append("prodvid", videofile[i])
                }
            }
            data.append("_id", product._id)
            data.append("name", product.name)
            data.append("maindesc", product.maindesc)
            data.append("stock", product.stock)
            data.append("price", percentage===false ? product.price : product.disprice*(product.price/100))
            data.append("disprice", product.disprice)
            data.append("usage", product.usage)
            data.append("extra", product.extra)
            data.append("category", product.category)
            data.append("shopeelink", product.productlinks.shopee)
            data.append("tiktoklink", product.productlinks.tiktok)
            data.append("lazadalink", product.productlinks.lazada)
            data.append("ingredients", JSON.stringify(product.ingredients))
            data.append("routines", JSON.stringify(product.routines))
            data.append("do", JSON.stringify(product.do))
            data.append("dont", JSON.stringify(product.dont))
            data.append("relatedproducts", JSON.stringify(product.relatedproducts))

            const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/product/update-product`, data, { headers: { "Content-Type": "multipart/form-data" } })
            console.log(res.data)
            
            setProduct({
                name: "",
                maindesc: "",
                stock: "",
                price: "",
                disprice: "",
                category: "",
                productlinks: {
                    shopee: "",
                    tiktok: "",
                    lazada: "",
                },
                ingredients: [],
                do: [],
                dont: [],
                morroutine: [],
                nigroutine: [],
                routines: [], 
                usage: "",
                extra: "",
                moreimage: []
            })
            setDos("")
            setDonts("")
            setMorrout({
                skintype: "",
                steps: []
            })
            setMorstep("")
            setNigrout({
                skintype: "",
                steps: []
            })
            setRoutine({
                skintype: "",
                morning: [],
                night: []
            })
            setNigstep("")
            setFile([])
            if (CreatePhotoField.current.value!==null) {
                CreatePhotoField.current.value = null
            }
            setSubmitted(!submitted)
            setIsEdit(false)
            setPercentage(false)
            } catch (err) {
                console.log(err)
            }
        }
        toast.promise(
            loadingNotif,
            {
            pending: 'Updating product data...',
            success: 'Product data updated.',
            error: 'Product update failed!'
            }
        )
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setProduct((prev)=> {
            return {...prev, [name]: value}
        })
    }

    function removeDo(props) {
        let list = product.do
        list.splice(props, 1)
        setProduct({...product, do: list})
    }
    
    function removeDont(props) {
        let list = product.dont
        list.splice(props, 1)
        setProduct({...product, dont: list})
    }

    function removeMorstep(props) {
        let list = morrout.steps
        list.splice(props, 1)
        setMorrout({...product, steps: list})
    }

    function removeNigstep(props) {
        let list = nigrout.steps
        list.splice(props, 1)
        setNigrout({...product, steps: list})
    }

    function removeRoutine(props) {
        let list = product.routines
        list.splice(props, 1)
        setProduct({...product, routines: list})
    }

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
                                Edit Product
                                </Dialog.Title>
                                {isOpen==true ?
                                    <UpdateIngredient isOpen={isOpen} setIsOpen={setIsOpen} updateIng={updateIng} setUpdateIng={setUpdateIng} setUpdateIngList={setUpdateIngList} product={product} setProduct={setProduct}/>
                                : null}
                                <form onSubmit={submitHandler} className="container mx-auto">
                                    <div className="space-y-12">
                                        <div className="pb-12">
                                            <h2 className="text-xl font-semibold leading-7 text-gray-900">Product Information</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">This data will be displayed on the website after submission.</p>

                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-1 h-[190px] w-full">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Display image</label>
                                                    {product?.displayimage ? 
                                                        <div className="relative h-56 w-full border overflow-hidden">
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
                                                                    setFile(e.target.files[0])
                                                                    setProduct({...product, displayimage: e.target.files[0]})
                                                                }
                                                                } type="file" className="sr-only"/>
                                                            </label>
                                                            {typeof product.displayimage==="string" ? 
                                                                <img className='h-full w-full object-contain' src={`https://klued-uploads.s3.ap-southeast-1.amazonaws.com/${product.displayimage}`}></img>
                                                            :
                                                                <img className="h-full w-full object-contain" src={URL.createObjectURL(product.displayimage)}></img>
                                                            }
                                                        </div>  
                                                    :null}
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Additional image</label>
                                                    {product?.moreimage[0]!==undefined ? 
                                                        <div className="w-full grid grid-cols-3 gap-2 items-center">
                                                            {product.moreimage.map((a, index)=> {
                                                                return (
                                                                    <div className="col-span-1 h-56 w-full border relative" key={index}>
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
                                                                                let tempList = product.moreimage
                                                                                tempList[index] = e.target.files[0]
                                                                                setProduct({...product, moreimage: tempList })
                                                                            }} type="file" className="sr-only"/>
                                                                        </label>
                                                                        {typeof a==="string" ? 
                                                                            <img className='h-full w-full object-contain' src={`https://klued-uploads.s3.ap-southeast-1.amazonaws.com/${a}`}></img>
                                                                        :
                                                                            <img className="h-full w-full object-contain" src={URL.createObjectURL(a)}></img>
                                                                        }
                                                                    </div>
                                                                )
                                                            })}

                                                            <div className="h-56 w-full flex items-center justify-center">
                                                                <label htmlFor="dropzone-file3" className="relative overflow-hidden flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                        <svg className="w-8 h-8 mb-4 text-blue-400 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                            <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                                        </svg>
                                                                        <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                                        <p className="text-xs text-center text-gray-500 dark:text-gray-400">SVG, PNG or JPG (MAX. 3Mb)</p>
                                                                    </div>
                                                                    <input onChange={(e)=>setProduct({...product, moreimage: [...product.moreimage, e.target.files[0]]})} id="dropzone-file3" name="dropzone-file3" type="file" className="opacity-0" />
                                                                </label>
                                                            </div> 
                                                        </div>
                                                    :
                                                        <div className="h-56 w-48 flex items-center justify-center">
                                                            <label htmlFor="dropzone-file3" className="relative overflow-hidden flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                    <svg className="w-8 h-8 mb-4 text-blue-400 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                        <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                                    </svg>
                                                                    <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">SVG, PNG or JPG (MAX. 3Mb)</p>
                                                                </div>
                                                                <input onChange={(e)=>setProduct({...product, moreimage: [...product.moreimage, e.target.files[0]]})} id="dropzone-file3" name="dropzone-file3" type="file" className="opacity-0" />
                                                            </label>
                                                        </div> 
                                                    }
                                                </div>
                                                <div className="sm:col-span-2 h-[190px] w-full">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Tiktok Video</label>
                                                    {product?.videos.length>0 ? 
                                                        <div className="relative h-56 w-full border overflow-hidden">
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
                                                                    <input ref={videoField} onChange={(e)=>{ handleVideoUpload(e)}
                                                                } type="file" className="sr-only"/>
                                                            </label>
                                                            {typeof product.videos[0]==="string" ? 
                                                                <video className='h-full w-full object-contain' src={`https://klued-uploads.s3.ap-southeast-1.amazonaws.com/${product.videos[0]}`}></video>
                                                            :
                                                                <video className="h-full w-full object-contain" src={URL.createObjectURL(product?.videos[0])}></video>
                                                            }
                                                        </div>  
                                                    :
                                                    <div className="relative h-56 w-full border overflow-hidden">
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
                                                                <input ref={videoField} onChange={(e)=>{ handleVideoUpload(e)}
                                                            } type="file" className="sr-only"/>
                                                        </label>
                                                    </div>
                                                    }
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
                                                    <div className="mt-2">
                                                        <input onChange={handleChange} value={product.name} type="text" name="name" id="product-name" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                                                    <div className="mt-2">
                                                        <input required onChange={handleChange} value={product.disprice} placeholder={0} type="text" name="disprice" id="disprice" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Discounted Price</label>
                                                    <div className="mt-2 relative ">
                                                        <input onChange={handleChange} value={product.price} placeholder={0} type="text" name="price" id="price" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
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
                                                        <input onChange={(e)=>setProduct({...product, stock: e.target.value})} value={product.stock} placeholder={'0'} type="text" name="stock" id="stock" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                                                    <select required onChange={handleChange} name="category" value={product.category} className="block w-full mt-2 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                        <option value="" disabled>Select category</option>
                                                        <option>Cleanser</option>
                                                        <option>Toner</option>
                                                        <option>Serum</option>
                                                        <option>Moisturizer</option>
                                                        <option>Sunscreen</option>
                                                    </select>
                                                </div>
                                                <div className="sm:col-span-6">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Product Description</label>
                                                    <div className="mt-2 w-full">
                                                        <textarea onChange={handleChange} value={product.maindesc} rows={5} id="maindesc" name="maindesc" type="text" required className="resize-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">How to Use</label>
                                                    <div className="mt-2">
                                                        <textarea onChange={handleChange} rows={3} value={product.usage} type="text" name="usage" id="product-usage" required className="resize-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Specific Precautions</label>
                                                    <div className="mt-2">
                                                        <textarea onChange={handleChange} rows={3} value={product.extra} type="text" name="extra" id="product-extra" className="resize-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>

                                                <div className="border border-black rounded-lg col-span-6 sm:grid sm:grid-cols-6 sm:gap-4 p-8">
                                                    <h1>Product Ingredients:</h1>
                                                    {product.ingredients[0]!==undefined ? 
                                                        <div className="col-span-6 grid grid-cols-4 gap-2">
                                                            {product.ingredients.map((a, index)=> {
                                                                return (
                                                                    <div key={index} className="h-auto col-span-1 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                                                        <div className="relative">
                                                                            <div onClick={()=> {
                                                                                setIsOpen(true)
                                                                                setUpdateIng({
                                                                                    index: index,
                                                                                    data: a
                                                                                })
                                                                            }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer p-2 bg-blue-400 hover:bg-blue-500 rounded-lg">
                                                                                <svg height="40" width="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m19 20.25c0-.402-.356-.75-.75-.75-2.561 0-11.939 0-14.5 0-.394 0-.75.348-.75.75s.356.75.75.75h14.5c.394 0 .75-.348.75-.75zm-7.403-3.398 9.124-9.125c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-9.143 9.103c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 7.651-7.616 2.335 2.327-7.637 7.638z"/></svg>
                                                                            </div>
                                                                            {typeof a.photo==="string" ? 
                                                                                <img
                                                                                src={`https://klued-uploads.s3.ap-southeast-1.amazonaws.com/${a.photo}`}
                                                                                    className="h-[150px] w-full object-cover object-center"
                                                                                />
                                                                            :
                                                                                <img className="h-[150px] w-full object-cover object-center" src={URL.createObjectURL(a.photo)}></img>
                                                                            }
                                                                        </div>
                                                                        <div className="mt-4 grid px-4">
                                                                                <h3 className="text-sm text-gray-700">
                                                                                    <div>
                                                                                        {a.name}
                                                                                    </div>
                                                                                </h3>
                                                                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{a.desc}</p>
                                                                        </div>

                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    : <span>No ingredients listed</span>}
                                                </div>

                                                <div className="sm:col-span-6 sm:grid-cols-2 sm:grid sm:gap-4 border border-black rounded-lg p-8">
                                                    <div className="sm:col-span-1">
                                                        <div className="sm:grid sm:grid-cols-6 sm:gap-2 items-center">
                                                            <div className="sm:col-span-5 h-full items-center grid">
                                                                <label className="block text-sm font-medium leading-6 text-gray-900">Do's </label>
                                                                <br/>
                                                                <label className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                                                                <div className="mt-2 w-full">
                                                                    <input onChange={e => setDos({...dos, title: e.target.value})} value={dos.title} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                                </div>
                                                                <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                                                <div className="mt-2 w-full">
                                                                    <textarea rows={3} onChange={e => setDos({...dos, desc: e.target.value})} value={dos.desc} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-1 h-full items-end grid">
                                                                <label className="text-white">Filler</label>
                                                                <div className="mt-2 w-full">
                                                                    <button onClick={()=> {
                                                                        setProduct({...product, do: product.do.concat([dos])})
                                                                        setDos({
                                                                            title: "",
                                                                            desc: ""
                                                                        })
                                                                    }} type="button" disabled={dos.title!=="" && dos.desc!=="" ? false : true} className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${dos.title!=="" && dos.desc!==""? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Add</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <br/>
                                                        <div className="sm:col-span-6">
                                                            <label className="block text-sm font-medium leading-6 text-gray-900">Do's List</label>
                                                            <div>
                                                                {product?.do[0]!==undefined ? 
                                                                    <div className="grid gap-2 pr-4 my-2">
                                                                        {product.do.map((a, index)=> {
                                                                            return (
                                                                                <div className="h-auto w-auto inline-block p-2 rounded-lg bg-blue-400 relative" key={index}>
                                                                                    <label onClick={()=>removeDo(index)} className="absolute right-0 top-0 pr-4 cursor-pointer font-bold hover:text-gray-600">x</label>
                                                                                    <label className="font-semibold">{a?.title}</label>
                                                                                    <br/>
                                                                                    <label>{a?.desc}</label>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                :
                                                                <div className="my-2">
                                                                    <label className="font-bold">No product specific do's added yet.</label>
                                                                </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-1">
                                                        <div className="sm:grid sm:grid-cols-6 sm:gap-2 items-center">
                                                            <div className="sm:col-span-5 h-full items-center grid">
                                                                <label className="block text-sm font-medium leading-6 text-gray-900">Dont's</label>
                                                                <br/>
                                                                <label className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                                                                <div className="mt-2 w-full">
                                                                    <input onChange={e => setDonts({...donts, title: e.target.value})} value={donts.title} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                                </div>
                                                                <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                                                <div className="mt-2 w-full">
                                                                    <textarea rows={3} onChange={e => setDonts({...donts, desc: e.target.value})} value={donts.desc} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-1 h-full items-end grid">
                                                                <label className="text-white">Filler</label>
                                                                <div className="mt-2 w-full">
                                                                    <button onClick={()=> {
                                                                        setProduct({...product, dont: product.dont.concat([donts])})
                                                                        setDonts({
                                                                            title: "",
                                                                            desc: ""
                                                                        })
                                                                    }} type="button" disabled={donts.title!=="" && donts.desc!=="" ? false : true} className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${donts.title!=="" && donts.desc!=="" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Add</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <br/>
                                                        <div className="sm:col-span-6">
                                                            <label className="block text-sm font-medium leading-6 text-gray-900">Dont's List</label>
                                                            <div className="block">
                                                                {product?.dont[0]!==undefined ? 
                                                                    <div className="grid gap-2 pr-4 my-2">
                                                                        {product.dont.map((a, index)=> {
                                                                            return (
                                                                                <div className="h-auto w-auto inline-block p-2 rounded-lg bg-blue-400 relative" key={index}>
                                                                                    <label onClick={()=>removeDont(index)} className="absolute right-0 top-0 pr-4 cursor-pointer font-bold hover:text-gray-600">x</label>
                                                                                    <label className="font-semibold">{a?.title}</label>
                                                                                    <br/>
                                                                                    <label>{a?.desc}</label>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                :
                                                                <div className="my-2">
                                                                    <label className="font-bold">No product specific dont's added yet.</label>
                                                                </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="sm:grid sm:col-span-6 sm:grid-cols-2 sm:gap-8 border border-black rounded-lg p-8">
                                                    <div className="col-span-2 w-full grid grid-cols-6">
                                                        <div className="col-span-4 flex items-center">
                                                            <label className="block font-medium leading-6 text-gray-900 text-base">Product Routine</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-2">
                                                        {product.routines[0]!==undefined ? 
                                                            <div className="grid grid-cols-5 items-center gap-2">
                                                                {product.routines.map((a, index)=> {
                                                                    return (
                                                                        <div key={index} className="bg-blue-400 rounded-lg flex items-center p-2 relative">
                                                                            <label onClick={()=>removeRoutine(index)} className="absolute right-0 top-0 pr-4 cursor-pointer font-bold hover:text-gray-600">x</label>
                                                                            <div onClick={()=>{
                                                                                setRoutine(product.routines[index])
                                                                                setMorrout((prev)=> {
                                                                                    return {...prev, skintype: product.routines[index].skintype, steps: product.routines[index].morning}
                                                                                })
                                                                                setNigrout((prev)=> {
                                                                                    return {...prev, skintype: product.routines[index].skintype, steps: product.routines[index].night}
                                                                                })
                                                                                setTempRoutine(index)
                                                                            }} className="cursor-pointer p-2">
                                                                                <svg height="25" width="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m19 20.25c0-.402-.356-.75-.75-.75-2.561 0-11.939 0-14.5 0-.394 0-.75.348-.75.75s.356.75.75.75h14.5c.394 0 .75-.348.75-.75zm-7.403-3.398 9.124-9.125c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-9.143 9.103c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 7.651-7.616 2.335 2.327-7.637 7.638z"/></svg>
                                                                            </div>
                                                                            <label>{a.skintype} Skin </label>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        :<span></span>}
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
                                                                        setRoutine({...routine, morning: routine.morning.concat([morstep])})
                                                                        setMorrout({...morrout, steps: morrout.steps.concat([morstep])})
                                                                        setMorstep("")
                                                                    }} type="button" disabled={morstep!=="" ? false : true} className={`rounded-md bg-indigo-600 p-[6px] text-sm font-semibold text-white shadow-sm ${morstep!=="" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                                                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"/></svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-6 border-t-2">
                                                                <label className="block text-base font-medium py-4 leading-6 text-gray-900">Morning Routine List {morrout.skintype ? `(${morrout.skintype} skin)` : null}</label>
                                                                <div>
                                                                    {morrout?.steps[0]!==undefined ? 
                                                                        <div className="grid grid-cols-6 gap-2">
                                                                            <div className="grid gap-2 col-span-6">
                                                                                {morrout.steps.map((a, index)=> {
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
                                                                        setRoutine({...routine, night: routine.night.concat([nigstep])})
                                                                        setNigrout({...nigrout, steps: nigrout.steps.concat([nigstep])})
                                                                        setNigstep("")
                                                                    }} type="button" disabled={nigstep!=="" ? false : true} className={`rounded-md bg-indigo-600 p-[6px] text-sm font-semibold text-white shadow-sm ${nigstep!=="" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                                                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"/></svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-6 border-t-2 ">
                                                                <label className="block text-base font-medium py-4 leading-6 text-gray-900">Night Routine List {nigrout.skintype ? `(${nigrout.skintype} skin)` : null}</label>
                                                                <div>
                                                                    {nigrout?.steps[0]!==undefined ? 
                                                                        <div className="grid grid-cols-6 gap-2">
                                                                            <div className="grid gap-2 col-span-6">
                                                                                {nigrout.steps.map((a, index)=> {
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

                                                    <div className="col-span-2 flex justify-center items-end">
                                                            <button onClick={()=>{
                                                                    let tempList = product.routines
                                                                    tempList[tempRoutine] = routine
                                                                    setProduct({...product, routines: tempList })
                                                            
                                                                    setRoutine({
                                                                        skintype: "",
                                                                        morning: [],
                                                                        night: []
                                                                    })
                                                                    setMorrout({
                                                                        skintype: "",
                                                                        steps: []
                                                                    })
                                                                    setNigrout({
                                                                        skintype: "",
                                                                        steps: []
                                                                    })
                                                        }} disabled={morrout.steps[0]===undefined || nigrout.steps[0]===undefined || morrout.skintype==="" ? true : false} type="button" className={`rounded-md max-w-[col-span-1] bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${morrout.steps[0]===undefined || nigrout.steps[0]===undefined || morrout.skintype==="" ? null : 'hover:bg-indigo-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Update Routine</button>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-6 sm:grid-cols-6 sm:grid sm:gap-4 border border-black rounded-lg p-8">
                                                    <div className="sm:col-span-3">
                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Variations </label>
                                                        <div className="mt-2 relative">
                                                            <input onChange={e=>{
                                                                setWord(e.target.value)
                                                            }} value={word} type="text" name="word" id="word" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                            
                                                            {word!=="" ?
                                                                <div className="grid gap-2 absolute bg-slate-100 h-auto max-h-[150px] w-full overflow-y-scroll rounded-b-xl no-scrollbar">
                                                                    {filteredProducts.map((a, index)=> {
                                                                        return <label onClick={()=>{
                                                                            setProduct({...product, relatedproducts: product.relatedproducts.concat([a])})
                                                                            setWord("")
                                                                        }} className="h-auto w-auto p-2 cursor-pointer hover:bg-gray-200" key={index}>{a.name}</label>
                                                                    })}
                                                                </div>
                                                            :null}
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-3">
                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Products List</label>
                                                        {product.relatedproducts[0]!==undefined ?
                                                            <div className="mt-2 grid gap-2">
                                                                {product.relatedproducts.map((a, index)=> {
                                                                    return (
                                                                        <div className="bg-blue-300 w-auto p-2 rounded-lg relative" key={index}>
                                                                            <label onClick={()=>removeItem(a)} className="absolute right-0 top-0 pr-4 cursor-pointer font-bold hover:text-gray-600">x</label>
                                                                            <label>{a.name}</label>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        :<span>No items yet</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-min whitespace-nowrap bg-white px-6 py-2 rounded-lg shadow-slate-700 mt-6 flex items-center justify-center gap-x-6">
                                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Product</button>
                                        <button onClick={()=>setIsEdit(false)} type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                    </div>
                                </form>
                                <br/>
                                <br/>
                                {product?._id!=="" ? 
                                    <>
                                        <h3>Edit reviews for {product.name}</h3>
                                        <ProductReview id={product._id} secondid={product._id}  relatedproducts={product?.relatedproducts!==undefined ? product.relatedproducts : []} mode={"Edit"}/>
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