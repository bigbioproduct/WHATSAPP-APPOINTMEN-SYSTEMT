// आवश्यक मॉड्यूल आयात करें
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// PostgreSQL कनेक्शन सेटअप
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// 📅 अपॉइंटमेंट बुकिंग रूट
router.post('/book', async (req, res) => {
  const { patientName, appointmentDate, doctorName, contactNumber } = req.body;

  // इनपुट वेलिडेशन
  if (!patientName || !appointmentDate || !doctorName || !contactNumber) {
    return res.status(400).json({ error: '❌ Missing required fields' });
  }

  try {
    const query = `
      INSERT INTO appointments (patient_name, appointment_date, doctor_name, contact_number)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [patientName, appointmentDate, doctorName, contactNumber];

    const result = await pool.query(query, values);
    res.status(201).json({ message: '✅ Appointment booked successfully', appointment: result.rows[0] });
  } catch (error) {
    console.error('❌ अपॉइंटमेंट बुक करने में त्रुटि:', error.message);
    res.status(500).json({ error: '❌ Server error, unable to book appointment' });
  }
});

// 🗑️ अपॉइंटमेंट रद्द करने का रूट
