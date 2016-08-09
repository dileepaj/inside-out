/*
    Author : rifhan
    Logic tier for retrieving 
*/
'use strict'

const sampleData = require('../mock_data'); 
const keyMaps = require('../mappers/mainObject.js'); 
const _ = require('underscore');

module.exports.getPurchaseDetails = function(){
    let resultData = [];
    sampleData.map((data) => {
        let tempTime = new Date(data[keyMaps.ecommerceCreateTime]).getHours();
        console.log(tempTime/2);
    });
   // return sampleData;
}