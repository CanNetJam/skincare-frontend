import React from 'react';
import img1 from '../assets/FAQ/A1.png';
import img2 from '../assets/FAQ/A2.png';
import img3 from '../assets/FAQ/A3.png';
import img4 from '../assets/FAQ/A4.png';
import img6 from '../assets/FAQ/A6.png';
import img7 from '../assets/FAQ/A7.png';
import img8 from '../assets/FAQ/A8.png';

export default function BillingAddress() {
    return (
        <div className='container mx-auto max-w-4xl'>
            <p className='text-justify'>In order to proceed on checking out the items on your cart, you have to provide your billing address first. This address will be used as a reference as to where the parcel will be delivered. Please provide only true, consise and readable addresses only.</p>
            <br/>
            <h3 className='font-semibold text-lg mb-2'>Desktop</h3>

            <p><b>Step 1:</b> Click your account options by clicking your account profile picture on the upper right side of the website. Then after a drop down menu appears, click on the <b>My Orders</b> tab indicated with a shopping cart icon.</p>
            <div className='flex justify-center items-center'>
                <img src={img2}></img>
            </div>
            <br/>

            <p><b>Step 2:</b> You will then be redirected to the <b>Manage your Orders</b> page that is devided into three tabs. Please click on the <b>Delivery Details</b>.</p>
            <div className='flex justify-center items-center'>
                <img src={img3}></img>
            </div>
            <p className='text-center italic'>If you are editing your billing address for the first time, <b>No data.</b> will be displayed on this page.</p>
            <br/>

            <p><b>Step 3:</b> Click on the pen icon to begin. Enter your shipping details on each textbox. To speed up the process, click on the suggested texts below. After filling out the form, click on the <b>Update</b> button.</p>
            <div className='flex justify-center items-center'>
                <img src={img4}></img>
            </div>
            <div className='flex justify-center items-center'>
                <img src={img6}></img>
            </div>
            <div className='flex justify-center items-center'>
                <img src={img7}></img>
            </div>
            <br/>

            <p className='text-center'><b>Finished!</b> A notification will appear notifying you that your billing address is now updated.</p>
            <div className='flex justify-center items-center'>
                <img src={img8}></img>
            </div>
            <p className='text-center'>Your billing address should look like this now.</p>
            <div className='flex justify-center items-center'>
                <img src={img1}></img>
            </div>
            <br/>
        </div>
    )
}
