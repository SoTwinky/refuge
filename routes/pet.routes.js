const router = require('express').Router();
const petController = require('../controllers/pet.controller');

// pet
router.post('/', petController.createPet);
router.get('/', petController.getAllPets);
router.get('/:id', petController.getPetInfo);
router.put('/update/:id', petController.updatePet);
router.delete('/delete/:id', petController.deletePet);
router.get('/favorites/:id', petController.getPetFavorites);
router.get('/formAdoption/', petController.getAllFormAdoption);
router.post('/formAdoption/', petController.createFormAdoption);
// Erreur ? : router.post('/favorites/:id', petController.getPetFavorites);

module.exports = router;