/**
 * Created by Dewmi on 8/8/2016.
 */


// Logic tier for retrieving data regarding the customer engagement pattern the data should be
// represented in a 3D graph with quantity, regularity and consistency as x,y,z axises
'use strict'

const sampleData = require('../mock_data');
const keyMaps = require('../mappers/mainObject.js');
const _ = require('underscore');

module.exports.revPerCityByOrderSource = function () {

    let city = [];
    let orderSource = [];
    let result = [];
    
    sampleData.map((data) => {
        
     result = _.where(city,{city : data[keyMaps.city]});
        if(city.length == 0 || result.length == 0){

           let temp = {};

              temp["orderSource"] = data[keyMaps.orderSource];


        }else{


        }
        
    }); 





};


