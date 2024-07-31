import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import './photographer.css';
import {  useNavigate } from 'react-router-dom';
 



function PhotographerForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        cameraName: '',
        lensName: '',
        phoneNumber: '',
        experience: '',
        socialMedia: '',
        gender: '',
        userId: '' // Initialize userId state
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token);
            setFormData(prevData => ({
                ...prevData,
                userId: decoded.userId // Set the userId from the decoded token
            }));
        } else {
            console.error("Token not found in local storage");
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if any required fields are empty
        const requiredFields = ['name', 'email', 'address', 'city', 'cameraName', 'phoneNumber', 'experience','lensName','gender'];
        const emptyFields = requiredFields.filter(field => !formData[field]);
        if (emptyFields.length > 0) {
            const errorMessage = `Please fill in all required fields: ${emptyFields.join(', ')}`;
            setValidationError(errorMessage);
            return;
        }

        axios.post('http://localhost:8000/photographer_request', formData)
       
            .then(response => {
                if (response.status === 200) {
                    console.log('Data stored successfully');
                    setSuccessMessage('Data submitted successfully.');
                    setErrorMessage('');
                    setValidationError('');
                    setFormData({ ...formData, name: '', email: '', address: '', city: '', cameraName: '', lensName: '', phoneNumber: '', experience: '', socialMedia: '', gender: '' });
                    navigate('/photographer_success');

                    
                } else {
                    console.error('Error storing data');
                    setErrorMessage('Error: Data submission failed.');
                    setSuccessMessage('');
                    setValidationError('');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setErrorMessage('Network error. Please try again.');
                setSuccessMessage('');
                setValidationError('');
            });
    };

    return (

        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className='main-heading'>
                    <h2>Photographer Request Form</h2>
                </div>

                {errorMessage && <div className="message error">{errorMessage}</div>}
                {successMessage && <div className="message success">{successMessage}</div>}
                {validationError && <div className="message error">{validationError}</div>}

                <div className="form-group-container">
                    <div className="form-group2 clearfix">
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group2 clearfix">
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>



                  


                    <div className="form-group2 clearfix">
                        <label>Camera Type :</label>

                        <select name="cameraName" className="form-control1" onChange={handleChange} required>
                            <option value="">Select Camera </option>
                            <option value="DSLR">DSLR</option>
                            <option value="mirrorless">Mirrorless</option>
                            <option value="Other">Other</option>

                            
                        </select>
                    </div>



                    <div className="form-group2 clearfix">
                        <label>Phone Number:</label>
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </div>






                    <div className="form-group2 clearfix">
                        <label>Experience :</label>

                        <select name="experience" className="form-control1" onChange={handleChange} required>
                            <option value="">Your Experience </option>
                            <option value="NEW">NEW</option>
                            <option value="1 Year">1 Year </option>
                            <option value="2 Year ">2 Year </option>
                            <option value="2 to 4 Year">2 to 4 Year </option>
                            <option value="More then 5  Year">More then 5  Year </option>

                            
                        </select>
                    </div>





                </div>
                <div className="form-group-container">
                    <div className="form-group2 clearfix">
                        <label>Address:</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                    </div>


                     <div className="form-group2 clearfix">
                        <label>City:</label>
                        <select name="city" className="form-control1" onChange={handleChange} required>
                            <option value="">Select City</option>
                            <option value="Karachi">Karachi</option>
                            <option value="Lahore">Lahore</option>
                            <option value="Islamabad">Islamabad</option>
                            <option value="Rawalpindi">Rawalpindi</option>
                            <option value="Other">Other</option>
 
                        </select>
                    </div>



                   

                    <div className="form-group2 clearfix">
                        <label>Lens Type :</label>
                        <select name="lensName" className="form-control1" onChange={handleChange} required>
                            <option value="">Select Lense Type </option>
                            <option value="Fisheye">Fisheye</option>
                            <option value="Wide angle">Wide angle</option>
                            <option value="Standard">Standard</option>
                            <option value="Short telephoto">Short telephoto</option>
                            <option value="Other">Other</option>
 
                        </select>
                    </div>





                   

                    <div className="form-group2 clearfix">
                        <label>Gender:</label>
                        <select name="gender" className="form-control1" onChange={handleChange} required>
                            <option value="">Select  Gender </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          
                            <option value="Other">Other</option>
 
                        </select>
                    </div>



                    <div className="form-group2 clearfix">
                        <label>Social Media:</label>
                        <input type="text" name="socialMedia" value={formData.socialMedia} onChange={handleChange} />
                    </div>
                </div>
                <button type="submit" className='btn btn-success'>Submit</button>
            </form>
        </div>
    );
}

export default PhotographerForm;
