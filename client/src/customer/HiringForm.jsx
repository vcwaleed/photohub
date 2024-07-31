import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import './styles.css'; // Import the CSS file



function HiringForm() {
    const [formData, setFormData] = useState({
        userName: '',
        location: '',
        budget: '',
        eventTime: '',
        eventDate: '',
        phoneNumber: '',
        email: '', 
        userId: '' 
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token);
            setFormData((prevData) => ({
                ...prevData,
                userId: decoded.userId // Set the userId from the decoded token
            }));
        } else {
            console.error("Token not found in local storage");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/hire', formData);
            navigate('/hiringrequests');
        } catch (error) {
            console.error('Error:', error);        
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container1">
            <h2>Hiring Request Form</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group1'>
                    <label>Name:</label>
                    <input type='text' name='userName' className='form-control1' required onChange={handleChange} />
                </div>
                
                <div className='form-group1'>
                    <label>Location:</label>
                    <select name='location' className='form-control1' required onChange={handleChange}>
                        <option value=''>Select Location</option>
                        <option value='Karachi'>Karachi</option>
                        <option value='Peshawar'>Peshawar</option>
                        <option value='Quetta'>Quetta</option>
                        <option value='Faisalabad'>Faisalabad</option>
                        <option value='Rawalpindi'>Rawalpindi</option>
                        <option value='Taxila'>Taxila</option>
                        <option value='Lahore'>Lahore</option>
                        <option value='Gujranwala'>Gujranwala</option>
                        
                    </select>
                </div>
                <div className='form-group1'>
                    <label>Budget:</label>
                    <select name='budget' className='form-control1' required onChange={handleChange}>
                        <option value=''>Select Budget</option>
                        <option value='30000'>30000</option>
                        <option value='40000'>40000</option>
                        <option value='50000'>50000</option>
                        <option value='60000'>60000</option>
                        <option value='70000'>70000</option>
                        <option value='80000'>80000</option>
                        <option value='90000'>90000</option>
                        <option value='100000'>100000</option>
                        
                    </select>
                </div>
                <div className='form-group1'>
                    <label>Time:</label>
                    <select name='eventTime' className='form-control1' required onChange={handleChange}>
                        <option value=''>Select Event Time between </option>
                        <option value='10AM - 5PM'>10AM - 5PM</option>
                        <option value='5PM - 10PM'>5PM - 10PM</option>
                        <option value='10PM - 1AM'>10PM - 1AM</option>
                        <option value='2PM - 8PM'>2PM - 8PM</option>
                        <option value='12AM - 12PM'>12AM - 12PM</option>
                        
                    </select>
                </div>
              
                <div className='form-group1'>
                    <label>Event Date:</label>
                    <input type='date' name='eventDate' className='form-control1' required onChange={handleChange} />
                </div>
                <div className='form-group1'>
                    <label>Phone Number:</label>
                    <input type='tel' name='phoneNumber' className='form-control1' required onChange={handleChange} />
                </div>
                <input type='hidden' name='userId' value={formData.userId} />
                <div className='form-group1'>
                    <label>Email:</label>
                    <input type='email' name='email' className='form-control1' required onChange={handleChange} />
                </div>
                <div className='form-group1'>
                    <button type='submit' className='btn btn-success'>Submit</button>
                </div>
            </form>
            <div style={{ textAlign: 'center' }}>
                <Link to='/' className='btn btn-primary'>Back to Home</Link>
            </div>
        </div>
    );
}

export default HiringForm;
