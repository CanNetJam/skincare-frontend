import React, { useEffect, useState } from 'react';
import Navbar from '../Components/TopNav';
import ProductsView from '../Components/ProductsView';
import Footer from '../Components/Footer';
import NewProducts from '../Components/NewProducts';
import TiktokSlider from '../Components/TiktokSlider';
import VideoPlayer from '../Components/VideoPlayer';
import axios from "axios";
import EmailSubscription from '../Modals/EmailSubscription';

function Home() {
    const [devidedVideos, setDevidedVideos] = useState([])
    const [ page, setPage ] = useState(0)
    const [ videoPlayer, setVideoPlayer ] = useState(false)
    const [ productData, setProductData ] = useState([])
    const [ isOpen, setIsOpen ] = useState(false)
    const [ fetchedVideos, setFetchedVideos ] = useState([])

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
        const getProducts = async () => {
            try {
                const res = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/videos/all-videos`)
                setFetchedVideos(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [])

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
                setProductData([])
                let outcomeData = []
                let currentVideo = devidedVideos[page] || []

                for (let i=0; i<currentVideo[0]?.item?.length; i++) {
                const product = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/product/get-product`, {params: {
                    productid: currentVideo[0].item[i]
                }})
                if (product.data!==null) {
                    outcomeData.push(product.data)
                } else if (product.data===null) {
                    const packageSet = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/package/get-package`, {params: {
                        packageid: currentVideo[0].item[i]
                    }})

                    if (packageSet.data) {
                        outcomeData.push(packageSet.data)
                    } else {
                        setProductData([])
                    }
                }
                }
                setProductData(outcomeData)
            } catch (err) {
                console.log(err)
            }
        }
        getProduct()
    }, [page, videoPlayer])

    useEffect(()=> {
        const setSliderArray = async ()=> {
            try {
                let collection = fetchedVideos
                let index = 0
                let length = fetchedVideos.length
                let size = 1
                setDevidedVideos([])
                let slice = (source, index) => source.slice(index, index + size)
                while (index < length) {
                    let temp = [slice(collection, index)]
                    setDevidedVideos(prev=>prev.concat(temp))
                    index += size
                }
            } catch (err) {
                console.log(err)
            }
        }
        setSliderArray()
    }, [fetchedVideos]) 

    return (
        <div>
            <Navbar/>
            {isOpen && (
                <EmailSubscription isOpen={isOpen} setIsOpen={setIsOpen}/>
            )}

            <NewProducts />
            {fetchedVideos.length>0 ? 
                <>
                    <TiktokSlider
                        // videos={import.meta.env.DEV ? videos : prodVideos}
                        videos={fetchedVideos}
                        setVideoPlayer={setVideoPlayer}
                        videoPlayer={videoPlayer}
                        setPage={setPage}
                        page={page}
                    />
                    {videoPlayer===true ? 
                        <VideoPlayer 
                        setVideoPlayer={setVideoPlayer}
                        devidedVideos={devidedVideos}
                        setPage={setPage}
                        page={page}
                        productData={productData}
                        />
                    :null}
                </>
            :null}
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default Home;