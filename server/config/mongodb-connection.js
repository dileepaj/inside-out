const connectionDetails = {
    "connection" : 'mongodb://root:qwerty99x@ds042729.mlab.com:42729/inside-out'
}; 
const mongoose = require('mongoose');
const orderSchema = require('../models/order.model');
const geocodeSchema = require('../models/geocode.model');

module.exports = function(){
    let mongoObject;
    try {
       let db = mongoose.connect(connectionDetails.connection);
       db.once('open',setModels());
    }catch(exception){

    }
};

function setModels(){
    mongoose.model('order',orderSchema.orderSchema);
    mongoose.model('geocode', geocodeSchema);
}

