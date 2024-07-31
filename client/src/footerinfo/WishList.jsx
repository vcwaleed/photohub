import React from 'react';
import FooterSideBar from './FooterSideBar';

function WishList() {
  return (
    <>
    <div className='main-wishlist-container'>

      <FooterSideBar />
      <div className="wishlist-container"> 
        <h3>
          A Wishlist is a "folder" on the website that you create, in which you
          can store, manage, and share images of interest to you.Wishlists are
          designed to help you get organized. When you find an image on our
          website that you like, you can save it to a Wishlist you've created
          and continue searching. No need to save the image to your hard drive
          or jot down the image number.
        </h3>
      </div>
      </div>
    </>
  );
}

export default WishList;
