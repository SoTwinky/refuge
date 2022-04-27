const router = require('express').Router();
const subscriptionController = require('../controllers/subscription.controller');

// Payment
// Subscription
router.get('/', subscriptionController.getAllSubscription);
router.post('/', subscriptionController.createSubscription);
router.get('/:id', subscriptionController.getRefugeSubscription);

module.exports = router;