import React, { useEffect, useState } from 'react';
import { useLocation, useParams} from 'react-router';
import axios from 'axios';
import Approvals from '../Components/Approvals';
import Hero from '../Components/Hero';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import OrderNow from '../Components/OrderNow';
import Features from '../Components/Features';
import MoreInfo from '../Components/MoreInfo';
import Precautions from '../Components/Precautions';
import Routines2 from '../Components/Routines2';
import EmailSubscription from '../Modals/EmailSubscription';
import ProductReview from '../Components/ProductReview';

export default function Package1() {
    const location = useLocation()
    const {id} = useParams()
    const [ packageData, setPackageData ] = useState({})
    const [ isOpen, setIsOpen ] = useState(false)

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])

    useEffect(()=> {
        const showPopup = () => {
        let token = localStorage.getItem("auth-token")
        if (token === null){
            localStorage.setItem("auth-token", "")
            token = ""
        }

        if (token==="" || token===null || token===undefined) {
            setTimeout(()=>{
                setIsOpen(true)
            }, 5000)
        }
        }
        showPopup()
    }, [])

    useEffect(()=> {
        const getProduct = async () => {
            try {
                const packageSet = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/package/get-package`, {params: {
                    packageid: id ? id : location.state?.packageid
                }})
                setPackageData(packageSet.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProduct()
    }, [])
    
    return (
        <div>
            <Navbar/>
            {isOpen && (
                <EmailSubscription isOpen={isOpen} setIsOpen={setIsOpen}/>
            )}
            <Hero packageData={packageData}/>
            <MoreInfo packageData={packageData}/>
            <Approvals/>
            <Features packageData={packageData} packageItems={packageData.items ? packageData.items : []}/>
            <Routines2 packageData={packageData} morning={packageData?.routines?.morning ? packageData.routines.morning : []} night={packageData?.routines?.night ? packageData.routines.night : []}/>
            <Precautions />
            <ProductReview id={id} secondid={location.state?.packageid} mode={"View"}/>
            <OrderNow productlinks={packageData?.packagelinks}/>
            <Footer/>
        </div>
    )
}
