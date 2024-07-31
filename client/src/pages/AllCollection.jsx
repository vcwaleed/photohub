import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
//import moment from "moment";
import Alert from 'react-bootstrap/Alert';
import jwt_decode from "jwt-decode";

import'./image.css';
import './pagestyle.css';

function AllCollection() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
 
  const [userId, setUserId] = useState(null); // State to store user ID

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

    getUserData(); // Fetch data
  }, []);

  const getUserData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/getdata", {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.data.status === 201) {
        setData(res.data.data);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


const addToCart = async (productId) => {
  try {
    console.log("productId:", productId);
    console.log("userId:", userId);

    // Retrieve token from local storage
    const token = localStorage.getItem("token");
    
    console.log("Token:", token);

    if (!token) {
      console.error("Token not found in local storage");
      return; // Exit early if token is not found
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json" // Make sure to set the content type
      }
    };

    const res = await axios.post(
      "http://localhost:8000/orderplace",
      {
        product_id: productId,
        user_id: userId,
        quantity: 1 // Initial quantity is one
      },
      config 
    );
    console.log("Response:", res);
    
    if (
      res.data &&
      res.data.message === "Item added to order detail successfully"
    ) {
      alert("Item added to cart successfully");
     
    } else {
      console.error("Failed to add item to cart");
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};


  return (
    <>
      <div className='main-heading'>
        <h1>AllCollection</h1>
      </div>

      {show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        User Delete
      </Alert> : null}

      <div className='img-container'>
        {data.length > 0 ? data.map((el) => (
          <div key={el.id} className="img-box2">
            <Card>
              <Card.Img variant="top" src={`http://localhost:8000/uploads/${el.userimg}`} className="card-image" />
              <Card.Body className='text-center'>
                
                {/* <Card.Title>id catagery : {el.category}</Card.Title> */}
                
                <button className='addtocard' onClick={() => addToCart(el.id)}>Add to Cart</button>
              </Card.Body>
            </Card>
          </div>
        )) : null}
      </div>
    </>
  )
}

export default AllCollection;
