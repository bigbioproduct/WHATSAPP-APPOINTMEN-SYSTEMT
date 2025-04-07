import React, { useEffect, useState } from 'react';
import './index.css';  // Tailwind CSS import
import DoctorDashboard from './DoctorDashboard';

function App() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Backend से API कॉल करें
    fetch("http://localhost:3000/api/appointments")
      .then((res) => res.json())
      .then((data) => {
        console.log("Appointments:", data);
        setAppointments(data);
      })
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-4">
        <DoctorDashboard />
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Appointments List</h2>
        {appointments.length > 0 ? (
          <ul className="space-y-2">
            {appointments.map((appointment, index) => (
              <li key={index} className="p-2 bg-gray-200 rounded">
                {appointment.patientName} - {appointment.date} - {appointment.time}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No appointments available.</p>
        )}
      </div>
    </div>
  );
}

export default App;
