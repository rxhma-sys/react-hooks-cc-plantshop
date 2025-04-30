import React from 'react';

function PlantCard({ plant, onToggleSoldOut }) {
  return (
    <li className="card" data-id={plant.id}>
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price.toFixed(2)}</p>
      <button 
        className={plant.soldOut ? 'primary sold-out' : 'primary'}
        onClick={() => onToggleSoldOut(plant.id)}
      >
        {plant.soldOut ? 'Sold Out' : 'In Stock'}
      </button>
    </li>
  );
}

export default PlantCard;
