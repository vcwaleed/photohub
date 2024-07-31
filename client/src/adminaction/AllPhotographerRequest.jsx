import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit} from 'react-icons/fa';
import './admin.css';
import { FaHome, FaBox, FaUser, FaCheckSquare, FaTrash , FaUpload , FaImage } from 'react-icons/fa';

function AllPhotographerRequest() {
    const [requests, setRequests] = useState([]);

    // Fetch all photographer requests when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8000/photographer_requests')
            .then(response => {
                setRequests(response.data);
            })
            .catch(error => {
                console.error('Error fetching photographer requests:', error);
            });
    }, []);

    // Function to handle deletion of a photographer request
    const handleDeleteRequest = (id) => {
        axios.delete(`http://localhost:8000/photographer_requests/${id}`)
            .then(response => {
                console.log(response.data);
                // Remove the deleted request from the state
                setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
            })
            .catch(error => {
                console.error('Error deleting photographer request:', error);
            });
    };

    // Function to handle updating user role
    const handleUpdateRole = (userId) => {
        axios.put(`http://localhost:8000/update_role/${userId}`)
            .then(response => {
                alert("Do you want to update");
                console.log(response.data);

                alert("Update successfully");

                // Optionally, update UI or perform additional actions after successful update
            })
            .catch(error => {
                console.error('Error updating role:', error);
            });
    };

    return (
        <div className="admin-container">
            <aside id="sidebar">
                <div className='adminactionsidebar-title'>
                    <div className='adminactionsidebar-brand'>
                        <FaHome className='adminactionicon_header' /> Admin Dashboard
                    </div>
                </div>

                <ul className='adminactionsidebar-list'>
                    <li className='adminactionsidebar-list-item'>
                        <a href="/admindashboard">
                            <FaBox className='adminicon' /> Dashboard
                        </a>
                    </li>
                    <li className='adminactionsidebar-list-item'>
                        <a href="/adminitemaction">
                            <FaImage  className='adminactionicon' /> Products
                        </a>
                    </li>
                    <li className='adminactionsidebar-list-item'>
                        <a href="/adminalluser">
                            <FaUser className='adminactionicon' /> Register User
                        </a>
                    </li>
                    <li className='adminactionsidebar-list-item'>
                        <a href="/adminapprove">
                            <FaCheckSquare className='adminactionicon' /> Booking Approval
                        </a>
                    </li>
                    <li className='adminactionsidebar-list-item'>
                        <a href="/upload">
                            < FaUpload className='adminactionicon' /> Upload Image
                        </a>
                    </li>

                    
        <li className='adminsidebar-list-item'>
          <a href="/adminphotographerrequests">
            < FaUserEdit className='adminicon'/> Photographers
          </a>
        </li>

                </ul>
            </aside>

            <div className="Hiringcontainer">
                <h1>All Photographer Requests</h1>
                <table>
                    <thead>
                        <tr>
                            
                            <th>Name</th>
                            <th>Email</th>
                            <th>Camera Name</th>
                            <th>Experience</th>
                            <th>city</th>
                            <th>lens Name</th>
                            <th>Change role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request.id}>
                              
                                <td>{request.name}</td>
                                <td>{request.email}</td>  
                                <td>{request.cameraName}</td>
                                <td>{request.experience}</td>
                                <td>{request.city}</td>
                                <td>{request.lensName}</td>



                                <td>
                                    <button className='updaterole' onClick={() => handleUpdateRole(request.user_id)}>
                                        <FaUserEdit /> Update
                                    </button>
                                </td>
                                <td>
                                    <button className="delete-button" onClick={() => handleDeleteRequest(request.id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllPhotographerRequest
