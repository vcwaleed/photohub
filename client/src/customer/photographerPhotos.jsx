import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import ImageRating from './ratingComponent';
import './photos.css'; // Ensure your CSS styles are properly defined here
import { useParams } from 'react-router-dom';

const PhotographerAllPhotos = () => {
const { photographerId } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPhotpos();
  }, []);


  const fetchPhotpos=()=>{
     // Fetch images from your backend API
     fetch(`http://localhost:8000/images/${photographerId}`)
     .then(response => response.json())
     .then(data => {
       setImages(data);
       setLoading(false);
     })
     .catch(error => {
       console.error('Error fetching images:', error);
       setLoading(false);
     });

  }

  const handleRating = (rating, imageId) => {
    fetch('http://localhost:8000/addratting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        imageId: imageId,
        rating: rating,
      }),
    })
      .then(response => {
        if (response.ok) {
            
          console.log('Rating added successfully');
          fetchPhotpos();
        } else {
          console.error('Failed to add rating:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error adding rating:', error);
      });
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const filteredImages = images.filter(
    image =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
    
      <section className="portfolio">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Photo"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
        <div className="container">
          <div className="row">
            
            {filteredImages.map((image, index) => (
                
                <div className="col-lg-4" key={index}>
                <div className="img-box">
                <div className="rating-container">
                    <ImageRating image={image} />
                  

                  </div>
                <img src={image.image} alt="" />
                
                <div className="overlay-text">{image.title}
                </div>
                <div className='overlay-ratting'>
                <Rating
                        ratingValue={image.rating}
                        size={20}
                        transition
                        fillColor="#FFD700"
                        emptyColor="#DCDCDC"
                        onClick={(rating) => handleRating(rating, image.image)}
                      />
                      </div>
              </div>
              </div>
           
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PhotographerAllPhotos;
