const { authenticate } = require('../config/jwt.config');
const paymentController = require('../controllers/payment.controller');

module.exports = (app) => {
  app.post('/api/process-payment', authenticate, paymentController.processPayment);
};
