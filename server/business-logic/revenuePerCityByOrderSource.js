/*
* Logic controller for calculating the amount spent in each city by the customers
*/

const sampleData = require('../orders.json');
const keyMap = require('../mappers/mainObject');
const _ = require('underscore');
const logger = require('../utils/logger');
const util = require('util');
const amountSpentPerCity= require('./averageAmountSpentPerCity').getAveragePaymentsForOrderSourceByCity();
const amountByOrderSource= require('./averageAmountSpentPerCity').getAveragePaymentsForCitiesByOrderSource();

module.exports.revPerCityByOrderSource = function () {

    let dataForOrderSources = amountSpentPerCity;
    let uniqueCities = Object.keys(amountByOrderSource);
    let uniqueOrderSources = Object.keys(dataForOrderSources);
    let returnObject = [];

    for(let orderSource in uniqueOrderSources) {

        for(let city in uniqueCities) {
            let test = -10;

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

                tempObj = returnObject[test];
            }

            let currentOrderSource = uniqueOrderSources[orderSource];
            let currentCity = uniqueCities[city];

            if(typeof dataForOrderSources[currentOrderSource][currentCity] == 'undefined') {
                tempObj['values'].push({'x': uniqueCities[city], 'y': 0});  
            }
            else {
                let paymentAmount = dataForOrderSources[currentOrderSource][currentCity]['payment'];

                tempObj['values'].push({'x': uniqueCities[city], 'y': paymentAmount});        
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
    return returnObject;
};
