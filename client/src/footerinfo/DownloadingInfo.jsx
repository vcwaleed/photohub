import React from 'react';
import FooterSideBar from './FooterSideBar';


function DownloadingInfo() {
  return (
    <>
     <div className='main-wishlist-container'>
    <FooterSideBar />
    <div className="wishlist-container ">
      <div className="tip">
       
        <span className="tip-text">
          ON THE MAC: With cursor over the image, hold down the mouse button and choose an appropriate command for saving the image.
        </span>
      </div>
      <div className="tip">
       
        <span className="tip-text">
          ON THE PC: With cursor over the image, right-click and choose "Save image as..."
        </span>
      </div>
      <div className="tip">
        
        <span className="tip-text">
          Note: If you save the image from the search page, you will save the thumbnail-size file. To save a larger version of the thumbnail, click on it to bring up the enlarged view and then save it.
        </span>
      </div>
    </div>

    </div>

    </>
  );
}

export default DownloadingInfo;
