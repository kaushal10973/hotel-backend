const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Load room data
app.get('/rooms', (req, res) => {
  const rooms = JSON.parse(fs.readFileSync('rooms.json'));
  res.json(rooms);
});

// Save booking
app.post('/book', (req, res) => {
  const booking = req.body;
  const bookings = JSON.parse(fs.readFileSync('bookings.json'));
  bookings.push(booking);
  fs.writeFileSync('bookings.json', JSON.stringify(bookings, null, 2));
  res.json({ message: 'Booking successful!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
