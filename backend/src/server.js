// 1. आवश्यक मॉड्यूल आयात करें 
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const helmet = require('helmet'); // सुरक्षा के लिए
const morgan = require('morgan'); // लॉगिंग के लिए
const path = require('path');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;

// मिडलवेयर
app.use(cors());
app.use(helmet()); // सुरक्षा के लिए हेडर सेटअप
app.use(express.json());
app.use(morgan('dev')); // HTTP अनुरोध लॉगिंग

// 2. PostgreSQL डेटाबेस कनेक्शन सेटअप
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// डेटाबेस कनेक्शन टेस्ट करें
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Database connected:', res.rows[0].now);
  }
});

// 3. Google Sheets सेटअप
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../service-account.json'), // अपने JSON फ़ाइल का पथ दें
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });

// 4. Google Sheets में डेटा अपडेट करने का रूट
app.post('/api/update-sheet', async (req, res) => {
  try {
    const { spreadsheetId, range, values } = req.body;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    res.status(200).json({ message: '✅ Sheet updated successfully!' });
  } catch (error) {
    console.error('❌ Error updating sheet:', error.message);
    res.status(500).json({ message: '❌ Error updating sheet', error: error.message });
  }
});

// 5. मुख्य रूट
app.get('/', (req, res) => {
  res.send('✅ Backend server is running!');
});

// 6. हेल्थ चेक रूट (सर्वर और डेटाबेस स्टेटस चेक)
app.get('/health', async (req, res) => {
  try {
    const dbResponse = await pool.query('SELECT 1');
    res.status(200).json({ server: 'running', database: 'connected' });
  } catch (err) {
    res.status(500).json({ server: 'running', database: 'disconnected', error: err.message });
  }
});

// 7. अपॉइंटमेंट रूट्स का उपयोग करें
const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointments', appointmentRoutes);

// 8. 404 हैंडलिंग
app.use((req, res, next) => {
  res.status(404).json({ message: '❌ Resource not found' });
});

// 9. एरर हैंडलिंग मिडलवेयर
app.use((err, req, res, next) => {
  console.error('❌ अनपेक्षित त्रुटि:', err.message);
  res.status(500).json({ message: '❌ सर्वर त्रुटि', error: err.message });
});

// 10. सर्वर को चलाएं
app.listen(PORT, () => {
  console.log(`✅ सर्वर चल रहा है: http://localhost:${PORT}`);
});
