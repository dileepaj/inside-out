'use strict'

const express = require('express');
const router = express.Router();
const customerPurchase = require('../../business-logic/customerEngagementPattern');
const purchasesByDay = require('../../business-logic/numberOfPurchasesByDay');
const purchasesByTime = require('../../business-logic/purchasesBasedOnTime');
const totalCustomersPerCity = require('../../business-logic/totalCustomersPerCity');
const totalRevenuePerCity = require('../../business-logic/totalRevenuePerCity');
const avgAmountSpentPerCity = require('../../business-logic/averageAmountSpentPerCity');
const revenuePerCityByOrderSource = require('../../business-logic/revenuePerCityByOrderSource');
const testObjectMapping = require('../../mappers/mainObjectMapper.icefresh');
const testObject = require('.././communication-handler/external.apis');


/**
 * @api {get} /customer-engagement-pattern Get data for total purchase amount for every day of the week
 * @apiName customer engagement pattern
 * @apiGroup Data
 *
 *
 * @apiSuccess {Boolean} status If the calculations were successful or not
 * @apiSuccess {Array} message An array of objects containing all the required data
 * @apiSuccess {Integer} number of customer who made only a single purchase
 * @apiSuccessExample {Object} Success-Response:
HTTP/1.1 200 OK
{
	"status": true,
	"retention": 74,
	"message": [{
		"custID": "7123-ABC",
      	"totalAmount": 493,
      	"averageGap": 0.7513387345679804,
      	"consistency": 0.9077817068024172
		... 
	}]
}
*/
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
 * @apiDescription Get data on average amount spent per city per order source. Data has been 
 * structured specifically for d3 graphs
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

/**
 * @api {get} /purchases-by-time Purchases by time
 * @apiName PurchasesByTime
 * @apiGroup Analytics
 *
 * @apiDescription Calculates the amount of purchases made on each day of the week during given 
 * time intervals. The data has been specifically formatted for d3 graphs.
 * @apiSuccess {Boolean} status If the calculations were successful or not
 * @apiSuccess {Object} message An object containing all the required data
 * @apiSuccessExample {Object} Success-Response:
HTTP/1.1 200 OK
{
	"status": true,
	"message": {
      	"name": day of the week,
      	"values": [
        {
          "x": time interval,
          "timeSlot": 0,
          "y": number of purchases
        },
	}
}
*/

router.get('/purchases-by-time', function(req, res) {
	try {
		let returnJson = purchasesByTime.getPurchaseDetails();
		res.status(200).json({
			status: true,
			highestSales : returnJson.highestSales,
			message: returnJson.message
		});
	}catch(exception){
		res.status(500).json({
			status: false,
			message: exception
		});
	}
});	

/**
 * @api {get} /total-revenue-per-city Total revenue per city
 * @apiName TotalRevenuePerCity
 * @apiGroup Analytics
 *
 * @apiDescription Calculates and returns the total revenue per city
 * @apiSuccess {Boolean} status If the calculations were successful or not
 * @apiSuccess {Object} message An object containing all the required data
 * @apiSuccessExample {Object} Success-Response:
HTTP/1.1 200 OK
{
	"status": true,
	"message": {
      		"city": "...",
      		"revenue": ...
		}
	}
}
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

/**
 * @api {get} /total-customers-per-city Total customers in each city
 * @apiName TotalCustomersPerCity
 * @apiGroup Analytics
 *
 * @apiDescription Calculates and returns the total number of customers per city
 * @apiSuccess {Boolean} status If the calculations were successful or not
 * @apiSuccess {Object} message An object containing all the required data
 * @apiSuccessExample {Object} Success-Response:
HTTP/1.1 200 OK
{
	"status": true,
	"message": {
      		"city": "...",
      		"amount": ...
		}
	}
}
*/

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

/**
 * @api {get} /rev-per-city-by-orderSource Get data for total revenue per city by order source
 * @apiName revenuePerCityByOrderSource
 * @apiGroup Analytics
 *
 *
 * @apiSuccess {Boolean} status If the calculations were successful or not
 * @apiSuccess {Object} message An object containing all the required data
 * @apiSuccessExample {Object} Success-Response:
 HTTP/1.1 200 OK
 {
	"status": true,
	"message": {
		...
	}
}
 */
router.get('/rev-per-city-by-orderSource', function(req, res) {

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
 * @apiDescription Get data on average amount spent per city per order source. Data has been 
 * structured specifically for d3 graphs
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
		console.log(exception);
		res.status(500).json({
			status: false,
			message: exception
		});
	}
});

/**
 * @api {get} /all-cities Gets all cities
 * @apiName GetAllCities
 * @apiGroup Data
 *
 * @apiDescription The endpoint will return all the unique cities found in the dataset
 * @apiSuccess {Boolean} status If the calculations were successful or not
 * @apiSuccess {Object} message An object containing all the required data
 * @apiSuccessExample {Object} Success-Response:
HTTP/1.1 200 OK
{
	"status": true,
	"message": [
		cities..
	]
}
*/

router.get('/all-cities', function(req, res) {
	
	try {
		let returnJson = avgAmountSpentPerCity.getUniqueCities();
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

/**
 * @api {get} /all-order-sources Gets all order sources
 * @apiName GetAllOrderSources
 * @apiGroup Data
 *
 * @apiDescription The endpoint will return all the unique order sources for the dataset
 * @apiSuccess {Boolean} status If the calculations were successful or not
 * @apiSuccess {Object} message An object containing all the required data
 * @apiSuccessExample {Object} Success-Response:
HTTP/1.1 200 OK
{
	"status": true,
	"message": [
		order sources..
	]
}
*/

router.get('/all-order-sources', function(req, res) {
	
	try {
		let returnJson = avgAmountSpentPerCity.getUniqueOrderSources();
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