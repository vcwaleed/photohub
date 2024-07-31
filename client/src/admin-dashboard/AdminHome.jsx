import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";


import AdminSidebar from './AdminSidebar';
import './admin-dashboard.css';

function AdminHome() {
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [hiringCount, setHiringCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch user role from local storage upon component initialization
    const storedUserRole = localStorage.getItem('userRole');
   
    setUserRole(storedUserRole);
    console.log('User role from local storage:', storedUserRole);

    // Fetch data only if the user is an admin
    if (storedUserRole === '1') {
      fetchData();
    }
  }, []); // Empty dependency array to run only once on component mount

  // Function to fetch data
  const fetchData = () => {
    fetch('/usersCount')
      .then(response => response.json())
      .then(data => setUsersCount(data.count))
      .catch(error => console.error('Error fetching users count:', error));

    fetch('/productsCount')
      .then(response => response.json())
      .then(data => setProductsCount(data.count))
      .catch(error => console.error('Error fetching products count:', error));

    fetch('/orderCount')
      .then(response => response.json())
      .then(data => setOrderCount(data.count))
      .catch(error => console.error('Error fetching order count:', error));

    fetch('/hiringCount')
      .then(response => response.json())
      .then(data => setHiringCount(data.count))
      .catch(error => console.error('Error fetching hiring count:', error));
  };

  console.log(userRole)



  return (
    <div className="admingrid-container">
      <AdminSidebar />
      <main className='adminmain-container'>
        <div className='adminmain-title'>
          <h3>DASHBOARD</h3>
        </div>

        <div className='adminmain-cards'>
          <div className='admincard'>
            <div className='card-inner'>
              <h3>PRODUCTS</h3>
              <BsFillArchiveFill className='admincard_icon' />
            </div>
            <h1>{productsCount}</h1>
          </div>

          <div className='admincard'>
            <div className='card-inner'>
              <h3>REGISTER USERS </h3>
              <FaUser className='admincard_icon' />
            </div>
            <h1>{usersCount}</h1>
          </div>

          <div className='admincard'>
            <div className='card-inner'>
              <h3> BOOKING REQUESTS</h3>
              <VscGitPullRequestGoToChanges className='admincard_icon' />
            </div>
            <h1>{hiringCount}</h1>
          </div>

          <div className='admincard'>
            <div className='card-inner'>
              <h3>PENDING PAYMENT ORDERS  </h3>
              <VscGitPullRequestGoToChanges className='admincard_icon' />
            </div>
            <h1>{orderCount}</h1>
          </div>
        </div>

        <div className='admincharts'>
          {/* Add chart components */}
        </div>
      </main>
    </div>
  );
}

export default AdminHome;
