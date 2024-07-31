import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {FaTrash } from 'react-icons/fa';

function ReadAllHiringRequests() {
    const [hiringRequests, setHiringRequests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token from local storage:', token);
        
        if (token) {
            // Decode the token to get the user ID
            const decoded = jwt_decode(token);
            const userId = decoded.userId;

            // Set the authorization header with the token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.get(`http://localhost:8000/hiring_requests?userId=${userId}`, config)
                .then(response => {
                    console.log('Response data:', response.data);
                    // Assuming response.data.hiringRequests contains the array of hiring requests
                    setHiringRequests(response.data.hiringRequests);
                })
                .catch(error => {
                    console.error('Error fetching hiring requests:', error);
                    setError('Error fetching hiring requests. Please try again later.');
                });
        }
    }, []);
    
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
        <div className="container">
            <h1>Booking Requests</h1>
            {error && <p>{error}</p>}
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
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(hiringRequests) && hiringRequests.length > 0 ? (
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
                                    <button className={`action-button ${request.status === 0 ? 'pending' : request.status === 1 ? 'approved' : 'rejected'}`}>
                                        {request.status === 0 ? 'Pending' : request.status === 1 ? 'Approved' : 'Rejected'}
                                    </button>
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
                            <td colSpan="8">No hiring requests found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ReadAllHiringRequests;
