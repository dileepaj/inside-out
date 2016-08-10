'use strict'

const sampleData = require('../orders.json');
const keyMap = require('../mappers/mainObject.js');
const logger = require('../utils/logger');
const _ = require('underscore');

function calculateValuePerCity() {
	return 	_.chain(sampleData)
			.groupBy('city')
			.map(function (value,key) {
				var totalPayments = _.reduce(value, function (memo, value){
					return memo + parseInt(value.payment);
				},0 );
				return {'city':key,'payment' :totalPayments};
			})
			.value();
}

exports.calculateValuePerCity = calculateValuePerCity;

