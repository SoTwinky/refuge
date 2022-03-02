const router = require('express').Router();
const petController = require('../controllers/pet.controller');

// pet
router.post('/', petController.createPet);
router.get('/', petController.getAllPets);
router.get('/:id', petController.getPetInfo);
router.get('/favorites/:id', petController.getPetFavorites);
router.post('/favorites/:id', petController.getPetFavorites);

module.exports = router;