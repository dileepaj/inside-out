'use strict'

const sampleData = require('./sample');  
const _ = require('underscore');


/* returns an array of objects with each object consisting data for a single customer
   {custID : value , amount : value //sum of all purchases , totalPurchases : value //no. of purchases made} 
*/
module.exports.purchaseResults = function(){
    let customer = [];
    let result = [];

    sampleData.map((data) => {
        result = _.where(customer,{custID : data.custID});
        if(customer.length == 0 || result.length == 0){
            let temp = {};
            let count = 0;
            _.where(sampleData,{custID:data.custID}).map((value)=>{
                count+= 1;
            });

            temp["custID"] = data.custID;
            temp["totalAmount"] = data.amount; 
            temp["totalPurchases"] = count;
            temp["purchaseDates"] = [];

            temp["purchaseDates"].push(data.date);

            customer.push(temp);
        }else{
            customer.map((value) => {
                if(value.custID == result[0].custID){
                    value.totalAmount += data.amount;
                    value.purchaseDates.push(data.date);
                }
            });
        }
        
    });
    getTimeGap(customer);
    return customer;
}

function getTimeGap(purchaseData){
       purchaseData.map((data) => {
           data["tempTime"] = [];
           data.purchaseDates.map((dates) => {
               data.tempTime.push(Date.parse(dates));
           });
           var tempDates = data.tempTime.sort(sortByNumber).reverse()
           data.tempTime = tempDates;

       });
}

function sortByNumber(value1, value2){
    return value1 - value2;
}