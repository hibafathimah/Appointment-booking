const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// In-memory store for appointments (for demonstration purposes)
const appointments = [];

// Endpoint to book an appointment
app.post('/api/book', (req, res) => {
  const { name, phone, date, timeSlot } = req.body;
  if (!name || !phone || !date || !timeSlot) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check if the slot is already booked
  const exists = appointments.find(
    (appt) => appt.date === date && appt.timeSlot === timeSlot
  );
  if (exists) {
    return res.status(400).json({ error: 'Slot already booked' });
  }

  // Book the appointment
  appointments.push({ name, phone, date, timeSlot });
  res.status(201).json({ message: 'Appointment booked successfully' });
});

// Endpoint to fetch available and booked slots for a given date
app.get('/api/slots', (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: 'Date parameter is required' });
  }

  // Define all possible slots (excluding break time)
  const allSlots = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00"
  ];

  // Find booked slots for the given date
  const bookedSlots = appointments
    .filter((appt) => appt.date === date)
    .map((appt) => appt.timeSlot);

  // Calculate available slots by filtering out the booked ones
  const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

  res.json({ bookedSlots, availableSlots });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
