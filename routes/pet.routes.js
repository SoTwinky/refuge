const router = require('express').Router();
const petController = require('../controllers/pet.controller');

// pet
router.get('/', petController.getAllPets);
router.get('/:id', petController.getPetInfo);

module.exports = router;