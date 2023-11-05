const express = require('express');
const router = express.Router();
const { createRequest, updateRequestStatus, listRequestsForUser } = require('../controllers/requestController');
const authMiddleware = require('../middleware/auth');

router.post('/create', authMiddleware, createRequest);
router.put('/update', authMiddleware, updateRequestStatus);
router.get('/list/:username', authMiddleware, listRequestsForUser);

module.exports = router;
