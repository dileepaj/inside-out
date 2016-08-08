// Logic tier for retrieving data regarding the customer engagement pattern the data should be
// represented in a 3D graph with quantity, regularity and consistency as x,y,z axises
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

    sampleData.map((data) => {
        result = _.where(customer,{custID : data[keyMaps.customerId]});
        if(customer.length == 0 || result.length == 0){
            let temp = {};

            temp["custID"] = data[keyMaps.customerId];
            temp["totalAmount"] = parseFloat(data[keyMaps.payment]); 
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
    calculateTimeGap(customer);
    return customer;
}
// calculates the average gap between purchases for single customer
function calculateTimeGap(purchaseData){   
    return new Promise((resolve,reject) => {
        purchaseData.map((data) => {
            let tempTime = []
            data["averageGap"] = 0;
            data["tempGaps"] = [];
            data.purchaseDates.map((dates) => {
                tempTime.push((Date.parse(dates)/1000)/60/60/24);
            });
            let tempDates = tempTime.sort(sortByNumber).reverse()
            
            for(let i=0 ; i < tempDates.length ; i++){
                if(tempDates[i+1] !== undefined){
                    data.averageGap += (tempDates[i] - tempDates[i+1])/(tempDates.length-1);
                    data.tempGaps.push(tempDates[i] - tempDates[i+1]);
                }
            }
            calculateSTDdeviation(data).then((success) => {
                console.log("success");
            },(error) => {

            }); 
        });
    });
}
// calculates standard deviation accorging to the sample data distribution equation
function calculateSTDdeviation(purchaseData){   
    return new Promise((resolve,reject) => {
        try{
            let variance = 0;
            let count = 0;
            purchaseData["consistency"];
            //variance = sum(difference^2)/numberOfDifferences
            purchaseData.tempGaps.map((value) => {
                variance += Math.pow(value,2);
                count++;
            });
            variance = (variance/count);
            //standard deviation = sqrt(variance)
            purchaseData.consistency = Math.sqrt(variance);  

            delete purchaseData["tempGaps"];
            delete purchaseData["purchaseDates"];
            
            return resolve({status : true}); 
        }catch(error){
            return reject({status : false , message : "error occured while proccessing consistency"});
        }
    });
}

function sortByNumber(value1, value2){
    return value1 - value2;
}