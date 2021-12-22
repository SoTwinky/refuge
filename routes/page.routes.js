const router = require('express').Router();
const pageController = require('../controllers/page.controller');

// pet
router.get('/', pageController.getAllPages);
router.get('/:id', pageController.getPageInfo);
router.put('/:id', pageController.updatePage);
router.delete('/:id', pageController.deletePage);

module.exports = router;