import React, { createContext, useState, useEffect } from 'react';
import { Route, Routes, Navigate, BrowserRouter, HashRouter } from 'react-router-dom';
import axios from "axios";
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Products from './Pages/Products';
import ProductsOffer from './Components/ProductsOffer';
import NotFound from './NotFound';
import Login from './Pages/Login';
import Skin from './Pages/Skin';
import Faq from './Pages/Faq';
import Admin from './Admin/Admin';
import Orders from './Admin/Orders';
import Users from './Admin/Users';
import AdminCreate from './Admin/AdminCreate';
import Adminlogin from './Admin/Adminlogin';

import Adminproducts from './Admin/Adminproducts';
import Cart from './Pages/Cart';
import ProductDetail from './Products/ProductDetail';
import CartDetails from './Pages/CartDetails';
import Order from './User/Order';

import ProductDetails from './Pages/ProductDetails';
import Product1 from './Details/Product1';
import AddProduct from './Pages/AddProduct';
import Email from './Pages/Email';
import Package1 from './Details/Package1';
import AddPackage from './Pages/AddPackage';
import TermsOfUse from './Pages/TermsOfUse';
import RefundPolicy from './Pages/RefundPolicy';
import Register from './Pages/Register';
import KnowledgeBase from './Pages/KnowledgeBase';
import Profile from './Components/Profile';
import Policy from './Pages/Policy';
import Settings from './Pages/Settings';
import UserAccounts from './Pages/UserAccounts';
import UpdateProduct from './Pages/UpdateProduct';

export const UserContext = createContext();

const App = () => {
  const [ userData, setUserData ] = useState ({
    token: undefined,
    user: undefined
  })
  
  useEffect(() => {
    const isLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")

      if (token === null){
        localStorage.setItem("auth-token", "")
        token = ""
      }
      
      if (token !== null && token !== ""){
        const tokenResponse = await axios.post(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://skincare-backend.onrender.com'}/token/tokenIsValid`, null, {headers: {"auth-token": token}})
        if(tokenResponse.data!==false){
          const userResponse = await axios.get(`${import.meta.env.DEV ? 'http://localhost:8000' : 'https://skincare-backend.onrender.com'}/accounts/user-data`, {headers: {"auth-token": token}})
          if (userResponse) {
            setUserData({
              token: token,
              user: userResponse.data
            })
            localStorage.setItem("user-type", userResponse.data.type)
          }
          if (!userResponse) {
            setUserData({
              token: undefined,
              user: undefined
            })
          }
        }
      }
    }
    isLoggedIn()
  }, [])

  const AuthenticatedRoute = ( children ) => {
    let token = localStorage.getItem("auth-token")
    if (!token) {
      return <Navigate  to="/login" />
    }
    return children
  }

  const SuperAdminRoute = ( children ) => {
    let type = localStorage.getItem("user-type")
    if (type==="Super Admin") {
      return children
    }
    if (type==="Admin") {
      return children
    }
    return <Navigate  to="/" />
  }

  return (
    <HashRouter basename="/">
      <UserContext.Provider value={{ userData, setUserData }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/understandingyourskin" element={<Skin />} />
          <Route path="/faqs" element={<Faq />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productsoffer" element={<ProductsOffer />} />
          <Route path="/products/:productid" element={<ProductDetail />} />
          <Route path="/cartdetails" element={<CartDetails />} />
          <Route path="/product-details" element={<ProductDetails />} />

          <Route path="/details/product/:id" element={<Product1 />} />
          <Route path="/details/package/:id" element={<Package1 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/accounts/profile/:id" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

          <Route path="/knowledge-base" element={AuthenticatedRoute(<KnowledgeBase />)} />
          <Route path="/internal-policy" element={AuthenticatedRoute(<Policy />)} />

          <Route path="/emails" element={SuperAdminRoute(<Email />)} />
          <Route path="/add-product" element={SuperAdminRoute(<AddProduct />)} />
          <Route path="/add-package" element={SuperAdminRoute(<AddPackage />)} />
          <Route path="/user-accounts" element={SuperAdminRoute(<UserAccounts />) } />
          <Route path="/update-product" element={SuperAdminRoute(<UpdateProduct />)} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </HashRouter>
  )
}

export default App