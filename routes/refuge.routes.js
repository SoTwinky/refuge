const router = require('express').Router();
const refugeController = require('../controllers/refuge.controller');

// pet
router.get('/', refugeController.getAllRefuges);
router.get('/:id', refugeController.getRefugeInfo);
router.put('/:id', refugeController.updateRefuge);
router.delete('/:id', refugeController.deleteRefuge);

module.exports = router;