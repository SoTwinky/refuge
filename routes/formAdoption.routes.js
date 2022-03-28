const router = require('express').Router();
const formAdoptionController = require('../controllers/formAdoption.controller');

// formAdoption
router.get('/', formAdoptionController.getAllFormAdoption);
router.post('/', formAdoptionController.createFormAdoption);

module.exports = router;