import React from 'react';
import axios from 'axios';
import './admin.css';

function AdminForm({ requestId, email, onStatusUpdate }) {
    const handleAccept = async () => {
        try {
            await axios.put(`http://localhost:8000/Adminhiring_requests/${requestId}`, { status: 1 });
            await sendEmail(email);
            
            onStatusUpdate(requestId, 1); // Update the status locally
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    const handleReject = async () => {
        try {
            await axios.put(`http://localhost:8000/Adminhiring_requests/${requestId}`, { status: 3 });
            onStatusUpdate(requestId, 3); // Update the status locally
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    const sendEmail = async (to) => {
        try {
            await axios.post('http://localhost:8000/email', { email: to });
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div className="action-buttons">
            <button className="accept-button" onClick={handleAccept}>Accept</button>
            <button className="reject-button" onClick={handleReject}>Reject</button>
        </div>
    );
}

export default AdminForm;
