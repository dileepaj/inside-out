'use strict'

const mongoose = require('mongoose');

function getCitiesGeocode(callback) {
	let db = mongoose.connection;
    let dbInstance = mongoose.model('geocode');
    let returnObj = [];

    dbInstance.find({}, function(err, docs) {
	    if (!err){ 
	    	let arrayOfPromises = docs.map(mapObjects);

	    	Promise.all(arrayOfPromises)
	    		.then(function(items) {
	    			returnObj = items;

	    			callback(items);
	    		});
	    } else {
	    	throw err;
	    }
	});
}

function mapObjects(item) {
	return new Promise(function(resolve, reject) {
		let tempObj = {
				    "type": "Feature",
				    "properties": {
				      "text": item['city']
				    },
				    "geometry": {
				        "type": "Point",
				        "coordinates": [item['latitude'], item['longitude']]
				    }
				}
		resolve(tempObj);
	});
}

module.exports.getCitiesGeocode = getCitiesGeocode;