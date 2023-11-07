const express = require('express');
const router = express.Router();

const {signUpStep1, signUpStep2, signUpStep3, signIn, updateUser} = require('../controllers/authController');

router.post('/signin', signIn);
router.put('/update-profile', updateUser);
router.post('/signup/step1', signUpStep1);
router.post('/signup/step2', signUpStep2);
router.post('/signup/step3', signUpStep3);

module.exports = router;
