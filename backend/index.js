const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// CORS को सक्षम करें
app.use(cors());

// JSON डेटा को पार्स करने के लिए मिडलवेयर
app.use(express.json());

// होम रूट
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// अपॉइंटमेंट बुकिंग API
app.post('/api/appointments', (req, res) => {
  const { patientName, doctor, date, time } = req.body;
  
  if (!patientName || !doctor || !date || !time) {
    return res.status(400).json({ message: 'सभी फ़ील्ड भरना आवश्यक है।' });
  }

  console.log(`✅ अपॉइंटमेंट बुक किया गया:`);
  console.log(`मरीज का नाम: ${patientName}`);
  console.log(`डॉक्टर: ${doctor}`);
  console.log(`तारीख: ${date}`);
  console.log(`समय: ${time}`);

  res.json({ message: 'अपॉइंटमेंट सफलतापूर्वक बुक किया गया!' });
});

// सर्वर को सुनना
app.listen(PORT, () => {
  console.log(`✅ सर्वर चल रहा है: http://localhost:${PORT}`);
});
