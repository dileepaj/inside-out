/**
 * Created by Dewmi on 8/8/2016.
 */
'use strict'

const sampleData = require('../orders.json');
const keyMap = require('../mappers/mainObject.js');
const logger = require('../utils/logger');

module.exports.revPerCityByOrderSource = function () {

    let revenueObj = {};

    sampleData.map(data => {
        try {


             if(typeof revenueObj[data[keyMap.orderSource]] == 'undefined' ){

                 revenueObj[data[keyMap.orderSource]] = {};

                 if(typeof revenueObj[data[keyMap.orderSource]][data[keyMap.city]] == 'undefined'){
                    revenueObj[data[keyMap.orderSource]][data[keyMap.city]] = {};
                    revenueObj[data[keyMap.orderSource]][data[keyMap.city]]['totRevenue'] = Number(data[keyMap.payment]);

                 }
                 else{
                     revenueObj[data[keyMap.orderSource]][data[keyMap.city]]['totRevenue'] += Number(data[keyMap.payment]);
                 }
             }
            else{
                 if(typeof revenueObj[data[keyMap.orderSource]][data[keyMap.city]] == 'undefined'){
                     revenueObj[data[keyMap.orderSource]][data[keyMap.city]] = {};
                     revenueObj[data[keyMap.orderSource]][data[keyMap.city]]['totRevenue'] = Number(data[keyMap.payment]);

                 }
                 else{
                     revenueObj[data[keyMap.orderSource]][data[keyMap.city]]['totRevenue'] += Number(data[keyMap.payment]);
                 }

             }


        }
        catch(exp) {
            logger.log('error', exp + "", {stack: exp.stack});
            throw exp + "";
        }
    });

    return revenueObj;

};


