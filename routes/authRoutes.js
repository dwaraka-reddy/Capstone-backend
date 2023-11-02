const express = require('express');
const router = express.Router();
const { signUp, signIn, updateUser } = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.put('/update-profile', updateUser);

module.exports = router;
