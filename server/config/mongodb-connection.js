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
<<<<<<< HEAD
    mongoose.model('order',orderSchema.orderSchema);
=======
    mongoose.model('order',orderSchema);
    mongoose.model('geocode', geocodeSchema);
>>>>>>> 592701274e107d8816c9d393a5d9c5400182b4c5
}

