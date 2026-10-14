
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const assignments = require('./assignments.json');
const attendance = require('./attendance.json');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Connection failed:', err.message));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/api/assignments', (req, res) => {
  res.json(assignments);
});

app.get('/api/attendance', (req, res) => {
  res.json(attendance);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
