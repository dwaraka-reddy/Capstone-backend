const express = require('express');
const router = express.Router();
const { customerDashboard, workerDashboard, searchWorkers } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');

router.get('/customer', authMiddleware, customerDashboard);
router.get('/worker', authMiddleware, workerDashboard);
router.get('/search-workers/:expertise', searchWorkers);

module.exports = router;
