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
      .then(data => {
        const plantsWithNumericPrices = data.map(plant => ({
          ...plant,
          price: parseFloat(plant.price)
        }));
        setPlants(plantsWithNumericPrices);
      })
      .catch(error => console.error('Error fetching plants:', error));
  }, []);

  const addPlant = (plant) => {
    fetch('http://localhost:6001/plants', {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        name: plant.name,
        image: plant.image,
        price: plant.price
      })
    })
    .then(response => response.json())
    .then(newPlant => {
      setPlants([...plants, { ...newPlant, price: parseFloat(newPlant.price), soldOut: false }]);
    });
  };

  const toggleSoldOut = (id) => {
    setPlants(plants.map(plant => {
      if (plant.id === id) {
        return { ...plant, soldOut: !plant.soldOut };
      }
      return plant;
    }));
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <h1>Plant Shop</h1>
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <NewPlantForm onAddPlant={addPlant} />
      <PlantList plants={filteredPlants} onToggleSoldOut={toggleSoldOut} />
    </main>
  );
}

export default App;
