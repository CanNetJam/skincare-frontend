import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../App";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeliveryDetails() {
    const { userData, setUserData } = useContext(UserContext)
    const [ isEditing, setIsEditing ] = useState(false)
    const [ draftRegion, setDraftRegion ] = useState("")
    const [ draftProvince, setDraftProvince ] = useState("")
    const [ draftCity, setDraftCity ] = useState("")
    const [ draftBarangay, setDraftBarangay ] = useState("")
    const [ draftPostal, setDraftPostal ] = useState("")
    const [ draftStreet, setDraftStreet ] = useState("")

    const [ regions, setRegions ] = useState([])
    const [ filteredRegions, setFilteredRegions ] = useState([])
    const [ selectedRegion, setSelectedRegion ] = useState(undefined)

    const [ provinces, setProvinces ] = useState([])
    const [ filteredProvinces, setFilteredProvinces ] = useState([])
    const [ selectedProvince, setSelectedProvince ] = useState(undefined)
    
    const [ cities, setCities ] = useState([])
    const [ filteredCities, setFilteredCities ] = useState([])
    const [ selectedCity, setSelectedCity ] = useState(undefined)

    const [ barangay, setBarangay ] = useState([])
    const [ filteredBarangay, setFilteredBarangay ] = useState([])
    const [ selectedBarangay, setSelectedBarangay ] = useState(undefined)

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [userData?.user])

    useEffect(()=> {
        const setDrafts = async () => {
            setDraftRegion(userData.user?.billingaddress?.region ? userData.user?.billingaddress?.region : "")
            setDraftProvince(userData.user?.billingaddress?.province ? userData.user?.billingaddress?.province : "")
            setDraftCity(userData.user?.billingaddress?.city ? userData.user?.billingaddress?.city : "")
            setDraftBarangay(userData.user?.billingaddress?.barangay ? userData.user?.billingaddress?.barangay : "")
            setDraftPostal(userData.user?.billingaddress?.postal ? userData.user?.billingaddress?.postal : "")
            setDraftStreet(userData.user?.billingaddress?.street ? userData.user?.billingaddress?.street : "")
        }
        setDrafts()
    }, [isEditing])

    useEffect(()=> {
        const getLocations = async () => {
            const res1 = await axios.get("https://psgc.gitlab.io/api/regions/")
            setRegions(res1.data)
        }
        getLocations()
    }, [])

    useEffect(() => {
        setFilteredRegions([])
        if (draftRegion!=="") {

            const data = regions?.filter((item) => (item.regionName.toUpperCase()).includes(draftRegion.toUpperCase()))
            setSelectedRegion(data[0])

            if (userData.user?.billingaddress?.region!==undefined) {
                setSelectedRegion(data[0])
            } 
            setSelectedProvince(undefined)
            setSelectedCity(undefined)
            setSelectedCity(undefined)
            setDraftProvince("")
            setDraftCity("")
            setDraftBarangay("") 
        }
    }, [draftRegion, regions])

    useEffect(()=> {
        const getLocations = async () => {
            if (selectedRegion!==undefined) {
                const res1 = await axios.get(`https://psgc.gitlab.io/api/regions/${selectedRegion?.code}/provinces/`)
                setProvinces(res1.data)
            }
        }
        getLocations()
    }, [selectedRegion])

    useEffect(() => {
        setFilteredProvinces([])
        if (draftProvince!=="") {
            const data = provinces?.filter((item) => (item.name.toUpperCase()).includes(draftProvince.toUpperCase()))
            setSelectedProvince(data[0])

            if (userData.user?.billingaddress?.province!==undefined) {
                setSelectedProvince(data[0])
            } 

        }
    }, [draftProvince, provinces])

    useEffect(()=> {
        const getLocations = async () => {
            if (selectedProvince!==undefined) {
                const res = await axios.get(`https://psgc.gitlab.io/api/provinces/${selectedProvince?.code}/cities-municipalities/ `)
                setCities(res.data)
            } else if (selectedRegion!==undefined && (draftProvince==="" || selectedProvince===undefined)) {
                const res = await axios.get(`https://psgc.gitlab.io/api/regions/${selectedRegion?.code}/cities-municipalities/`)
                setCities(res.data)
            }
        }
        getLocations()
    }, [selectedRegion, selectedProvince])

    useEffect(() => {
        setFilteredProvinces([])
        if (draftCity!=="") {
            const data = cities?.filter((item) => (item.name.toUpperCase()).includes(draftCity.toUpperCase()))
            setSelectedCity(data[0])

            if (userData.user?.billingaddress?.city!==undefined) {
                setSelectedCity(data[0])
            } 
        }
    }, [draftCity, cities])

    useEffect(()=> {
        const getLocations = async () => {
            if (selectedCity!==undefined) {
                if (selectedCity?.isCity===true) {
                    const res1 = await axios.get(`https://psgc.gitlab.io/api/cities/${selectedCity?.code}/barangays/`)
                    setBarangay(res1.data)
                } else if (selectedCity?.isMunicipality===true) {
                    const res1 = await axios.get(`https://psgc.gitlab.io/api/municipalities/${selectedCity?.code}/barangays`)
                    setBarangay(res1.data)
                }
            } else {
                if (selectedProvince!==undefined) {
                    const res1 = await axios.get(`https://psgc.gitlab.io/api/provinces/${selectedProvince?.code}/barangays/`)
                    setBarangay(res1.data)
                } else {
                    if (selectedRegion!==undefined) {
                        const res1 = await axios.get(`https://psgc.gitlab.io/api/regions/${selectedRegion?.code}/barangays/`)
                        setBarangay(res1.data)
                    } 
                }
            }
        }
        getLocations()
    }, [selectedCity, selectedProvince, selectedRegion])
    
    useEffect(() => {
        setFilteredProvinces([])
        if (draftBarangay!=="") {
            const data = barangay?.filter((item) => (item.name.toUpperCase()).includes(draftBarangay.toUpperCase()))
            setSelectedBarangay(data[0])
            
            if (userData.user?.billingaddress?.barangay!==undefined) {
                setSelectedBarangay(data[0])
            } 
        }
    }, [draftBarangay, barangay])

    async function submitHandler(e) {
        e.preventDefault()
        const loadingNotif = async function myPromise() {
            const data = new FormData()
            let token = localStorage.getItem("auth-token")
            data.append("region", draftRegion ? draftRegion : userData.user?.billingaddress?.region)
            data.append("province", draftProvince ? draftProvince : userData.user?.billingaddress?.province)
            data.append("city", draftCity ? draftCity : userData.user?.billingaddress?.city)
            data.append("barangay", draftBarangay ? draftBarangay : userData.user?.billingaddress?.barangay)
            data.append("postal", draftPostal!=="" ? draftPostal : userData.user?.billingaddress?.postal)
            data.append("street", draftStreet!=="" ? draftStreet : userData.user?.billingaddress?.street)
            const res = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/accounts/update-account/billing-address/${userData.user._id}`, data, 
            { headers: { "Content-Type": "application/json", "auth-token": token } })

            if (res.data) {
                setUserData({...userData, user: {
                    ...userData.user, billingaddress: {
                        region: draftRegion,
                        province: draftProvince,
                        city: draftCity,
                        barangay: draftBarangay,
                        postal: draftPostal,
                        street: draftStreet,
                    }
                }})
                setDraftRegion("")
                setDraftProvince("")
                setDraftCity("")
                setDraftBarangay("")
                setDraftPostal("")
                setDraftStreet("")
                
                setSelectedRegion(undefined)
                setSelectedProvince(undefined)
                setSelectedCity(undefined)
                setSelectedBarangay(undefined)
                setIsEditing(false)
            }
        }
        toast.promise(
            loadingNotif,
            {
            pending: 'Updating billing address...',
            success: 'Billing address updated.',
            error: 'Billing address failed!'
            }
        )
    }

    return (
        <div className='h-auto w-full px-4'>
            <div className='container mx-auto max-w-6xl grid sm:grid-cols-2 gap-6 py-6'>
                <div className='h-full w-full col-span-1 rounded-lg bg-gray-100 sm:p-10 p-4 shadow-md'>
                    <div className='flex justify-between items-center'>
                        <h1 className='font-bold sm:text-2xl my-2 text-blue-500'>
                            Billing Address
                        </h1>
                        <svg onClick={()=>{
                            if (isEditing===false) {
                                setIsEditing(true)
                            } else {
                                setIsEditing(false)
                            }
                        }} className='cursor-pointer' height='30' width='30' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"/></svg>
                    </div>
                    {isEditing===false ?
                        <>
                            { (userData.user?.billingaddress?.street==="" && userData.user?.billingaddress?.barangay==="" && userData.user?.billingaddress?.city==="" && userData.user?.billingaddress?.province==="" && userData.user?.billingaddress?.region==="" && userData.user?.billingaddress?.postal==="") ||
                            (userData.user?.billingaddress?.street===undefined && userData.user?.billingaddress?.barangay===undefined && userData.user?.billingaddress?.city===undefined && userData.user?.billingaddress?.province===undefined && userData.user?.billingaddress?.region===undefined && userData.user?.billingaddress?.postal===undefined) ? 
                                <p>No Data.</p>
                            :
                                <p className='text-black'>
                                    {userData.user?.billingaddress?.street!=='Not applicable' ? userData.user?.billingaddress?.street+", " : null}
                                    {userData.user?.billingaddress?.barangay!=='Not applicable' ? userData.user?.billingaddress?.barangay+", " : null} 
                                    {userData.user?.billingaddress?.city!=='Not applicable' ? userData.user?.billingaddress?.city+", " : null} 
                                    {userData.user?.billingaddress?.province!=='Not applicable' ? userData.user?.billingaddress?.province+", " : null} 
                                    {userData.user?.billingaddress?.region!=='Not applicable' ? userData.user?.billingaddress?.region+", " : null} 
                                    {userData.user?.billingaddress?.postal+"."}
                                </p>
                            }
                        </>
                    : 
                    <form onSubmit={submitHandler} className="">
                        <div className="bg-gray-50 rounded-xl px-4 py-5 sm:grid sm:gap-2 sm:px-6">
                            <div className='pb-4'>
                                <label className="font-semibold block mb-2 text-sm text-gray-900 dark:text-white">Region:</label>
                                
                                <select required value={draftRegion}
                                        onChange={(e)=>{
                                            setDraftRegion(e.target.value)
                                        }} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="" disabled>Select region</option>
                                    {regions?.map((a, index)=> {
                                        return <option value={a.regionName} className="cursor-pointer hover:bg-gray-200" key={index}>{a.regionName}</option>
                                    })}
                                </select>
                            </div>

                            <div className='relative pb-4'>
                                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Province:</label>
                                <select required value={draftProvince}
                                        onChange={(e)=>{
                                            setDraftProvince(e.target.value)
                                        }} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="" disabled>Select province</option>
                                    {provinces?.map((a, index)=> {
                                        return <option value={a.name} className="cursor-pointer hover:bg-gray-200" key={index}>{a.name}</option>
                                    })}
                                    {provinces.length<1 && (
                                        <option value="Not applicable">Not applicable</option>
                                    )}
                                </select>
                            </div>

                            <div className='relative pb-4'>
                                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">City:</label>
                                <select required value={draftCity}
                                        onChange={(e)=>{
                                            setDraftCity(e.target.value)
                                        }} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="" disabled>Select city</option>
                                    {cities?.map((a, index)=> {
                                        return <option value={a.name} className="cursor-pointer hover:bg-gray-200" key={index}>{a.name}</option>
                                    })}
                                    {cities.length<1 && (
                                        <option value="Not applicable">Not applicable</option>
                                    )}
                                </select>
                            </div>

                            <div className='relative pb-4'>
                                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Barangay:</label>
                                <select required value={draftBarangay}
                                        onChange={(e)=>{
                                            setDraftBarangay(e.target.value)
                                        }} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="" disabled>Select barangay</option>
                                    {barangay?.map((a, index)=> {
                                        return <option value={a.name} className="cursor-pointer hover:bg-gray-200" key={index}>{a.name}</option>
                                    })}
                                    {barangay.length<1 && (
                                        <option value="Not applicable">Not applicable</option>
                                    )}
                                </select>
                            </div>

                            <div className='pb-4'>
                                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Postal Code:</label>
                                <input required onChange={e => setDraftPostal(e.target.value)} value={draftPostal} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className='pb-4'>
                                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Street, Building, House Number or Landmark:</label>
                                <input required onChange={e => setDraftStreet(e.target.value)} value={draftStreet} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                            <div className="px-4 py-4 sm:grid sm:gap-4 sm:px-6 w-full grid justify-center">
                                <button type='submit' className="flex cursor-pointer items-center justify-center gap-2 rounded bg-blue-500 py-3 px-10 sm:text-base text-sm font-bold text-white hover:bg-opacity-80">Update</button>
                            </div>
                        </div>
                    </form>
                    }
                </div>
            </div>
        </div>
    )
}

/*

                <div className='h-full w-full col-span-1 rounded-lg bg-blue-300 p-10'>
                    <div className='flex justify-between items-center'>
                        <h1 className='font-bold sm:text-xl my-2'>
                            Payment Method
                        </h1>
                        <svg className='cursor-pointer' height='30' width='30' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"/></svg>
                    </div>
                    <p>
                        Gcash: 098713647257
                    </p>
                </div>
*/