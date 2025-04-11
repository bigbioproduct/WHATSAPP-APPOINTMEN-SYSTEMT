// 1. आवश्यक मॉड्यूल आयात करें 
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { google } = require('googleapis');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// 3. PostgreSQL डेटाबेस कनेक्शन सेटअप
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// 4. DB कनेक्शन टेस्ट
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Database connected:', res.rows[0].now);
  }
});

// 5. Google Sheets API सेटअप
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../service-account.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });

// 6. Google Sheet update route
app.post('/api/update-sheet', async (req, res) => {
  try {
    const { spreadsheetId, range, values } = req.body;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    res.status(200).json({ message: '✅ Sheet updated successfully!' });
  } catch (error) {
    console.error('❌ Error updating sheet:', error.message);
    res.status(500).json({ message: '❌ Error updating sheet', error: error.message });
  }
});

// 7. Basic routes
app.get('/', (req, res) => {
  res.send('✅ Backend server is running!');
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ server: 'running', database: 'connected' });
  } catch (err) {
    res.status(500).json({ server: 'running', database: 'disconnected', error: err.message });
  }
});

// 8. Import and use all routes
const appointmentRoutes = require('./routes/appointmentRoutes');
const doctorRoutes = require('./routes/doctors');

app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes); // ✅ सही base path है अब

// 9. WhatsApp message भेजने का रूट
app.post('/api/send-message', async (req, res) => {
  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({ message: '❌ Phone और message दोनों जरूरी हैं' });
  }

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.WABA_PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WABA_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Message sent:", response.data);
    res.status(200).json({ message: '✅ WhatsApp message sent!', data: response.data });
  } catch (error) {
    console.error("❌ WhatsApp Error:", error.response?.data || error.message);
    res.status(500).json({ message: '❌ WhatsApp message failed', error: error.response?.data || error.message });
  }
});

// 10. 404 हैंडलिंग
app.use((req, res, next) => {
  res.status(404).json({ message: '❌ Resource not found' });
});

// 11. Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ अनपेक्षित त्रुटि:', err.message);
  res.status(500).json({ message: '❌ सर्वर त्रुटि', error: err.message });
});

// 12. Start the server
app.listen(PORT, () => {
  console.log(`✅ सर्वर चल रहा है: http://localhost:${PORT}`);
});
