'use strict'

const express = require('express');
const router = express.Router();
const customerPurchase = require('../business-logic/customerEngagementPattern');
const purchasesByDay = require('../business-logic/numberOfPurchasesByDay');


router.get('/', function(req, res) {
	customerPurchase.purchaseResults();
	res.send(customerPurchase.purchaseResults());
});

/*
* desc: endpoint to get all the total purchase value per day
* return: {status: true/false, message: JSON with values/error }
*/
router.get('/purchases-by-days', function(req, res) {
	
	try {
		let returnJson = purchasesByDay.calculateNumberOfPurchasesByDay();
		res.status(200).json({
			status: true,
			message: returnJson
		});
	}
	catch(exception) {
		res.status(500).json({
			status: false,
			message: exception
		});
	}
	
});

module.exports = router;