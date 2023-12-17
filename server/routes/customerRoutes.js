const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/sendOtp', customerController.sendOtp);
router.post('/verifyOtp', customerController.verifyOtp);
router.post('', customerController.createOrUpdateUser);

module.exports = router;