import React, { useState, useEffect } from 'react';
import PlantList from './PlantList';
import NewPlantForm from './PlantForm';
import Search from './Search';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializePlants = async () => {
      try {
        const response = await fetch('http://localhost:6001/plants');
        let plantsData = await response.json();
        
        if (plantsData.length === 0) {
          const initialPlants = [
            { name: "Aloe", image: "./images/aloe.jpg", price: 15.99 },
            { name: "ZZ Plant", image: "./images/zz-plant.jpg", price: 25.98 },
            { name: "Pothos", image: "./images/pothos.jpg", price: 12.50 }
          ];
          await Promise.all(initialPlants.map(plant => 
            fetch('http://localhost:6001/plants', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(plant)
            })
          ));
          
          const newResponse = await fetch('http://localhost:6001/plants');
          plantsData = await newResponse.json();
        }
        
        setPlants(plantsData);
      } catch (error) {
        console.error("Error initializing plants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePlants();
  }, []);

  const addPlant = async (newPlant) => {
    try {
      const response = await fetch('http://localhost:6001/plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlant),
      });
      const addedPlant = await response.json();
      setPlants([...plants, addedPlant]);
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };

  const toggleSoldOut = (id) => {
    setPlants(plants.map(plant => 
      plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
    ));
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="loading">Loading plants...</div>;
  }

  return (
    <main>
      <h1>Plantsy</h1>
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <NewPlantForm onAddPlant={addPlant} />
      <PlantList plants={filteredPlants} onToggleSoldOut={toggleSoldOut} />
    </main>
  );
}

export default App;
