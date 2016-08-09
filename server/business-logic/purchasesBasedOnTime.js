/*
    Author : rifhan
    Logic tier for retrieving 
*/
'use strict'

const sampleData = require('../mock_data'); 
const keyMaps = require('../mappers/mainObject.js'); 
const _ = require('underscore');
const mapDays = ["Sunday","Monday","Tuesday" ,"Wednesday" , "Thursday" ,"Friday" ,"Saturday"];
const mapTimePeriods = ["12AM to 2AM","2AM to 4AM","4AM to 6AM" ,"6AM to 8AM" , "8AM to 10AM" ,"10AM to 12PM" ,
                        "12PM to 2PM","2PM to 4PM","4PM to 6PM","6PM to 8PM","8PM to 10PM","10PM to 12AM"];
module.exports.getPurchaseDetails = function(){
    let resultData = [];
    sampleData.map((object) => {
        let tempTime = parseInt(new Date(object[keyMaps.ecommerceCreateTime]).getHours()/2);
        let day = new Date(object[keyMaps.ecommerceCreateTime]).getDay();
        let resultArray = resultData[tempTime];
        
        if(resultArray !== undefined){
            console.log(resultArray);
            let flag = 0;
            resultData[tempTime].values.map((value)=>{
                if(value.day === day){
                    value.totalAmount += parseInt(object[keyMaps.payment]);
                    flag = 1;
                }
            });
            if(flag !== 1){
               resultData[tempTime].values.push({
                    "name" : mapDays[day],
                    "day" : day,
                    "totalAmount" : parseInt(object[keyMaps.payment])
                });
        
            }
            //resultData[0].values[day].totalAmount += object[keyMaps.payment]; 
        }else{               
            let tempObject = {};
            tempObject["name"] = mapTimePeriods[tempTime];
            tempObject["values"] = [];
        
            tempObject["values"].push({
                "name" : mapDays[day],
                "day" : day,
                "totalAmount" : parseInt(object[keyMaps.payment])
            });
            resultData[tempTime] = tempObject;
//         console.log(tempObject); 
        }   
    });  
    for(let i = 0 ; i < resultData.length ; i++){
        let sortedValues = _.sortBy(resultData[i]["values"],"day");
        resultData[i]["values"] = [];
        resultData[i]["values"] = sortedValues;
        console.log(sortedValues);
    }

    
   return resultData ;
}

function sortByNumber(value1, value2){
    return value1 - value2;
}