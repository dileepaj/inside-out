/*
* Logic controller for calculating the amount spent in each city by the customers
*/

const sampleData = require('../orders.json');
const keyMap = require('../mappers/mainObject');
const _ = require('underscore');
const logger = require('../utils/logger');

function getPaymentsForCitiesByOrderSource() {

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

//TODO: Complete the function to return the object

function calculateAverageAmountSpentPerCity() {

// 	let dataForCities = getPaymentsForCitiesByOrderSource();
// 	let finalArray = [];

// 	//get order sources for each city
// 	for(let city in dataForCities) {
// 		let temp = {'city': city, 'values': []};
// 		//calculate average for the cities
// 		for(let orderSource in dataForCities[city]) {
// 			try {
// 				let avg = dataForCities[city][orderSource]['payment'] / dataForCities[city][orderSource]['count'];
//     			//finalObject[city][orderSource] = {'avgAmount': avg};
//     			//let tempValue = {orderSource: avg};
//     			temp.values.push({orderSource: avg});
//     		}
//     		catch(exp) {
//     			logger.log('error', exp + "", {stack: exp.stack});
// 	   			throw exp + "";
//     		}
// 		}
// 		finalArray.push(temp);
// 	}

//     //console.log(finalObject);
//     return finalArray;
}

module.exports.calculateAverageAmountSpentPerCity = calculateAverageAmountSpentPerCity;