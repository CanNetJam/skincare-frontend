// App.jsx
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Products from './Pages/Products';
import ProductsOffer from './Components/ProductsOffer';
import NotFound from './NotFound';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Skin from './Pages/Skin';
import Faq from './Pages/Faq';
import Admin from './Admin/Admin';
import Orders from './Admin/Orders';
import Users from './Admin/Users';
import AdminCreate from './Admin/AdminCreate';
import Adminlogin from './Admin/Adminlogin';
import Dashboard from './Admin/Dashboard';
import Adminproducts from './Admin/Adminproducts';
import Cart from './Pages/Cart';
import ProductDetail from './Products/ProductDetail';
import CartDetails from './Pages/CartDetails';
import Profile from './User/Profile';
import Order from './User/Order';

import ProductDetails from './Pages/ProductDetails';
import Product1 from './Details/Product1';
import AddProduct from './Pages/AddProduct';

const App = () => {
  return (
    <HashRouter basename="/">
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/understandingyourskin" element={<Skin />} />
        <Route path="/faqs" element={<Faq />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/productsoffer" element={<ProductsOffer />} />
        <Route path="/products/:productid" element={<ProductDetail />} />
        <Route path="/cartdetails" element={<CartDetails />} />
        <Route path="/product-details" element={<ProductDetails />} />

        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/accounts/useraccounts" element={<Users />} />
        <Route path="/accounts/createaccount" element={<AdminCreate />} />
        <Route path="/accounts/adminaccounts" element={<Admin />} />
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<Adminproducts />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/order" element={<Order />} />

        <Route path="/details/multi-brightening-complex-serum" element={<Product1 />} />
        <Route path="/add-product" element={<AddProduct />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>

  );
};

export default App;
