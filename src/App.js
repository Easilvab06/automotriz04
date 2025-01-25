// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StatisticsProvider } from './context/StatisticsContext'; // Importar el proveedor del contexto
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import VehicleRegistration from './components/VehicleRegistration';
import Statistics from './components/Statistics';
import RepairRegistration from './components/RepairRegistration';
import Dashboard from './components/Dashboard';
import './styles/global.css';
import './styles/theme.css';

const App = () => {
  return (
    <StatisticsProvider> {/* Proveedor del contexto */}
      <Router>
        <Header />
        <div className="app-container">
          <Sidebar />
          <div className="content-container">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/registro-vehiculo" element={<VehicleRegistration />} />
              <Route path="/registro-reparacion" element={<RepairRegistration />} />
              <Route path="/estadisticas" element={<Statistics />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </StatisticsProvider>
  );
};

export default App;



