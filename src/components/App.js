import { useState, useEffect } from 'react';
import PlantList from './PlantList';
import PlantForm from './PlantForm';
import Search from './Search';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('http://localhost:6001/plants');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPlants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPlants();
  }, []);

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="loading">Loading plants...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <h1>Plantsy</h1>
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantForm plants={plants} setPlants={setPlants} />
      <PlantList plants={filteredPlants} setPlants={setPlants} />
    </div>
  );
}

export default App;
