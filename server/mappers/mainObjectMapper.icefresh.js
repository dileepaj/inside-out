"use strict"

const tempDataDump = require('../orders');
const iceFreshExternalApi = require('../controllers/communication-handler/external.apis');
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
                
                tempObject[value.key] = object[keyValue];
                let finalObject = {};
                for(let key in keyMaps){
                    finalObject[key] = tempObject[key];
                    if(typeof keyMaps[key] === 'object'){
                        let finalValue;
                        keyMaps[key].map((value)=>{
                            console.log(finalObject[value]);
                            finalValue += `${finalObject[value]}`;
                        });
                        finalObject[key] = finalValue;
                    }
                    if(finalObject[key]  === undefined){
                        delete finalObject[key];
                    }
                }
                delete finalObject["keysNeededToMap"];
                finalArr.push(finalObject);  
            }
        }catch(exception){
            logger.log("error","error in mapping order objects",{stack:exception.stack});
            throw "unable map object";
        }  
    });
}