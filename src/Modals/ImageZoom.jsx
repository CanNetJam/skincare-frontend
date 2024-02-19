import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PdfViewer from '../Components/PdfViewer';

export default function ImageZoom({isZoom, setIsZoom, toZoom, zoomId, setZoomId, zoomType}) {

    return (
        <>
            <Transition appear show={isZoom} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={()=>{
                    setIsZoom(false)
                    if (zoomId) {
                        setZoomId("")
                    }
                    
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
                            <Dialog.Panel className="relative h-auto w-screen max-h-screen transform overflow-y-auto bg-white text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="sticky top-0 bg-white h-10 text-lg border-b px-6 font-semibold leading-6 text-gray-900 flex items-center z-50 shadow-md shadow-gray-300">
                                    {zoomId ? 
                                        <label>Order ID: {zoomId}</label>
                                    :null}
                                    <div className='absolute z-20 top-0 h-6 w-6 m-2 right-0 sm:text-4xl text-3xl grid justify-center items-center cursor-pointer' onClick={()=> {
                                        setIsZoom(false)
                                        if (zoomId) {
                                            setZoomId("")
                                        }
                                    }}>
                                        <svg width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill='black' d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                                    </div>
                                </Dialog.Title>
                                <div className='sm:px-6 px-2 py-2 bg-gray-100 '>
                                    {zoomType==="String" ? 
                                        <img className='h-full w-full object-contain rounded-md overflow-hidden shadow-md shadow-black' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_80/${toZoom}.jpg`}></img>
                                    :
                                        <PdfViewer className='h-full w-full object-contain rounded-md overflow-hidden shadow-md shadow-black' pdfFile={toZoom}/>
                                    }
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
