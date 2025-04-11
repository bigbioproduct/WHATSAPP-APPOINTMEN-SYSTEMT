// src/Components/AppointmentBooking.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AppointmentBooking = () => {
  const { doctorEmail } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    patient_name: '',
    appointment_date: '',
    appointment_time: '',
    patient_mobile: '',
    patient_gender: '',
    patient_age: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/appointments/doctor/${doctorEmail}`);
        setDoctor(response.data.doctor);
      } catch (err) {
        console.error('Error fetching doctor:', err);
        setMessage('❌ Doctor not found.');
      }
    };

    fetchDoctor();
  }, [doctorEmail]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!doctor) {
      setMessage('❌ Doctor info not loaded');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/appointments/book', {
        ...formData,
        doctor_name: doctor.name,
      });

      setMessage('✅ Appointment booked successfully!');
      setFormData({
        patient_name: '',
        appointment_date: '',
        appointment_time: '',
        patient_mobile: '',
        patient_gender: '',
        patient_age: '',
      });
    } catch (error) {
      console.error('Booking error:', error);
      setMessage('❌ Failed to book appointment');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">📅 Book Appointment</h2>

      {doctor ? (
        <div className="mb-6">
          <p><strong>Doctor Name:</strong> {doctor.name}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Designation:</strong> {doctor.designation}</p>
          <p><strong>Location:</strong> {doctor.city}, {doctor.state}, {doctor.country}</p>
        </div>
      ) : (
        <p>Loading doctor information...</p>
      )}

      <form onSubmit={handleBooking} className="space-y-4">
        <input
          type="text"
          name="patient_name"
          placeholder="👤 Patient Name"
          value={formData.patient_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="appointment_date"
          value={formData.appointment_date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="time"
          name="appointment_time"
          value={formData.appointment_time}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="patient_mobile"
          placeholder="📱 Mobile Number"
          value={formData.patient_mobile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="patient_gender"
          value={formData.patient_gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">🚻 Select Gender</option>
          <option value="Male">👨 Male</option>
          <option value="Female">👩 Female</option>
          <option value="Other">🌈 Other</option>
        </select>
        <input
          type="number"
          name="patient_age"
          placeholder="🎂 Age"
          value={formData.patient_age}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ✅ Book Appointment
        </button>
      </form>

      {message && <p className="mt-4 text-center text-lg font-medium">{message}</p>}
    </div>
  );
};

export default AppointmentBooking;
