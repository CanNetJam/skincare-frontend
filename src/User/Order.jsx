import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import SidemenuUsers from '../Components/SidemenuUsers';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';

function Order() {
    // Sample data for demonstration
    const data = [
        { id: 1, product: 'Mandelic Acid Clarifying Toner', price: '₱349', date: '2023-10-27' },
        { id: 2, product: 'Salicylic Acid Gentle Cleanser', price: '₱349', date: '2023-10-26' },
        { id: 3, product: 'Double Oat Moisturizer ', price: '₱149', date: '2023-10-25' },
        // Add more data as needed
    ];


    const customStyles = {
        rows: {
            style: {
                minHeight: '30px',
            },
        },
        headRow: {
            style: {
                border: 'solid 1px #ddd',
            },
        },
        headCells: {
            style: {
                fontWeight: 'bold',
            },
        },
    };

    const columns = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Product',
            selector: 'product',
            sortable: true,
        },
        {
            name: 'Price',
            selector: 'price',
            sortable: true,
        },
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
        },
    ];

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <SidemenuUsers />
            </div>
            <div style={{ flex: 20, padding: '20px' }}>
                <Link to='/' className='text-underline shadow-md bg-gray-200 rounded-sm p-2'>
                    Go Back Shopping
                </Link>
                <h1 className="text-2xl text-gray-800 mt-10">Orders</h1>
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    customStyles={customStyles}
                />
            </div>
        </div>
    );
}

export default Order;
