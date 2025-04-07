import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    patientName: 'vivek',
    doctor: 'Dr. Smith',
    date: '2025-05-02',
    time: '17:09',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Appointment Booked!');
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-4">Appointment Booking System</h1>
      <p className="text-center text-gray-600 mb-6">Welcome to the WhatsApp Appointment Booking System!</p>

      <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-lg font-medium">Patient Name:</label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <label className="text-lg font-medium">Doctor:</label>
        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Johnson">Dr. Johnson</option>
        </select>

        <label className="text-lg font-medium">Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <label className="text-lg font-medium">Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default App;
