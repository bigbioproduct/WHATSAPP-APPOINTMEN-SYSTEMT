import React, { useEffect, useState } from 'react';

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const storedDoctor = localStorage.getItem('doctor');
    if (storedDoctor) {
      setDoctor(JSON.parse(storedDoctor));
    } else {
      // 🔐 अगर doctor लॉगिन नहीं है तो login page पर redirect करो
      window.location.href = '/login-doctor';
    }
  }, []);

  if (!doctor) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Welcome, Dr. {doctor.name}
        </h1>

        <div className="relative">
          <input 
            type="text" 
            placeholder="Search by patient or doctor..." 
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-center text-gray-500">
          No appointments found.
        </div>

        <button
          className="w-full mt-4 bg-red-500 text-white py-2 rounded hover:bg-red-600"
          onClick={() => {
            localStorage.removeItem('doctor');
            window.location.href = '/login-doctor';
          }}
        >
          🔓 Logout
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
