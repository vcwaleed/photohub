import React from 'react';
import { Link } from 'react-router-dom';
import './photographer.css';

function Photographersubmittedrequest() {
  return (
    <div className="submitted-container">
      <div className="message">
        <h2>Your request is registered!</h2>
        <p>Thank you for trusting us. We will review your request shortly.</p>
      </div>
      <Link to="/home" className="back-to-home-btn">Back to Home</Link>
    </div>
  );
}

export default Photographersubmittedrequest;


