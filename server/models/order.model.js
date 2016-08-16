'use strict';

const mongoose = require('mongoose');

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
let orderSchema = new mongoose.Schema(orderModel, {
	strict: false
});

module.exports.getOrders = function(){
  
  let connection = mongoose.connection;
  let modelInstance = mongoose.model('order');


}

module.exports = orderSchema;
