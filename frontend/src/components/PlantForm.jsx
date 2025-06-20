import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { showPlantNotification } from '../util/notifications'; // Add this import

const PlantForm = ({ setPlants }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Indoor',
    careInstructions: '',
    nextCareDate: new Date()
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Remove localhost:5000 if using proxy
      const res = await axios.post('http://localhost:5000/api/plants', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Show notification if care date is immediate/past
      if (new Date(formData.nextCareDate) <= new Date()) {
        showPlantNotification(formData.name, formData.careInstructions);
      }

      setPlants(prev => [...prev, res.data]);
      setFormData({
        name: '',
        type: 'Indoor',
        careInstructions: '',
        nextCareDate: new Date()
      });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="plant-form">
      <input
        type="text"
        placeholder="Plant Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <select
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      >
        <option>Indoor</option>
        <option>Outdoor</option>
        <option>Succulent</option>
      </select>
      <textarea
        placeholder="Care Instructions"
        value={formData.careInstructions}
        onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
      />
      <span>Next Watering..👇</span>
      <DatePicker
        selected={formData.nextCareDate}
        onChange={(date) => setFormData({ ...formData, nextCareDate: date })}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <button type="submit">Add Plant</button>
    </form>
  );
};

export default PlantForm;
