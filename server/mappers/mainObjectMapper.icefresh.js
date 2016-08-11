"use strict"

const tempDataDump = require('../orders');
const iceFreshExternalApi = require('../controllers/external.apis');
const logger = require('../utils/logger');
const keyMaps = require('../mappers/mainObject');
let finalOrdersArray = [];

module.exports.mapIceFreshOrderObjects = function(){
    return new Promise((resolve,reject) => {
        iceFreshExternalApi.getAllIcefreshOrders().then((success) => {
            success.map((singleOrderObject) => {
                orderObjectMap(singleOrderObject,finalOrdersArray);
            });
            return resolve(finalOrdersArray);
        },(error) => {
            logger.log("error","error in retrieving icefresh order data to process",{stack:error.stack});
            return reject(error);
        }).catch((exception) => {
            logger.log("error","error in retrieving icefresh order data to process",{stack:exception.stack});
            return reject(exception);
        });
    });
}

function orderObjectMap(object,finalArr){   
    let tempObject = object; 
    keyMaps.keysNeededToMap.map((value) => {
        try{
            if(object.hasOwnProperty(value.key)){
                finalArr.push(tempObject);
            }else{
                let orderSource = tempObject[keyMaps.orderSource].toLowerCase();
                let keyValue = `${orderSource}${value.value}`
                console.log(keyValue);
                tempObject[value.key] = object[keyValue];
                finalArr.push(tempObject);  
            }
        }catch(exception){
            logger.log("error","error in mapping order objects",{stack:exception.stack});
        }  
    });
}