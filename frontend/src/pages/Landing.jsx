import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #81c784 0%, #2e7d32 100%)',
    color: '#fff'
  }}>
    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿 Green Thumb</h1>
    <p style={{ fontSize: '1.3rem', marginBottom: '2rem', maxWidth: 500, textAlign: 'center' }}>
      Welcome to Green Thumb! Organize your plants, track their care routines, and receive timely reminders to keep your plants healthy and happy.
    </p>
    <div>
      <Link to="/login" style={{
        padding: '0.7rem 2rem',
        marginRight: '1rem',
        background: '#fff',
        color: '#2e7d32',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1rem'
      }}>Login</Link>
      <Link to="/register" style={{
        padding: '0.7rem 2rem',
        background: '#2e7d32',
        color: '#fff',
        border: '2px solid #fff',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1rem'
      }}>Register</Link>
    </div>
  </div>
);

export default Landing;
