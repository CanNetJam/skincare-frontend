import React, { createContext, useState, useEffect, lazy, Suspense } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import NotFound from './NotFound';
import Login from './Pages/Login';
import Skin from './Pages/Skin';
import Faq from './Pages/Faq';
import Navbar from './Components/TopNav';
import Footer from './Components/Footer';
//import ForgotPassword from './Pages/ForgotPassword';
//import CartDetails from './Pages/CartDetails';
import ProductDetails from './Pages/ProductDetails';
import Product1 from './Details/Product1';
import Package1 from './Details/Package1';
import TermsOfUse from './Pages/TermsOfUse';
import RefundPolicy from './Pages/RefundPolicy';
//import Register from './Pages/Register';
// import Profile from './Components/Profile';
// import Settings from './Components/ChangePassword';
// import Orders from './Pages/Orders';
// import OrderDetails from './Pages/OrderDetails';

const Profile = lazy(() => import('./Components/Profile'));
const Orders = lazy(() => import('./Pages/Orders'));
const OrderDetails = lazy(() => import('./Pages/OrderDetails'));
const TicketDetails = lazy(() => import('./Pages/TicketDetails'));
const Register = lazy(() => import('./Pages/Register'));
const ForgotPassword = lazy(() => import('./Pages/ForgotPassword'));
const CartDetails = lazy(() => import('./Pages/CartDetails'));

const KnowledgeBase = lazy(() => import('./Pages/KnowledgeBase'));
const Policy = lazy(() => import('./Pages/Policy'));

const UserAccounts = lazy(() => import('./Pages/UserAccounts'));
const UpdateProduct = lazy(() => import('./Pages/UpdateProduct'));
const UpdatePackage = lazy(() => import('./Pages/UpdatePackage'));
const UpdateVideos = lazy(() => import('./Pages/UpdateVideos'));
const Email = lazy(() => import('./Pages/Email'));
const EmailVerification = lazy(() => import('./Pages/EmailVerification'));
const AdminOrders = lazy(() => import('./Pages/AdminOrders'));
const AdminTickets = lazy(() => import('./Pages/AdminTickets'));
const Tickets = lazy(() => import('./Pages/Tickets'));
const SalesReport = lazy(() => import('./Pages/SalesReport'));

import Loading from './Components/Loading';

export const UserContext = createContext();

