const express = require('express');
const router = express.Router();

// Import the functions related to each step of the signup process
const { 
  signUpStep1, 
  signUpStep2, 
  signUpStep3, 
  signIn, 
  updateUser 
} = require('../controllers/authController');

// Existing routes
router.post('/signin', signIn);
router.put('/update-profile', updateUser);

// New routes for the three-step signup process
router.post('/signup/step1', signUpStep1);
router.post('/signup/step2', signUpStep2);
router.post('/signup/step3', signUpStep3);

module.exports = router;
