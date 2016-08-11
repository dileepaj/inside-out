'use strict';

const sampleData = require('../orders.json');
const logger = require('../utils/logger');
const _ = require('underscore');

function calculateCustomersPerCity() {
	return 	_.chain(sampleData)
		.groupBy('city')
		.map(function (value,key) {
			var totalCustomers = _.size(_.countBy(value, function (value){
				return (value.customerId);
			}));
			return {'label':key,'value' :totalCustomers};
		})
		.reject(function (value) {
			return (value.value < 100 || value.label ==='undefined')
		})
		.value();
}

exports.calculateCustomersPerCity = calculateCustomersPerCity;