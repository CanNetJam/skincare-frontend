import { Fragment, useState, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddPackage({isAdd, setIsAdd}) {
    const [ packageSet, setPackageSet ] = useState({
        name: "",
        maindesc: "",
        moredesc: "",
        stock: "",
        origprice: "",
        disprice: "",
        links: {
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
    const [ morstep, setMorstep ] = useState("")
    const [ nigstep, setNigstep ] = useState("")
    const [ availableItems, setAvailableItems ] = useState([])
    const [ testingArray, setTestingArray ] = useState([])
    const [ word, setWord ] = useState("")
    
    const [ productImage, setProductImage ] = useState([])
    const CreateProductImageField = useRef()
    const [ productMoreImage, setProductMoreImage ] = useState([])
    const CreateProductMoreImageField = useRef()

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
        setPackageSet((prev)=> {
            return {...prev, [name]: value}
        })
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
            data.append("name", packageSet.name)
            data.append("maindesc", packageSet.maindesc)
            data.append("moredesc", packageSet.moredesc)
            data.append("stock", packageSet.stock)
            data.append("origprice", packageSet.origprice)
            data.append("disprice", packageSet.disprice)
            data.append("items", JSON.stringify(packageSet.items))
            data.append("shopeelink", packageSet.links.shopee)
            data.append("tiktoklink", packageSet.links.tiktok)
            data.append("lazadalink", packageSet.links.lazada)
            data.append("routines", JSON.stringify(packageSet.routines))
            
            const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_CONNECTIONSTRING}/package/create-package`, data, { headers: { "Content-Type": "multipart/form-data" } })
            console.log(res.data)

            setPackageSet({
                name: "",
                maindesc: "",
                moredesc: "",
                stock: "",
                origprice: "",
                disprice: "",
                links: {
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
            setTestingArray([])
            setWord("")
            setProductImage([])
            setProductMoreImage([])
            CreateProductImageField.current.value = ""
            CreateProductMoreImageField.current.value = ""
            setIsAdd(false)
        }
        toast.promise(
            loadingNotif,
            {
            pending: 'Uploading package data...',
            success: 'Package data uploaded.',
            error: 'Package upload failed!'
            }
        )
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
        const list1 = testingArray.filter((a)=> a._id!==props)
        setTestingArray(list1)

        const list2 = packageSet.items.filter((a)=> a!==props)
        setPackageSet({...packageSet, items: list2})
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
    
    function toastError2Notif() {
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
                setProductImage(productImage.concat([e.target.files[0]]))
            } else {
                toastError2Notif()
                return
            }
        }
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
                                Add Package
                                </Dialog.Title>
                                <br/>
                                <form onSubmit={submitHandler} className="container mx-auto">
                                    <div className="space-y-12">
                                        <div className="border-b border-gray-900/10 pb-12">
                                            <h2 className="text-xl font-semibold leading-7 text-gray-900">Package Information</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">This data will be displayed on the website after submission.</p>

                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Package Name:<span className='text-xl text-red-500'>*</span></label>
                                                    <div className="mt-2">
                                                        <input onChange={handleChange} value={packageSet.name} type="text" name="name" id="package-name" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Original Price:<span className='text-xl text-red-500'>*</span></label>
                                                    <div className="mt-2">
                                                        <input onChange={handleChange} value={packageSet.disprice} placeholder={0} type="number" name="disprice" id="disprice" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Discounted Price:<span className='text-xl text-red-500'>*</span></label>
                                                    <div className="mt-2">
                                                        <input onChange={handleChange} value={packageSet.origprice} placeholder={0} type="number" name="origprice" id="origprice" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Stock:<span className='text-xl text-red-500'>*</span></label>
                                                    <div className="mt-2">
                                                        <input onChange={handleChange} value={packageSet.stock} placeholder={0} type="number" name="stock" id="stock" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Package Description:<span className='text-xl text-red-500'>*</span></label>
                                                    <div className="mt-2 w-full">
                                                        <textarea onChange={handleChange} value={packageSet.maindesc} rows={5} id="maindesc" name="maindesc" type="text" required className="resize-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">More Description:<span className='text-xl text-red-500'>*</span></label>
                                                    <div className="mt-2 w-full">
                                                        <textarea onChange={handleChange} value={packageSet.moredesc} rows={5} id="moredesc" name="moredesc" type="text" required className="resize-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-2 ">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Package Image:<span className='text-xl text-red-500'>*</span></label>
                                                    <input required ref={CreateProductImageField} onChange={handleFileUpload} type="file" className="mt-2 block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-nonedark:file:bg-blue-500 dark:hover:file:bg-blue-400"/>
                                                    <br/>
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Additonal Images</label>
                                                    <input required multiple ref={CreateProductMoreImageField} onChange={e => setProductMoreImage([...e.target.files])} type="file" className="mt-2 block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-nonedark:file:bg-blue-500 dark:hover:file:bg-blue-400"/>
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
                                                                        setTestingArray(prev=>prev.concat(a))
                                                                        setPackageSet({...packageSet, items: packageSet.items.concat([a._id])})
                                                                        setWord("")
                                                                    }} className="h-10 w-auto p-2 cursor-pointer hover:bg-gray-200" key={index}>{a.name}</label>
                                                                })}
                                                            </div>
                                                        :null}
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Items List</label>
                                                    {testingArray[0]!==undefined ?
                                                        <div className="grid gap-2">
                                                            {testingArray.map((a, index)=> {
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
                                                                <label className="block text-sm font-medium leading-6 text-gray-900">Product to Use:<span className='text-xl text-red-500'>*</span></label>
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
                                                                    }} type="button" disabled={morstep!=="" ? false : true} className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${morstep!=="" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Add to Sequence</button>
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
                                                                <label className="block text-sm font-medium leading-6 text-gray-900">Product to Use:<span className='text-xl text-red-500'>*</span></label>
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
                                                                    }} type="button" disabled={nigstep!=="" ? false : true} className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${nigstep!=="" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Add to Sequence</button>
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-6 border-t-2 ">
                                                                <label className="block text-base font-medium py-4 leading-6 text-gray-900">Night Routine List</label>
                                                                <div>
                                                                    {packageSet.routines?.night[0]!==undefined ? 
                                                                        <div className="grid grid-cols-6 gap-2">
                                                                            <div className="grid gap-2 col-span-6">
                                                                                {packageSet.routines.night.map((a, index)=> {
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
                                    <div className="mt-6 flex items-center justify-center gap-x-6">
                                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Upload Package</button>
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