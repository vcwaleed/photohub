import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle,  faHeart, faDownload } from '@fortawesome/free-solid-svg-icons'

import './fsidebar.css';
function FooterSideBar() {
  return (
    <>
        <div className="sidebarf">
        <ul>
          
          <li><a href="/AboutUs"><FontAwesomeIcon icon={faInfoCircle} /> About Us</a></li>
          {/* <li><a href="/contact"><FontAwesomeIcon icon={faPhone} /> Contact Us</a></li> */}
          <li><a href="/wishlist"><FontAwesomeIcon icon={faHeart} /> Wishlist</a></li>
          <li><a href="/downloadinginfo"><FontAwesomeIcon icon={faDownload} /> Downloading</a></li>
        </ul>
        </div>
      
    </>
  )
}

export default FooterSideBar
