const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Google Sheets Setup
const credentials = JSON.parse(fs.readFileSync('google-sheet-api-credentials.json'));
const client = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key.replace(/\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets']
);
const sheets = google.sheets({ version: 'v4', auth: client });
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// API to fetch appointments
app.get('/appointments', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Appointments!A2:E',  // 
    });
    res.json(response.data.values || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Server start
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