const App = () => {
    const [ userData, setUserData ] = useState ({
        token: undefined,
        user: undefined,
        cartNumber: 0
    })
    
    useEffect(() => {
        const isLoggedIn = async () => {
            let token = localStorage.getItem("auth-token")
            let verified = localStorage.getItem("user-verified")
            let cart = localStorage.getItem("items")

            let num1 = 0 
            for(let i =0; i<JSON.parse(cart)?.length; i++){
                num1 = num1+JSON.parse(cart)[i].quantity
            }
            
            if (token === null){
                localStorage.setItem("auth-token", "")
                token = ""
            }

            if (token==="") {
                setUserData({
                    token: undefined,
                    user: undefined,
                    cartNumber: num1,
                })
            }

            if (verified === null){
                localStorage.setItem("user-verified", "")
                verified = ""
            }
            
            if (cart === null){
                localStorage.setItem("items", JSON.stringify([]))
                cart = []
            }

            if (token !== null && token !== ""){
                const tokenResponse = await axios.post(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/token/tokenIsValid`, null, {headers: {"auth-token": token}})
                if(tokenResponse.data!==false){
                    const userResponse = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/accounts/user-data`, {headers: {"auth-token": token}})
                    if (!userResponse) {
                        setUserData({
                            token: undefined,
                            user: undefined,
                            cartNumber: num1
                        })
                    } else {
                        if (userResponse.data.type==="Customer") {
                            localStorage.setItem("auth-token", token)
                            localStorage.setItem("user-type", userResponse.data.type)
                            localStorage.setItem("user-verified", userResponse.data.verified)
                            localStorage.setItem("items", JSON.stringify(userResponse.data.cart))

                            setUserData({
                                token: token,
                                user: userResponse.data,
                                cartNumber: userResponse.data.cartNumber
                            })
                        } else {
                            localStorage.setItem("items", JSON.stringify([]))
                            localStorage.setItem("user-type", userResponse.data.type)
                            localStorage.setItem("user-verified", userResponse.data.verified)
                            setUserData({
                                token: token,
                                user: userResponse.data,
                                cartNumber: userResponse.data.cartNumber,
                            })
                        }
                    }
                }
            }
        }
        isLoggedIn()
    }, [])

    const AuthenticatedStaffRoute = ( children ) => {
        let token = localStorage.getItem("auth-token")
        if (!token) {
            return <Navigate  to="/login" />
        }
        let type = localStorage.getItem("user-type")
        if (type==="Customer") {
            return <Navigate  to="/" />
        }
        return children
    }

    const AuthenticatedCustomerRoute = ( children ) => {
        let token = localStorage.getItem("auth-token")
        if (!token) {
            return <Navigate  to="/login" />
        }
        if (userData?.user?.type!=="Customer") {
            return <Navigate  to="/" />
        }
        return children
    }

    const StoreAdminRoute = ( children ) => {
        let type = localStorage.getItem("user-type")
        if (type==="Store Admin" || type==="Super Admin") {
            return children
        }
        return <Navigate  to="/" />
    }

    const SalesAdminRoute = ( children ) => {
        let type = localStorage.getItem("user-type")
        if (type==="Sales Admin" || type==="Super Admin") {
            return children
        }
        return <Navigate  to="/" />
    }

    const GeneralAdminRoute = ( children ) => {
        let type = localStorage.getItem("user-type")
        if (type==="General Admin" || type==="Super Admin") {
            return children
        }
        return <Navigate  to="/" />
    }

    const SuperAdminRoute = ( children ) => {
        let type = localStorage.getItem("user-type")
        if (type==="Super Admin") {
            return children
        }
        return <Navigate  to="/" />
    }


    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Klued</title>
                    <link rel="canonical" href={`${import.meta.env.DEV ? 'http://localhost:5173/' : 'https://kluedskincare.com/'}`} />
                    <meta name="description" content="Combining knowledge and passion to the skin. We are offering quality skincare products available for everyone at a price that can fit most budgets. " />
                </Helmet>
                <BrowserRouter>
                    <UserContext.Provider value={{ userData, setUserData }}>

                        <Navbar/>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/understanding-your-skin" element={<Skin />} />
                            <Route path="/faqs" element={<Faq />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/terms-of-use" element={<TermsOfUse />} />
                            <Route path="/refund-policy" element={<RefundPolicy />} />
                            <Route path="/products" element={<ProductDetails />} />
                            <Route path="/products/:productname/:id" element={<Product1 />} />
                            <Route path="/packages/:packagename/:id" element={<Package1 />} />

                            <Route path="/register" element={<Suspense fallback={<Loading />}><Register /></Suspense>} />
                            <Route path="/cartdetails" element={<Suspense fallback={<Loading />}><CartDetails /></Suspense>} />
                            <Route path="/forget-password" element={<Suspense fallback={<Loading />}><ForgotPassword /></Suspense>} />
                            <Route path="/accounts/profile/:id" element={<Suspense fallback={<Loading />}><Profile /></Suspense>} />

                            <Route path="/order-details/:id" element={
                                <Suspense fallback={<Loading />}>
                                    <OrderDetails />
                                </Suspense>
                            } />

                            <Route path="/ticket-details/:id" element={
                                <Suspense fallback={<Loading />}>
                                    <TicketDetails />
                                </Suspense>
                            } />

                            <Route path="/email-verification/:id/:uniqueString" element={
                                <Suspense fallback={<Loading />}>
                                    <EmailVerification />
                                </Suspense>
                            } />

                            <Route path="/knowledge-base" element={
                                AuthenticatedStaffRoute(
                                <Suspense fallback={<Loading />}>
                                    <KnowledgeBase />
                                </Suspense>
                                )
                            } />
                            <Route path="/internal-policy" element={
                                AuthenticatedStaffRoute(
                                <Suspense fallback={<Loading />}>
                                    <Policy />
                                </Suspense>
                                )
                            } />
                            <Route path="/orders/:id" element={
                                AuthenticatedCustomerRoute(
                                <Suspense fallback={<Loading />}>
                                    <Orders />
                                </Suspense>
                                )
                            } />
                            <Route path="/tickets/:id" element={
                                AuthenticatedCustomerRoute(
                                <Suspense fallback={<Loading />}>
                                    <Tickets />
                                </Suspense>
                                )
                            } />

                            <Route path="/emails" element={GeneralAdminRoute(<Suspense fallback={<Loading />}><Email /></Suspense>)} />
                            <Route path="/user-accounts" element={GeneralAdminRoute(<Suspense fallback={<Loading />}><UserAccounts /></Suspense>) } />
                            <Route path="/update-product" element={StoreAdminRoute(<Suspense fallback={<Loading />}><UpdateProduct /></Suspense>)} />
                            <Route path="/update-package" element={StoreAdminRoute(<Suspense fallback={<Loading />}><UpdatePackage /></Suspense>)} />
                            <Route path="/update-videos" element={StoreAdminRoute(<Suspense fallback={<Loading />}><UpdateVideos /></Suspense>)} />

                            <Route path="/all-orders" element={SalesAdminRoute(<Suspense fallback={<Loading />}><AdminOrders /></Suspense>)} />
                            <Route path="/all-tickets" element={SalesAdminRoute(<Suspense fallback={<Loading />}><AdminTickets /></Suspense>)} />

                            <Route path="/sales-report" element={SuperAdminRoute(<Suspense fallback={<Loading />}><SalesReport /></Suspense>)} />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        <Footer/>
                    </UserContext.Provider>
                    <ToastContainer/>
                </BrowserRouter>
            </HelmetProvider>
        </div>
    )
}

export default App