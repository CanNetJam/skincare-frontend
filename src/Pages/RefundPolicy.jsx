import React, { useEffect }  from 'react';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';

export default function RefundPolicy() {
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
        <>
            <Navbar/>
        
            <div className='container mx-auto py-10'>
                <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>Klued Skin Care Products Trading Refund Policy</h1>
                <p className=''>
                    <b>Effective Date: May 20, 2023</b>
                    <br/>
                    <br/>
                    At Klued Skin Care Products Trading, we are committed to providing our customers with high-quality skincare products and exceptional service. If you are not completely satisfied with your purchase, we are here to help. Please review our refund policy below for information on how to request a refund or return.
                    <br/>
                    <br/>
                    <b>1. Eligibility for Refunds</b>
                    <br/>
                    1.1. We offer refunds and returns for products purchased directly from our official website or authorized partner platforms. If you purchased our products from a third-party seller, please contact them directly for their refund policy.
                    <br/>
                    1.2. To be eligible for a refund or return or return and refund, the following conditions must be met:
                    <ul className='list-disc ml-8'>
                        <li>
                        The product must have been received within the last 5 days.
                        </li>
                        <li>
                        The product must be in its original packaging and in a resalable condition.
                        </li>
                        <li>
                        You must provide proof of purchase, such as order number.
                        </li>
                    </ul>
                    <br/>
                    <b>2. Refund Process</b>
                    <br/>
                    2.1. To initiate a refund or return, please contact our customer support team at hello@kluedskincare.com or chat our website customer support within the eligible timeframe.
                    <br/>
                    2.2. Our customer support team will guide you through the return process, which may include providing photographs of the product and packaging.
                    <br/>
                    2.3. Once your return is approved, you will receive instructions on how to send the product back to us.
                    <br/>
                    2.4. Upon receiving the returned product, we will inspect it to ensure it meets our eligibility criteria. If the return is approved, we will process your refund within 2 business days.
                    <br/>
                    <br/>
                    <b>3. Refund Options</b>
                    <br/>
                    3.1. Refunds may be issued in one of the following ways:
                    <ul className='list-disc ml-8'>
                        <li>
                        Refund to the original payment method used for the purchase.
                        </li>
                        <li>
                        Store credit for use on our website.
                        </li>
                        <li>
                        Replacement of the product, if available and preferred by the customer.
                        </li>
                    </ul>
                    <br/>
                    <b>4. Shipping Costs</b>
                    <br/>
                    4.1. Shipping costs for returning a product are the responsibility of the customer unless the return is due to a mistake on our part (e.g., shipping the wrong item or a defective product).
                    <br/>
                    <br/>
                    <b>5. Contact Us</b>
                    <br/>
                    If you have any questions or concerns about our refund policy or need assistance with a return, please contact our customer support team at [Customer Support Email Address].
                    <br/>
                    <br/>
                    <b>6. Changes to this Policy</b>
                    <br/>
                    Klued Skin Care Products Trading reserves the right to modify or replace this refund policy at any time. Any changes will be posted on our website.
                </p>
            </div>

            <Footer/>
        </>
    )
}

