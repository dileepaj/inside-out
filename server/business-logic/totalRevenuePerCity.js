'use strict';

const sampleData = require('../orders.json');
const logger = require('../utils/logger');
const _ = require('underscore');

module.exports.calculateRevenuePerCity = function(){

	try{
		let tempTotal = 0;
		let checkTotal = 0;
		let total = _.chain(sampleData)
			.groupBy('city')
			.map(function (value,key) {
				var totalPayments = _.reduce(value, function (memo, value){
					return memo + parseInt(value.payment);
				},0 );
				return {'label':key,'value' :totalPayments};
			})
			.reject(function (value) {
				if(value.value < 23000){
					tempTotal += value.value;
				}
				return (value.value < 23000 || value.label ==='undefined')
			})
			.value();

			total.map((value) => {
				value.value = parseInt((value.value/tempTotal)*100);
				checkTotal += value.value;
			});
			total[0].value += (100-checkTotal);

			return total;

	}catch (exception){
		logger.log('error', exception + "", {stack: exception.stack});
		throw exception + "";
	}
};