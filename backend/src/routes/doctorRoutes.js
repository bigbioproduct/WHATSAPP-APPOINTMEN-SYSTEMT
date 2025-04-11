const express = require('express');
const router = express.Router();
const pool = require('../utils/db');
const bcrypt = require('bcryptjs'); // ✅ password hash करने के लिए

// ✅ Doctor Registration API
router.post('/register-doctor', async (req, res) => {
  const {
    name,
    email,
    designation,
    country,
    state,
    city,
    mobile,
    password // ✅ नया password field
  } = req.body;

  if (!name || !email || !designation || !country || !state || !city || !mobile || !password) {
    return res.status(400).json({ message: '❌ सभी फ़ील्ड भरना आवश्यक है।' });
  }

  try {
    // ✅ पासवर्ड को हैश करें
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO doctors (name, email, designation, country, state, city, mobile, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [name, email, designation, country, state, city, mobile, hashedPassword];
    const result = await pool.query(query, values);

    res.status(201).json({ message: '✅ Doctor Registered Successfully', doctor: result.rows[0] });
  } catch (err) {
    console.error("❌ Error inserting doctor:", err);
    res.status(500).json({ message: '❌ Server error' });
  }
});

module.exports = router;
