import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPageTemp.jsx';

import Navbar from './Components/Navbar';
import DoctorRegister from './Components/DoctorRegister.jsx';
import DoctorLogin from './Components/DoctorLogin.jsx';
import DoctorProfile from './Components/DoctorProfile.jsx';
import DoctorList from './Components/DoctorList.jsx';
import AppointmentBooking from './Components/AppointmentBooking';
import PatientRegistration from './Components/PatientRegistration'; // ✅ Patient form

function App() {
  const [loggedInDoctor, setLoggedInDoctor] = useState(null); // 🔐 Doctor Login state

  const handleLoginSuccess = (doctorData) => {
    setLoggedInDoctor(doctorData); // Set doctor info
  };

  return (
    <Router>
      <Navbar /> {/* Navbar only once at top */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<DoctorRegister />} /> {/* Doctor registration */}
        <Route path="/login" element={<DoctorLogin onLoginSuccess={handleLoginSuccess} />} />
        <Route
          path="/profile"
          element={
            loggedInDoctor ? (
              <DoctorProfile doctor={loggedInDoctor} />
            ) : (
              <div className="p-6 text-center text-red-600">
                🔒 Please login first.
              </div>
            )
          }
        />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/book-appointment/:doctorEmail" element={<AppointmentBooking />} /> {/* ✅ Updated */}
        <Route path="/patient-register" element={<PatientRegistration />} /> {/* Patient form */}
      </Routes>
    </Router>
  );
}

export default App;
