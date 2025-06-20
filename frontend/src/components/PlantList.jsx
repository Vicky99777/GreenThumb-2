import React from 'react';
import axios from 'axios';

const PlantList = ({ plants, setPlants }) => {
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plant?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/plants/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPlants(plants.filter(plant => plant._id !== id));
    } catch (err) {
      alert('Failed to delete plant');
    }
  };

  if (!plants.length) {
    return <p style={{ textAlign: 'center', margin: '2rem 0' }}>No plants added yet. Start by adding your first plant!</p>;
  }

  return (
    <div className="plant-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      {plants.map(plant => (
        <div key={plant._id} className="plant-card" style={{
          background: '#fff',
          padding: '1rem',
          borderRadius: '10px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          minWidth: '250px',
          maxWidth: '300px',
          position: 'relative'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>{plant.name}</h3>
          <p style={{ margin: '0.2rem 0' }}><strong>Type:</strong> {plant.type}</p>
          <p style={{ margin: '0.2rem 0' }}><strong>Next Care:</strong> {new Date(plant.nextCareDate).toLocaleString()}</p>
          <div style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#555' }}>
            <strong>Care:</strong> {plant.careInstructions}
          </div>
          <button
            onClick={() => handleDelete(plant._id)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: '#e53935',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              cursor: 'pointer'
            }}
            title="Delete Plant"
          >&#10006;</button>
        </div>
      ))}
    </div>
  );
};

export default PlantList;
