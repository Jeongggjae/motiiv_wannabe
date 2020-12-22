const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');
const upload = require('../../modules/multer');

router.get('/', postController.readAllPosts);
router.get('/detail', postController.postDetail);
router.post('/:postId/like', postController.createLike);
router.post('/:postId/deletelike', postController.deleteLike);


module.exports = router;