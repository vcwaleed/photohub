import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pagestyle.css';

function Agriculture2() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:8000/ag-images");
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

  return (
    <div>
      <h1>opopo</h1>
      
      <div className='img-container'>
        {images.map((image) => (
          <div key={image.id} className="img-box">
            <img src={`http://localhost:8000/uploads/${image.userimg}`} alt="Agriculture" />
            <p>Username: {image.username}</p>
            <p>Date Added: {image.date}</p>
            <p>Category: {image.category}</p>
          </div>
        ))}
      </div>


    </div>
  );
}

export default Agriculture2;
