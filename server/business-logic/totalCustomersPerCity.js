'use strict';

const sampleData = require('../orders.json');
const logger = require('../utils/logger');
const _ = require('underscore');

module.exports.calculateCustomersPerCity = function(){
	try{
		let total = 0;
		let checkTotal = 0;
		let tempCustomers = 	_.chain(sampleData)
			.groupBy('city')
			.map(function (value,key) {
				var totalCustomers = _.size(_.countBy(value, function (value){
					return (value.customerId);
				}));
				
				return {'label':key,'value' :totalCustomers};
			})
			.reject(function (value) {
				if(value.value >= 150){
					total += value.value;
				}
				return (value.value < 150 || value.label ==='undefined')
			})
			.value();
		tempCustomers.map((value) => {
			value.value = parseInt((value.value/total) * 100);
			checkTotal += value.value;
		});	
		tempCustomers[0].value += (100-checkTotal);

		return tempCustomers;

	}catch (exception){
		logger.log('error', exception + "", {stack: exception.stack});
		throw exception + "";
	}
};
