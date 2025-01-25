import React from 'react';
import '../styles/theme.css'; // Ajusta la ruta según la ubicación real


const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/registro-vehiculo">Registrar Vehículo</a></li>
        <li><a href="/registro-reparacion">Registrar Reparación</a></li>
        <li><a href="/estadisticas">Estadísticas</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
