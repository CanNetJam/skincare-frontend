import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteProduct({isDelete, setIsDelete, toDelete, setToDelete}) {

    function toastErrorNotification() {
        toast.error('Delete product error!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
    }
  
    function toastSuccessNotification() {
        toast.success(`Successfully deleted a product.`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
    }

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/product/delete-product/${toDelete._id}`, { headers: { "Content-Type": "application/json" } })
            if (res.data) {
                toastSuccessNotification()
                setToDelete("")
                setIsDelete(false)
            } else {
                toastErrorNotification()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Transition appear show={isDelete} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={()=>setIsDelete(false)}>
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
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="flex items-center justify-center gap-2 text-lg font-medium leading-6 text-gray-900"
                    >
                        <label className='font-bold text-lg'>Delete Product</label>
                        <svg height="30" width="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill='red' d="m2.095 19.886 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367zm1.935-.384h15.939l-7.97-14.219zm7.972-6.497c-.414 0-.75.336-.75.75v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5c0-.414-.336-.75-.75-.75zm-.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"/></svg>
                        
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-600 text-center">
                            You are about to delete the details about the product <b>{toDelete.name}</b>. 
                        <br/>
                        <br/>
                            This action is irreversible, please proceed with caution. This email will be deleted <b>forever</b> and can not be recovered.
                        </p>
                    </div>

                    <div className="pt-2 mt-6 border-t-2 flex justify-center items-center">
                        <button
                        type="button"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                        onClick={()=>handleDelete()}
                        >
                        Confirm Delete
                        </button>
                        <button onClick={()=>setIsDelete(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
    )
}