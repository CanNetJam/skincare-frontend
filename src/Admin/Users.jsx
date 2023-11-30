import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidemenu from '../Components/Sidemenu';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';

function Users() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/users');
                setData(response.data); // Assuming the data is an array or can be directly assigned to the state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const formatBirthday = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    const columns = [
        {
            name: 'User ID',
            selector: 'userid',
            sortable: true,
        },
        {
            name: 'First Name',
            selector: 'fname',
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: 'lname',
            sortable: true,
        },
        {
            name: 'Contact Number',
            selector: 'cnumber',
            sortable: true,
            minWidth: '150px',
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            minWidth: '200px', // Adjust the width of the Email column
        },
        {
            name: 'Password',
            selector: 'password',
            sortable: true,
        },
        {
            name: 'Gender',
            selector: 'gender',
            sortable: true,
        },
        {
            name: 'Birthday',
            selector: 'birthday',
            sortable: true,
            cell: (row) => <span>{formatBirthday(row.birthday)}</span>,
        },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '30px', // override the row height
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

    const customTheme = {
        rows: {
            fontSize: '16px',
            backgroundColor: 'transparent',
            borderColor: 'rgba(0,0,0,0.1)',
            textTransform: 'capitalize',
        },
        cells: {
            style: {
                color: '#333',
            },
        },
        headCells: {
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#333',
            },
        },
    };

    const headers = [
        { label: 'User ID', key: 'userid' },
        { label: 'First Name', key: 'fname' },
        { label: 'Last Name', key: 'lname' },
        { label: 'Contact Number', key: 'cnumber' },
        { label: 'Email', key: 'email' },
        { label: 'Password', key: 'password' },
        { label: 'Gender', key: 'gender' },
        { label: 'Birthday', key: 'birthday', formatter: formatBirthday },
    ];

    const csvData = data.map((item) => ({
        userid: item.userid,
        fname: item.fname,
        lname: item.lname,
        cnumber: item.cnumber,
        email: item.email,
        password: item.password,
        gender: item.gender,
        birthday: formatBirthday(item.birthday),
    }));

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <Sidemenu />
            </div>
            <div style={{ flex: 4, padding: '20px' }}>
            <h1 className='text-2xl mb-2 text-gray-800'>Users Account</h1>
            <hr />
            <br />
            <div>
                    <CSVLink data={csvData} headers={headers} filename={'users_accounts_data.csv'}>
                        <button className="bg-cyan-600 p-1 rounded-sm hover:bg-cyan-700 mb-2 text-white text-sm">
                            Download Data
                        </button>
                    </CSVLink>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    customStyles={customStyles}
                    customTheme={customTheme}
                    pagination
                />
            </div>
        </div>
    );
}

export default Users;
