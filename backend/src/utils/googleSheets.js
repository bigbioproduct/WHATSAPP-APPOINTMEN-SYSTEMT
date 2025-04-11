const { google } = require('googleapis');
const path = require('path');

// Authenticate with the service account
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../../service-account.json'), // ✅ Corrected path
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

module.exports = sheets;
