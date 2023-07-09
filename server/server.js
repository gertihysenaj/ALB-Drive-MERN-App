const express = require('express');
const app = express();
const port = 8000;

const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Middleware to set default headers for all requests
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  next();
});

require('./config/mongoose.config');

require('./routes/user.routes')(app);
require('./routes/booking.routes')(app);
require('./routes/car.routes')(app);

// Import the payment routes
const paymentRoutes = require('./routes/payment.routes');

// Use the payment routes
paymentRoutes(app);

// Verifikime nqs User eshte i authentifikuar cookies-token
app.get('/api/verify', (req, res) => {
  console.log("Verifying...");
  const token = req.cookies.token;
  console.log("Token from cookies: ", token);
  if (!token) return res.json({ isLoggedIn: false });

  jwt.verify(token, jwtSecret, (err, decodedPayload) => {
    console.log("Decoded payload: ", decodedPayload);
    if (err) return res.json({ isLoggedIn: false });

    if (decodedPayload && decodedPayload.user) {
      const userId = decodedPayload.user.id;
      const user = {
        id: decodedPayload.user.id,
        firstName: decodedPayload.user.firstName,
        lastName: decodedPayload.user.lastName
      };
      res.json({ isLoggedIn: true, user, isAdmin: decodedPayload.user.isAdmin });
    } else {
      return res.json({ isLoggedIn: false });
    }
  });
});

// Log Out / per te hequr Cookies pas log out
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ status: 'logged out' });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));


