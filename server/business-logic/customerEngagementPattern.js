/*  Author : rifhan
    Logic tier for retrieving data regarding the customer engagement pattern the data should be
    represented in a 3D graph with quantity, regularity and consistency as x,y,z axises
*/
'use strict'

const sampleData = require('../orders.json'); 
const keyMaps = require('../mappers/mainObject.js'); 
const _ = require('underscore');
const logger = require('../utils/logger');

/* returns an array of objects with each object consisting data for a single customer
   {custID : value , amount : value //sum of all purchases , totalPurchases : value //no. of purchases made} 
*/
module.exports.purchasePatternResults = function(){
    let customer = [];
    let result = [];
    let filteredCustomerData = [];
    try{
        sampleData.map((data) => {
            result = _.where(customer,{custID : data[keyMaps.customerId]});
            if(customer.length == 0 || result.length == 0){
                let temp = {};

                temp["custID"] = data[keyMaps.customerId];
                temp["totalAmount"] = parseInt(data[keyMaps.payment]); 
                temp["totalPurchases"] = 1;
                temp["purchaseDates"] = [];

                temp["purchaseDates"].push(data[keyMaps.ecommerceCreateTime]);

                customer.push(temp);
            }else{
                customer.map((value) => {
                    if(value.custID == result[0].custID){
                        value.totalAmount += parseFloat(data[keyMaps.payment]);
                        value.purchaseDates.push(data.ecommerceCreateTime);
                        value.totalPurchases += 1;  
                    }
                });      
            }
        });
        // rejects customers with less than 2 purchase 
        let totalCustomers = customer.length;
        let countOneTimePurchase = 0;
        filteredCustomerData = _.reject(customer,(value) => {
            if(value.totalPurchases == 1){
                countOneTimePurchase += 1;
            }
            
            return value.totalPurchases <= 2  
        });
        

        let finalValues = calculateTimeGap({
            message : filteredCustomerData, 
            retention : parseInt(countOneTimePurchase/totalCustomers * 100 )
        });
        let topCustomers = _.chain(finalValues.message).sortBy((value)=>{return value.totalAmount})
        .last(50)
        .sortBy((value)=>{return value.cummulativeConsistency})
        .first(10).value();

        console.log(topCustomers);
        finalValues.message.map((value) =>{
            delete value.cummulativeConsistency;
        });
        finalValues["topCustomers"] = topCustomers;
        return finalValues;
        
    }catch(exception){
        console.log(exception);
        throw "unable to process data at this time";
    }
}
// calculates the average gap between purchases for single customer
function calculateTimeGap(purchaseData){    
    purchaseData.message.map((data) => {
        try{
            let tempTime = []
            data["averageGap"] = 0;
            data["tempGaps"] = [];
            data.purchaseDates.map((dates) => {
                tempTime.push((((Date.parse(dates)/1000)/60)/60)/24);
            });
            let tempDates = tempTime.sort(sortByNumber).reverse()
            
            for(let i=0 ; i < tempDates.length ; i++){
                if(tempDates[i+1] !== undefined){
                    data.averageGap += (tempDates[i] - tempDates[i+1])/(tempDates.length-1);
                    data.tempGaps.push(tempDates[i] - tempDates[i+1]);
                }
            }
            calculateSTDdeviation(data);
        }catch(exception){
            logger.log('error', 'Unable to calculate avergage gap calculateTimeGap method in controllers/customerEngagmentPattern.js');
            throw exception;
        }   
    });

    return purchaseData;

}
// calculates standard deviation accorging to the sample data distribution equation
function calculateSTDdeviation(purchaseData){   
    try{
        let variance = 0;
        let total = 0;
        purchaseData["consistency"];
        //variance = sum(difference^2)/numberOfDifferences - 1
        purchaseData.tempGaps.map((value) => {
            total += Math.pow((value - purchaseData.averageGap),2);
        });
        variance = (total/(purchaseData.tempGaps.length - 1));
        //standard deviation = sqrt(variance)
        purchaseData.consistency = Math.sqrt(variance); 
        // if(purchaseData.consistency === null || purchaseData.averageGap === null){
            
        // }
        purchaseData["cummulativeConsistency"] = purchaseData.consistency + purchaseData.averageGap;
        delete purchaseData["tempGaps"];
        delete purchaseData["purchaseDates"];
        delete purchaseData["totalPurchases"];
    }catch(exception){
        logger.log('error', 'Unable to calculate standard deviation in controllers/customerEngagmentPattern.js');
        throw exception;
    }
}

function sortByNumber(value1, value2){
    return value1 - value2;
}