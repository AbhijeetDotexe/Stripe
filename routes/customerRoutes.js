const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.createCustomer);
router.get('/testing', customerController.renderTestPage);

module.exports = router;
