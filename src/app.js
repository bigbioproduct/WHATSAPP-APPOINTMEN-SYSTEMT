// Import required modules
const express = require('express');
const app = express();
const appointmentRoutes = require('./routes/appointmentRoutes');

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the appointment routes at /appointments
app.use('/appointments', appointmentRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
