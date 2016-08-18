'use strict'

const orderMapper = require('../mappers/mainObjectMapper.icefresh');
const orderModel = require('../models/order.model');


module.exports.runScheduledJobs = function(){
    Promise.all([orderModel.deleteAllOrders(),orderMapper.mapIceFreshOrderObjects()]).then((success)=>{
        console.log("success");
    },(error) => {
        console.log
    });
}