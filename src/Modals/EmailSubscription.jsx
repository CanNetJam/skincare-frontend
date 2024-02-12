import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img1 from '../assets/Compressed-Webp/13-min.webp';
import img2 from '../assets/Compressed-Webp/2-min.webp';
import img3 from '../assets/Compressed-Webp/12-min.webp';
import img4 from '../assets/Compressed-Webp/14-min.webp';
import img5 from '../assets/Compressed-Webp/15-min.webp';
import { Link } from 'react-router-dom';

export default function EmailSubscription({isOpen, setIsOpen}) {
    const [email, setEmail] = useState("")
    const [checked, setChecked] = useState(false)
    const [importedImage, setImportedImage] = useState()

    useEffect(()=> {
        const selectImage = () => {
            let randomNumber = Math.floor((Math.random()*4)+1)
            
            if (randomNumber===1) {
                setImportedImage(img1)
            } else if (randomNumber===2) {
                setImportedImage(img2)
            } else if (randomNumber===3) {
                setImportedImage(img3)
            } else if (randomNumber===4) {
                setImportedImage(img4)
            } else if (randomNumber===5) {
                setImportedImage(img5)
            }
        }
        selectImage()
    }, [])

    async function submitHandler(e) {
        e.preventDefault()
        try {
            const loadingNotif = async function myPromise() {
                const passEmail = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/emails/submit-email`, {email})
                setEmail("")
                setChecked(false)
                setIsOpen(false)
            }
            toast.promise(
                loadingNotif,
                {
                    pending: 'Processing subscription...',
                    success: 'Successfully subscribed!',
                    error: 'Subscription failed!'
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={()=>setIsOpen(false)}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex sm:h-screen h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                            >
                            <Dialog.Panel className="h-auto w-full max-h-96 bg-white max-w-2xl transform overflow-hidden rounded-xl text-left align-middle shadow-xl transition-all grid sm:grid-cols-2">
                                <div className='h-full sm:max-h-full max-h-24 w-full col-span-1'>
                                    <img className='h-full w-full object-cover' src={importedImage}/>
                                </div>
                                <div className='col-span-1 sm:p-6 p-3'>
                                    <Dialog.Title as="h3" className="sm:text-4xl text-xl border-b pb-2 font-semibold leading-6 text-gray-900 items-center">
                                        Subscribe Now!
                                    </Dialog.Title>
                                    <p className='sm:py-4 py-1 tinyText text-justify'>
                                        News, discounts and exclusive offers, sent directly to your email. Don't miss out the opportunity and subscribe to Klued's newsletter now!
                                    </p>
                                    <form className="grid grid-cols-4 gap-x-4 gap-y-2 mt-2" onSubmit={submitHandler}>
                                        <div className="col-span-4 flex items-center gap-1">
                                            <input onChange={()=>{
                                                if (checked===false) {
                                                    setChecked(true)
                                                } else if (checked===true) {
                                                    setChecked(false)
                                                }
                                            }} id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                                            <div> </div>
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300 text-xs">
                                                I agree to Klued's <Link to={'/terms-of-use'} className='font-semibold cursor-pointer underline'>Terms and Policies</Link>.
                                            </label>
                                        </div>
                                        <div className='col-span-4'>
                                            <input onChange={e => setEmail(e.target.value)} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full sm:p-2.5 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required/>
                                        </div>
                                        
                                        <div className='col-span-4 grid grid-cols-4 gap-2 justify-center items-center'>
                                            <div className='col-span-2'>
                                                <button type="submit" className="relative text-center py-2 h-full w-full sm:px-3 px-1 font-bold rounded-lg before:bg-yellow-200 before:-z-10 bg-blue-400 z-0 text-slate-50 transition-colors before:absolute before:left-0 before:top-0 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:duration-300 hover:text-black before:hover:scale-x-100 overflow-hidden">Sure!</button>
                                            </div>
                                            <div className='col-span-2'>
                                                <button onClick={()=>setIsOpen(false)} type="button" className="text-gray-500 bg-gray-100 hover:bg-gray-200 w-full focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, thanks.</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
