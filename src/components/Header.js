import React from 'react';
import '../styles/theme.css'; // Ajusta la ruta según la ubicación real

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Mecánica Automotriz</div>
      <nav className="nav">
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/registro-vehiculo">Registrar Vehículo</a></li>
          <li><a href="/registro-reparacion">Registrar Reparación</a></li>
          <li><a href="/estadisticas">Estadísticas</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

