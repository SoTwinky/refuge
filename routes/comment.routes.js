const router = require('express').Router();
const refugeController = require('../controllers/refuge.controller');

// pet
router.get('/', refugeController.getAllRefuges);


module.exports = router;