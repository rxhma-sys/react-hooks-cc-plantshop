import React from 'react';

function PlantCard({ plant, onToggleSoldOut }) {
  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} className="plant-image" />
      <div className="plant-details">
        <h3 className="plant-name">{plant.name}</h3>
        <p className="plant-price">${plant.price.toFixed(2)}</p>
        <button 
          className={`stock-button ${plant.soldOut ? 'sold-out' : 'in-stock'}`}
          onClick={() => onToggleSoldOut(plant.id)}
        >
          {plant.soldOut ? 'Sold Out' : 'In Stock'}
        </button>
      </div>
    </div>
  );
}

export default PlantCard;
