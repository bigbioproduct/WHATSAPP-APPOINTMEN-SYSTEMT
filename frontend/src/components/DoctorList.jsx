import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/doctors')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('❌ Error fetching doctors:', error);
      });
  }, []);

  const handleBook = (doctor) => {
    // अब doctorId नहीं भेज रहे हैं
    navigate(`/book-appointment`, { state: { doctor } });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">👨‍⚕️ रजिस्टर्ड डॉक्टर</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doctor, index) => (
          <div key={index} className="p-4 border rounded bg-white shadow hover:shadow-lg transition duration-300">
            <p><strong>👨‍⚕️ नाम:</strong> {doctor.name}</p>
            <p><strong>📱 मोबाइल:</strong> {doctor.mobile}</p>
            <button
              onClick={() => handleBook(doctor)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
