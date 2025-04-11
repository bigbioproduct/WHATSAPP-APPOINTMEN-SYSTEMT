console.log('✅ Appointment route registered!');

// ✅ .env फाइल लोड करें
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ .env से वैल्यूज़
const PORT = process.env.PORT || 3001;

// ✅ DB कनेक्शन pool
const pool = require('./src/utils/db');

// ✅ डॉक्टर रूट्स इंपोर्ट करो (💡 path fix yahan ho)
const doctorRoutes = require('./src/routes/doctorRoutes');
app.use('/api', doctorRoutes);

// ✅ अपॉइंटमेंट रूट्स इंपोर्ट करो
const appointmentRoutes = require('./src/routes/appointmentRoutes');
app.use('/api/appointment', appointmentRoutes);

// ✅ PATIENT ROUTE: मरीज का डेटा appointments table में सेव करना
app.post('/api/patients', async (req, res) => {
  const {
    patient_name,
    doctor_name,
    appointment_date,
    appointment_time,
    patient_mobile,
    patient_gender,
    patient_age
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO appointments 
        (patient_name, doctor_name, appointment_date, appointment_time, patient_mobile, patient_gender, patient_age)
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [
        patient_name,
        doctor_name,
        appointment_date,
        appointment_time,
        patient_mobile,
        patient_gender,
        patient_age
      ]
    );

    res.status(201).json({ success: true, appointment: result.rows[0] });
  } catch (error) {
    console.error('❌ Error saving appointment:', error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// ✅ Doctor Dropdown के लिए Doctor List API
app.get('/api/doctors', async (req, res) => {
  try {
    const result = await pool.query('SELECT doctor_id, name FROM doctors');
    res.json({ success: true, doctors: result.rows });
  } catch (error) {
    console.error('❌ Error fetching doctors:', error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// ✅ WhatsApp Confirmation API ✉️
app.post('/api/send-confirmation', async (req, res) => {
  const { doctorId, patientName, patientMobile } = req.body;

  try {
    const result = await pool.query('SELECT * FROM doctors WHERE doctor_id = $1', [doctorId]);
    const doctor = result.rows[0];

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    const message = `📅 Appointment Confirmed!\n\n👨‍⚕️ Doctor: ${doctor.name}\n📍 Location: ${doctor.location || 'N/A'}\n📞 Contact: ${doctor.mobile}\n\n✅ Thank you, ${patientName}!`;

    await axios.post('https://your-n8n-or-whatsapp-webhook-url.com/send', {
      to: patientMobile,
      message: message
    });

    res.json({ success: true, message: 'WhatsApp sent' });
  } catch (err) {
    console.error('❌ Error sending WhatsApp:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ✅ होम रूट
app.get('/', (req, res) => {
  res.send('✅ Backend server is running!');
});

// ✅ सर्वर स्टार्ट करो
app.listen(PORT, () => {
  console.log(`🚀 सर्वर चल रहा है: http://localhost:${PORT}`);
});
