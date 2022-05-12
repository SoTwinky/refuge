const router = require('express').Router();
const tplController = require('../controllers/tpl.controller');

// Subscription
router.get('/', tplController.getAllItem);
router.post('/', tplController.createTPL);

module.exports = router;