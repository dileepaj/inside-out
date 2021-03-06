/*
    Author : rifhan
    Logic tier for retrieving purchase by time for each day 
*/
'use strict'

const sampleData = require('../orders.json'); 
const keyMaps = require('../mappers/mainObject.js'); 
const _ = require('underscore');
const mapDays = ["Sunday","Monday","Tuesday" ,"Wednesday" , "Thursday" ,"Friday" ,"Saturday"];
const mapTimePeriods = ["00-02","02-04","04-06" ,"06-08" , "08-10" ,"10-12" ,
                        "12-14","14-16","16-18","18-20","20-22","22-24"];
const logger = require('../utils/logger');

module.exports.getPurchaseDetails = function(){
    let resultData = [];
    let highestValuePeriods = [];
    sampleData.map((object) => {
        try{
            if(object.hasOwnProperty(keyMaps.ecommerceCreateTime)){        
            //tempTime is the index of the time period taken dynamically eg - 11PM is outputted as 23. 23/2 = 11.5, parseInt => 11
            //therefore the index or the time period 11PM belongs to is 10PM-12AM which falls in index 11 in the array
                let tempTime = parseInt(new Date(object[keyMaps.ecommerceCreateTime]).getHours()/2);
                let day = new Date(object[keyMaps.ecommerceCreateTime]).getDay();
                let resultArray = undefined;

                if(resultData !== undefined){
                    resultData.map((data)=>{
                        if(data["name"] == mapDays[day]){
                            resultArray = data;
                        }
                    })
                }
                // checks if the existing time period is available in the array for the given index
                if(resultArray !== undefined){
                    //flag checks if data for the relevant day under the relevant time period is existing 
                    let flag = 0;
                    resultArray.values.map((value)=>{
                        if(value.timeSlot === tempTime){
                            value.y += parseInt(object[keyMaps.payment]);
                            flag = 1;
                        }
                    });
                    if(flag !== 1){
                        resultArray.values.push( {
                            "x" : mapTimePeriods[tempTime],
                            "timeSlot" : tempTime,
                            "y" : parseInt(object[keyMaps.payment])
                        });
                    }
                }else{               
                    let tempObject = {};
                    tempObject["name"] = mapDays[day];
                    tempObject["day"] = day;
                    tempObject["values"] = [];
                
                    tempObject["values"].push( {
                        "x" : mapTimePeriods[tempTime],
                        "timeSlot" : tempTime,
                        "y" : parseInt(object[keyMaps.payment])
                    });
                    resultData.push(tempObject);
                }   
            }    
        }catch(exception){
            console.log(exception);
            logger.log('error','error in processing purchase by time graph',{stack:exception.stack});
            throw "unable to process data at this time";
        }    
    }); 
    //sorting the values array to the days in a week eg - sunday , monday .... 
    for(let i = 0 ; i < resultData.length ; i++){
        if(i == 0){
            let sortedArr  =  _.sortBy(resultData,'day');
            resultData = [];
            resultData = sortedArr;
        }
        
        let sortedValues = _.sortBy(resultData[i].values,'timeSlot');
        resultData[i].values = [];
        resultData[i].values = sortedValues;
        if(resultData[i].values.length !== mapTimePeriods.length){
            let k = 0;
            resultData[i].values.map((data)=>{
                if(data.timeSlot !== k){
                    console.log(k);
                    console.log(data.timeSlot);
                    resultData[i].values.push({
                        x : mapTimePeriods[k],
                        timeSlot : k,
                        y : 0
                    });
                    k++;
                }
                k++;
            });
            let sortedValues = _.sortBy(resultData[i].values,'timeSlot');
            resultData[i].values = [];
            resultData[i].values = sortedValues;  
        }
        let highestAmountTimeSlot = _.sortBy(resultData[i].values,'y');
        let tempValue = {
           Day : resultData[i].name,
           Period : highestAmountTimeSlot[highestAmountTimeSlot.length-1].x, 
           Amount : highestAmountTimeSlot[highestAmountTimeSlot.length-1].y
        }
        highestValuePeriods.push(tempValue);
        delete resultData[i].day;
    }
    
    return {message : resultData, highestSales : highestValuePeriods};
}