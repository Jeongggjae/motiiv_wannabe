const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');
const upload = require('../../modules/multer');

router.get('/', postController.readAllPosts);

module.exports = router;