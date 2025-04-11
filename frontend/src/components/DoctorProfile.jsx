import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorProfile({ doctor }) {
  const [formData, setFormData] = useState(doctor || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doctor) {
      setFormData(doctor);
    }
  }, [doctor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:3000/api/update-doctor/${formData.id}`, // doctorId की जगह id
        {
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          designation: formData.designation,
          country: formData.country,
          state: formData.state,
          city: formData.city,
        }
      );
      alert('✅ Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">👨‍⚕️ Doctor Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className={`w-full text-white py-2 rounded ${loading ? 'bg-gray-500' : 'bg-yellow-600 hover:bg-yellow-700'}`}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}

export default DoctorProfile;
