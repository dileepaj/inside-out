'use strict';

let mongoose = require('mongoose');
let orderModel = {
  city: String,
  latitude: String,
  longitude: String,
}
let orderSchema = new mongoose.Schema(orderModel, {
	strict: false
});

module.exports = orderSchema;
