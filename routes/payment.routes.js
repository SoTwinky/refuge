const router = require('express').Router();
const paymentController = require('../controllers/payment.controller');

// Payment
router.get('/', paymentController.getAllPayment);
router.post('/', paymentController.createPayment);
router.get('/:id', paymentController.getRefugeDonations);

module.exports = router;