/*
* Logic controller for generating the number of purchases per day information
*/
'use strict'

const sampleData = require('../mock_data.json');
const keyMap = require('../mappers/mainObject.js');
const logger = require('../utils/logger');

function calculateNumberOfPurchasesByDay() {
	//create return object
	let returnObj = {
		sunday: 0,
		monday: 0,
		tuesday: 0,
		wednesday: 0,
		thursday: 0,
		friday: 0,
		saturday: 0,
	};
	//iterate through the data array and calculate totals
	sampleData.map(item => {
		
		//get day of item
		let day = new Date(item[keyMap.ecommerceCreateTime]).getDay();

		//use switch case to add items
		switch (day) {
			case 0:
				//sunday
				returnObj.sunday += parseInt(Number(item[keyMap.payment]));
				break;
			case 1:
				returnObj.monday += parseInt(Number(item[keyMap.payment]));
				break;
			case 2:
				returnObj.tuesday += parseInt(Number(item[keyMap.payment]));
				break;
			case 3:
				returnObj.wednesday += parseInt(Number(item[keyMap.payment]));
				break;
			case 4:
				returnObj.thursday += parseInt(Number(item[keyMap.payment]));
				break;
			case 5:
				returnObj.friday += parseInt(Number(item[keyMap.payment]));
				break;	
			case 6:
				returnObj.saturday += parseInt(Number(item[keyMap.payment]));
				break;
			default: 
				logger.log('error', 'Incompatible day value found when calculating number of purchases by day.');
				throw "Incompatible day value found when calculating number of purchases by day.";
		}
	});

	return returnObj;
}

//functions being exported 
exports.calculateNumberOfPurchasesByDay = calculateNumberOfPurchasesByDay;