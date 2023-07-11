const { authenticate } = require('../config/jwt.config');
const paymentController = require('../controllers/payment.controller');

module.exports = (app) => {
  app.post('/api/payments/create-checkout-session', authenticate, paymentController.createCheckoutSession);
};
