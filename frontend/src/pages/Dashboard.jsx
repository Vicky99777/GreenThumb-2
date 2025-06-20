import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlantList from '../components/PlantList';
import CareTips from '../components/CareTips';
import PlantForm from '../components/PlantForm';
import 'react-datepicker/dist/react-datepicker.css';
import { showPlantNotification } from '../util/notifications'; 

const Dashboard = () => {
  const [plants, setPlants] = useState([]);

  // Request notification permission on component mount
  useEffect(() => {
    if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Check for due plants whenever plants data changes
  useEffect(() => {
    const checkDuePlants = () => {
      const now = new Date();
      plants.forEach(plant => {
        if (new Date(plant.nextCareDate) <= now) {
          showPlantNotification(plant.name, plant.careInstructions);
        }
      });
    };
    
    checkDuePlants();
  }, [plants]); // Run this effect whenever plants array changes

  // Fetch plants from backend
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/plants', { // Remove localhost:5000 if using proxy
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPlants(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchPlants();
  }, []);

  return (
    <div className="dashboard">
      <h1>My Plants</h1>
      <PlantForm setPlants={setPlants} />
      <PlantList plants={plants} setPlants={setPlants} />
      <CareTips />
    </div>
  );
};

export default Dashboard;
