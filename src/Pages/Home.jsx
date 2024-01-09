import React, { useEffect, useRef } from 'react';
import Navbar from '../Components/TopNav';
import ProductsView from '../Components/ProductsView';
import Footer from '../Components/Footer';
import NewProducts from '../Components/NewProducts';
import TiktokSlider from '../Components/TiktokSlider';
import SubscriptionRedirect from '../Components/SubscriptionRedirect';

function Home() {
  const footerRef = useRef()

  const handleClick =() => {
    footerRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  useEffect(()=> {
    const windowOpen = () => {   
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    windowOpen()
}, [])

  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div>
        <SubscriptionRedirect  handleClick={handleClick}/>
      </div>
      <div>
        <NewProducts />
      </div>

      <div>
        <TiktokSlider/>
      </div>

      <div ref={footerRef}>
        <Footer/>
      </div>
    </div>
  )
}

export default Home;