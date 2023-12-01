import React, {useState} from "react"
import axios from "axios"

export default function AddProduct() {
    const [ name, setName ] = useState("")
    const [ mainDesc, setMainDesc ] = useState("")
    const [ stock, setStock ] = useState(0)
    const [ links, setLinks ] = useState({
        shopee: "",
        tiktok: "",
        lazada: "",
    })
    const [ ingredients, setIngredients ] = useState([])

    async function submitHandler(e) {
        e.preventDefault()

        const data = new FormData()
        data.append("name", name)
        data.append("maindesc", mainDesc)
        data.append("stock", stock)
        data.append("shopeelink", links.shopee)
        data.append("tiktoklink", links.tiktok)
        data.append("lazadalink", links.lazada)
        const res = await axios.post("https://skincare-backend.onrender.com/create-product", data, { headers: { "Content-Type": "application/json" } })
    }

    return (
        <div className="h-screen w-full">
            <form onSubmit={submitHandler} className="container mx-auto px-20 py-10">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Product Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">This data will be displayed on the website after submission.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
                                <div className="mt-2">
                                    <input onChange={e => setName(e.target.value)} value={name} type="text" name="product-name" id="product-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Remaining Stocks</label>
                                <div className="mt-2">
                                    <input onChange={e => setStock(e.target.value)} value={stock} type="number" name="stock" id="first-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Product Descriptions</label>
                                <div className="mt-2 w-full">
                                    <textarea onChange={e => setMainDesc(e.target.value)} value={mainDesc} rows={8} id="maindesc" name="maindesc" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Shopee link</label>
                                <div className="mt-2 w-full">
                                    <input onChange={e => setLinks({...links, shopee:e.target.value})} value={links.shopee} rows={8} type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Tiktok link</label>
                                <div className="mt-2 w-full">
                                    <input onChange={e => setLinks({...links, tiktok:e.target.value})} value={links.tiktok} rows={8} type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Lazada link</label>
                                <div className="mt-2 w-full">
                                    <input onChange={e => setLinks({...links, lazada:e.target.value})} value={links.lazada} rows={8} type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Product</button>
                </div>
            </form>
        </div>
    )
}