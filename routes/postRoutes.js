const express = require('express');
const router = express.Router();
const { createPost, getPosts, searchPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, createPost);
router.get('/', authMiddleware, getPosts);
router.get('/search/:expertise', searchPosts);

module.exports = router;
