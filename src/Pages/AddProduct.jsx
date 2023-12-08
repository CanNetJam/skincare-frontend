import React, { useState, useRef } from "react"
import axios from "axios"
import ImagePreview from "../Components/ImagePreview"

export default function AddProduct() {
    const [ product, setProduct ] = useState({
        name: "",
        maindesc: "",
        stock: "",
        price: "",
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
        moreimage: []
    })
    const [ prodIngredients, setProdIngredients ] = useState([])
    const [ prodIngredients2, setProdIngredients2 ] = useState([])
    const [ ingredient, setIngredient ] = useState({
        name: "",
        desc: "",
        photo: ""
    })
    const [ dos, setDos ] = useState("")
    const [ donts, setDonts ] = useState("")
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
        const data = new FormData()
        let uploadedProductPhoto
        if (productImage[0]!==undefined){
            const signatureResponse = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://skincare-backend.onrender.com'}/get-signature` )

            const image = new FormData()
            image.append("file", productImage[0])
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
            uploadedProductPhoto = cloud_image
        }

        if (productMoreImage[0]!==undefined) {
            for (let i=0; i<productMoreImage.length; i++) {
                const signatureResponse = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://skincare-backend.onrender.com'}/get-signature` )

                const image = new FormData()
                image.append("file", productMoreImage[i])
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
                data.append("moreimage[]", cloud_image)
            }
            setProduct({...product, moreimage: productMoreImage})
        }

        if (file[0]!==undefined) {
            for (let i=0; i<file.length; i++) {
                const signatureResponse = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://skincare-backend.onrender.com'}/get-signature` )

                const image = new FormData()
                image.append("file", file[i])
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
                data.append("ingphoto[]", cloud_image)
            }
            setProduct({...product, ingredients: prodIngredients2})
        }
        
        data.append("name", product.name)
        data.append("maindesc", product.maindesc)
        data.append("stock", product.stock)
        data.append("displayimage", uploadedProductPhoto)
        data.append("price", product.price)
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
        
        const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://skincare-backend.onrender.com'}/product/create-product`, data, { headers: { "Content-Type": "application/json" } })
        console.log(res.data)
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
        <div className="h-screen w-full">
            <form onSubmit={submitHandler} className="container mx-auto px-20 py-10">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Product Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">This data will be displayed on the website after submission.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
                                <div className="mt-2">
                                    <input onChange={handleChange} value={product.name} type="text" name="name" id="product-name" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                                <div className="mt-2">
                                    <input onChange={handleChange} value={product.price} placeholder={0} type="number" name="price" id="price" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Stock</label>
                                <div className="mt-2">
                                    <input onChange={handleChange} value={product.stock} placeholder={0} type="number" name="stock" id="stock" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                                <select required onChange={handleChange} name="category" value={product.category} className="block w-full mt-2 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="" disabled>Select category</option>
                                    <option>Brightening</option>
                                    <option>Anti-Pimple</option>
                                    <option>Anti-Aging</option>
                                </select>
                            </div>
                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Product Description</label>
                                <div className="mt-2 w-full">
                                    <textarea onChange={handleChange} value={product.maindesc} rows={5} id="maindesc" name="maindesc" type="text" required className="resize-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <div className="sm:col-span-2 ">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Product Image</label>
                                <input required ref={CreateProductImageField} onChange={e => setProductImage(productImage.concat([e.target.files[0]]))} type="file" className="mt-2 block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-nonedark:file:bg-blue-500 dark:hover:file:bg-blue-400"/>
                                <br/>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Additonal Images</label>
                                <input required multiple ref={CreateProductMoreImageField} onChange={e => setProductMoreImage([...e.target.files])} type="file" className="mt-2 block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-nonedark:file:bg-blue-500 dark:hover:file:bg-blue-400"/>
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
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Ingredient name</label>
                                    <div className="mt-2 w-full">
                                        <input onChange={e => setIngredient({...ingredient, name: e.target.value})} value={ingredient.name} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                    <label className="block text-sm font-medium leading-6 text-white">Ingredient name</label>
                                    <input ref={CreatePhotoField} onChange={fileChange} type="file" className="mt-2 block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-nonedark:file:bg-blue-500 dark:hover:file:bg-blue-400"/>
                                    <br/>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
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

                            <div className="sm:col-span-6 sm:grid-cols-2 sm:grid sm:gap-4 border border-black rounded-lg p-8">
                                <div className="sm:col-span-1">
                                    <div className="sm:grid sm:grid-cols-6 sm:gap-2 items-center">
                                        <div className="sm:col-span-5 h-full items-center grid">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">Do's (Product Specific)</label>
                                            <div className="mt-2 w-full">
                                                <input onChange={e => setDos(e.target.value)} value={dos} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1 h-full items-center grid">
                                            <label className="text-white">Filler</label>
                                            <div className="mt-2 w-full">
                                                <button onClick={()=> {
                                                    setProduct({...product, do: product.do.concat([dos])})
                                                    setDos("")
                                                }} type="button" disabled={dos!=="" ? false : true} className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${dos!=="" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Add</button>
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
                                                                <label>{a}</label>
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
                                            <label className="block text-sm font-medium leading-6 text-gray-900">Dont's (Product Specific)</label>
                                            <div className="mt-2 w-full">
                                                <input onChange={e => setDonts(e.target.value)} value={donts} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1 h-full items-center grid">
                                            <label className="text-white">Filler</label>
                                            <div className="mt-2 w-full">
                                                <button onClick={()=> {
                                                    setProduct({...product, dont: product.dont.concat([donts])})
                                                    setDonts("")
                                                }} type="button" disabled={donts!=="" ? false : true} className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${donts!=="" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Add</button>
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
                                                                <label>{a}</label>
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
                                    <div className="col-span-1 flex justify-end items-center">
                                        <label className="block text-sm font-medium leading-6 text-gray-900 text-right px-4">Skin Type:</label>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="mt-2 w-full">
                                            <select onChange={skinTypeChange} value={skinType} className="block w-full mt-2 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option value="" disabled>Select skin type</option>
                                                <option>Normal</option>
                                                <option>Oily</option>
                                                <option>Dry</option>
                                                <option>Combination</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    {product.routines[0]!==undefined ? 
                                        <div className="grid grid-cols-4 items-center gap-2">
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
                                                }} type="button" disabled={morstep!=="" ? false : true} className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${morstep!=="" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Add to Sequence</button>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6 border-t-2">
                                            <label className="block text-base font-medium py-4 leading-6 text-gray-900">Morning Routine List ({morrout.skintype} skin)</label>
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
                                                }} type="button" disabled={nigstep!=="" ? false : true} className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${nigstep!=="" ? 'hover:bg-indigo-500' : null} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Add to Sequence</button>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6 border-t-2 ">
                                            <label className="block text-base font-medium py-4 leading-6 text-gray-900">Night Routine List ({nigrout.skintype} skin)</label>
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
                                    }} disabled={morrout.steps[0]===undefined || nigrout.steps[0]===undefined || morrout.skintype==="" ? true : false} type="button" className={`rounded-md max-w-[col-span-1] bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${morrout.steps[0]===undefined || nigrout.steps[0]===undefined || morrout.skintype==="" ? null : 'hover:bg-indigo-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Add Routine</button>
                                </div>
                            </div>
                            
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Shopee link</label>
                                <div className="mt-2 w-full">
                                    <input required onChange={e => setProduct({...product, links: {...product.links, shopee: e.target.value}})} value={product.links?.shopee} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Tiktok link</label>
                                <div className="mt-2 w-full">
                                    <input required onChange={e => setProduct({...product, links: {...product.links, tiktok: e.target.value}})} value={product.links?.tiktok} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Lazada link</label>
                                <div className="mt-2 w-full">
                                    <input required onChange={e => setProduct({...product, links: {...product.links, lazada: e.target.value}})} value={product.links?.lazada} type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register Product</button>
                </div>
            </form>
        </div>
    )
}