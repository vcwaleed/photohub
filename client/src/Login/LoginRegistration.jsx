import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginRegistration() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({
            name: '',
            email: '',
            password: '',
        });

        if (values.password.length < 7) {
            setErrors(prevState => ({
                ...prevState,
                password: 'Password must be at least 7 characters long.'
            }));
        } else {
            axios.post('http://localhost:8000/register', values)
                .then((res) => {
                    if (res.data.Status === 'success') {
                        alert('Registration successful');
                        navigate('/login');
                    } else {
                        alert(' signup');
                        navigate('/login');
                        
                    }
                })
                .catch((error) => {
                    console.error('Registration failed:', error);
                });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className='login-container'>
            <div className='login-box'>
                <h2 className='text-center mb-4'>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label'>
                            <strong>Name:</strong>
                        </label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            className='form-control'
                            placeholder='Enter your name'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>
                            <strong>Email:</strong>
                        </label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            className='form-control'
                            placeholder='Enter your email'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>
                            <strong>Password:</strong>
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className='form-control'
                            placeholder='Enter your password'
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success'>
                        <strong>Register</strong>
                    </button>
                    <br />
                    <p>You agree to our terms and policies</p>
                    <Link to='/login' className='btn btn-default border btn-primary text-decoration-none'>
                        Already have an account? Login
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default LoginRegistration;
