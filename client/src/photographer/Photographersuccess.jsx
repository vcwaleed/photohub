import React from 'react';
import { Link } from 'react-router-dom'; 
import './photographer.css';

function Photographersuccess() {
  return (
    <div className="success-container">
      <h2>Your request is submitted successfully!</h2>
      <p>Please wait for a response. You can also contact us at <a href="mailto:photohub@gmail.com">photohub@gmail.com</a>.</p>
      <Link to="/" className="btn btn-success">Go to Home</Link>
    </div>
  );
}

export default Photographersuccess;
