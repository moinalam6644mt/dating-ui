import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Header from '../Header/Header';
import DashboardFooter from '../../Dashboard/DashboardFooter';

const DashboardLayout = ({ children }) => (
    <>
     <Header/>
      
     <div className='dashboard-container message-page'>
      <Sidebar />
      <div className='dashboard-content-container'>
        {children}
        <DashboardFooter/>
        </div>
      </div>
        
    </>
  

);

export default DashboardLayout;
