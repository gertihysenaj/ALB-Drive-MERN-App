const express = require('express');
const app = express();
const port = 8000;

const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const User = require('./models/user.model');


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
        lastName: decodedPayload.user.lastName,
        email: decodedPayload.user.email
      };
      res.json({ isLoggedIn: true, user, isAdmin: decodedPayload.user.isAdmin });
    } else {
      return res.json({ isLoggedIn: false });
    }
  });
});

// Get user data route

app.get('/api/users/:id', async (req, res) => {
  const token = req.cookies.token;
  
  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      // The token was invalid or expired.
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      // Get user by ID
      const user = await User.findById(req.params.id);
      
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    }
  });
});

// Log Out / per te hequr Cookies pas log out
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ status: 'logged out' });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));


