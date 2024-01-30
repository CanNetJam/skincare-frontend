import React, { useEffect, useState } from 'react';
import Navbar from '../Components/TopNav';
import ProductsView from '../Components/ProductsView';
import Footer from '../Components/Footer';
import NewProducts from '../Components/NewProducts';
import TiktokSlider from '../Components/TiktokSlider';
import VideoPlayer from '../Components/VideoPlayer';
import axios from "axios";
import EmailSubscription from '../Modals/EmailSubscription';
import { ToastContainer } from 'react-toastify';

import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';
import video4 from '../assets/video4.mp4';
import video5 from '../assets/video5.mp4';
import video6 from '../assets/video6.mp4';
import video7 from '../assets/video7.mp4';
import video8 from '../assets/video8.mp4';

function Home() {
  const videos = [
    {
      video: video1,
      item: [
        "6595fb567ddaf28e8fc64ce1",
        "659b6c5ec0db74dba1c1e7b5"
      ]
    }, 
    {
      video: video2,
      item: [
        "657f9590fcbd5a842ad66f03",
      ]
    }, 
    {
      video: video3,
      item: [
        "659b6c5ec0db74dba1c1e7b5",
      ]
    }, 
    {
      video: video4,
      item: [
        "6595fb567ddaf28e8fc64ce1",
        "659b6c5ec0db74dba1c1e7b5"
      ]
    }, 
    {
      video: video5,
      item: [
        "657f9590fcbd5a842ad66f03",
        "659b6c5ec0db74dba1c1e7b5"
      ]
    }, 
    {
      video: video6,
      item: [
        "659b6c5ec0db74dba1c1e7b5",
      ]
    },
    {
      video: video7,
      item: [
        "6595fb567ddaf28e8fc64ce1",
      ]
    }, 
    {
      video: video8,
      item: [
        "657f9590fcbd5a842ad66f03",
        "659b6c5ec0db74dba1c1e7b5"
      ]
    },  
  ]
  const prodVideos = [
    {
      video: video1,
      item: [
        "658a91fd5ac2ac596c97c126",
      ]
    }, 
    {
      video: video2,
      item: [
        "658a700a24f42f89038e840e",
        "658a9f93d90d279a936ea474"
      ]
    }, 
    {
      video: video3,
      item: [
        "658b7bb1b6b310876eb11c5d",
      ]
    }, 
    {
      video: video4,
      item: [
        "658b7bb1b6b310876eb11c5d",
      ]
    }, 
    {
      video: video5,
      item: [
        "658a700a24f42f89038e840e",
        "658b690d1e6468d2fe2969fb",
        "658a700a24f42f89038e840e",
        "658a9f93d90d279a936ea474",
        "658a91fd5ac2ac596c97c126",
        "658a8a3619223a68746e19d6"
      ]
    }, 
    {
      video: video6,
      item: [
        "658b7bb1b6b310876eb11c5d",
      ]
    },
    {
      video: video7,
      item: [
        "658b7bb1b6b310876eb11c5d",
      ]
    }, 
    {
      video: video8,
      item: [
        "658a9f93d90d279a936ea474",
        "658a9a3f7afdf3e06d405dec"
      ]
    },  
  ]
  const [devidedVideos, setDevidedVideos] = useState([])
  const [ page, setPage ] = useState(0)
  const [ videoPlayer, setVideoPlayer ] = useState(false)
  const [ productData, setProductData ] = useState([])
  const [ isOpen, setIsOpen ] = useState(false)
  
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
            let collection = import.meta.env.DEV ? videos : prodVideos
            let index = 0
            let length = import.meta.env.DEV ? videos.length : prodVideos.length
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
  }, []) 

  return (
    <div>
      <Navbar/>
      {isOpen && (
        <EmailSubscription isOpen={isOpen} setIsOpen={setIsOpen}/>
      )}
      <NewProducts />
      <TiktokSlider
        videos={import.meta.env.DEV ? videos : prodVideos}
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
      <div>
        <Footer/>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home;