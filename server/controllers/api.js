'use strict'

const express = require('express');
const router = express.Router();
const customerPurchase = require('../business-logic/customerEngagementPattern');
const purchasesByDay = require('../business-logic/numberOfPurchasesByDay');
const purchasesByTime = require('../business-logic/purchasesBasedOnTime');
const totalCustomersPerCity = require('../business-logic/totalCustomersPerCity');
const totalRevenuePerCity = require('../business-logic/totalRevenuePerCity');
const avgAmountSpentPerCity = require('../business-logic/averageAmountSpentPerCity');
const revenuePerCityByOrderSource = require('../business-logic/revenuePerCityByOrderSource');
const testObjectMapping = require('../mappers/mainObjectMapper.icefresh');
const testObject = require('./external.apis');

router.get('/customer-engagement-pattern', function(req, res) {
	
	try {
	let returnJson = customerPurchase.purchasePatternResults();
	res.status(200).json({
		status: true,
		retention : returnJson.retention,
		message: returnJson.message
	});
	}
	catch(exception) {
		res.status(500).json({
			status: false,
			message: exception
		});
	}
});

/**
 * @api {get} /purchases-by-days Get data for total purchase amount for every day of the week
 * @apiName PurchasesByDay
 * @apiGroup Analytics
 *
 * @apiDescription Get data on average amount spent per city per order source. Data has been structured specifically for d3 graphs
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
		let returnJson = totalCustomersPerCity.calculateCustomersPerCity();
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

router.get('/test', function(req, res) {

		//  let returnJson = testObjectMapping.mapIceFreshOrderObjects();
		testObjectMapping.mapIceFreshOrderObjects().then((success) => {
			res.status(200).json({
				status: true,
				message: success
			});
		},(exception) => {
			console.log(exception);
			res.status(500).json({
				status: false,
				message: exception
			});
		});


});

/**
 * @api {get} /avg-amount-spent-per-city Average amount spent per city per order source
 * @apiName AverageAmountSpent
 * @apiGroup Analytics
 *
 * @apiDescription Get data on average amount spent per city per order source. Data has been structured specifically for d3 graphs
 * @apiSuccess {Boolean} status If the calculations were successful or not
 * @apiSuccess {Object} message An object containing all the required data
 * @apiSuccessExample {Object} Success-Response:
HTTP/1.1 200 OK
{
	"status": true,
	"message": {
		'orderSource' : {
			'city' : '...',
			'average': '...'
		} 
	}
}
*/

router.get('/avg-amount-spent-per-city', function(req, res) {
	
	try {
		let returnJson = avgAmountSpentPerCity.calculateAverageAmountSpentPerCity();
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