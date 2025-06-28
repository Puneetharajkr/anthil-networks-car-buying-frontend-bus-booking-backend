const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./models/db');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send("Bus Booking API is Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
