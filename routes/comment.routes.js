const router = require('express').Router();
const commentController = require('../controllers/comment.controller');

// pet
router.get('/', commentController.getAllComments);
router.post('/add/', commentController.addComment);
router.put('/update/:id', commentController.updateComment);
router.delete('/delete/:id', commentController.delComment);

module.exports = router;