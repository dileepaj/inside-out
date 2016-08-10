/**
 * Created by Dewmi on 8/8/2016.
 */
'use strict'

const sampleData = require('../orders.json');
const keyMaps = require('../mappers/mainObject.js');
const _ = require('underscore');

module.exports.revPerCityByOrderSource = function () {

    let city = [];
    let result = [];


        try{
            sampleData.map((data) => {
                 result = _.where(city,{city : data[keyMaps.city]});

                 console.log(result);

                if(city.length == 0 || result.length == 0){

                    let temp = {};

                    temp["city"] = data[keyMaps.city];

                    temp["tmall"] = 0;
                    temp["JD"] = 0;
                    temp["YHD"] = 0;


                    let orderSource = data[keyMaps.orderSource];

                    if(orderSource == "Tmall"){

                        temp["tmall"] = parseFloat(data[keyMaps.payment]);
                    }
                    else if(orderSource == "JD") {

                        temp["JD"] = parseFloat(data[keyMaps.payment]);

                    }else if(orderSource == "YHD"){

                        temp["YHD"] = parseFloat(data[keyMaps.payment]);
                    }

                    city.push(temp);

                }else{
                    city.map((value) => {
                        if(value.city == result[0].city){
                          try {

                               //console.log(value);

                                     //let orderSrc = value.orderSource;


                                     /* city.forEach(function (arrayItem) {
                                          var sources = [];
                                          sources.push(arrayItem.orderSources);

                                        sources.forEach(function (arrayItem) {

                                              console.log(arrayItem);

                                             if (arrayItem.name == "Tmall") {

                                                 console.log(arrayItem[0]);
                                                 arrayItem.totalRevenue += parseFloat(data[keyMaps.payment]);
                                                 console.log("blah");
                                             }
                                             else if (arrayItem.name == "JD") {
                                                 arrayItem.totalRevenue += parseFloat(data[keyMaps.payment]);
                                             }
                                             else if (arrayItem.name == "YHD") {
                                                 arrayItem.totalRevenue += parseFloat(data[keyMaps.payment]);
                                             }

                                         });


                                      });*/

                              //console.log("value city" + value.city);
                              //console.log("result 0" + (result[0].city));

                          }catch (exception){
                              console.log(exception);
                          }

                        }
                    });
                }

            });

            //console.log(city);
            return city;

        }catch(exception){
            console.log(exception);
        }


};


