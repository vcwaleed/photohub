import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import './pagestyle.css';
function Food() {
  const [Images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  


  useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");
    console.log("Token from local storage:", token);

    if (token) {
      const decoded = jwt_decode(token);
      console.log("Decoded token:", decoded);
      setUserId(decoded.userId); // Set the user ID from the decoded token
    } else {
      console.error("Token not found in local storage");
    }

    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:8000/food-images");
        if (res.data.status === 200) {
          setImages(res.data.data);
        } else {
          setError("Error fetching images");
        }
      } catch (error) {
        setError("Error fetching images: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

 

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  
  const addToCart = async (productId) => {
    try {
        console.log("productId:", productId);
        console.log("userId:", userId);

        const res = await axios.post("http://localhost:8000/orderplace", {
            product_id: productId,
            user_id: userId, // Pass the user ID to the backend
            quantity: 1 // Initial quantity is one
        });
        console.log("Response:", res);
        // Update UI or show confirmation message
        if (res.data && res.data.message === 'Item added to order detail successfully') {
            alert('Item added to cart successfully');
            // Optionally, you can update the cart count or perform any other UI update
        } else {
            console.error('Failed to add item to cart');
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};
 

  return (
    <>
    
    <div className='main-heading'>
       <h1>Food</h1> 
    </div>


     
    <div className='img-container'>
        {Images.map((image) => (
          <div key={image.id} className="img-box2"   >
            <img src={`http://localhost:8000/uploads/${image.userimg}`} alt="Agriculture" />
            {/* <p>Username: {image.username}</p>
            <p>Date Added: {image.date}</p>
            <p>Category: {image.category}</p> */}
            <button className='addtocard' onClick={() => addToCart(image.id)}>Add to Cart</button>
          </div>
        ))}
      </div>

    
    </>
  )
}

export default Food
