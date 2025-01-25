import React, { createContext, useState, useContext } from 'react';

const StatisticsContext = createContext();

export const useStatistics = () => {
  return useContext(StatisticsContext);
};

export const StatisticsProvider = ({ children }) => {
  const loadStatsFromStorage = () => {
    const savedStats = localStorage.getItem('stats');
    if (savedStats) {
      return JSON.parse(savedStats);
    }
    return {
      repairs: Array(12).fill(0),
      vehicles: Array(12).fill(0),
    };
  };

  const [stats, setStats] = useState(loadStatsFromStorage);

  const resetStats = () => {
    const resetData = {
      repairs: Array(12).fill(0),
      vehicles: Array(12).fill(0),
    };

    setStats(resetData); // Restablece el estado global

    localStorage.setItem('stats', JSON.stringify(resetData)); // Borra los datos en localStorage
  };

  const registerVehicle = () => {
    const currentMonth = new Date().getMonth();
    const updatedVehicles = [...stats.vehicles];
    updatedVehicles[currentMonth] += 1;

    const newStats = {
      ...stats,
      vehicles: updatedVehicles,
    };

    setStats(newStats);
    localStorage.setItem('stats', JSON.stringify(newStats));
  };

  const registerRepair = () => {
    const currentMonth = new Date().getMonth();
    const updatedRepairs = [...stats.repairs];
    updatedRepairs[currentMonth] += 1;

    const newStats = {
      ...stats,
      repairs: updatedRepairs,
    };

    setStats(newStats);
    localStorage.setItem('stats', JSON.stringify(newStats));
  };

  const value = {
    stats,
    registerVehicle,
    registerRepair,
    resetStats,  // Añadimos la función de restablecer
  };

  return (
    <StatisticsContext.Provider value={value}>
      {children}
    </StatisticsContext.Provider>
  );
};
