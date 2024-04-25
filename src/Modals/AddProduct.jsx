import { Fragment, useState, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImagePreview from "../Components/ImagePreview";
import SingleVideoPreview from "../Components/SingleVideoPreview";

export default function AddProduct({isAdd, setIsAdd}) {
    const [ product, setProduct ] = useState({
        name: "",
        maindesc: "",
        stock: "",
        price: "",
        disprice: "",
        category: "",
        links: {
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
        moreimage: [],
        videos: [],
        featuredvideos: []
    })
    const [ prodIngredients, setProdIngredients ] = useState([])
    const [ prodIngredients2, setProdIngredients2 ] = useState([])
    const [ ingredient, setIngredient ] = useState({
        name: "",
        desc: "",
        photo: ""
    })
    const [ dos, setDos ] = useState({
        title: "",
        desc: ""
    })
    const [ donts, setDonts ] = useState({
        title: "",
        desc: ""
    })
    const [ skinType, setSkinType ] = useState("")
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
    const [ productImage, setProductImage ] = useState([])
    const CreateProductImageField = useRef()
    const [ productMoreImage, setProductMoreImage ] = useState([])
    const CreateProductMoreImageField = useRef()

    const VideosField = useRef()
    const [ productVideos, setProductVideos ] = useState([])
    const FeaturedVideosField = useRef()
    const FeaturedUrl = useRef()
    const [ featuredProductVideos, setFeaturedProductVideos ] = useState([])
    const [ featuredVideo, setFeaturedVideo ] = useState({
        video: "",
        title: "",
        description: ""
    })
    const [ addIngredient, setAddIngredient ] = useState(false)
    const [ addDoDont, setAddDoDont ] = useState(false)
    const [ addRoutine, setAddRoutine ] = useState(false)
    const [ addFeatured, setAddFeatured ] = useState(false)

    useEffect(()=> {
        function loadScript(src) {
            return new Promise(function (resolve, reject) {
                var s;
                s = document.createElement('script');
                s.src = 'https://www.tiktok.com/embed.js';
                s.onload = resolve;
                s.onerror = reject;
                document.head.appendChild(s);
            });
        }
        loadScript()
    }, [featuredProductVideos])

    const handleChange = (e) => {
        const {name, value} = e.target
        setProduct((prev)=> {
            return {...prev, [name]: value}
        })
    }

    const skinTypeChange = (e) => {
        setSkinType(e.target.value)
        setRoutine((prev)=> {
            return {...prev, skintype: e.target.value}
        })
        setMorrout((prev)=> {
            return {...prev, skintype: e.target.value}
        })
        setNigrout((prev)=> {
            return {...prev, skintype: e.target.value}
        })
    }

    const fileChange = (e) => {
        setFile(file.concat([e.target.files[0]]))
        setIngredient({...ingredient, photo: e.target.files[0]})
    }

    async function submitHandler(e) {
        e.preventDefault()
        const loadingNotif = async function myPromise() {
            const data = new FormData()
            if (productImage.length>0){
                data.append("displayimage", productImage[0])
            }
            if (productMoreImage.length>0) {
                for (let i=0; i<productMoreImage.length; i++) {
                    data.append("moreimage", productMoreImage[i])
                }
            }
            if (file.length>0) {
                for (let i=0; i<file.length; i++) {
                    data.append("ingphoto", file[i])
                }
            }
            if (productVideos.length>0) {
                for (let i=0; i<productVideos.length; i++) {
                    data.append("prodvid", productVideos[i])
                }
            }
            if (featuredProductVideos.length>0) {
                let videoCollection = []
                for (let i=0; i<featuredProductVideos.length; i++) {
                    if (featuredProductVideos[i]?.video?.type==="video/mp4") {
                        data.append("featuredvideos", featuredProductVideos[i].video)
                        videoCollection.push({
                            description: featuredProductVideos[i].description,
                            title: featuredProductVideos[i].title,
                            video: "file"
                        })
                    } else if (featuredProductVideos[i]?.video?.type==="youtube" || featuredProductVideos[i]?.video?.type==="tiktok") {
                        videoCollection.push(featuredProductVideos[i])
                    }
                }
                data.append("videocollection", JSON.stringify(videoCollection))
            }
            data.append("name", product.name)
            data.append("maindesc", product.maindesc)
            data.append("stock", product.stock)
            data.append("price", product.price)
            data.append("disprice", product.disprice)
            data.append("usage", product.usage)
            data.append("extra", product.extra)
            data.append("category", product.category)
            data.append("shopeelink", product.links.shopee)
            data.append("tiktoklink", product.links.tiktok)
            data.append("lazadalink", product.links.lazada)
            data.append("ingredients", JSON.stringify(prodIngredients2))
            data.append("routines",JSON.stringify(product.routines))
            data.append("do", JSON.stringify(product.do))
            data.append("dont", JSON.stringify(product.dont))
            //data.append("featuredvideos", updatedFeaturedVideos.length>0 ? JSON.stringify(updatedFeaturedVideos) : featuredProductVideos)
            await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/product/create-product`, data, { headers: { "Content-Type": "multipart/form-data" } })
            setIsAdd(false)
        }
        toast.promise(
            loadingNotif,
            {
                pending: 'Uploading product data...',
                success: 'Product data uploaded.',
                error: 'Product upload failed!'
            }
        )
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

    function toastErrorNotif() {
        toast.error('File size too large, please select a file that is lower than 3 mb.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    function toastError3Notif() {
        toast.error('Please select jpeg, png, and webp/svg picture formats only.', {
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
    
    const handleFileUpload = (e) => {
        let file = e.target.files[0];
        let fileType = file.type; // image/jpeg
        let fileSize = file.size; // 3MB
    
        if (fileSize > 3 * 1000000) {
            toastErrorNotif()
            return
        } else {
            if (fileType==="image/jpeg" || fileType==="image/png" || fileType==="image/webp" || fileType==="image/svg+xml") {
                setProductMoreImage([...e.target.files])
            } else {
                toastError3Notif()
                return
            }
        }
    }

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

    const handleVideoUpload = (e, destination) => {
        let file = e.target.files[0];
        let fileType = file.type; 
        let fileSize = file.size; 
        if (fileSize > 15 * 1000000) {
            toastError1Notif()
            if (destination==="product videos"){
                VideosField.current.value=""
            } else if (destination==="featured videos"){
                FeaturedVideosField.current.value=""
            }
            return
        } else {
            if (fileType==="video/mp4") {
                if (destination==="product videos"){
                    setProductVideos([file])
                } else if (destination==="featured videos"){
                    setFeaturedVideo({...featuredVideo, video: file})
                    FeaturedUrl.current.value = ""
                }
            } else {
                toastError2Notif()
                if (destination==="product videos"){
                    VideosField.current.value=""
                } else if (destination==="featured videos"){
                    FeaturedVideosField.current.value=""
                }
                return
            }
        }
    }

    function invalidUrlNotif() {
        toast.error('Url is not a Youtube or TikTok link.', {
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

    function validUrl(url) {
        if (url!=="") {
            var condition1 = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|(?:shorts\/)|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
            //var condition1 = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            var condition2 = /^.*https:\/\/(?:m|www|vm)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+))|\w+)/

            let condition = null
            let result = {}
            function haha () {
                for (let i=1; i<4; i++){
                    if (i===1) {
                        condition = url.match(condition1)
                        if (condition!==null){
                            return result = {
                                urlKey: condition[1],
                                type: 'youtube'
                            }
                        }
                    } else if (i===2) {
                        condition = url.match(condition2)
                        if (condition!==null){
                            return result = {
                                urlKey: condition[2],
                                tiktokSource: condition[1],
                                type: 'tiktok'
                            }
                        }
                    } 
                }
            }
            haha()
            if (condition===null){
                invalidUrlNotif()
            } else {
                setFeaturedVideo({...featuredVideo, video: result})
                FeaturedVideosField.current.value=""
            }
            return
        }
    }

    function removeFeatured(props) {
        let list = featuredProductVideos
        list.splice(props, 1)
        setFeaturedProductVideos(list)
    }

    return (
        <>
            <Transition appear show={isAdd} as={Fragment}>
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
                                Add Product
                                </Dialog.Title>
                                <br/>
                                <form onSubmit={submitHandler} className="container mx-auto">
                                    <div className="space-y-12">
                                        <div className="border-b border-gray-900/10 pb-6">
                                            <h2 className="text-xl font-semibold leading-7 text-gray-900">Product Information</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">This data will be displayed on the website after submission.</p>

                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-2">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Product Name<span className='text-xl text-red-500'>*</span></label>
                                                    <div className="mt-2">
                                                        <input onChange={handleChange} value={product.name} type="text" name="name" id="product-name" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Price<span className='text-xl text-red-500'>*</span></label>
                                                    <div className="mt-2">
                                                        <input onChange={handleChange} value={product.disprice} placeholder={0} type="number" name="disprice" id="disprice" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Discounted Price<span className='text-xl text-red-500'>*</span></label>
                                                    <div className="mt-2">
                                                        <input onChange={handleChange} value={product.price} placeholder={0} type="number" name="price" id="price" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Stock<span className='text-xl text-red-500'>*</span></label>
                                                    <div className="mt-2">
                                                        <input onChange={handleChange} value={product.stock} placeholder={0} type="number" name="stock" id="stock" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Category<span className='text-xl text-red-500'>*</span></label>
                                                    <select required onChange={handleChange} name="category" value={product.category} className="block w-full mt-2 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                        <option value="" disabled>Select category</option>
                                                        <option>Cleanser</option>
                                                        <option>Toner</option>
                                                        <option>Serum</option>
                                                        <option>Moisturizer</option>
                                                        <option>Sunscreen</option>
                                                    </select>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Product Image<span className='text-xl text-red-500'>*</span></label>
                                                    <input required ref={CreateProductImageField} onChange={e => setProductImage(productImage.concat([e.target.files[0]]))} type="file" className="mt-2 block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-nonedark:file:bg-blue-500 dark:hover:file:bg-blue-400"/>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Additonal Images</label>
                                                    <input multiple ref={CreateProductMoreImageField} onChange={handleFileUpload} type="file" className="mt-2 block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-nonedark:file:bg-blue-500 dark:hover:file:bg-blue-400"/>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Product Video</label>
                                                    <input ref={VideosField} onChange={(e)=>handleVideoUpload(e, "product videos")} type="file" className="mt-2 block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-nonedark:file:bg-blue-500 dark:hover:file:bg-blue-400"/>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Product Description<span className='text-xl text-red-500'>*</span></label>
                                                    <div className="mt-2 w-full">
                                                        <textarea onChange={handleChange} value={product.maindesc} rows={5} id="maindesc" name="maindesc" type="text" required className="resize-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3 grid grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium leading-6 text-gray-900">How to Use<span className='text-xl text-red-500'>*</span></label>
                                                        <div className="mt-2">
                                                            <textarea onChange={handleChange} rows={5} value={product.usage} type="text" name="usage" id="product-usage" required className="resize-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Specific Precautions</label>
                                                        <div className="mt-2">
                                                            <textarea onChange={handleChange} rows={5} value={product.extra} type="text" name="extra" id="product-extra" className="resize-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col-span-6 border border-black rounded-lg grid'>
                                                    <div className='w-full flex justify-between p-2 border-b'>
                                                        <button onClick={()=>setAddIngredient(true)} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Ingredients</button>
                                                        {addIngredient===true ? 
                                                            <button onClick={()=>[setAddIngredient(false), setProdIngredients2([])]} className='border rounded-md px-6 py-2'>Cancel</button>
                                                        :null}
                                                    </div>
                                                    {addIngredient===true ? 
                                                        <div className="sm:grid sm:grid-cols-6 sm:gap-4 p-8">
                                                            <div className="sm:col-span-3">
                                                                <label className="block text-sm font-medium leading-6 text-gray-900">Ingredient name<span className='text-xl text-red-500'>*</span></label>
                                                                <div className="mt-2 w-full">
                                                                    <input onChange={e => setIngredient({...ingredient, name: e.target.value})} value={ingredient.name} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                                </div>
                                                                <label className="block text-sm font-medium leading-6 text-white">Ingredient image</label>
                                                                    <input ref={CreatePhotoField} onChange={fileChange} type="file" className="mt-2 block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-nonedark:file:bg-blue-500 dark:hover:file:bg-blue-400"/>
                                                                <br/>
                                                                <label className="block text-sm font-medium leading-6 text-gray-900">Description<span className='text-xl text-red-500'>*</span></label>
                                                                <div className="mt-2 w-full">
                                                                    <textarea onChange={e => setIngredient({...ingredient, desc: e.target.value})} value={ingredient.desc} rows={5} type="text" className="resize-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                                </div>

                                                                <div className="mt-2 w-full">
                                                                    <button onClick={()=> {
                                                                        setProdIngredients(prev=>prev.concat(ingredient))
                                                                        setProdIngredients2(prev=>prev.concat(ingredient))
                                                                        setProduct({...product, ingredients: product.ingredients.concat([ingredient])})
                                                                        setIngredient({name: "", desc: "", photo: ""})
                                                                        CreatePhotoField.current.value = ""
                                                                    }} type="button" disabled={ingredient.photo!== "" && ingredient.name!== "" && ingredient.desc!== "" ? false : true}  className={`rounded-md w-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${ingredient.photo!== "" && ingredient.name!== "" && ingredient.desc!== "" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Add to List</button>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="sm:col-span-3">
                                                                <label className="block text-sm font-medium leading-6 text-gray-900">Ingredients List</label>
                                                                <div>
                                                                    <ImagePreview prodIngredients={prodIngredients} setProdIngredients={setProdIngredients}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    :null}
                                                </div>

                                                <div className='col-span-6 border border-black rounded-lg grid'>
                                                    <div className='sm:col-span-6 sm:grid-cols-2 w-full flex justify-between p-2 border-b'>
                                                        <button onClick={()=>setAddDoDont(true)} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Do's and Don'ts</button>
                                                        {addDoDont===true ? 
                                                            <button onClick={()=>[setAddDoDont(false), setProduct({...product, do: [], dont: []})]} className='border rounded-md px-6 py-2'>Cancel</button>
                                                        :null}
                                                    </div>
                                                    {addDoDont===true ? 
                                                        <div className="sm:col-span-6 sm:grid-cols-2 sm:grid sm:gap-4 rounded-lg p-8">
                                                            <div className="sm:col-span-1">
                                                                <div className="sm:grid sm:grid-cols-6 sm:gap-2 items-center">
                                                                    <div className="sm:col-span-5 h-full items-center grid">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Do's </label>
                                                                        <br/>
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Title<span className='text-xl text-red-500'>*</span></label>
                                                                        <div className="mt-2 w-full">
                                                                            <input onChange={e => setDos({...dos, title: e.target.value})} value={dos.title} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                                        </div>
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Description<span className='text-xl text-red-500'>*</span></label>
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
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Title<span className='text-xl text-red-500'>*</span></label>
                                                                        <div className="mt-2 w-full">
                                                                            <input onChange={e => setDonts({...donts, title: e.target.value})} value={donts.title} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                                        </div>
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Description<span className='text-xl text-red-500'>*</span></label>
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
                                                    :null}
                                                </div>

                                                <div className='sm:col-span-6 border border-black rounded-lg grid'>
                                                    <div className='w-full flex justify-between p-2 border-b'>
                                                        <button onClick={()=>setAddRoutine(true)} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Routines</button>
                                                        {addRoutine===true ? 
                                                            <button onClick={()=>[setAddRoutine(false), setProduct({...product, routines: []})]} className='border rounded-md px-6 py-2'>Cancel</button>
                                                        :null}
                                                    </div>
                                                    {addRoutine===true ? 
                                                        <div className="sm:grid  sm:grid-cols-2 sm:gap-8 rounded-lg p-8">
                                                            <div className="col-span-2 w-full grid grid-cols-6">
                                                                <div className="col-span-4 flex items-center">
                                                                    <label className="block font-medium leading-6 text-gray-900 text-base">Product Routine</label>
                                                                </div>
                                                                <div className="col-span-1 flex justify-end items-center">
                                                                    <label className="block text-sm font-medium leading-6 text-gray-900 text-right px-4">Skin Type:<span className='text-xl text-red-500'>*</span></label>
                                                                </div>
                                                                <div className="col-span-1">
                                                                    <div className="mt-2 w-full">
                                                                        <select onChange={skinTypeChange} value={skinType} className="block w-full mt-2 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                                            <option value="" disabled>Select skin type</option>
                                                                            <option>Wrinkle</option>
                                                                            <option>Pigmentation</option>
                                                                            <option>Acne</option>
                                                                            <option>Dry</option>
                                                                            <option>Oily</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-2">
                                                                {product.routines[0]!==undefined ? 
                                                                    <div className="grid grid-cols-5 items-center gap-2">
                                                                        {product.routines.map((a, index)=> {
                                                                            return (
                                                                                <div key={index} className="bg-blue-400 rounded-lg px-8 py-2 relative">
                                                                                    <label onClick={()=>removeRoutine(index)} className="absolute right-0 top-0 pr-4 cursor-pointer font-bold hover:text-gray-600">x</label>
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
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Product to Use<span className='text-xl text-red-500'>*</span></label>
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
                                                                            }} type="button" disabled={morstep!=="" ? false : true} className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${morstep!=="" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Add to Sequence</button>
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
                                                                                    <label className="font-bold">No product(s) added yet.</label>
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
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Product to Use<span className='text-xl text-red-500'>*</span></label>
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
                                                                            }} type="button" disabled={nigstep!=="" ? false : true} className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${nigstep!=="" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Add to Sequence</button>
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
                                                                    setProduct({...product, morroutine: product.morroutine.concat([morrout])})
                                                                    setProduct({...product, routines: product.routines.concat([routine]) })
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
                                                                    setSkinType("")
                                                                }} disabled={morrout.steps[0]===undefined || nigrout.steps[0]===undefined || morrout.skintype==="" ? true : false} type="button" className={`rounded-md max-w-[col-span-1] bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${morrout.steps[0]===undefined || nigrout.steps[0]===undefined || morrout.skintype==="" ? null : 'hover:bg-indigo-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Add Routine</button>
                                                            </div>
                                                        </div>
                                                    :null}
                                                </div>

                                                <div className='sm:col-span-6 border border-black rounded-lg grid'>
                                                    <div className='sm:col-span-6 w-full flex justify-between p-2 border-b'>
                                                        <button onClick={()=>setAddFeatured(true)} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Featured Videos</button>
                                                        {addFeatured===true ? 
                                                            <button onClick={()=>[setAddFeatured(false), setProduct({...product, featuredvideos: []})]} className='border rounded-md px-6 py-2'>Cancel</button>
                                                        :null}
                                                    </div>
                                                    {addFeatured===true ? 
                                                        <div className="sm:col-span-6 sm:grid sm:gap-4 p-8">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className='col-span-1'>
                                                                    <label className="flex items-center gap-4 text-sm font-medium leading-6 text-gray-900">Video Link
                                                                        <div className='flex gap-2'>
                                                                            <div className='h-4'>
                                                                                <img className='h-full w-full object-contain' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC7CAMAAACjH4DlAAAAjVBMVEX/AAD/////1dX/ysr/+fn/8PD/6Oj/2dn/vr7/0ND/9fX/kZH/5eX/7Oz/3t7/Kyv/JSX/qqr/c3P/TU3/trb/MDD/srL/xMT/goL/paX/4eH/Ozv/VFT/ZWX/W1v/mJj/X1//fHz/b2//ODj/Rkb/ISH/UFD/k5P/h4f/EhL/n5//fn7/R0f/d3f/EBCNO5EEAAAHZElEQVR4nO2d6XKiQBCAHQ65MSje4hVN1MR9/8dbBVFAQDDQ3Tp8f7Yqldrp+aLDXN20GBiSJOm6fMJqm+bEtpUzQgT/B7Y9Mc22df49WdclCS6+M60q/zNJb9uCJqoDZ3wwdqvu2pv3pv2Pfevv7Led6e/M89bd1c44jMeOq4qaYJtytcL+pEOeKEN3cDBW69m0s62g009yUvXlHUfGYeCKysSC1CG1NdX5Hi1/P/C6/5B/0543MhxVM+WadMiau1jNO9gdLc+/r+7C1QpqKaDDdr+9F9SQZLoamH/UIQ+OfexuVMl2pz2vY/CLHX4d7PI+I5k6dAM77tqYK6V1fGPHXCvLrIdxuo4hdry1syihY40dLACfqY/eFB1mFZPqF0AspEPEDhMMp4AOFTtIQO4HkKQOnmyk+Ejo4OebEjDI1WFihweOkKeDk2dKFD1bBw/zjSRfmTrefy6axiBLB3ZgSEjpOt571ZbNKFWHjh0WGnKajvfd33jEKE0HdlCISPc6XOyYEHHudbzlvmhBpnc6ZOyQULGSOnj+rkSmYqGOI3ZEqKyTOt7gmO0vJHRI2PEgY8V1aNjxIKPGdYyx40HGiOvgeyRttXpxHZ/Y8WAT14EdDTrtqI42djToDKM6eDtPuGcR1cH7g+U6Lw10/GBHg04/quMLOxp8ojr+YQeDj3nTwfuK5Yx409E8Z8MNwlbznA0Y3XQMsGMhwPKmY4EdCwG2Nx28r2d9bjpm2KFQQL7qoJyaAoZy1YEdCQmGoQ64WRjl2e841AE3C6N8TcAIdShgTTJmLcEaK8k61AF3J+zcokb0hGsW6oCblAaraJqT4I9QB9yk9LJfzXZgLZYg1AEXXKiDtedgbRYm1NEFbfGCiJiVnY510QE3R2dRHLBmizG56NiAtRjTwaQRWMNFEC864JYsLIFJafGoXnTAtZjUQWoIGRDQQejIaxHoANxHT9PBpBVcAHkYgQ4LrsVUHYxNenAhZPMT6JjAtZih47RsIpBn5QU64Ba0eeUgDnBRZDALdACesuToYDr2BvYm0AGYOpungzEbbj6YRj/QAXj/Ol/H6S+DuXu4D3QAbj880oF7AhboAJwHPdbBdLzs1UAHYEpgAR2nJ90ULqBkdC3QralCOtDqIui+DsBldkEdSEOI7OsAXDIU1sFkDy6qENPXATj9Ka7jNISAXwyf+DoAh/IyOuAT0mxfxxKuwXI6oFOdFV8H4AZdWR3MghxCBF8HYAZtaR2MCXA1IDVfB+Cs5wkdgIsI8SV0gE0Uh74OwIqkT+pgFsgZpvoqOmCuQQQ6AO9bPK8D4gzzpXTUP4S4vg7Aa5R/08Ha9U6RXk0HY2Kdwb6ejlqHkEAH4KFxBTpqLLzSfDpivJ6OZuyIUPOTRX0tHXXPO15KRzMrjQCxZhm+ig6YFa34IitaoP2OYDcMcAP/KRlgu2HCC+yGAe6VKuS3jkF30oNzFsBqFWVtwJ6zBKdwgLkU5WRAn8IFZ7SAn8cyMuDPaC26R9YYJ/g6WR0oRcqZrwOwDlJBGUi3fxjJy1DId8NoXZVDvzlI6iIl4r3STqADMEXvkQzUW8eXO+lkbh0j30nvMUpX9NEzFpaMUAIHfj7LkZFJ76GQ7bQLdNhwLWbIoJEL9x3oACyxlyqDSqbkmFFIHCWTR+sy/LRiQlnWQ3QdpHLwBYZbkoBYhQaToRasoFa/Q77ogNsspTloXGAXHXAPuqsMyrV/4LbvQxsUK0N1Qh1wy4VABs26YfNQB9yS9twi1apy3VAH3JKWcs3BawlGuDUc5YqU1wKdcK/Io1yv9Fq+talme0ZodESxrjp4fr3mFemqA+F4mBz/2FUH4fEejN+bDmprSwzWNx3NGzjCd135OkzsWAjg3nQ0b++5TDsu73bCjoUAckRH8+avy95D8E/zXrjPqA4yRz9oxN4a2DxpY++UBKzgShQ1qqN5tJgxHdyvaVlMB8WdfkimcR3QyQHUWMV1AJZ/JokT18H7WCokdFC6aIEAS+jg+7WS/aQODTsiVEZJHXwPHuKdDrg3GhGE3eng+dvyc68DsgQQNewUHfyeLvyyFB38DqZaqg5ePx6RD0dUB68vLbYzdAjYgaEwYhk6uNxQ37NMHZBlgKhg5+jgbwvZYTk6uJubjliuDqxqAEh47IEOrnysk52/18HRiVzym5Kqg5ttZOe+62k6QIsjobG303qentr6/scuKV+UbB1kUn1rYpP60cjWwVj7fXcLN2JWp7N1MKYvCNQJqJ6jkt3lPB0nlG/cCiNV83Ec5vb3gY4zE9fw3mAftbM+iPLDzhYt5SUL7uJnCV73rgKmnuGI7YLdLFskUrKUobvYdWcb0p+Y/Wa+MhxVK6rhWR0xdNMW1cH4e3T0ep8d1IF329/Muz/GeKBqdlkHVem4Q9KtiaJpQ9cZHxbG6Lj2vHlv2t9WlgO3//j8nXne+jgyDmNnoIqaYLd1qbIOVKvjAZKk6/KJtjmxbUURBM1HjBH8TBAUxbYnZts6/b6uS9X1OJf/NANX6GGuAnkAAAAASUVORK5CYII='/>
                                                                            </div>
                                                                            <div className='h-4'>
                                                                                <img className='h-full w-full object-contain' src='https://www.svgrepo.com/show/327400/logo-tiktok.svg'/>
                                                                            </div>
                                                                        </div>
                                                                    </label>
                                                                    <div className="mt-2 w-full">
                                                                        <input ref={FeaturedUrl} onChange={(e)=>validUrl(e.target.value)} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                                    </div>

                                                                    <div className='border my-4 relative'>
                                                                        <p className='bg-white text-gray-900 px-2 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>or</p>
                                                                    </div>
                                                                    
                                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Video File</label>
                                                                    <input ref={FeaturedVideosField} onChange={(e)=>handleVideoUpload(e, "featured videos")} type="file" className="mt-2 border rounded-lg block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-nonedark:file:bg-blue-500 dark:hover:file:bg-blue-400"/>

                                                                </div>
                                                                <div className='col-span-1'>
                                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Video Title<span className='text-xl text-red-500'>*</span></label>
                                                                    <div className="mt-2 w-full">
                                                                        <input onChange={e => setFeaturedVideo({...featuredVideo, title: e.target.value})} value={featuredVideo.title} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                                    </div>
                                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Video Description<span className='text-xl text-red-500'>*</span></label>
                                                                    <div className="mt-2 w-full">
                                                                        <textarea onChange={e => setFeaturedVideo({...featuredVideo, description: e.target.value})} value={featuredVideo.description} rows={3} type="text" className="resize-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-2 mt-2 w-full flex justify-center">
                                                                    <button onClick={()=> {
                                                                        setFeaturedProductVideos(prev=>prev.concat(featuredVideo))
                                                                        setFeaturedVideo({ video: "", title: "", description: ""})
                                                                        FeaturedVideosField.current.value = ""
                                                                        FeaturedUrl.current.value = ""
                                                                    }} type="button" disabled={featuredVideo.title!== "" && featuredVideo.description!== "" && featuredVideo.video!== "" ? false : true}  className={`rounded-md w-auto whitespace-nowrap px-8 bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm ${featuredVideo.title!== "" && featuredVideo.description!== "" && featuredVideo.video!== "" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Add to List</button>
                                                                </div>
                                                            </div>

                                                            <div className='border border-black'></div>

                                                            <div className="h-auto min-h-[400px] w-full border">
                                                                {featuredProductVideos.length>0 ?
                                                                    <div className='flex gap-2 overflow-x-auto'>
                                                                        {featuredProductVideos.map((a, index)=> {
                                                                            return (
                                                                                <div key={index} className='flex-shrink-0 pt-10 bg-gray-100 relative'>
                                                                                    <label onClick={()=>removeFeatured(index)} className="absolute right-0 top-0 pr-4 cursor-pointer font-bold text-xl hover:text-gray-600">x</label>
                                                                                    {a?.video?.type==='video/mp4' ?
                                                                                        <div className='h-full w-72'>
                                                                                            <SingleVideoPreview file={[a.video]}/>
                                                                                        </div>
                                                                                    : 
                                                                                        <>
                                                                                            {a.video.type==='youtube' ?
                                                                                                <iframe width="100%" height="350" src={`https://www.youtube.com/embed/${a.video.urlKey}?si=gy0u-2r-FmjvWkok`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                                                            :
                                                                                                <>
                                                                                                    <blockquote className="tiktok-embed" cite={`https://www.tiktok.com/${a.video.tiktokSource}`} data-video-id={a.video.urlKey}><section></section> </blockquote> 
                                                                                                </>
                                                                                            }
                                                                                        </>
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                :<div className='h-full w-full justify-center flex items-center '><p>No videos uploaded yet.</p></div>}
                                                            </div>
                                                        </div>
                                                    :null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-center gap-x-6">
                                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Upload Product</button>
                                        <button onClick={()=>setIsAdd(false)} type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
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