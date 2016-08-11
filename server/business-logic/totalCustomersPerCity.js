'use strict';

const sampleData = require('../orders.json');
const logger = require('../utils/logger');
const _ = require('underscore');

function calculateCustomersPerCity() {
	return 	_.chain(sampleData)
		.groupBy('city')
		.map(function (value,key) {
			var totalCustomers = _.reduce(value, function (memo, value){
				return memo + parseInt(value.payment);
			},0 );
			return {'label':key,'value' :totalCustomers};
		})
		.value();
}

exports.calculateCustomersPerCity = calculateCustomersPerCity;