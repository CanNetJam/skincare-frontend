import React, { useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router';
import axios from "axios";
import Routines from "../Components/Routines";
import Precautions from "../Components/Precautions";
import DoDonts from "../Components/DoDonts";
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import Usage from '../Components/Usage';
import OrderNow from '../Components/OrderNow';

export default function Product1() {
    const location = useLocation()
    const {id} = useParams()
    const [ productData, setProductData ] = useState({})
    
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
                const product = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/product/get-product`, {params: {
                    productid: id ? id : location.state.productid
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
                    <div className="py-8">
                        <h1 className="subHeading">{productData.name}</h1>
                        <br/>
                        <p className="tinyText whitespace-pre-wrap break-normal text-justify">{productData.maindesc}</p>
                    </div>
                    <br/>
                    <div className="flex justify-center"><h3 className="subHeading">Key Ingredients</h3></div>
                    <br/>
                    {productData.ingredients?.map((a, index)=> {
                        return (
                            <div key={index} className="w-full grid justify-center my-8 bg-gray-50 backdrop-blur-sm bg-opacity-40 rounded-xl p-4">
                                <div className="flex justify-center">
                                    <img className='h-[25vh] sm:w-[250px] rounded-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_80/${a.photo}.jpg`}></img>
                                </div>
                                <br/>
                                <div className="w-full">
                                    <h5 className="contentHeading text-blue-400 text-center">{a.name}</h5>
                                    <p className="tinyText sm:text-center text-justify mt-4 first-letter:uppercase">{a.desc}</p>
                                </div>
                            </div>
                        )   
                    })}

                </div>
                <div className='h-screen w-full sticky top-0 items-center sm:overflow-hidden'>
                    {productData?.displayimage ? 
                        <img className='h-full w-full object-cover z-10 overflow-visible' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_60/${productData.displayimage}.jpg`}></img>
                    :null}
                </div>
            </div>
            <Usage usage={productData?.usage} extra={productData?.extra} moreimage={productData?.moreimage ? productData.moreimage : []}/>
            <Routines routines={productData?.routines}/>
            {productData?.do ?
                <>
                    {productData.do[0]!==undefined && productData.dont[0]!==undefined ? 
                        <DoDonts proddo={productData?.do ? productData?.do : []} proddont={productData?.dont ? productData?.dont : []}/>
                    :null}
                </>
            :null}
            <Precautions />
            <OrderNow productlinks={productData?.productlinks}/>
            <Footer/>
        </>
    )
}