import React from 'react';
import { FaHome, FaBox, FaUser, FaCheckSquare } from 'react-icons/fa';
 

function AdminActionSidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='adminsidebar-title'>
        <div className='adminsidebar-brand'>
          <FaHome className='adminicon_header'/> Admin Dashboard
        </div>
        
      </div>

      <ul className='adminsidebar-list'>
        <li className='adminsidebar-list-item'>
          <a href="/admindashboard">
            <FaBox className='adminicon'/> Dashboard
          </a>
        </li>
        <li className='adminsidebar-list-item'>
          <a href="/adminitemaction">
            <FaUser className='adminicon'/> Products
          </a>
        </li>
        <li className='adminsidebar-list-item'>
          <a href="/adminalluser">
            <FaUser className='adminicon'/> Register User
          </a>
        </li>
        <li className='adminsidebar-list-item'>
          <a href="/adminapprove">
            <FaCheckSquare className='adminicon'/> Booking Approval
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default AdminActionSidebar;
