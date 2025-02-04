// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import UserDashboard from './Components/Dashboard';
import RouteManagement from './Components/Route';
  // Example for Route Detail Page

function App() {
  return (
    <Router>
      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path='/Route' element={<RouteManagement />} />
          </Routes>
      
    </Router>
  );
}

export default App;
