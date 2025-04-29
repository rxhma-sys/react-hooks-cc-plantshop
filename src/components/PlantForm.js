// src/PlantForm.js
import { useState } from 'react';

function PlantForm({ plants, setPlants }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlant = {
      ...formData,
      price: parseFloat(formData.price),
      soldOut: false
    };

    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPlant)
    })
      .then(res => res.json())
      .then(data => {
        setPlants([...plants, data]);
        setFormData({ name: '', image: '', price: '' });
      });
  };

  return (
    <form className="plant-form" onSubmit={handleSubmit}>
      <h2>Add New Plant</h2>
      <input
        type="text"
        name="name"
        placeholder="Plant name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        step="0.01"
        min="0"
        required
      />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default PlantForm;