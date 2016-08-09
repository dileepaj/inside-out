/*  Author : rifhan
    Logic tier for retrieving data regarding the customer engagement pattern the data should be
    represented in a 3D graph with quantity, regularity and consistency as x,y,z axises
*/
'use strict'

const sampleData = require('../mock_data'); 
const keyMaps = require('../mappers/mainObject.js'); 
const _ = require('underscore');


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
                        value.totalAmount += parseInt(data[keyMaps.payment]);
                        value.purchaseDates.push(data.ecommerceCreateTime);
                        value.totalPurchases += 1;  
                    }
                });      
            }
        });
        // rejects customers with only 1 purchase 
        filteredCustomerData = _.reject(customer,(value) => { return value.totalPurchases == 1 });

        return calculateTimeGap(filteredCustomerData);
    }catch(exception){
        throw "unable to process data at this time";
    }
}
// calculates the average gap between purchases for single customer
function calculateTimeGap(purchaseData){   
    try{
        purchaseData.map((data) => {
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
        });

        return purchaseData;
    }catch(exception){
        throw exception;
    }   
}
// calculates standard deviation accorging to the sample data distribution equation
function calculateSTDdeviation(purchaseData){   
    try{
        let variance = 0;
        let total = 0;
        purchaseData["consistency"];
        //variance = sum(difference^2)/numberOfDifferences
        purchaseData.tempGaps.map((value) => {
            total += Math.pow((value - purchaseData.averageGap),2);
        });
        variance = (total/(purchaseData.tempGaps.length - 1));
        //standard deviation = sqrt(variance)
        purchaseData.consistency = Math.sqrt(variance); 

        //rounding of the values  
        purchaseData.consistency = parseInt(purchaseData.consistency);
        purchaseData.averageGap = parseInt(purchaseData.averageGap);

        delete purchaseData["tempGaps"];
        delete purchaseData["purchaseDates"];
        delete purchaseData["totalPurchases"];

    }catch(exception){
        throw exception;
    }
}

function sortByNumber(value1, value2){
    return value1 - value2;
}