const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

// Middleware per te verifikuar nqs Useri eshte admin
const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ isLoggedIn: false });
  }

  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = verified.user;

    if (!req.user.isAdmin) {
      return res.status(403).send('Access Denied - Not Authorized');
    }
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

module.exports.verifyAdmin = verifyAdmin;

