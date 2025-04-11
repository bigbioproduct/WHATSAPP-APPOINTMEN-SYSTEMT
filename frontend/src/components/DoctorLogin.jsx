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
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/login-doctor`,
        formData
      );

      alert('✅ लॉगिन सफल: ' + data.doctor.name);

      // 👉 आप यहां login success होने पर redirect या token store कर सकते हैं
    } catch (error) {
      console.error('❌ लॉगिन असफल:', error);
      alert('❌ ईमेल या पासवर्ड गलत है');
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
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'लॉगिन कर रहे हैं...' : 'लॉगिन'}
        </button>
      </form>
    </div>
  );
}

export default DoctorLogin;
