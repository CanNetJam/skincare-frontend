import React from 'react';
import UserAccountsTable from '../Components/UserAccountstable';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';

export default function UserAccounts() {
    return (
        <div>
            <Navbar/>
            <div className='min-h-screen h-auto'>
                <UserAccountsTable/>
            </div>
            <Footer/>
        </div>
    )
}
