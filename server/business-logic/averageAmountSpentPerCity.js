/*
* Logic controller for calculating the amount spent in each city by the customers
*/

const sampleData = require('../orders.json');
const keyMap = require('../mappers/mainObject');
const _ = require('underscore');
const logger = require('../utils/logger');
const util = require('util');

function getPaymentsAndCountForCitiesByOrderSource() {

	let returnObject = {};

	sampleData.map(data => {
		try {
		   	//get city
		   	if(typeof returnObject[data[keyMap.city]] ==  'undefined') {
		   		//add if doesn't exist
		   		returnObject[data[keyMap.city]] = {};
		   		//add orderSource if doesn't exist
			   	if(typeof returnObject[data[keyMap.city]][data[keyMap.orderSource]] == 'undefined') {
			   		returnObject[data[keyMap.city]][data[keyMap.orderSource]] = {};
			   		returnObject[data[keyMap.city]][data[keyMap.orderSource]]['payment'] = Number(data[keyMap.payment]);
			   		returnObject[data[keyMap.city]][data[keyMap.orderSource]]['count'] = 1;
			   	}
			   	else {
					returnObject[data[keyMap.city]][data[keyMap.orderSource]]['payment'] += Number(data[keyMap.payment]);
			   		returnObject[data[keyMap.city]][data[keyMap.orderSource]]['count']++;
			   	}
		   	}
		   	else {
		   		if(typeof returnObject[data[keyMap.city]][data[keyMap.orderSource]] == 'undefined') {
			   		returnObject[data[keyMap.city]][data[keyMap.orderSource]] = {};
			   		returnObject[data[keyMap.city]][data[keyMap.orderSource]]['payment'] = Number(data[keyMap.payment]);
			   		returnObject[data[keyMap.city]][data[keyMap.orderSource]]['count'] = 1;
			   	}
			   	else {
					returnObject[data[keyMap.city]][data[keyMap.orderSource]]['payment'] += Number(data[keyMap.payment]);
			   		returnObject[data[keyMap.city]][data[keyMap.orderSource]]['count']++;
			   	}
		   	}
	   }
	   catch(exp) {
	   		logger.log('error', exp + "", {stack: exp.stack});
	   		throw exp + "";
	   }
    });

	return returnObject;
}

function getPaymentsAndCountForOrderSourceByCity() {

	let returnObject = {};

	sampleData.map(data => {
		try {
		   	//get orderSource
		   	if(typeof returnObject[data[keyMap.orderSource]] ==  'undefined') {
		   		//add if doesn't exist
		   		returnObject[data[keyMap.orderSource]] = {};
		   		//add city if doesn't exist
			   	if(typeof returnObject[data[keyMap.orderSource]][data[keyMap.city]] == 'undefined') {
			   		returnObject[data[keyMap.orderSource]][data[keyMap.city]] = {};
			   		returnObject[data[keyMap.orderSource]][data[keyMap.city]]['payment'] = Number(data[keyMap.payment]);
			   		returnObject[data[keyMap.orderSource]][data[keyMap.city]]['count'] = 1;
			   	}
			   	else {
					returnObject[data[keyMap.orderSource]][data[keyMap.city]]['payment'] += Number(data[keyMap.payment]);
			   		returnObject[data[keyMap.orderSource]][data[keyMap.city]]['count']++;
			   	}
		   	}
		   	else {
		   		if(typeof returnObject[data[keyMap.orderSource]][data[keyMap.city]] == 'undefined') {
			   		returnObject[data[keyMap.orderSource]][data[keyMap.city]] = {};
			   		returnObject[data[keyMap.orderSource]][data[keyMap.city]]['payment'] = Number(data[keyMap.payment]);
			   		returnObject[data[keyMap.orderSource]][data[keyMap.city]]['count'] = 1;
			   	}
			   	else {
					returnObject[data[keyMap.orderSource]][data[keyMap.city]]['payment'] += Number(data[keyMap.payment]);
			   		returnObject[data[keyMap.orderSource]][data[keyMap.city]]['count']++;
			   	}
		   	}
	   }
	   catch(exp) {
	   		logger.log('error', exp + "", {stack: exp.stack});
	   		throw exp + "";
	   }
    });

	return returnObject;
}


function calculateAverageAmountSpentPerCity() {

	let dataForOrderSources = getPaymentsAndCountForOrderSourceByCity();
	let uniqueCities = getUniqueCities();
	let uniqueOrderSources = getUniqueOrderSources();
	let returnObject = [];

	try {

		//for each ordersource, check if city exist
		for(let orderSource in uniqueOrderSources) {

			for(let city in uniqueCities) {
				let test = -10;
				//console.log(returnObject.length);
				if(returnObject.length > 0) {
				//check if the order source exists in returnObject

					test = _.findIndex(returnObject, item => {
								if(item['name'] == uniqueOrderSources[orderSource]) {
									return true;
								}
							});
				}

				let avg = 0;
				let tempObj = {};
				//console.log(test);
				//object for orderSource exists in return object so retrieve that object
				if(test == -10) {
					//console.log('in if');
					//create a new object
					tempObj = {
						'name': uniqueOrderSources[orderSource],
						'values': []
					};
				}
				else if(test == -1) {
					//create a new object
					tempObj = {
						'name': uniqueOrderSources[orderSource],
						'values': []
					};
				}
				else {
					//console.log('in else if');
					tempObj = returnObject[test];
				}

				let currentOrderSource = uniqueOrderSources[orderSource];
				let currentCity = uniqueCities[city];

				if(typeof dataForOrderSources[currentOrderSource][currentCity] == 'undefined') {
					tempObj['values'].push({'x': uniqueCities[city], 'y': 0});	
				}
				else {
					let paymentAmount = dataForOrderSources[currentOrderSource][currentCity]['payment'];
					let paymentCount = dataForOrderSources[currentOrderSource][currentCity]['count'];
					let avg = paymentAmount / paymentCount;

					tempObj['values'].push({'x': uniqueCities[city], 'y': avg});		
				}

				if(test == -10) {
					returnObject.push(tempObj);
				}
				else if(test == -1) {
					returnObject.push(tempObj);
				}
				else {
					returnObject[test] = tempObj;
				}
			}
		}
	}
	catch(exp) {
		logger.log('error', exp + "", {stack: exp.stack});
	   	throw exp + "";
	}
	return returnObject;
}

function arraySearch(arr,val) {
	try {
	    for (var i=0; i<arr.length; i++) {
	        if (arr[i]['name'] === val) {
	        	return i;
	        }
	    }
	}
	catch(exp) {
		logger.log('error', exp + "", {stack: exp.stack});
		return false;
	}
    return false;
}

function getUniqueCities() {
	let uniqueCities = Object.keys(getPaymentsAndCountForCitiesByOrderSource());
	return uniqueCities;
}

function getUniqueOrderSources() {
	let uniqueOrderSources = Object.keys(getPaymentsAndCountForOrderSourceByCity());
	return uniqueOrderSources;

}

//exporting functions
module.exports.calculateAverageAmountSpentPerCity = calculateAverageAmountSpentPerCity;
module.exports.getAveragePaymentsForCitiesByOrderSource = getPaymentsAndCountForCitiesByOrderSource;
module.exports.getAveragePaymentsForOrderSourceByCity = getPaymentsAndCountForOrderSourceByCity;
module.exports.getUniqueCities = getUniqueCities;
module.exports.getUniqueOrderSources = getUniqueOrderSources;