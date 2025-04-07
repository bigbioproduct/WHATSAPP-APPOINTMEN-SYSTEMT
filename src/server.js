// 1. मॉड्यूल इम्पोर्ट करें
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const { Pool } = require('pg');
const { exec } = require('child_process');

const app = express();
const appointmentRoutes = require('./routes/appointmentRoutes'); // ✅ सही पथ

// 2. JSON डेटा को हैंडल करने के लिए मिडलवेयर
app.use(express.json());

// 3. PostgreSQL कनेक्शन सेटअप (अब .env से डाटा लेगा)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// पासवर्ड को सही से पढ़ा गया या नहीं, यह चेक करें
console.log("🔑 Database User:", process.env.DB_USER);
console.log("🔑 Database Password:", process.env.DB_PASSWORD);
console.log("🔑 Database Host:", process.env.DB_HOST);
console.log("🔑 Database Name:", process.env.DB_NAME);
console.log("🔑 Database Port:", process.env.DB_PORT);

// 4. डेटाबेस कनेक्शन टेस्ट करें
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Database connected:', res.rows[0]);
  }
});

// 5. रीक्वेस्ट में डेटाबेस कनेक्शन जोड़ें
app.use((req, res, next) => {
  req.db = pool;
  next();
});

// 6. अपॉइंटमेंट रूट्स माउंट करें
app.use('/api/appointments', appointmentRoutes);

// 7. फ्रंटएंड फाइल्स सर्व करने के लिए (React App के लिए)
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'public', 'index.html'));
});

// 8. 404 हैंडलिंग
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 9. एरर हैंडलिंग मिडलवेयर
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 10. सर्वर स्टार्ट करें
const PORT = process.env.PORT || 3000;

// पहले से चल रहे सर्वर को रोकें (अगर कोई है)
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Trying to kill the process...`);
      exec(`netstat -ano | findstr :${PORT}`, (err, stdout) => {
        if (!err && stdout) {
          const pid = stdout.trim().split(/\s+/).pop();
          exec(`taskkill /F /PID ${pid}`, (err) => {
            if (!err) {
              console.log(`✅ Process ${pid} killed successfully.`);
              startServer(); // सर्वर को रीस्टार्ट करें
            } else {
              console.error('❌ Unable to kill process:', err.message);
              process.exit(1);
            }
          });
        } else {
          console.error('❌ No process found on port:', PORT);
          process.exit(1);
        }
      });
    } else {
      console.error('🔥 Server error:', err.message);
    }
  });
};

startServer();
