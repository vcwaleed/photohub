import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import jwt_decode from "jwt-decode";
import { FaHome, FaBox, FaUser, FaCheckSquare ,FaImage , FaUserEdit , FaUpload} from 'react-icons/fa';




function AdminAllCollection() {
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

  const deleteItem = async (productId) => {
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

      const res = await axios.delete(
        `http://localhost:8000/deleteItem/${productId}`,
        config 
      );
      console.log("Response:", res);
      
      if (
        res.data &&
        res.data.message === "Item deleted successfully"
      ) {
        setShow(true);
        getUserData(); // Refresh the data after deletion
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>


    
<aside id="sidebar">
                <div className='adminactionsidebar-title'>
                    <div className='adminactionsidebar-brand'>
                        <FaHome className='adminactionicon_header'/> Admin Dashboard
                    </div>
                </div>

                <ul className='adminactionsidebar-list'>
                    <li className='adminactionsidebar-list-item'>
                        <a href="/admindashboard">
                            <FaBox className='adminicon'/> Dashboard
                        </a>
                    </li>
                    <li className='adminactionsidebar-list-item'>
                        <a href="/adminitemaction">
                            <FaImage className='adminactionicon'/> Products
                        </a>
                    </li>
                    <li className='adminactionsidebar-list-item'>
                        <a href="/adminalluser">
                            <FaUser className='adminactionicon'/> Register User
                        </a>
                    </li>
                    <li className='adminactionsidebar-list-item'>
                        <a href="/adminapprove">
                            <FaCheckSquare className='adminactionicon'/> Booking Approval
                        </a>
                    </li>
                    

                    <li className='adminactionsidebar-list-item'>
                        <a href="/upload">
                            <FaUpload className='adminactionicon'/>Upload Image
                        </a>
                    </li>

                    <li className='adminsidebar-list-item'>
          <a href="/adminphotographerrequests">
            < FaUserEdit className='adminicon'/> Photographers
          </a>
        </li>



                </ul>
            </aside>



    


      <div className="admingrid-container3" >

      <div className='main-heading' >
        <h1>All Images </h1>
      </div>

      {show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        Picture  deleted successfully
      </Alert> : null}

      <div className='img-container'>
        {data.length > 0 ? data.map((el) => (
          <div key={el.id} className="img-box2">
            <Card>
              <Card.Img variant="top" src={`http://localhost:8000/uploads/${el.userimg}`} className="card-image" />
              <Card.Body className='text-center'>
                
                <Card.Title>id catagery : {el.category}</Card.Title>
                
                <button  className='deletebutton' onClick={() => deleteItem(el.id)}>Delete</button>
              </Card.Body>
            </Card>
          </div>
        )) : null}
      </div>

      </div>
    </>
  )
}

export default AdminAllCollection;
