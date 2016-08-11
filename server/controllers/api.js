'use strict'

const express = require('express');
const router = express.Router();
const customerPurchase = require('../business-logic/customerEngagementPattern');
const purchasesByDay = require('../business-logic/numberOfPurchasesByDay');
const purchasesByTime = require('../business-logic/purchasesBasedOnTime');
const totalRevenuePerCity = require('../business-logic/totalRevenuePerCity');
const totalCustomersPerCity = require('../business-logic/totalCustomersPerCity');
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
/**
 * @api {get} /purchases-by-days Get data for total purchase amount for every day of the week
 * @apiName PurchasesByDay
 * @apiGroup Data
 *
 *
 * @apiSuccess {Boolean} status If the calculations were successful or not
 * @apiSuccess {Object} message An object containing all the required data
 * @apiSuccessExample {Object} Success-Response:
HTTP/1.1 200 OK
{
	"status": true,
	"message": {
		"sunday": 1456,
		"monday": 4321,
		... 
	}
}
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

router.get('/purchases-by-time', function(req, res) {
	try {
		let returnJson = purchasesByTime.getPurchaseDetails();
		res.status(200).json({
			status: true,
			message: returnJson
		});
	}catch(exception){
		res.status(500).json({
			status: false,
			message: exception
		});
	}
});	
/*
 * desc: endpoint to get the total purchase value per city
 */
router.get('/total-revenue-per-city', function(req, res) {

	try {
		let returnJson = totalRevenuePerCity.calculateRevenuePerCity();
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

router.get('/total-customers-per-city', function(req, res) {

	try {
		let returnJson = totalRevenuePerCity.calculateRevenuePerCity();
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