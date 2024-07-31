import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHome, FaBox, FaUser, FaCheckSquare ,FaUserEdit , FaImage  , FaUpload} from 'react-icons/fa';

import './admin.css';

const UserListForm = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/allusers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/allusers/${id}`);
      alert('User deleted successfully');
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(user => {
    const lowerCaseQuery = searchQuery.toLowerCase();
   
    return user.name.toLowerCase().includes(lowerCaseQuery) ||
           user.id.toString().includes(lowerCaseQuery);
  });

  return (
    <div className="admin-container">
      <aside id="sidebar">
        <div className='adminactionsidebar-title'>
          <div className='adminactionsidebar-brand'>
            <FaHome className='adminactionicon_header'/> Admin Dashboard
          </div>
          
        </div>

        <ul className='adminactionsidebar-list'>
          <li className='adminactionsidebar-list-item'>
            <a href="/admindashboard">
              <FaBox className='adminicon'/> Dashboard
            </a>
          </li>
          <li className='adminactionsidebar-list-item'>
            <a href="/adminitemaction">
              <FaImage className='adminactionicon'/> Products
            </a>
          </li>
          <li className='adminactionsidebar-list-item'>
            <a href="/adminalluser">
              <FaUser className='adminactionicon'/> Register User
            </a>
          </li>
          <li className='adminactionsidebar-list-item'>
            <a href="/adminapprove">
              <FaCheckSquare className='adminactionicon'/> Booking Approval
            </a>
          </li>
          <li className='adminactionsidebar-list-item'>
            <a href="/upload">
              <FaUpload className='adminactionicon'/> Upload Image
            </a>
          </li>


          <li className='adminsidebar-list-item'>
          <a href="/adminphotographerrequests">
            < FaUserEdit className='adminicon'/> Photographers
          </a>
        </li>


        </ul>
      </aside>
      
      <div className="user-list-container">
        <h2 className='list_heading'>Users List</h2>
  
        <div  className="search-bar">
        
        <input
          type="text" 
          placeholder="Search by name and ID" 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
        </div>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className='delete-button' onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListForm;
