// src/components/Statistics.js
import React from 'react';
import { useStatistics } from '../context/StatisticsContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const { stats } = useStatistics(); // Obtener las estadísticas globales

  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], // Meses
    datasets: [
      {
        label: 'Reparaciones Completadas',
        data: stats.repairs, // Datos dinámicos de reparaciones
        fill: false,
        borderColor: 'rgba(75,192,192,1)', // Color de la línea
        tension: 0.1, // Curvatura de la línea
      },
      {
        label: 'Vehículos Registrados',
        data: stats.vehicles, // Datos dinámicos de vehículos
        fill: false,
        borderColor: 'rgba(255,99,132,1)', // Color de la línea
        tension: 0.1, // Curvatura de la línea
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Estadísticas Mensuales',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="statistics">
      <h1>Estadísticas</h1>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>

      <h2>Resumen Mensual</h2>
      <table className="statistics-table">
        <thead>
          <tr>
            <th>Mes</th>
            <th>Reparaciones Completadas</th>
            <th>Vehículos Registrados</th>
          </tr>
        </thead>
        <tbody>
          {data.labels.map((month, index) => (
            <tr key={index}>
              <td>{month}</td>
              <td>{stats.repairs[index]}</td>
              <td>{stats.vehicles[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;

