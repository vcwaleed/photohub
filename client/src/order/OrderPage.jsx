import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './order.css';
import { FaTrash } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom'; 

const stripePromise = loadStripe("pk_test_51PARToLnneDt0Wxl9W3ZopRPVinhN0UOS8B6MtS47Yx483ATmDEohpRpclVN9z4LkhC5g9yTiW5psyFAfubEPOgf00MxMnJEPP");

function OrderPage() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from local storage:', token);

    if (token) {
      const decoded = jwt_decode(token);
      const userId = decoded.userId;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      axios.get(`http://localhost:8000/orderdetails?userId=${userId}`, config)
        .then(response => {
          console.log('Response data:', response.data);
          setOrderDetails(response.data.orderDetails);
        })
        .catch(error => {
          console.error('Error fetching order details:', error);
        });
    }
  }, []);

  const calculateTotalPrice = () => {
    return orderDetails.reduce((total, order) => total + 1 * order.quantity, 0);
  };

  const handleDelete = (id) => {
    setIsClicked(true);
    console.log(id)
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.delete(`http://localhost:8000/deleteorderdetails/${id}`, config)
      .then(response => {
        console.log(response.data); // Assuming the API sends some response
        // Update the order details after deletion
        const updatedOrderDetails = orderDetails.filter(order => order.id !== id);
        setOrderDetails(updatedOrderDetails);
      })
      .catch(error => {
        console.error('Error deleting order item:', error);
      });


    setTimeout(() => {
      // Remove item from UI after animation
    }, 300);
  };

  const makePayment = async () => {
    const stripe = await stripePromise;

    const totalPrice = calculateTotalPrice();
   


    const body = {

      products: orderDetails,
      totalPrice: totalPrice

      
    }
    const headers = {
      "Content-Type": "application/json"
    }
    const response = await fetch("http://localhost:8000/create-checkout-session", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      console.log(result.error);
    }
  }

  return (
    <div className="container text-center mt-5" >
      <h1>Shopping Cart</h1>
      <div className="ordercart-items">
        {orderDetails.map(order => {
          console.log(order); // Log order object
          return (
            <div className="ordercart-item" key={order.id}>
              <div className="orderitem-image">
                <img src={`http://localhost:8000/uploads/${order.userimg}`} alt={order.category} />
              </div>
              <div className="orderitem-details">
                <div className="order-detail">
                  <p className='heading-order'>Category </p>
                  <p>{order.category}</p>
                </div>
                <div className="order-detail">
                  <p className='heading-order'>Quantity</p>
                  <p> {order.quantity}</p>
                </div>
                <div className="order-detail">
                  <p className='heading-order'>Price</p>
                  <p>$1</p>
                </div>
                <div>
                  <FaTrash
                    className={`delete-icon ${isClicked ? 'clicked' : ''}`}
                    onClick={() => handleDelete(order.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="ordercart-total">
        <p>Total Price: ${calculateTotalPrice()}</p>
        <button onClick={makePayment}>Pay Now</button>
      </div>

      <div>
      <Link to="/">
        <button className="btn btn-primary mt-3">Continue Shopping</button>
      </Link>
      </div>
    </div>
  );
}

export default OrderPage;
