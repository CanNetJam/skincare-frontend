import { useState, Fragment, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { UserContext } from "../App";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleImagePreview from '../Components/SingleImagePreview';

export default function Refund({isEdit, setIsEdit, toEdit}) {
    const { userData, setUserData } = useContext(UserContext)
    const [mainReason, setMainReason] = useState("")
    const [description, setDescription] = useState("")
    const [ file1, setFile1 ] = useState([])
    const [ file2, setFile2 ] = useState([])
    const [ file3, setFile3 ] = useState([])
    const [ loading, setLoading ] = useState(false)

    async function submitHandler(e) {
        e.preventDefault()
        const loadingNotif = async function myPromise() {
            setLoading((prevBool) => !prevBool)
            const data = new FormData()
            if (file1[0]!==undefined) {
                const signatureResponse = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/get-signature` )

                const image = new FormData()
                image.append("file", file1[0])
                image.append("api_key", import.meta.env.VITE_CLOUDAPIKEY)
                image.append("signature", signatureResponse.data.signature)
                image.append("timestamp", signatureResponse.data.timestamp)

                const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNAME}/auto/upload`, image, {
                headers: { "Content-Type": "multipart/form-data" }
                })
                let cloud_image = cloudinaryResponse.data.public_id
                data.append("waybillimage", cloud_image)
            }

            if (file2[0]!==undefined) {
                const signatureResponse = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/get-signature` )

                const image = new FormData()
                image.append("file", file2[0])
                image.append("api_key", import.meta.env.VITE_CLOUDAPIKEY)
                image.append("signature", signatureResponse.data.signature)
                image.append("timestamp", signatureResponse.data.timestamp)

                const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNAME}/auto/upload`, image, {
                headers: { "Content-Type": "multipart/form-data" }
                })
                let cloud_image = cloudinaryResponse.data.public_id
                data.append("productimage1", cloud_image)
            }
            if (file3[0]!==undefined) {
                const signatureResponse = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/get-signature` )

                const image = new FormData()
                image.append("file", file3[0])
                image.append("api_key", import.meta.env.VITE_CLOUDAPIKEY)
                image.append("signature", signatureResponse.data.signature)
                image.append("timestamp", signatureResponse.data.timestamp)

                const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNAME}/auto/upload`, image, {
                headers: { "Content-Type": "multipart/form-data" }
                })
                let cloud_image = cloudinaryResponse.data.public_id
                data.append("productimage2", cloud_image)
            }

            data.append("orderid", toEdit._id)
            data.append("userid", userData?.user?._id)
            data.append("owner", userData?.user?.firstname+" "+userData?.user?.lastname)
            data.append("mainreason", mainReason)
            data.append("description", description)
            data.append("type", "Return/Refund")
            let token = localStorage.getItem("auth-token")
            const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/tickets/submit-ticket`, data, 
            { headers: { "Content-Type": "application/json", "auth-token": token } })
            if (res.data===true) {
                setLoading(false)
                setMainReason("")
                setDescription("")
                setLoading(false)
                setIsEdit(false)
            }
        }
        toast.promise(
            loadingNotif,
            {
                pending: 'Processing return/refund ticket...',
                success: 'Successfully submitted a ticket. Please stay tuned for updates.',
                error: 'Ticket sumbission failed!'
            }
        )
    }

    function toastError1Notif() {
        toast.error('File size too large, please select a file that is lower than 3 mb.', {
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

    const handleFileUpload = (e, target) => {
        let file = e.target.files[0];
        let fileType = file.type; // image/jpeg
        let fileSize = file.size; // 3MB
        if (fileSize > 3 * 1000000) {
            toastError1Notif()
            return
        } else {
            if (fileType==="image/jpeg" || fileType==="image/png" || fileType==="image/webp" || fileType==="image/svg+xml") {
                if (target==='waybill') {
                    setFile1([file])
                } else if (target==='product1') {
                    setFile2([file])
                } else if (target==='product2') {
                    setFile3([file])
                }
            } else {
                toastError2Notif()
                return
            }
        }
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
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                            >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="sm:flex grid text-lg border-b pb-2 font-semibold leading-6 text-gray-900 items-center">
                                    Return/Refund for Order: <span className='text-blue-400'>{toEdit._id}</span>
                                </Dialog.Title>
                                <form onSubmit={submitHandler}>
                                    <div className="grid grid-cols-2 text-sm py-2 items-center">
                                        <select required onChange={e=>setMainReason(e.target.value)} name="type" value={mainReason} className="sm:col-span-2 py-2 block w-full rounded-md border-1 shadow-sm sm:text-sm text-sm sm:leading-6 font-medium text-gray-900 dark:text-white cursor-pointer">
                                            <option value="" disabled>Select your reason</option>
                                            <option>Damaged item</option>
                                            <option>Wrong item</option>
                                            <option>Incomplete item</option>
                                            <option>Missing item</option>
                                            <option>Item did not arrive</option>
                                        </select>
                                        <br/>
                                        <div className='col-span-2 grid sm:grid-cols-3 gap-2 pt-2'>
                                            <div>
                                                <label>Image 1: (<b>Waybill</b>)</label>
                                                <div className="flex items-center justify-center w-full">
                                                    <label htmlFor="dropzone-file1" className="relative overflow-hidden flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg className="w-8 h-8 mb-4 text-blue-400 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                            </svg>
                                                            <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                            <p className="text-xs text-center text-gray-500 dark:text-gray-400">SVG, PNG or JPG (MAX. 3Mb)</p>
                                                        </div>
                                                        <input required onChange={e=> {handleFileUpload(e, 'waybill')}} id="dropzone-file1" name="dropzone-file1" type="file" className="opacity-0" />

                                                        <SingleImagePreview file={file1}/>
                                                    </label>
                                                </div> 
                                            </div>
                                            <div>
                                                <label>Image 2: (<b>Product photo 1</b>)</label>
                                                <div className="flex items-center justify-center w-full">
                                                <label htmlFor="dropzone-file2" className="relative overflow-hidden flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg className="w-8 h-8 mb-4 text-blue-400 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                            </svg>
                                                            <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                            <p className="text-xs text-center text-gray-500 dark:text-gray-400">SVG, PNG or JPG (MAX. 3Mb)</p>
                                                        </div>
                                                        <input required onChange={e=> {handleFileUpload(e, 'product1')}} id="dropzone-file2" name="dropzone-file2" type="file" className="opacity-0" />

                                                        <SingleImagePreview file={file2}/>
                                                    </label>
                                                </div> 
                                            </div>
                                            <div>
                                                <label>Image 3: (<b>Product photo 2</b>)</label>
                                                <div className="flex items-center justify-center w-full">
                                                    <label htmlFor="dropzone-file3" className="relative overflow-hidden flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg className="w-8 h-8 mb-4 text-blue-400 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                            </svg>
                                                            <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                            <p className="text-xs text-center text-gray-500 dark:text-gray-400">SVG, PNG or JPG (MAX. 3Mb)</p>
                                                        </div>
                                                        <input required onChange={e=> {handleFileUpload(e, 'product2')}} id="dropzone-file3" name="dropzone-file3" type="file" className="opacity-0" />
                                                        
                                                        <SingleImagePreview file={file3}/>
                                                    </label>
                                                </div> 
                                            </div>
                                        </div>
                                        <label className='col-span-2 flex justify-center w-full'><i>Note: Please ensure that you upload each image on its designated section.</i></label>
                                        <br/>
                                        <div className='col-span-2'>
                                            <label>Request description:</label>
                                            <textarea required onChange={(e)=>setDescription(e.target.value)} rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please describe your issue in full detail..."></textarea>
                                        </div>
                                    </div>
                                    <div className='col-span-4 flex gap-2 justify-center border-t items-center py-2'>
                                        <button disabled={loading===true ? true : false} type="submit" className={`w-auto flex gap-1 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>
                                            {loading===true ? 
                                                <div role="status">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                    </svg>
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            :null}
                                            Submit
                                        </button>
                                        <button onClick={()=>setIsEdit(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
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
