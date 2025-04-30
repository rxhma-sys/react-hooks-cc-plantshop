import React from 'react';

function PlantCard({ plant, onToggleSoldOut }) {
  // Format price to match test expectations
  const formatPrice = (price) => {
    const num = parseFloat(price);
    return num % 1 === 0 ? num.toString() : num.toFixed(2);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {formatPrice(plant.price)}</p>
      {plant.soldOut ? (
        <button className="sold-out" disabled>Out of Stock</button>
      ) : (
        <button 
          className="in-stock"
          onClick={() => onToggleSoldOut(plant.id)}
        >
          In Stock
        </button>
      )}
    </li>
  );
}

export default PlantCard;
