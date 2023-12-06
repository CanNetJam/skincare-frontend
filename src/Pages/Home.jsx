import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import ProductsOffer from '../Components/ProductsOffer';
import ProductsView from '../Components/ProductsView';
import photo1 from '../assets/15.jpg';
import photo3 from '../assets/17.jpg';
import photo4 from '../assets/3.jpg';
import photo5 from '../assets/6.jpg';
import photo6 from '../assets/14.jpg';
import Footer from '../Components/Footer';
import NewProducts from '../Components/NewProducts';
import TiktokSlider from '../Components/TiktokSlider';

function Home() {
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
        <Footer/>
      </div>

    </div>
  );
}

export default Home;

/*
      <div>
       

        <div className="carousel w-full relative">
  <div id="slide1" className="carousel-item relative w-full">
    <img src={photo4} className="w-full h-80 object-cover" />
    <div className="absolute flex justify-between items-center transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src={photo5} className="w-full h-80 object-cover" />
    <div className="absolute flex justify-between items-center transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src={photo6} className="w-full h-80 object-cover" />
    <div className="absolute flex justify-between items-center transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>

</div>

      </div>
      <div >
      <section>
  <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
      <div className="grid p-6 bg-gray-200 rounded place-content-center sm:p-8">
        <div className="max-w-md mx-auto text-center lg:text-left">
          <header>
            
            <h2 className="text-xl font-semibold text-gray-900 sm:text-3xl font-century-gothic ">Multi-Hyaluronic Acid Complex Serum</h2>

            <p className="mt-4 text-gray-700">
            Experience the ultimate skin hydration and plumping effect with our advanced formula, combining 6 molecular weights of Hyaluronic Acid designed to quench dry and dehydrated skin while reducing the look of fine lines. Experience a bouncy, plump, and youthful skin all day.
            </p>
          </header>

          <Link
            to="/products"
            className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray-800 border border-gray-800 rounded hover:shadow hover:bg-gray-900 focus:outline-none focus:ring"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="lg:col-span-2 lg:py-8">
        <ul className="grid grid-cols-2 gap-4">
          <li>
            <a href="#" className="block group">
              <img
              
                src={photo1}
                alt=""
                className="object-cover w-full rounded aspect-square"
              />
              

              <div className="mt-3">
                <h3
                  className=" text-sm text-gray-900 group-hover:underline group-hover:underline-offset-4"
                >
                  New Product
                </h3>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="block group">
              <img
                src={photo3}
                alt=""
                className="object-cover w-full rounded aspect-square"
              />

              <div className="mt-3">
                <h3
                  className=" text-sm text-gray-900 group-hover:underline group-hover:underline-offset-4"
                >
                  New Product 
                </h3>

              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
        
      </div>*/
