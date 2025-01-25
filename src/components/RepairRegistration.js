import React, { useState, useEffect } from 'react';
import { useStatistics } from '../context/StatisticsContext'; // Importar el contexto
import '../styles/theme.css';

const RepairRegistration = () => {
  const [repair, setRepair] = useState({
    vehicleId: '',
    description: '',
    cost: '',
    date: ''
  });

  const [repairs, setRepairs] = useState([]); // Para almacenar las reparaciones
  const { registerRepair } = useStatistics(); // Obtener la función para actualizar las estadísticas
  const [successMessage, setSuccessMessage] = useState(''); // Estado para mensaje de éxito

  // Cargar reparaciones desde localStorage
  useEffect(() => {
    const storedRepairs = JSON.parse(localStorage.getItem('repairs')) || [];
    setRepairs(storedRepairs);
  }, []);

  const handleChange = (e) => {
    setRepair({ ...repair, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (!repair.vehicleId || !repair.description || !repair.cost || !repair.date) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    if (isNaN(repair.cost) || repair.cost <= 0) {
      alert('El costo debe ser un número positivo.');
      return;
    }

    alert('Reparación registrada');

    // Registrar reparación en las estadísticas
    registerRepair();

    // Actualizar las reparaciones en el estado
    const updatedRepairs = [...repairs, repair];
    setRepairs(updatedRepairs);

    // Guardar reparaciones en localStorage
    localStorage.setItem('repairs', JSON.stringify(updatedRepairs));

    // Limpiar el formulario
    setRepair({
      vehicleId: '',
      description: '',
      cost: '',
      date: ''
    });

    // Mostrar mensaje de éxito
    setSuccessMessage('Reparación registrada exitosamente.');

    // Limpiar el mensaje después de 3 segundos
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="form-container">
      <h2>Registrar Reparación</h2>

      {/* Mostrar el mensaje de éxito */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="repair-form">
        <div className="input-group">
          <label htmlFor="vehicleId">ID del Vehículo</label>
          <input 
            id="vehicleId"
            type="text" 
            name="vehicleId" 
            value={repair.vehicleId} 
            onChange={handleChange} 
            placeholder="ID Vehículo" 
          />
        </div>

        <div className="input-group">
          <label htmlFor="description">Descripción de la Reparación</label>
          <textarea
            id="description"
            name="description"
            value={repair.description}
            onChange={handleChange}
            placeholder="Descripción de la reparación"
          />
        </div>

        <div className="input-group">
          <label htmlFor="cost">Costo</label>
          <input 
            id="cost"
            type="number" 
            name="cost" 
            value={repair.cost} 
            onChange={handleChange} 
            placeholder="Costo" 
            min="0" 
          />
        </div>

        <div className="input-group">
          <label htmlFor="date">Fecha</label>
          <input 
            id="date"
            type="date" 
            name="date" 
            value={repair.date} 
            onChange={handleChange} 
          />
        </div>

        <button type="submit" className="submit-button">Registrar Reparación</button>
      </form>

      {/* Tabla de Reparaciones Registradas */}
      <div className="table-container">
        <h3>Reparaciones Registradas</h3>
        {repairs.length > 0 ? (
          <table className="repairs-table">
            <thead>
              <tr>
                <th>ID Vehículo</th>
                <th>Descripción</th>
                <th>Costo</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {repairs.map((repair, index) => (
                <tr key={index}>
                  <td>{repair.vehicleId}</td>
                  <td>{repair.description}</td>
                  <td>{repair.cost}</td>
                  <td>{repair.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay reparaciones registradas.</p>
        )}
      </div>
    </div>
  );
};

export default RepairRegistration;


