const express = require('express');
const router = express.Router();
const {signUpStep1, signUpStep2, signUpStep3, signUpStep4, signIn, updateUser, getUserProfile} = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.post('/signin', signIn);
router.put('/update-profile', authMiddleware, updateUser);
router.post('/signup/step1', signUpStep1);
router.post('/signup/step2', authMiddleware, signUpStep2);
router.post('/signup/step3', authMiddleware, signUpStep3);
router.post('/signup/step4', authMiddleware, signUpStep4);
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
