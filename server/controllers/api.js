const express = require('express');
const router = express.Router();
const customerPurchase = require('../business-logic/customerPurchase');

router.get('/', function(req, res) {
	customerPurchase.purchaseResults();
	res.send(customerPurchase.purchaseResults());
});

module.exports = router;