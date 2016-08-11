'use strict';

const sampleData = require('../orders.json');
const logger = require('../utils/logger');
const _ = require('underscore');

function calculateRevenuePerCity() {
	// let temp = 	_.chain(sampleData)
	// 	.groupBy('city')
	// 	.map(function (value,key) {
	// 		var totalPayments = _.reduce(value, function (memo, value){
	// 			return memo + parseInt(value.payment);
	// 		},0 );
	// 		return {'label':key,'value' :totalPayments};
	// 	})
	// 	.value();
	//
	// return _.reject(temp,function (value) {
	// 		return (value.value < 1000)
	// 	})

	return 	_.chain(sampleData)
		.groupBy('city')
		.map(function (value,key) {
			var totalPayments = _.reduce(value, function (memo, value){
				return memo + parseInt(value.payment);
			},0 );
			return {'label':key,'value' :totalPayments};
		})
		.reject(function (value) {
			return (value.value < 1000)
		})
		.value();

}

exports.calculateRevenuePerCity = calculateRevenuePerCity;