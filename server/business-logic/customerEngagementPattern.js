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
    calculateTimeGap(customer);
    return customer;
}

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
// calculates standard deviation for a sample data for the equation
function calculateSTDdeviation(purchaseData){   
    return new Promise((resolve,reject) => {
        try{
            let total = 0;
            purchaseData["consistency"]
            purchaseData.tempGaps.map((value) => {
                total += (value - purchaseData.averageGap) * (value - purchaseData.averageGap);
            });
            purchaseData.consistency = (1/(purchaseData.totalPurchases - 1)) * total ;  
            delete purchaseData["tempGaps"];

            return resolve({status : true}); 
        }catch(error){
            return reject({status : false , message : "error occured while proccessing consistency"});
        }
    });
}

function sortByNumber(value1, value2){
    return value1 - value2;
}