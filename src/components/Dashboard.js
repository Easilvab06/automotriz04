import React from 'react';
import Sidebar from './Sidebar';
import Statistics from './Statistics';
import { useStatistics } from '../context/StatisticsContext'; // Importar el contexto para obtener las estadísticas

const Dashboard = () => {
  const { stats, resetStats } = useStatistics();  // Accedemos a las estadísticas globales

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que deseas restablecer todos los datos?')) {
      // Restablecer estadísticas
      resetStats();

      // Eliminar vehículos y reparaciones de localStorage
      localStorage.removeItem('vehicles');
      localStorage.removeItem('repairs');
      
      // Recargar la página para que se limpie todo (esto también asegura que se borren las estadísticas de la UI)
      window.location.reload();
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1>Dashboard</h1>
        <Statistics stats={stats} />
        <button onClick={handleReset} className="reset-button">Restablecer Datos</button>
      </div>
    </div>
  );
};

export default Dashboard;


