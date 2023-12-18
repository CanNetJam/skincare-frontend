import React, { useEffect } from 'react';
import Navbar from '../Components/TopNav';
import ProductsView from '../Components/ProductsView';
import Footer from '../Components/Footer';
import NewProducts from '../Components/NewProducts';
import TiktokSlider from '../Components/TiktokSlider';

function Home() {
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
        <NewProducts />
      </div>

      <div>
        <TiktokSlider/>
      </div>

      <div>
        <ProductsView/>
      </div>
      <div>
        <Footer/>
      </div>

    </div>
  );
}

export default Home;