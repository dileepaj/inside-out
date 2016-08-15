const connectionDetails = {
    "connection" : 'mongodb://root:qwerty99x@ds042729.mlab.com:42729/inside-out'
}; 
const mongoose = require('mongoose');

module.exports = function(){
    let mongoObject;
    try {
        mongoObject = mongoose.connect(connectionDetails.connection);
        return mongoObject;
    }catch(exception){

    }
};



