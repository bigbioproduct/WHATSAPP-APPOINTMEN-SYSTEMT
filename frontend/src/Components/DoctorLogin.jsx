import React, { useState } from 'react';
import axios from 'axios';

function DoctorLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login-doctor`,
        formData
      );

      // 👉 Debug: Show raw API response
      alert("DEBUG: " + JSON.stringify(response.data));
      console.log('API Response:', response.data);

      // ✅ Define doctor from response
      const doctor = response?.data?.doctor;

      // Check if doctor and name exist in response
      if (doctor && doctor.name) {
        alert('✅ लॉगिन सफल: ' + doctor.name);

        // Save login data to localStorage
        localStorage.setItem('doctorToken', response?.data?.token || '');
        localStorage.setItem('doctorData', JSON.stringify(doctor));

        // Redirect to doctor dashboard after successful login
        // window.location.href = "/doctor-dashboard";
      } else {
        console.error('❌ Doctor data or name missing:', response?.data);
        alert('❌ डॉक्टर का डेटा प्राप्त नहीं हुआ, कृपया फिर से प्रयास करें');
      }

    } catch (error) {
      if (error?.response) {
        console.error('❌ सर्वर त्रुटि:', error.response);
        alert('❌ सर्वर से जुड़ी समस्या है, कृपया फिर से प्रयास करें');
      } else if (error?.message) {
        console.error('❌ नेटवर्क त्रुटि:', error.message);
        alert('❌ ईमेल या पासवर्ड गलत है');
      } else {
        console.error('❌ अज्ञात त्रुटि');
        alert('❌ कोई अज्ञात त्रुटि हुई है');
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">🔐 Doctor Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="ईमेल"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="पासवर्ड"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'लॉगिन कर रहे हैं...' : 'लॉगिन'}
        </button>
      </form>
    </div>
  );
}

export default DoctorLogin;
