import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminForm from './AdminForm';
import './admin.css';
import { FaHome, FaBox, FaUser, FaCheckSquare ,FaTrash  , FaImage , FaUpload  , FaUserEdit} from 'react-icons/fa';

function AdminReadAllRequests() {
    const [hiringRequests, setHiringRequests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/Adminhiring_requests')
            .then(response => {
                setHiringRequests(response.data);
            })
            .catch(error => {
                console.error('Error fetching hiring requests:', error);
            });
    }, []);

    const handleStatusUpdate = async (requestId, status, email) => {
        try {
            await axios.put(`http://localhost:8000/Adminhiring_requests/${requestId}`, { status });
            if (status === 1) {
                await sendEmail(email);
            }
            setHiringRequests(prevRequests =>
                prevRequests.map(request =>
                    request.id === requestId ? { ...request, status } : request
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const sendEmail = async (email) => {
        try {
            await axios.post('http://localhost:8000/email', { email });
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const handleDeleteRequest = async (requestId) => {
        try {
            await axios.delete(`http://localhost:8000/hiring_requests/${requestId}`);
            setHiringRequests(prevRequests =>
                prevRequests.filter(request => request.id !== requestId)
            );
            console.log('Request deleted successfully');
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

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
                            <FaUpload className='adminactionicon'/>Upload Image
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
                <h1>All Hiring Requests</h1>
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Location</th>
                            <th>Budget</th>
                            <th>Event Time</th>
                            <th>Event Date</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Action</th>
                            <th>Sending</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hiringRequests.length > 0 ? (
                            hiringRequests.map(request => (
                                <tr key={request.id}>
                                    <td>{request.userName}</td>
                                    <td>{request.location}</td>
                                    <td>{request.budget}</td>
                                    <td>{request.eventTime}</td>
                                    <td>{request.eventDate}</td>
                                    <td>{request.phoneNumber}</td>
                                    <td>{request.email}</td>
                                    <td>
                                        <div className="action-buttons">
                                            {request.status === 0 ? (
                                                <AdminForm
                                                    requestId={request.id}
                                                    email={request.email}
                                                    onStatusUpdate={handleStatusUpdate}
                                                />
                                            ) : (
                                                <span className={request.status === 1 ? "accept-button" : "reject-button"}>
                                                    {request.status === 1 ? "Accepted" : "Rejected"}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                    <button className="accept-button" onClick={() => sendEmail(request.email)}>Email</button>

                                    </td>

                                    <td>
                                        <button className="delete-button" onClick={() => handleDeleteRequest(request.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10">No hiring requests found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminReadAllRequests;
