// src/components/PopularSearches.js
import React from 'react';
import './PopularSearches.css';
import { Link } from 'react-router-dom';

import { PsearchItems } from './PsearchItems';
function PopularSearches () {
  // const searchItems = ['Family','Wedding',' Festivals', 'Culture','kitchen','Students','Computer','Travel','Shopping','Religion','Farmer','Traditions','Farmers',];

  return (

    <>
    <div className="popular-searches">
      <h2>Popular Searches</h2>
      <div className="search-buttons">
        {PsearchItems.map((item, index) => (
          <button key={index} className="search-button">
           <Link to={item.path}>
            
            {item.title } 
           </Link>
          </button>
        ))}
      </div>
    </div>

    </>
  );
};

export default PopularSearches;
