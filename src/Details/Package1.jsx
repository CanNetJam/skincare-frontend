import React, { useEffect, useState } from 'react';
import { useLocation, useParams} from 'react-router';
import axios from 'axios';
import Approvals from '../Components/Approvals';
import Hero from '../Components/Hero';
import Features from '../Components/Features';
import MoreInfo from '../Components/MoreInfo';
import Precautions from '../Components/Precautions';
import Routines2 from '../Components/Routines2';
import EmailSubscription from '../Modals/EmailSubscription';
import ProductReview from '../Components/ProductReview';
import { Helmet } from 'react-helmet-async';

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

    const packageDetails = {
        "@context": "https://schema.org",
        "@type": "Product",
        "description": packageData.maindesc,
        "name": packageData.name,
        "image": `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_40/${packageData.displayimage}.jpg`,
        "aggregateRating": {
            "@type": "AggregateRating",
            "bestRating": "5",
            "ratingCount": "10",
            "ratingValue": "4.5"
        },
        "offers": {
            "@type": "Offer",
            "price": packageData.disprice,
            "priceCurrency": "PHP",
            "priceValidUntil": "2024-12-31",
            "availability": packageData.stock>0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": 45,
                  "currency": "PHP"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "PH"
                },
                "deliveryTime": {
                  "@type": "ShippingDeliveryTime",
                  "handlingTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 2,
                    "maxValue": 3,
                    "unitCode": "DAY"
                  },
                  "transitTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 1,
                    "maxValue": 5,
                    "unitCode": "DAY"
                  }
                }
            },
            "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "PH",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                "merchantReturnDays": 60,
                "returnMethod": "https://schema.org/ReturnByMail",
                "returnFees": "http://schema.org/ReturnFeesCustomerResponsibility"
            }
        },
        "review": [
            {
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": "Juan Delacruz"
                },
                "datePublished": "2024-04-01",
                "reviewBody": "The product works well with my skin type.",
                "name": "Satisfied customer",
                "reviewRating": {
                    "@type": "Rating",
                    "bestRating": "5",
                    "ratingValue": "5",
                    "worstRating": "1"
                }
            },
            {
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": "Pedro Santa Maria"
                },
                "datePublished": "2024-03-25",
                "reviewBody": "Does not have any fragrance, just what I need.",
                "name": "Odorless",
                "reviewRating": {
                    "@type": "Rating",
                    "bestRating": "5",
                    "ratingValue": "4",
                    "worstRating": "1"
                }
            },
            {
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": "Maria Evanghelista"
                },
                "datePublished": "2024-08-15",
                "reviewBody": "Tried for the first time and surprisngly felt good.",
                "name": "Value purchase",
                "reviewRating": {
                  "@type": "Rating",
                  "bestRating": "5",
                  "ratingValue": "5",
                  "worstRating": "1"
                }
            }
        ]
    }
    
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{packageData.name}</title>
                <link rel="canonical" href={`${import.meta.env.DEV ? 'http://localhost:5173/' : 'https://kluedskincare.com/'}packages/${(packageData?.name?.replace(/\s+/g, '-'))?.replace(/[^a-zA-Z0-9--]/g, '')?.toLowerCase()}/${packageData._id}`} />
                <meta name="description" content={packageData?.maindesc?.slice(0, 170)}/>
                <meta name="theme-color" content="#38bdf8"/>

                <meta property="og:title" content={packageData.name}/>
                <meta property="og:type" content="website"/>
                <meta property="og:description" content={packageData?.maindesc?.slice(0, 170)}/>
                <meta property="og:image" content={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_50/${packageData?.displayimage}.jpg`}/>
                <meta property="og:url" content={`https://kluedskincare.com/products/${(packageData?.name?.replace(/\s+/g, '-'))?.replace(/[^a-zA-Z0-9--]/g, '')?.toLowerCase()}/${packageData._id}`}/>
            
                <script type="application/ld+json">
                    {JSON.stringify(packageDetails)}
                </script>
            </Helmet>

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
        </div>
    )
}
