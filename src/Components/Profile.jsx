import { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from "../App";
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoPersonCircleOutline } from "react-icons/io5";
import { useLocation, useParams } from 'react-router';

const Profile = () => {
    const location = useLocation()
    const { userData, setUserData } = useContext(UserContext)
    const [ isEditing, setIsEditing ] = useState(false)
    const [ iD, setId ] = useState("")
    const [ draftFirstname, setDraftFirstName ] = useState("")
    const [ draftLastname, setDraftLastName ] = useState("")
    const [ draftPhone, setDraftPhone ] = useState("")
    const [ file, setFile ] = useState()
    const CreatePhotoField = useRef()
    const [ profileData, setProfileData ] = useState({})
    const {id} = useParams()

    console.log("product id: "+id)
    console.log("location: "+location?.state?.profileid)

    useEffect(()=> {
        const getProfile = async () => {
            try {
                const profile = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://skincare-backend.onrender.com'}/accounts/get-profile`, {params: {
                    profileid: id ? id : location.state.profileid
                }})
                setProfileData(profile.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProfile()
    }, [isEditing])

    async function submitHandler(e) {
        e.preventDefault()

        const loadingNotif = async function myPromise() {
            const data = new FormData()
            let profileImage = ""
            if (file!==undefined){
                const signatureResponse = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://skincare-backend.onrender.com'}/get-signature` )

                const image = new FormData()
                image.append("file", file)
                image.append("api_key", import.meta.env.VITE_CLOUDAPIKEY)
                image.append("signature", signatureResponse.data.signature)
                image.append("timestamp", signatureResponse.data.timestamp)

                const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNAME}/auto/upload`, image, {
                headers: { "Content-Type": "multipart/form-data" }
                })
                let cloud_image = cloudinaryResponse.data.public_id
                data.append("displayimage", cloud_image)
                profileImage = cloud_image
            }
            let token = localStorage.getItem("auth-token")
            data.append("firstname", draftFirstname)
            data.append("lastname", draftLastname)
            data.append("phone", draftPhone)
            const res = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://skincare-backend.onrender.com'}/accounts/update-account/${iD}`, data, 
            { headers: { "Content-Type": "application/json" }, "auth-token": token })
            console.log(res.data)

            if (res.data) {
                setProfileData({
                    ...profileData, displayimage: profileImage, firstname: draftFirstname, lastname: draftLastname, phone: draftPhone
                })
                profileImage = ""
                setDraftFirstName("")
                setDraftLastName("")
                setDraftPhone("")
                setId("")
                CreatePhotoField.current.value = ""
                setIsEditing(false)
            }
        }
        toast.promise(
            loadingNotif,
            {
            pending: 'Processing profile update...',
            success: 'Profile update success.',
            error: 'Profile update failed!'
            }
        )
    }

    return (
        <>
            <Navbar/>
            <div className="bg-gray-100 mt-16 grid justify-center">
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        <div className="col-span-4 sm:col-span-3">
                            <div className="bg-white shadow rounded-lg p-6">
                                <div className="flex flex-col items-center">
                                    <div className='w-full grid justify-center px-4 py-2 relative'>
                                        {isEditing && (
                                            <label className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white hover:bg-opacity-90">
                                            <svg
                                            className="fill-current"
                                            width="20"
                                            height="20"
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
                                            <input ref={CreatePhotoField} onChange={e => setFile(e.target.files[0])} type="file" className="sr-only"/>
                                            </label>
                                        )}
                                        {profileData?.displayimage ? 
                                        <img className='w-32 h-32 rounded-full mb-4 shrink-0 object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${profileData?.displayimage}.jpg`}></img>
                                        :
                                        <IoPersonCircleOutline className='w-32 h-32'/>
                                        }
                                    </div>
                                    <h1 className="text-xl font-bold">{profileData?.firstname +" "+ profileData?.lastname}</h1>
                                    <p className="text-blue-500 font-semibold">{profileData?.department}</p>
                                </div>
                                <hr className="my-2 border-t border-gray-300"/>
                                <div className="flex flex-col">
                                    <p className="text-gray-700 text-center">{profileData?.job}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 sm:col-span-9">
                        <div className="bg-white max-w-2xl shadow overflow-hidden  rounded-lg">
                            <div className="px-4 py-5 sm:px-6 flex justify-between">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        User data
                                    </h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Details and informations about user.
                                    </p>
                                </div>
                                {userData?.user?._id===profileData?._id ? 
                                    <>
                                        <label onClick={()=>{
                                            if (isEditing===false) {
                                                setIsEditing(true)

                                                setDraftFirstName(profileData?.firstname)
                                                setDraftLastName(profileData?.lastname)
                                                setDraftPhone(profileData?.phone)
                                                setId(profileData?._id)
                                            } else {
                                                setIsEditing(false)
                                            }
                                        }} className="flex cursor-pointer items-center justify-center gap-2 rounded bg-blue-500 py-1 px-2 text-sm font-medium text-white hover:bg-opacity-80 sm:px-4">
                                            <span>Edit</span>
                                        </label>
                                    </>
                                :null}
                            </div>
                            <form onSubmit={submitHandler} className="border-t border-gray-200">
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Full name
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {isEditing===false ? 
                                            <>
                                            {profileData?.firstname +" "+ profileData?.lastname}
                                            </>
                                        :<>
                                        <div className=''>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name:</label>
                                            <input onChange={e => setDraftFirstName(e.target.value)} value={draftFirstname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jose, Maria..." />
                                        </div>
                                        <div className=''>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name:</label>
                                            <input onChange={e => setDraftLastName(e.target.value)} value={draftLastname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Dela Cruz, Garcia..." />
                                        </div>
                                        </>}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Contact number
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {isEditing===false ? 
                                        <>
                                            {profileData?.phone ? profileData?.phone : <i>Not specified.</i>}
                                        </>
                                    :<>
                                        <div className=''>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact number:</label>
                                            <input onChange={e => setDraftPhone(e.target.value)} value={draftPhone} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0971263727" />
                                        </div>
                                    </>}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Email address
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {profileData?.email ? profileData?.email : <i>Not specified.</i>}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Member since: 
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {moment(profileData?.createdAt).format('MMMM DD, YYYY')}
                                    </dd>
                                </div>

                                {isEditing===true ? 
                                    <div className="bg-white px-4 py-5 sm:grid sm:gap-4 sm:px-6 w-full grid justify-center">
                                        <button type='submit' className="flex cursor-pointer items-center justify-center gap-2 rounded bg-blue-500 py-1 px-2 text-sm font-medium text-white hover:bg-opacity-80 sm:px-4">Confirm</button>
                                    </div>
                                :null}
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            <ToastContainer />
        </>
    )
}

export default Profile

/*

<label
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-blue-500 py-1 px-2 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
            >
              <input type="file" name="cover" id="cover" className="sr-only" />
              <span>
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span>Edit</span>
            </label>

*/