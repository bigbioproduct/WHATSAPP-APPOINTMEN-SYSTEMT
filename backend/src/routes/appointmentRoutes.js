// backend/routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();

router.post('/book', (req, res) => {
  const { patientName, doctorEmail, appointmentTime } = req.body;

  console.log('📅 Booking appointment:', { patientName, doctorEmail, appointmentTime });

  // Placeholder response
  res.status(200).json({ message: 'Appointment booked successfully!' });
});

module.exports = router;
