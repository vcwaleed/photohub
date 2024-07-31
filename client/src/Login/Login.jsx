import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;


    
    const handleSubmit = (event) => {
        event.preventDefault();
    
        axios.post("http://localhost:8000/login", values, { withCredentials: true })
            .then(res => {
                if (res.data.Status === 'success' && res.data.token) {
                    // Store the token in local storage
                    localStorage.setItem('token', res.data.token);
                    // After successful login, store user role in local storage
                    localStorage.setItem('userRole', res.data.role);
                    localStorage.setItem('email', values.email);

    
                    // Redirect based on user role
                    if (res.data.role === 1) {
                        // Redirect to admin dashboard
                        navigate('/admindashboard');
                    } else {
                        // Redirect to the home page after a short delay
                        setTimeout(() => {
                            navigate('/');
                        }, 2000); // Delay for 2 seconds before redirecting
                    }
                } else {
                    // Show error message for incorrect credentials
                    setErrorMessage("Incorrect email or password.");
                }
            })
            .catch(err => {
                // Handle other errors (e.g., network issues)
                console.log('Login Error:', err);
                setErrorMessage("No valid email and password.");
                setValues({ ...values, password: '', email: '' });
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            });
    };
    

    return (
        <div className='login-container'>
            <div className='login-box'>
                <h2 className='text-center mb-4'>Login</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>
                            <strong>Email</strong>
                        </label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            className='form-control'
                            placeholder='Enter your email'
                            value={values.email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>
                            <strong>Password</strong>
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className='form-control'
                            placeholder='Enter your password'
                            value={values.password}
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type='submit' className='btn btn-success'>
                        <strong>Login</strong>
                    </button>
                    <br />
                    <p>You agree to our term and policies</p>
                    <Link to='/register' className='btn btn-default border btn-primary text-decoration-none'>
                        Create Account
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
