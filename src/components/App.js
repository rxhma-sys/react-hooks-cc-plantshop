import React, { useState, useEffect } from 'react';
import PlantList from './PlantList';
import NewPlantForm from './PlantForm';
import Search from './Search';


function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(response => response.json())
      .then(data => setPlants(data))
      .catch(error => console.error('Error fetching plants:', error));
  }, []);

  const addPlant = (plant) => {
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: plant.name,
        image: plant.image,
        price: parseFloat(plant.price) 
      }),
    })
      .then(response => response.json())
      .then(newPlant => setPlants([...plants, newPlant]));
  };

  const toggleSoldOut = (id) => {
    setPlants(plants.map(plant => 
      plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
    ));
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="app-container">
      <h1 className="app-title">Plantsy</h1>
      <div className="controls-container">
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <NewPlantForm onAddPlant={addPlant} />
      </div>
      <PlantList plants={filteredPlants} onToggleSoldOut={toggleSoldOut} />
    </main>
  );
}

export default App;
