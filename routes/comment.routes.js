const router = require('express').Router();
const commentController = require('../controllers/comment.controller');

// pet
router.get('/', commentController.getAllComments);
router.post('/add/', commentController.addComment);
router.patch('/delete/:id', commentController.delComment);

module.exports = router;