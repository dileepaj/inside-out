'use strict';

const mongoose = require('mongoose');
const logger = require('../utils/logger');

let orderModel = {
  orderNumber: String,
  OrderSource: String,
  customerId: String,
  customerName: String,
  recieverName: String,
  address: String,
  district: String,
  city : String,
  province : String,
  zipcode : String,
  phone : String,
  paymentMethod : String,
  outTradeNo : String,
  deliveryCost : String,
  totalDiscount : String,
  totalAmount : String,
  payment : String,
  lastmile : String,
  ecommerceCreateTime : String,
  ecommercePaymentTime : String,
  ecommerceEndTime : String,
}
module.exports.orderSchema = new mongoose.Schema(orderModel, {
	strict: false
});

module.exports.getOrders = function(){
  return new Promise((resolve,reject)=>{
    let db = mongoose.connection;
    let Order = mongoose.model('order');

    Order.find({},(err,orders)=>{
      if(err){
        logger.log('error','unable to get orders from MLab database',{stack : err});
        return reject({status : false});
      }
      return resolve(orders);
    });
  }); 
}


