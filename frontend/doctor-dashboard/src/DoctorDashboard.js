import React from 'react';

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-blue-600">Doctor Dashboard</h1>

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
      </div>
    </div>
  );
}

export default DoctorDashboard;
