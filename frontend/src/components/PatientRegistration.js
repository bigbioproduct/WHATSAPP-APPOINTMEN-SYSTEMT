import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    gender: '',
    age: '',
    doctorEmail: '',
    dateTime: new Date(),
  });

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/doctors`);

        if (Array.isArray(res.data)) {
          setDoctors(res.data);
        } else {
          console.error('Doctor API did not return an array:', res.data);
          setDoctors([]);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/patients`, formData);

      await axios.post(`${process.env.REACT_APP_API_URL}/send-confirmation`, {
        doctorEmail: formData.doctorEmail,
        patientName: formData.name,
        patientMobile: formData.mobile,
      });

      alert('🎉 Appointment Booked & WhatsApp Sent!');
      setFormData({
        name: '',
        mobile: '',
        gender: '',
        age: '',
        doctorEmail: '',
        dateTime: new Date(),
      });
    } catch (err) {
      console.error(err);
      alert('❌ Error booking appointment');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Patient Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Patient Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={() => setFormData({ ...formData, gender: 'Male' })}
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={() => setFormData({ ...formData, gender: 'Female' })}
            /> Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Child"
              checked={formData.gender === 'Child'}
              onChange={() => setFormData({ ...formData, gender: 'Child' })}
            /> Child
          </label>
        </div>
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={formData.doctorEmail}
          onChange={(e) => setFormData({ ...formData, doctorEmail: e.target.value })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Select Doctor --</option>
          {doctors.map((doc) => (
            <option key={doc.email} value={doc.email}>
              {doc.name} ({doc.designation})
            </option>
          ))}
        </select>
        <DatePicker
          selected={formData.dateTime}
          onChange={(date) => setFormData({ ...formData, dateTime: date })}
          showTimeSelect
          dateFormat="Pp"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientRegistration;
