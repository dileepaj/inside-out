'use strict';

const sampleData = require('../orders.json');
const logger = require('../utils/logger');
const _ = require('underscore');

module.exports.calculateRevenuePerCity = function(){

	try{
		return 	_.chain(sampleData)
			.groupBy('city')
			.map(function (value,key) {
				var totalPayments = _.reduce(value, function (memo, value){
					return memo + parseInt(value.payment);
				},0 );
				return {'label':key,'value' :totalPayments};
			})
			.reject(function (value) {
				return (value.value < 10000 || value.label ==='undefined')
			})
			.value();

	}catch (exception){
		logger.log('error', exception + "", {stack: exception.stack});
		throw exception + "";
	}
};