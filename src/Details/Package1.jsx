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

export default function Package1() {
    const location = useLocation()
    const {id} = useParams()
    const [ packageData, setPackageData ] = useState({})
    
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
        const getProduct = async () => {
            try {
                const packageSet = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://kluedskincare-backend.onrender.com'}/package/get-package`, {params: {
                    packageid: id ? id : location.state.packageid
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
            <Hero packageData={packageData}/>
            <MoreInfo packageData={packageData}/>
            <Approvals/>
            <Features packageData={packageData} packageItems={packageData.items ? packageData.items : []}/>
            <Routines2 packageData={packageData} morning={packageData?.routines?.morning ? packageData.routines.morning : []} night={packageData?.routines?.night ? packageData.routines.night : []}/>
            <Precautions />
            <OrderNow/>
            <Footer/>
        </div>
    )
}
