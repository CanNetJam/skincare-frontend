import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ImageZoom({isZoom, setIsZoom, toZoom, zoomId, setZoomId}) {
    return (
        <>
            <Transition appear show={isZoom} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={()=>{
                    setIsZoom(false)
                    setZoomId("")
                    }}>
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
                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                            >
                            <Dialog.Panel className="relative h-auto w-auto max-h-screen transform overflow-y-auto bg-white text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="sticky top-0 bg-gray-100 h-12 text-lg border-b px-6 font-semibold leading-6 text-gray-900 flex items-center">
                                    Order ID: {zoomId} 
                                    <div className='absolute z-20 top-0 h-8 w-8 m-2 right-0 sm:text-4xl text-3xl grid justify-center items-center cursor-pointer' onClick={()=> {
                                        setIsZoom(false)
                                        setZoomId("")
                                    }}>
                                        <svg width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill='black' d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                                    </div>
                                </Dialog.Title>
                                <div className='px-6 py-2'>
                                    <img className='h-full w-full object-contain rounded-md overflow-hidden' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_80/${toZoom}.jpg`}></img>
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
