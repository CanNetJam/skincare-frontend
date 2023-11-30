import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidemenuUsers from '../Components/SidemenuUsers';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';

function Profile({ userId }) {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/users/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data. Please try again later.');
            }
        };
            
        fetchUserData();
    }, [userId]);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <SidemenuUsers />
            </div>
            <div style={{ flex: 20, padding: '20px' }}>
                <Link to='/' className='text-underline shadow-md bg-gray-200 rounded-sm p-2'>
                    Go Back Shopping
                </Link>
                <h1 className="text-2xl text-gray-800 mt-10">My Account</h1>
                <p className='mb-2'>Manage and protect your account</p>
                <hr className='mb-3'/>
            
                <div>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='col-span-1'>
                    <label htmlFor="fname" className='text-gray-800 text-sm'>First Name:</label>
                    <input type="text" className='bg-gray-100  rounded-sm w-full' />
                    </div>
                    <div className='col-span-1'>
                    <label htmlFor="lname" className='text-gray-800 text-sm'>Last Name:</label>
                    <input type="text" className='bg-gray-100 rounded-sm w-full' />
                    </div>
                    <div className='col-span-1'>
                    <label htmlFor="birthday" className='text-gray-800 text-sm'>Birthday:</label>
                    <input type="file" className='bg-gray-100 rounded-sm w-full' />
                    </div>
                    <div className='col-span-1'>
                    <label htmlFor="region" className='text-gray-800 text-sm'>Region:</label>
                    <input type="text" className='bg-gray-100  rounded-sm w-full' />
                    </div>
                    <div className='col-span-1'>
                    <label htmlFor="province" className='text-gray-800 text-sm'>Province:</label>
                    <input type="text" className='bg-gray-100  rounded-sm w-full' />
                    </div>
                    <div className='col-span-1'>
                    <label htmlFor="city" className='text-gray-800 text-sm'>City:</label>
                    <input type="text" className='bg-gray-100  rounded-sm w-full' />
                    </div>
                    <div className='col-span-1'>
                    <label htmlFor="barangay" className='text-gray-800 text-sm'>Barangay:</label>
                    <input type="text"  className='bg-gray-100  rounded-sm w-full' />
                    </div>
                    <div className='col-span-1'>
                    <label htmlFor="postal-code" className='text-gray-800 text-sm'>Postal Code:</label>
                    <input type="text"  className='bg-gray-100  rounded-sm w-full' />
                    </div>
                    <div className='col-span-1'>
                    <label htmlFor="full-address" className='text-gray-800 text-sm'>Full Address:</label>
                    <input type="text" className='bg-gray-100  rounded-sm w-full' />
                    </div>

                </div>

                 <button className=' bg-zinc-700 rounded-sm p-2 text-sm mt-10 text-white' >Save </button>

                 </div>
            </div>
        </div>
    );
}

export default Profile;
