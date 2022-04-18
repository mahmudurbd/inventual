import React from 'react';
import './Dashboard.scss';
import Sidebar from './Sidebar/Sidebar';
import Products from '../Products/Products';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className="dashboard-container">
        <Products/>
      </div>
    </div>
  );
};

export default Dashboard;