import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function UpdateIngredient({isOpen, setIsOpen, updateIng, setUpdateIng, setUpdateIngList, product, setProduct}) {
    const CreatePhotoField = useRef()
  
    async function submitHandler(e) {
        e.preventDefault()
        let tempList = product.ingredients
        tempList[updateIng.index] = updateIng.data
        setProduct({...product, ingredients: tempList })

        setUpdateIngList(prev=>prev.concat([updateIng]))
        setUpdateIng({
            index: "",
            data: {
                name: "",
                desc: "",
                photo: ""
            }
        })
        setIsOpen(false)
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
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex sm:h-screen h-auto items-center justify-center p-4 text-center">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                            >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white sm:p-10 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg border-b pb-2 font-medium leading-6 text-gray-900 grid grid-cols-2 items-center">
                                Update Ingredient
                                <button onClick={()=>setIsOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                </Dialog.Title>

                                <form className="grid gap-2 mt-2" onSubmit={submitHandler}>
                                    <div >
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                                        <input required onChange={e => setUpdateIng({...updateIng, data: {
                                            ...updateIng.data, name: e.target.value
                                        }})} value={updateIng.data.name} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Juan, Pedro..." />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo:</label>
                                        <div className='relative'>
                                            {typeof updateIng.data.photo==="string" ? 
                                                <img className='h-[150px] w-full object-cover' src={`https://klued-uploads.s3.ap-southeast-1.amazonaws.com/${updateIng.data.photo}`}></img>
                                            :
                                                <img className="h-[150px] w-full object-cover" src={URL.createObjectURL(updateIng.data.photo)}></img>
                                            }
                                            <label className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white hover:bg-opacity-90">
                                                <svg
                                                className="fill-current"
                                                width="30"
                                                height="30"
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
                                                <input ref={CreatePhotoField} onChange={
                                                    e => setUpdateIng({...updateIng, data: 
                                                        {...updateIng.data, photo: e.target.files[0]}
                                                    })
                                                } type="file" className="sr-only"/>
                                            </label>
                                        </div>
                                    </div>
                                    <div >
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
                                        <textarea rows="5" required onChange={e => setUpdateIng({...updateIng, data: {
                                            ...updateIng.data, desc: e.target.value
                                        }})} value={updateIng.data.desc} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Dela Cruz, Garcia..." />
                                    </div>
                                    
                                    <br/>
                                    <div>
                                        <button type="submit" className={`w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Update</button>
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
