/*
    Author : rifhan
    Logic tier for retrieving purchase by time for each day 
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
    try{
        sampleData.map((object) => {
            //tempTime is the index of the time period taken dynamically eg - 11PM is outputted as 23. 23/2 = 11.5, parseInt => 11
            //therefore the index or the time period 11PM belongs to is 10PM-12AM which falls in index 11 in the array
            let tempTime = parseInt(new Date(object[keyMaps.ecommerceCreateTime]).getHours()/2);
            let day = new Date(object[keyMaps.ecommerceCreateTime]).getDay();
            let resultArray = resultData[tempTime];
            // checks if the existing time period is available in the array for the given index
            if(resultArray !== undefined){
                //flag checks if data for the relevant day under the relevant time period is existing 
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
            }   
        }); 
        //sorting the values array to the days in a week eg - sunday , monday .... 
        for(let i = 0 ; i < resultData.length ; i++){
            let sortedValues = _.sortBy(resultData[i]["values"],"day");
            resultData[i]["values"] = [];
            resultData[i]["values"] = sortedValues;
            console.log(sortedValues);
        }
        return resultData ;
    }catch(exception){
        throw "unable to process data at this time";
    }    
}