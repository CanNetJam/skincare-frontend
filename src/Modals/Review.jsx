import { useState, Fragment, useContext, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { UserContext } from "../App";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleImagePreview from '../Components/SingleImagePreview';

export default function Review({isReview, setIsReview, toReview, itemToReview, setItemToReview}) {
    const ratings = [1, 2, 3, 4, 5]
    const { userData, setUserData } = useContext(UserContext)
    const [rating, setRating] = useState("")
    const [hoverRating, setHoverRating] = useState(0)
    const [description, setDescription] = useState("")
    const [ file1, setFile1 ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ recommend, setRecommend ] = useState(true)
    const [ voucherAmount, setVoucherAmount ] = useState(5)

    useEffect(()=> {
        const calculateVoucher = () => {
            let num1 = Number(rating)
            let num2 = file1.length>0 ? 2:0
            let num3 = description.length>100 ? description.length>200 ? 2:1 : 0
            let num4 = recommend===true ? 1:0
            setVoucherAmount(num1+num2+num3+num4)
        }
        calculateVoucher()
    }, [rating, file1, description, recommend])

    async function submitHandler(e) {
        e.preventDefault()
        const loadingNotif = async function myPromise() {
            setLoading((prevBool) => !prevBool)
            const data = new FormData()
            if (file1.length>0){
                data.append("reviewimage", file1[0])
            }
            data.append("orderid", toReview._id)
            data.append("item", JSON.stringify(toReview.items))
            data.append("userid", userData?.user?._id)
            data.append("owner", userData?.user?.firstname+" "+userData?.user?.lastname)
            data.append("description", description)
            data.append("rating", rating)
            data.append("recommend", recommend)
            data.append("itemtoreview", JSON.stringify(itemToReview))
            data.append("voucher", voucherAmount)
            let token = localStorage.getItem("auth-token")
            const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/reviews/submit-review`, data, 
            { headers: { "Content-Type": "multipart/form-data", "auth-token": token } })
            if (res.data===true) {
                setRating("")
                setHoverRating(0)
                setLoading(false)
                setDescription("")
                setLoading(false)
                setIsReview(false)
            }
        }
        toast.promise(
            loadingNotif,
            {
                pending: 'Processing your review...',
                success: 'Successfully submitted a product review.',
                error: 'Review sumbission failed!'
            }
        )
    }

    function toastError1Notif() {
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
            pauseOnHover: false,
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
                setFile1([file])
            } else {
                toastError2Notif()
                return
            }
        }
    }

    return (
        <>
            <Transition appear show={isReview} as={Fragment}>
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
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-xl text-center border-b font-bold py-4 leading-6 text-gray-900 ">
                                    Writing a review for <span className='text-blue-400'>{itemToReview?.item?.name}</span>
                                </Dialog.Title>
                                <p className='w-full text-center py-2'>Leave a positive review to gain a larger discount voucher!</p>
                                <form onSubmit={submitHandler}>
                                    <div className="grid text-sm py-2 items-center">
                                        <div className='grid grid-cols-2 gap-2'>
                                            <b className='col-span-2 text-base'>Product Rating: <br/><span className='text-xs font-bold text-gray-600'>Additional voucher amount: +₱{Number(rating)?.toFixed(2)} (Max. +₱5.00)</span></b>
                                            <div className="col-span-2 sm:col-span-1 relative overflow-hidden flex gap-1.5 items-center justify-center w-full">
                                                <input required onChange={()=>""} value={rating} className="absolute inset-0 -z-10 opacity-0"></input>
                                                {ratings.map((a, index)=> {
                                                    return (
                                                        <label type="button" className='cursor-pointer rounded-full bg-gray-100 hover:shadow-sm' key={index} onMouseEnter={() => setHoverRating(a)} onMouseLeave={() => setHoverRating(0)} onClick={()=> {
                                                            setRating(a)
                                                        }}>
                                                            {hoverRating>=a || rating>=a ?
                                                                <svg fill='#facc15' className='h-10 w-10' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg>
                                                            : 
                                                                <svg fill='#9ca3af' className='h-10 w-10' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"/></svg>
                                                            }
                                                        </label>
                                                    )
                                                })}
                                            </div>
                                            <label className='col-span-2 sm:col-span-1 text-yellow-400 font-semibold text-3xl flex items-center justify-center'>
                                                {rating===5 || hoverRating===5 ?
                                                    'Excellent!'
                                                :
                                                    rating===4 || hoverRating===4 ?
                                                        'Amazing!'
                                                    :
                                                        rating===3 || hoverRating===3?
                                                            'Very Good!'
                                                        :
                                                            rating===2 || hoverRating===2 ?
                                                                'Good.'
                                                            :
                                                            'Poor.'
                                                }
                                            </label>
                                        </div>
                                        <br/>
                                        <div className='col-span-1 grid gap-2 pt-2'>
                                            <p className='text-base font-bold'>Product image: <br/><span className='text-xs font-bold text-gray-600'>Additional voucher amount: +₱{file1.length>0 ? 2?.toFixed(2):0?.toFixed(2)} (Max. +₱2.00)</span></p>
                                            <div className="w-full sm:max-w-[250px]">
                                                <label htmlFor="dropzone-file1" className="relative overflow-hidden flex flex-col items-center justify-center w-auto h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                                        <br/>
                                        <div className='col-span-1'>
                                            <p className='text-base font-bold'>Review details: <br/><span className='text-xs font-bold text-gray-600'>Additional voucher amount: +₱{description.length>100 ? description.length>200 ? 2?.toFixed(2):1?.toFixed(2) : 0?.toFixed(2)} (Max. +₱2.00)</span></p>
                                            <textarea required onChange={(e)=>setDescription(e.target.value)} rows={5} className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write something about the product..."></textarea>
                                        </div>
                                        <br/>
                                        <div className='grid justify-center items-center mb-5'>
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={recommend===true ? true : false} onChange={()=>setRecommend(!recommend)} value={recommend} className="sr-only peer"/>
                                                <div className="relative sm:w-9 w-12 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                <span className="ms-3 sm:text-sm text-xs font-bold text-gray-900 dark:text-gray-300">Would you recommend this product to other people?</span>
                                            </label>
                                            <div className='w-full text-center text-xs font-bold text-gray-600'>Additional voucher amount: +₱{recommend===true ? 1?.toFixed(2):0?.toFixed(2)} (Max. +₱1.00)</div>
                                        </div>
                                    </div>
                                    <div className='col-span-1 grid gap-2 border-t justify-center items-center py-2'>
                                        <div className='w-full'>
                                            <p>Total voucher amount to be claimed: <b className='text-blue-500 text-xl'>₱{voucherAmount?.toFixed(2)}</b></p>
                                        </div>
                                        <div className='flex gap-2 justify-center items-center'>
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
                                            <button onClick={()=>setIsReview(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                                        </div>
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
