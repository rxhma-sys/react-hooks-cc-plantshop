import React from 'react';
import PlantCard from './PlantCard';

function PlantList({ plants, onToggleSoldOut }) {
  return (
    <div className="plant-list">
      {plants.map(plant => (
        <PlantCard 
          key={plant.id} 
          plant={plant} 
          onToggleSoldOut={onToggleSoldOut}
        />
      ))}
    </div>
  );
}

export default PlantList;
