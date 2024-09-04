// CarCard.js
import React from 'react';

const CarCard = ({ carName, description, image, pricePerDay, onBook }) => {
  return (
    <div className="neumorphic-card">
      <img src={image} alt={carName} className="img-fluid card-image" />
      <div className="card-content">
        <h5>{carName}</h5>
        <p>{description}</p>
        <p>Price per day: ${pricePerDay}</p>
        <div class="dflex">
        <button class="cssbuttons-io-button"  onClick={onBook}>
          Book
          <div class="icon">
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"fill="currentColor"></path>
            </svg>
          </div>
        </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
