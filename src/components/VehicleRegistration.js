// src/components/VehicleRegistration.js
import React, { useState, useEffect } from 'react';
import { useStatistics } from '../context/StatisticsContext'; // Importar el contexto
import '../styles/theme.css';

const VehicleRegistration = () => {
  const [vehicle, setVehicle] = useState({
    model: '',
    brand: '',
    year: '',
    licensePlate: '',
  });
  
  const [vehicles, setVehicles] = useState([]); // Estado para almacenar los vehículos registrados
  const { registerVehicle } = useStatistics(); // Obtener la función para actualizar las estadísticas

  // Cargar los vehículos del localStorage al iniciar el componente
  useEffect(() => {
    const storedVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    setVehicles(storedVehicles);
  }, []);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Vehículo registrado');
    
    // Registrar el vehículo en el estado local
    const updatedVehicles = [...vehicles, vehicle];
    
    // Actualizar el estado y guardar en localStorage
    setVehicles(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));

    // Limpiar el formulario
    setVehicle({
      model: '',
      brand: '',
      year: '',
      licensePlate: '',
    });

    // Actualizar las estadísticas después de registrar el vehículo
    registerVehicle(); // Esto actualizará el estado global de las estadísticas
  };

  return (
    <div className="form-container">
      <h2>Registrar Vehículo</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="model" 
          value={vehicle.model} 
          onChange={handleChange} 
          placeholder="Modelo" 
        />
        <input 
          type="text" 
          name="brand" 
          value={vehicle.brand} 
          onChange={handleChange} 
          placeholder="Marca" 
        />
        <input 
          type="number" 
          name="year" 
          value={vehicle.year} 
          onChange={handleChange} 
          placeholder="Año" 
        />
        <input 
          type="text" 
          name="licensePlate" 
          value={vehicle.licensePlate} 
          onChange={handleChange} 
          placeholder="Placa" 
        />
        <button type="submit">Registrar Vehículo</button>
      </form>

      {/* Tabla para mostrar los vehículos registrados */}
      <div className="table-container">
        <h3>Vehículos Registrados</h3>
        {vehicles.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Año</th>
                <th>Placa</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={index}>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.licensePlate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay vehículos registrados.</p>
        )}
      </div>
    </div>
  );
};

export default VehicleRegistration;

