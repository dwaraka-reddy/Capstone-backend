const express = require('express');
const router = express.Router();
const {signUpStep1, signUpStep2, signUpStep3, signIn, updateUser} = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.post('/signin', signIn);
router.put('/update-profile', authMiddleware, updateUser);
router.post('/signup/step1', signUpStep1);
router.post('/signup/step2', authMiddleware, signUpStep2);
router.post('/signup/step3', authMiddleware, signUpStep3);

module.exports = router;
