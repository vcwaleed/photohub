import React from 'react';
import { FaHome, FaBox, FaUser, FaCheckSquare ,FaUserEdit,FaUpload,FaImage} from 'react-icons/fa';
 

function AdminSidebar({ openSidebarToggle, OpenSidebar }) {

  // Logout function
  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    alert("do you want to log out")
    
    
    window.location.href = '/login';
  };
  return (
    <aside id="actionsidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
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
        {/* <li className='adminsidebar-list-item'>
          <a href="/photographerslist">
            <FaBox className='adminicon'/> PhotoGraphers
          </a>
        </li> */}
       
        <li className='adminsidebar-list-item'>
          <a href="/adminitemaction">
            <FaImage className='adminicon'/> Products
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
        <li className='adminsidebar-list-item'>
          <a href="/upload">
            <FaUpload className='adminicon'/> Upload Image 
          </a>
        </li>
        <li className='adminsidebar-list-item'>
          <a href="/adminphotographerrequests">
            < FaUserEdit className='adminicon'/> Photographers
          </a>
        </li>

        <li className='adminsidebar-list-item'>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        
        </li>


       

       



      </ul>
    </aside>
  );
}

export default AdminSidebar;
