// Import required modules
const express = require('express');
const router = express.Router();
const db = require('../db'); // ✅ PostgreSQL connection file
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load Google Sheets credentials
const credentialsPath = path.join(process.cwd(), 'service-account.json');
if (!fs.existsSync(credentialsPath)) {
  console.error(`service-account.json file not found at: ${credentialsPath}`);
  process.exit(1);
}
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = '15JnTeZyms9KTTWjirJCiaXzCUwhAM1NKuYyF2h4j_2M';

// Get all appointments (From DB)
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM appointments');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching appointments:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new appointment (POST to DB)
router.post('/', async (req, res) => {
  const { patientName, doctorName, date, time } = req.body;

  if (!patientName || !doctorName || !date || !time) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  try {
    // Insert into PostgreSQL
    const result = await db.query(
      'INSERT INTO appointments (patient_name, doctor_name, appointment_date, appointment_time) VALUES ($1, $2, $3, $4) RETURNING *',
      [patientName, doctorName, date, time]
    );

    // Add to Google Sheets (✅ Using "Sheet1" as default sheet name)
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:D', // ✅ Corrected sheet name
      valueInputOption: 'RAW',
      requestBody: {
        values: [[patientName, doctorName, date, time]],
      },
    });

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error booking appointment:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router to use in server.js
module.exports = router;
