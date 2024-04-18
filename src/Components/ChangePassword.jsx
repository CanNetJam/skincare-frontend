import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Settings({profileData}) {
    const { userData, setUserData } = useContext(UserContext)
    const [ password, setPassword ] = useState("")
    const [ isVerified, setIsVerified ] = useState(false)
    const [ newPassword, setNewPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ isConfirmed, setIsConfirmed ] = useState()
    const [ samePassword, setSamePassword ] = useState(false)
    const [ correctPass, setCorrectPass ] = useState()

    const [ showPassword, setShowPassword ] = useState(false)
    const [ showNewPassword, setShowNewPassword ] = useState(false)
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false)

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])

    useEffect(() => {
        const Confirm = async () => {
            if (password!=="") {
                if (password===newPassword) {
                    setSamePassword(true)
                }
                if (password!==newPassword) {
                    setSamePassword(false)
                    if (newPassword!=="" && confirmPassword!=="") {
                        if (newPassword===confirmPassword) {
                            setIsConfirmed(true)
                        }
                        if (newPassword!==confirmPassword) {
                            setIsConfirmed(false)
                        }
                    }
                }
            }
        }
        Confirm()
    }, [newPassword, confirmPassword])

    async function submitHandler(e) {
        e.preventDefault()
        let token = localStorage.getItem("auth-token")
        if (isVerified===false) {
            const res = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/accounts/check-password/${userData.user._id}/${password}`, {headers: {"auth-token": token}})
            setIsVerified(res.data)
            setCorrectPass(res.data)
        }
        if (isVerified===true) {
            const loadingNotif = async function myPromise() {
                setCorrectPass(true)
                if (samePassword===false) {
                    if (isConfirmed===true) {
                        const newPass = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/accounts/change-password/${userData.user._id}/${newPassword}`, {headers: {"auth-token": token}})
                        if (newPass.data===true) {
                            setCorrectPass(undefined)
                            setPassword("")
                            setNewPassword("")
                            setConfirmPassword("")
                            setIsVerified(false)
                        }
                    }
                }
            }
            toast.promise(
                loadingNotif,
                {
                pending: 'Updating user password...',
                success: 'Successfully changed password.',
                error: 'Password change failed!'
                }
            )
        }
    }

    async function handleDeactivate(e) {
        e.preventDefault()
        const loadingNotif = async function myPromise() {
            try {
                const data = new FormData()
                let token = localStorage.getItem("auth-token")
                await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/accounts/deactivate-account/${userData.user._id}`, data, { headers: { "Content-Type": "application/json", "auth-token": token } })
            } catch (err) {
                console.log(err)
            }
        }
        toast.promise(
            loadingNotif,
            {
                pending: 'Deactivating account...',
                success: 'Successfully deactivated your account.',
                error: 'Deactivation error!'
            }
        )
    }

    return (
        <div>
            <div className="flex flex-col gap-5 container mx-auto px-4 py-4 justify-center sm:px-10 h-auto w-full lg:py-0">
                <div className="w-full grid sm:grid-cols-6 p-6 bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <div className="sm:col-span-2">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                            Change Password
                        </h2>
                        <p>Update your password associated with your account.</p>
                    </div>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5 sm:col-span-4" onSubmit={submitHandler}>
                        <div>
                            <label htmlFor="old-password" className="flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password                         
                                {correctPass===false ?
                                    <div className="flex gap-1 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24"><path fill='red' d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
                                        <label className="font-semibold sm:text-base text-xs text-blue-500">Incorrect Password!</label>
                                    </div> 
                                :null}
                            </label>
                            <div className="relative flex items-center">
                                <input disabled={isVerified===true ? true : false} onChange={e => setPassword(e.target.value)} value={password} type={showPassword===false ? "password" : "text"} name="old-password" id="old-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                {showPassword===false ? 
                                    <svg onClick={()=>setShowPassword(true)} className="absolute right-2 z-10 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/></svg>
                                :
                                    <svg onClick={()=>setShowPassword(false)} className="absolute right-2 z-10 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.319 1.83c.966.943 1.803 2.014 2.474 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.297 0-2.553-.313-3.729-.849l1.247-1.096c.795.285 1.626.445 2.482.445 3.516 0 6.576-2.622 8.413-5.5-.595-.932-1.318-1.838-2.145-2.637zm-3.434 3.019c.03.197.046.399.046.605 0 2.208-1.792 4-4 4-.384 0-.756-.054-1.107-.156l1.58-1.389c.895-.171 1.621-.821 1.901-1.671zm-.058-3.818c-1.197-.67-2.512-1.077-3.898-1.077-3.465 0-6.533 2.632-8.404 5.5.853 1.308 1.955 2.567 3.231 3.549l1.728-1.519c-.351-.595-.553-1.289-.553-2.03 0-2.208 1.792-4 4-4 .925 0 1.777.315 2.455.843zm-2.6 2.285c-.378-.23-.822-.362-1.296-.362-1.38 0-2.5 1.12-2.5 2.5 0 .36.076.701.213 1.011z"/></svg>
                                }
                            </div>
                        </div>
                        {isVerified===true ?
                            <>
                                <div>
                                    <label htmlFor="password" className="sm:flex sm:justify-between grid mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password
                                        {samePassword===true ? 
                                            <div className="flex sm:gap-1 gap-3 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-4 sm:w-4 h-5 w-5" viewBox="0 0 24 24"><path fill='red' d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
                                                <label className="font-semibold sm:text-base text-xs text-blue-500">Your new password can not be the same with your old password!</label>
                                            </div>
                                        : null}
                                        {newPassword.length<6 && newPassword.length>0 ? 
                                            <div className="flex sm:gap-1 gap-3 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-4 sm:w-4 h-5 w-5" viewBox="0 0 24 24"><path fill='red' d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
                                                <label className="font-semibold sm:text-base text-xs text-blue-500">Password should not be less than 6 characters!</label>
                                            </div>
                                        : null}
                                        {newPassword.length>16 && newPassword.length>0 ? 
                                            <div className="flex sm:gap-1 gap-3 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-4 sm:w-4 h-5 w-5" viewBox="0 0 24 24"><path fill='red' d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
                                                <label className="font-semibold sm:text-base text-xs text-blue-500">Password should not exceed 16 characters!</label>
                                            </div>
                                        : null}
                                    </label>
                                    <div className="relative flex items-center">
                                        <input onChange={e => setNewPassword(e.target.value)} value={newPassword} type={showNewPassword===false ? "password" : "text"} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                        {showNewPassword===false ? 
                                            <svg onClick={()=>setShowNewPassword(true)} className="absolute right-2 z-10 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/></svg>
                                        :
                                            <svg onClick={()=>setShowNewPassword(false)} className="absolute right-2 z-10 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.319 1.83c.966.943 1.803 2.014 2.474 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.297 0-2.553-.313-3.729-.849l1.247-1.096c.795.285 1.626.445 2.482.445 3.516 0 6.576-2.622 8.413-5.5-.595-.932-1.318-1.838-2.145-2.637zm-3.434 3.019c.03.197.046.399.046.605 0 2.208-1.792 4-4 4-.384 0-.756-.054-1.107-.156l1.58-1.389c.895-.171 1.621-.821 1.901-1.671zm-.058-3.818c-1.197-.67-2.512-1.077-3.898-1.077-3.465 0-6.533 2.632-8.404 5.5.853 1.308 1.955 2.567 3.231 3.549l1.728-1.519c-.351-.595-.553-1.289-.553-2.03 0-2.208 1.792-4 4-4 .925 0 1.777.315 2.455.843zm-2.6 2.285c-.378-.23-.822-.362-1.296-.362-1.38 0-2.5 1.12-2.5 2.5 0 .36.076.701.213 1.011z"/></svg>
                                        }
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirm-password" className="sm:flex sm:justify-between grid mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password
                                        {isConfirmed===false ? 
                                            <div className="flex sm:gap-1 gap-3 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-4 sm:w-4 h-5 w-5" viewBox="0 0 24 24"><path fill='red' d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
                                                <label className="text-blue-500 sm:text-base text-xs font-semibold">New password does not match!</label>
                                            </div>
                                        : null}
                                    </label>
                                    <div className="relative flex items-center">
                                        <input onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} type={showConfirmPassword===false ? "password" : "text"} name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                        {showConfirmPassword===false ? 
                                            <svg onClick={()=>setShowConfirmPassword(true)} className="absolute right-2 z-10 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/></svg>
                                        :
                                            <svg onClick={()=>setShowConfirmPassword(false)} className="absolute right-2 z-10 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.319 1.83c.966.943 1.803 2.014 2.474 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.297 0-2.553-.313-3.729-.849l1.247-1.096c.795.285 1.626.445 2.482.445 3.516 0 6.576-2.622 8.413-5.5-.595-.932-1.318-1.838-2.145-2.637zm-3.434 3.019c.03.197.046.399.046.605 0 2.208-1.792 4-4 4-.384 0-.756-.054-1.107-.156l1.58-1.389c.895-.171 1.621-.821 1.901-1.671zm-.058-3.818c-1.197-.67-2.512-1.077-3.898-1.077-3.465 0-6.533 2.632-8.404 5.5.853 1.308 1.955 2.567 3.231 3.549l1.728-1.519c-.351-.595-.553-1.289-.553-2.03 0-2.208 1.792-4 4-4 .925 0 1.777.315 2.455.843zm-2.6 2.285c-.378-.23-.822-.362-1.296-.362-1.38 0-2.5 1.12-2.5 2.5 0 .36.076.701.213 1.011z"/></svg>
                                        }
                                    </div>
                                </div>

                            </>
                        :null}

                        <button disabled={isVerified!==true ? false :
                                newPassword!=="" && newPassword.length>=6 && newPassword.length<16 && confirmPassword!=="" && isConfirmed===true ? 
                                    false 
                                : 
                                    true
                            } type="submit" className={`${isVerified!==true ? 'cursor-pointer bg-blue-500 hover:bg-opacity-90' : 
                            newPassword!=="" && newPassword.length>=6 && newPassword.length<16 && confirmPassword!=="" && isConfirmed===true ? 
                                'cursor-pointer bg-blue-500 hover:bg-opacity-90'
                            : 
                                'bg-gray-400 text-gray-700'} px-2 text-sm font-medium text-white items-center justify-center gap-2 rounded py-3 flex sm:px-4`}>{isVerified===false ? "Verify password" : "Reset password"}</button>
                    </form>
                </div>

                <div className="w-full text-md grid p-6 bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <div className="h-auto w-full grid sm:flex sm:justify-between">
                        <h4 className="my-2 font-bold text-lg">{profileData.deactivated===true ? 'Activate my Account' : 'Deactivate my Account'}</h4>
                        <button onClick={(e)=>handleDeactivate(e)} className="relative text-center font-semibold py-1 w-auto sm:px-12 px-1 rounded-xl bg-slate-900 text-slate-50 hover:bg-slate-800">{profileData.deactivated===true ? 'Activate' : 'Deactivate'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
