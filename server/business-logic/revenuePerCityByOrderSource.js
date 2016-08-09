/**
 * Created by Dewmi on 8/8/2016.
 */


// Logic tier for retrieving data regarding the customer engagement pattern the data should be
// represented in a 3D graph with quantity, regularity and consistency as x,y,z axises
'use strict'

const sampleData = require('../mock.json');
const keyMaps = require('../mappers/mainObject.js');
const _ = require('underscore');

module.exports.revPerCityByOrderSource = function () {

    let city = [];
    let result = [];


        try{
            sampleData.map((data) => {
                result = _.where(city,{city : data[keyMaps.city]});
                if(city.length == 0 || result.length == 0){
                    let temp = {};
                    let tmall ={
                        name : "Tmall",
                        totalRevenue : 0
                    };

                    let jd ={
                         name : "JD",
                        totalRevenue : 0
                    };

                    let yhd ={
                        name : "YHD",
                        totalRevenue : 0
                    };


                    temp["city"] = data[keyMaps.city];

                    temp["orderSources"] = [];

                    temp["orderSources"].push(tmall,jd,yhd);

                    city.push(temp);

                }else{
                    city.map((value) => {
                        if(value.city == result[0].city){
                          try {
                                      city.forEach(function (arrayItem) {
                                          var sources = [];
                                          sources.push(arrayItem.orderSources);

                                              for(let i=arrayItem[0]; i<arrayItem.length;i++) {

                                                  if (arrayItem[i].name == "Tmall") {

                                                      arrayItem[i].totalRevenue += parseFloat(data[keyMaps.payment]);

                                                  }
                                                  else if (arrayItem[i].name == "JD") {
                                                      arrayItem[i].totalRevenue += parseFloat(data[keyMaps.payment]);
                                                  }
                                                  else if (arrayItem[i].name == "YHD") {
                                                      arrayItem[i].totalRevenue += parseFloat(data[keyMaps.payment]);
                                                  }

                                              }
                                         });


                                      // });

                          }catch (exception){
                              console.log(exception);
                          }

                        }
                    });
                }

            });

            return city;

        }catch(exception){
            console.log(exception);
        }


};


