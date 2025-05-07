import React, { useState } from 'react';
import axios from 'axios';

function DoctorRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    country: '',
    state: '',
    city: '',
    mobile: '',
    password: ''
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength('कमज़ोर');
    } else if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
      setPasswordStrength('मज़बूत');
    } else {
      setPasswordStrength('मध्यम');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/register-doctor`,
        formData
      );

      console.log('🧾 API Response:', response);
      const doctor = response?.data?.doctor;

      if (doctor?.name) {
        alert('✅ Doctor Registered: ' + doctor.name);
      } else {
        alert('✅ Doctor Registered!');
      }

      setFormData({
        name: '',
        email: '',
        designation: '',
        country: '',
        state: '',
        city: '',
        mobile: '',
        password: ''
      });
      setPasswordStrength('');
    } catch (error) {
      console.error('❌ Registration failed:', error);
      if (error.response?.data?.message) {
        alert('❌ ' + error.response.data.message);
      } else {
        alert('❌ Registration failed. Try again.');
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">👨‍⚕️ Doctor Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Name', name: 'name' },
          { label: 'Email', name: 'email' },
          { label: 'Designation', name: 'designation' },
          { label: 'Country', name: 'country' },
          { label: 'State', name: 'state' },
          { label: 'City', name: 'city' },
          { label: 'Mobile', name: 'mobile' }
        ].map(({ label, name }) => (
          <input
            key={name}
            type="text"
            name={name}
            placeholder={label}
            value={formData[name]}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        ))}

        {/* 🔐 Password Field */}
        <input
          type="password"
          name="password"
          placeholder="पासवर्ड"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* 🎯 Password Strength Indicator */}
        <p className={`text-sm ${
          passwordStrength === 'मज़बूत' ? 'text-green-600' :
          passwordStrength === 'मध्यम' ? 'text-yellow-600' :
          'text-red-600'
        }`}>
          पासवर्ड स्ट्रेंथ: {passwordStrength}
        </p>

        <button
          type="submit"
          className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default DoctorRegister;
