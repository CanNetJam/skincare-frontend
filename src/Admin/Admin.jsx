import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidemenu from '../Components/Sidemenu';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';

function Admin() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/adminaccounts');
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatBirthday = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
            .getDate()
            .toString()
            .padStart(2, '0')}`;
    };

    const columns = [
        {
            name: 'User ID',
            selector: 'aaccountsid',
            sortable: true,
        },
        {
            name: 'First Name',
            selector: 'afname',
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: 'alname',
            sortable: true,
        },
        {
            name: 'Contact Number',
            selector: 'acnumber',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'aemail',
            sortable: true,
            minWidth: '200px',
        },
        {
            name: 'Password',
            selector: 'apassword',
            sortable: true,
        },
        {
            name: 'Gender',
            selector: 'agender',
            sortable: true,
        },
        {
            name: 'Birthday',
            selector: 'abirthday',
            sortable: true,
            cell: (row) => <span>{formatBirthday(row.abirthday)}</span>,
        },
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
        { label: 'User ID', key: 'aaccountsid' },
        { label: 'First Name', key: 'afname' },
        { label: 'Last Name', key: 'alname' },
        { label: 'Contact Number', key: 'acnumber' },
        { label: 'Email', key: 'aemail' },
        { label: 'Password', key: 'apassword' },
        { label: 'Gender', key: 'agender' },
        { label: 'Birthday', key: 'abirthday', formatter: formatBirthday },
    ];

    const csvData = data.map((item) => ({
        aaccountsid: item.aaccountsid,
        afname: item.afname,
        alname: item.alname,
        acnumber: item.acnumber,
        aemail: item.aemail,
        apassword: item.apassword,
        agender: item.agender,
        abirthday: formatBirthday(item.abirthday),
    }));

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <Sidemenu />
            </div>
            <div style={{ flex: 4, padding: '20px' }}>
                <h1 className="text-2xl mb-2 text-gray-800">Admin Accounts</h1>
                    <hr />
                        <br />

                <div>
                    <CSVLink data={csvData} headers={headers} filename={'admin_accounts_data.csv'}>
                    <button className="bg-cyan-600 p-1 rounded-sm hover:bg-cyan-700 mb-2 text-white text-sm">
                            Download Data
                        </button>
                    </CSVLink>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <DataTable
                        columns={columns}
                        data={data}
                        customStyles={customStyles}
                        customTheme={customTheme}
                        pagination
                    />
                )}
            </div>
        </div>
    );
}

export default Admin;
