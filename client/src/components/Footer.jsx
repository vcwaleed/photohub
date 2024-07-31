import React from 'react';

import { Link } from 'react-router-dom';
import './Footer.css';

function Footer  () {
  return (
    <>
    <footer className="footer">
      <div className="contact-info">
        <div className="left-corner">
          <p className="info-text">info@Photohub.com</p>
        </div>
        <div className="phone-info">
         
          <div className="phone-icon">
            <p className="info-text">All Pak:1800-11-6899</p>
          </div>
        </div>
        <div className="whatsapp-info">
          
          <div className="phone-icon">
             <p className="info-text">Whatsapp:+923065167490</p>
          </div>
        </div>
      </div>

      <div className="follow-us">
        
        <div className="social-icons">
          <span role="img" aria-label="Facebook"></span>
          <span role="img" aria-label="Twitter"></span>
          <span role="img" aria-label="Instagram"></span>
        </div>
      </div>

      <div className="company-info">
        <div>
          
          <h2>Company Information</h2>
          <Link to="/"><i className="info-text"></i>Home</Link>
          <Link to="/AboutUs"><i className="info-text"></i>About Us</Link>
         
          
          </div>

        {/* <div>
          <h2>Need Help?</h2>
          
          <Link to="/ContactUs"><i className="info-text"></i>Contact Us</Link>
          <Link to="/FAQ"><i className="info-text"></i>FAQ</Link>
        </div> */}

      </div>


      
      <div className="copyright-info">
        <p>&copy; https://photohub.com. A division of Mash Audio Visuals Pvt. Ltd. All rights reserved.</p>
         </div>

      

    </footer>

    </>

  );
};

export default Footer;
