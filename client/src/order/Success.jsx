import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 

function Success() {
  useEffect(() => {
    
    const successText = document.getElementById('success-text');
    successText.classList.add('animate__animated', 'animate__bounceIn');

    // Clean up animation classes after the animation completes
    const animationEndHandler = () => {
      successText.classList.remove('animate__animated', 'animate__bounceIn');
      successText.removeEventListener('animationend', animationEndHandler);
    };

    successText.addEventListener('animationend', animationEndHandler);

    // Clean up on unmount
    return () => {
      successText.removeEventListener('animationend', animationEndHandler);
    };
  }, []);

  return (
    <div className="container text-center mt-5">
      <h2 id="success-text">Payment Successful!</h2>
      
      <Link to="/">
        <button className="btn btn-primary mt-3">Continue Shopping</button>
      </Link>
    </div>
  );
}

export default Success;
