const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.get('/:date', async (req, res) => {
  const { date } = req.params;
  const appointments = await Appointment.find({ date });
  res.json(appointments);
});

router.post('/', async (req, res) => {
  const { name, phone, date, time } = req.body;
  const existing = await Appointment.findOne({ date, time });
  if (existing) return res.status(400).json({ message: 'Slot already booked' });

  const appointment = new Appointment({ name, phone, date, time });
  await appointment.save();
  res.status(201).json(appointment);
});

module.exports = router;