/*
    Author : rifhan
    Logic tier for retrieving purchase by time for each day 
*/
'use strict'

const sampleData = require('../orders.json'); 
const keyMaps = require('../mappers/mainObject.js'); 
const _ = require('underscore');
const mapDays = ["Sunday","Monday","Tuesday" ,"Wednesday" , "Thursday" ,"Friday" ,"Saturday"];
const mapTimePeriods = ["12AM to 2AM","2AM to 4AM","4AM to 6AM" ,"6AM to 8AM" , "8AM to 10AM" ,"10AM to 12PM" ,
                        "12PM to 2PM","2PM to 4PM","4PM to 6PM","6PM to 8PM","8PM to 10PM","10PM to 12AM"];
const logger = require('../utils/logger');

module.exports.getPurchaseDetails = function(){
    let resultData = [];
    
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
            // delete resultData[i].day;
            resultData[i].values.map((data)=>{
                delete data["timeSlot"];
            })
        }
        return resultData;

}