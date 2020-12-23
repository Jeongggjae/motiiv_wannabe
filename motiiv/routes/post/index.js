const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');
const upload = require('../../modules/multer');

router.get('/', postController.readAllPosts);
router.get('/:postId/detail', postController.postDetail);
router.post('/:postId/createcomment', postController.createComment);
router.delete('/:commentidx/deletecomment', postController.deleteComment);
router.get('/:postId/getcomment', postController.getComment);

module.exports = router;