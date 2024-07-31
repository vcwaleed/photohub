import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import { SidebarData } from './SidebarData';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const userRole = parseInt(localStorage.getItem('userRole'));

  const showSidebar = () => setSidebar(!sidebar);
  const closeSidebar = () => setSidebar(false);

  // Logout function
  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <>
      <nav className="navbar">
        <Link to='#' className='menu-bars' onClick={showSidebar}>
          <MdMenu />
        </Link>

        <div className="logo">
          <h2>Photo</h2>
          <h2 className='hub'>Hub</h2>
        </div>

        <div className="menu">
          
          <Link to="/"><i className="fas fa-home"></i> Home</Link>
          <Link to="/hire"><i className="fas fa-calendar"></i> Booking</Link>


          <Link to="/hiringrequests"><i className="fas fa-calendar"></i>Booking Status</Link>
          <div className="right-menu">
            <Link to="/orders"><i className="fas fa-shopping-cart"></i>Order</Link>
            {userRole !== null && (userRole === 0 || userRole === 1 || userRole === 2) ? (
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/register" className="signup-link">
                <button className="signup-button">Sign Up</button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle' onClick={closeSidebar}>
            <Link to='#' className='menu-bars'>
              <MdClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path} onClick={closeSidebar}>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
