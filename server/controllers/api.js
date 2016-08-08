const express = require('express');
const router = express.Router();
const customerPurchase = require('../business-logic/customerEngagementPattern');

router.get('/', function(req, res) {
	customerPurchase.purchaseResults();
	res.send(customerPurchase.purchaseResults());
});

module.exports = router;