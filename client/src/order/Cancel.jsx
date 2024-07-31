import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Cancel() {
  useEffect(() => {
    // Animation effect for the cancel message
    const cancelMessage = document.getElementById('cancel-message');
    cancelMessage.style.opacity = 1;
    cancelMessage.style.transition = 'opacity 1s ease-in-out';

    // Clean up on unmount
    return () => {
      cancelMessage.style.opacity = 0;
    };
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1
        id="cancel-message"
        style={{
          opacity: 0,
          fontFamily: 'Arial, sans-serif',
          fontSize: '2rem',
          color: '#ff6347',
        }}
      >
        Oops! Something went wrong
      </h1>
      <p
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '1rem',
          color: '#666',
        }}
      >
        Please try again later.
      </p>
      {/* Use Link component to link to the home page */}
      <Link to="/">
        <button
          className="btn btn-primary mt-3"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '1rem',
          }}
        >
          Go to Home
        </button>
      </Link>
    </div>
  );
}

export default Cancel;
