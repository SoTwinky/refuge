const router = require('express').Router();
const refugeController = require('../controllers/refuge.controller');

// pet
router.post('/', refugeController.createRefuge);
router.get('/', refugeController.getAllRefuges);
router.get('/:id', refugeController.getRefugeInfo);
router.put('/update/:id', refugeController.updateRefuge);
router.delete('/delete/:id', refugeController.deleteRefuge);

module.exports = router;