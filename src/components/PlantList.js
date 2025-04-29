function PlantList({ plants, onUpdatePlant, onDeletePlant }) {
  const toggleSoldOut = (plant) => {
    const updatedPlant = { ...plant, soldOut: !plant.soldOut };
    onUpdatePlant(updatedPlant);
  };

  const handlePriceUpdate = (plant, newPrice) => {
    const updatedPlant = { ...plant, price: parseFloat(newPrice) };
    
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price: updatedPlant.price })
    })
      .then(res => res.json())
      .then(data => onUpdatePlant(data));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE'
    })
      .then(() => onDeletePlant(id));
  };

  return (
    <div className="plant-list">
      {plants.map(plant => (
        <div key={plant.id} className={`plant-card ${plant.soldOut ? 'sold-out' : ''}`}>
          <img src={plant.image} alt={plant.name} />
          <h3>{plant.name}</h3>
          <div className="price-control">
            <span>Price: $</span>
            <input
              type="number"
              value={plant.price}
              onChange={(e) => handlePriceUpdate(plant, e.target.value)}
              step="0.01"
              min="0"
            />
          </div>
          <div className="button-group">
            <button 
              onClick={() => toggleSoldOut(plant)}
              className={plant.soldOut ? 'sold-out-btn' : ''}
            >
              {plant.soldOut ? 'Sold Out!' : 'In Stock'}
            </button>
            <button 
              onClick={() => handleDelete(plant.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlantList;
