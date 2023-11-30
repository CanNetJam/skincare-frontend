import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import photo1 from '../assets/logo.png';
import Cart from '../Pages/Cart';
import photo4 from '../assets/4.jpg';
import photo5 from '../assets/5.jpg';
import photo6 from '../assets/6.jpg';
import { AiOutlineMenu } from "react-icons/ai";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenu, setopenMenu] = useState(false)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    axios
      .get('http://localhost:8081/loginuser')
      .then((response) => {
        const userFirstName = response.data.fname;
        setFirstName(userFirstName);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  return (
    <div>
      <header>
        <div className="h-16 bg-white w-full md:z-0 z-20 md:static fixed inset-0">
          <div className="h-full container mx-auto px-10 flex justify-between items-center sm:relative sm:grid-rows-2">

            <div className="md:flex md:items-center md:gap-12">
              <a className="block text-teal-600" href="/">
                <span className="sr-only">Home</span>
                <img src={photo1} alt="" />
              </a>
            </div>

            <div className="hidden md:w-1/2 md:top-0.5 md:flex w-full md:justify-end md:items-center">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">

                  <li>
                    <Link
                      className="flex justify-center items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                      to="/product-details"
                    >
                      Our Products
                    </Link>
                  </li>

                  <li>
                    <Link
                       className="flex justify-center items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                      to="/understandingyourskin"
                    >
                      Understanding your skin
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="flex justify-center items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                      to="/aboutus"
                    >
                      About Us
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="flex justify-center items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                      to="/faqs"
                    >
                      FAQs
                    </Link>
                  </li>


                </ul>
              </nav>
            </div>

            {openMenu===true ? 
              <div className='md:hidden top-16 pt-8 sm:w-64 right-0 sm:pt-8 h-screen sm:border-l-2 bg-white z-10 fixed w-full overflow-y-auto'>
                <div className='h-64 w-full sm:w-64 grid gap-3'>
                  <Link to="/product-details" className='h-0 sm:h-1 w-full flex items-center justify-around'><span className='h-10 sm:w-full w-full flex justify-center items-center font-bold text-[16px] cursor-pointer hover:bg-gray-200 rounded-md m-5'>Our Products</span></Link>
                  <Link to="/understandingyourskin" className='h-0 sm:h-1 w-full flex items-center justify-around'><span className='h-10 sm:w-full w-full flex justify-center items-center font-bold text-[16px] cursor-pointer hover:bg-gray-200 rounded-md m-5'>Understanding Your Skin</span></Link>
                  <Link to="/aboutus" className='h-0 sm:h-1 w-full flex items-center justify-around'><span className='h-10 sm:w-full w-full flex justify-center items-center font-bold text-[16px] cursor-pointer hover:bg-gray-200 rounded-md m-5'>About Us</span></Link>
                  <Link to="/faqs" className='h-0 sm:h-1 w-full flex items-center justify-around'><span className='h-10 sm:w-full w-full flex justify-center items-center font-bold text-[16px] cursor-pointer hover:bg-gray-200 rounded-md m-5'>FAQs</span></Link>
                  <label className='border-t-2'></label>
                  <div className='h-0 sm:h-1 w-full flex items-center justify-around'>
                    <Link to="/products" className='relative text-center py-2 h-10 sm:w-[150px] w-[100px] sm:h-10 sm:px-3 font-bold text-[16px] rounded-full before:bg-yellow-200 before:-z-10 bg-blue-400 z-0 text-gray-700 transition-colors before:absolute before:left-0 before:top-0 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:duration-300 hover:text-black before:hover:scale-x-100 overflow-hidden'>
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            :null}

            <div onClick={()=>{
                if(openMenu===false) {
                  setopenMenu(true)
                }
                if(openMenu===true) {
                  setopenMenu(false)
                }
              }}className='md:hidden w=1/2 h-full flex justify-end items-center'>
              <AiOutlineMenu className='h-6 w-6'/>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;

/*

                  <li>
                    <Link
                       className="flex justify-center items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                      to="/products"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex justify-center items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                      to="/cartdetails"
                    >
                      Cart
                    </Link>
                  </li>
                  
                  <Link to="/cartdetails" className='h-0 sm:h-1 w-full flex items-center justify-around'><span className='h-10 sm:w-full w-full flex justify-center items-center font-bold text-[16px] cursor-pointer hover:bg-gray-200 rounded-md m-5'>Cart</span></Link>
                  */