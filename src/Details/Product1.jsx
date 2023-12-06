import React, { useEffect, useState } from "react";
import { useLocation} from 'react-router';
import axios from "axios";
import Routines from "../Components/Routines";
import Precautions from "../Components/Precautions";
import DoDonts from "../Components/DoDonts";
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import Usage from '../Components/Usage';
import OrderNow from '../Components/OrderNow';

export default function Product1() {
    const location = useLocation()
    const [ productData, setProductData ] = useState({})

    useEffect(()=> {
        const getProduct = async () => {
            try {
                const product = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://skincare-backend.onrender.com'}/product/get-product`, {params: {
                    productid: location.state.productid
                }})
                setProductData(product.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProduct()
    }, [])

    return (
        <>
            <div>
                <Navbar/>
            </div>
            <div className="h-full w-full flex container mx-auto sm:px-10 gap-0">
                <div className="min-h-[200vh] h-auto w-full sm:px-20 z-10 px-4 py-16">
                    <div className="pb-10">
                        <h1 className="subHeading">{productData.name}</h1>
                        <br/>
                        <p className="tinyText whitespace-pre-wrap break-normal text-justify indent-10">{productData.maindesc}</p>
                    </div>
                    <br/>
                    <div className="flex justify-center"><h3 className="subHeading">Key Ingredients</h3></div>
                    <br/>
                    {productData.ingredients?.map((a, index)=> {
                        return (
                            <div key={index} className="w-full grid my-8 bg-gray-50 backdrop-blur-sm bg-opacity-60 rounded-xl p-4">
                                <div className="max-h-[50vh]">
                                    <img loading="lazy" className='h-full w-full rounded-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${a.photo}.jpg`}></img>
                                </div>
                                <br/>
                                <h5 className="contentHeading text-blue-400 text-center">{a.name}</h5>
                                <p className="smallText sm:text-center text-justify mt-4">{a.desc}</p>
                            </div>
                        )   
                    })}

                </div>
                <div className='h-screen w-full sticky top-0 items-center sm:overflow-hidden'>
                    {productData?.displayimage ? 
                        <img className='h-full w-full object-cover z-10 overflow-visible' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${productData.displayimage}.jpg`}></img>
                    :null}
                </div>
            </div>
            <Usage usage={productData?.usage} extra={productData?.extra} moreimage={productData?.moreimage ? productData.moreimage : []}/>
            <Routines />
            <Precautions />
            <DoDonts />
            <OrderNow productlinks={productData?.productlinks}/>
            <Footer/>
        </>
    )
}