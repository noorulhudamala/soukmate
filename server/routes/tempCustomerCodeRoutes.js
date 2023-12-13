const express = require('express');
const router = express.Router();
const guestCustomer = require('../controllers/tempCustomerCode');

router.post('/sendOtp', guestCustomer.sendOtp);
router.get('/verifyOtp', guestCustomer.verifyOtp);

module.exports = router;