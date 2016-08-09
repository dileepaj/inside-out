'use strict'

const express = require('express');
const router = express.Router();
const customerPurchase = require('../business-logic/customerEngagementPattern');
const purchasesByDay = require('../business-logic/numberOfPurchasesByDay');
const customerValuePerCity = require('../business-logic/totalCustomerValuePerCity');
const revenuePerCityByOrderSource = require('../business-logic/revenuePerCityByOrderSource');


router.get('/customer-engagement-pattern', function(req, res) {
	
	try {
	let returnJson = customerPurchase.purchasePatternResults();
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

/*
 * desc: endpoint to get the total purchase value per city
 */
router.get('/customer-value-per-city', function(req, res) {

	try {
		let returnJson = customerValuePerCity.calculateValuePerCity();
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



router.get('/rev-perCity-by-orderSource', function(req, res) {

	try {
		let returnJson = revenuePerCityByOrderSource.revPerCityByOrderSource();
		res.status(200).json({
			status: true,
			message: returnJson
		});
	}
	catch(exception) {

		console.log(exception);
		res.status(500).json({
			status: false,
			message: exception
		});
	}

});


module.exports = router;