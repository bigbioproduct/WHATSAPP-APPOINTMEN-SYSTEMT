const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// 🛠️ PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ✅ Doctor Registration Route
router.post('/register-doctor', async (req, res) => {
  const {
    name,
    email,
    designation,
    country,
    state,
    city,
    mobile,
    password,
    googleSheetLink 
  } = req.body;

  if (!name || !email || !designation || !country || !state || !city || !mobile || !password || !googleSheetLink) {
    return res.status(400).json({ message: '❌ सभी फ़ील्ड भरना आवश्यक है।' });
  }

  try {
    // 🛑 Check if doctor already exists by email
    const existing = await pool.query('SELECT * FROM doctors WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: '❌ Email पहले से registered है।' });
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO doctors (name, email, designation, country, state, city, mobile, password,googleSheetLink )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, name, email, designation, country, state, city, mobile;
    `;
    const values = [name, email, designation, country, state, city, mobile, hashedPassword, googleSheetLink];

    const result = await pool.query(query, values);
    res.status(201).json({ message: '✅ Doctor Registered Successfully', doctor: result.rows[0] });
  } catch (err) {
    console.error('❌ Error inserting doctor:', err);
    res.status(500).json({ message: '❌ Server error' });
  }
});

// ✅ GET doctor by email (for appointment booking)
router.get('/by-email/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const result = await pool.query('SELECT id, name, email, designation FROM doctors WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '❌ Doctor नहीं मिला।' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error fetching doctor:', err);
    res.status(500).json({ message: '❌ Server error' });
  }
});

module.exports = router;
