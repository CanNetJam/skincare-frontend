import React from 'react';
import axios from 'axios';
import Sidemenu from '../Components/Sidemenu';

function Dashboard() {

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Sidemenu />
      </div>
      <div style={{ flex: 4, padding: '20px' }}>
        <h1 className='text-2xl mb-2 text-gray-800'>Dashboard</h1>
        <hr />
        <br />
       
      </div>
    </div>
  );
}

export default Dashboard;

