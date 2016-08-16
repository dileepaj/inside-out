"use strict"

const router = require('express').Router();
const IceFreshApi = require('../../config/externalApi.config');
const fetch = require('node-fetch');
const logger = require('../../utils/logger');
const avgAmntPerCity = require('../../business-logic/averageAmountSpentPerCity');
const https = require('https');
const mongoose = require('mongoose');

module.exports.getAllIcefreshOrders = function(mongoConnection){
    return new Promise((resolve,reject) => {
        return fetch(IceFreshApi.iceFresh.orders).then((response)=>{
                // return resolve(response.json());
            return response.json();
        }).then((body) =>{
            return resolve(body);
        }).catch((exception) => {
            logger.log('error',"Error in accessing iceFresh order data",{stack:exception.stack});
            return reject(exception);
        });
    });
}

function getCoordinatesForCities() {
    //get all the unique cities
    let cities = avgAmntPerCity.getUniqueCities();    
    let tempCities = cities.splice(0, 50);
    let arrayOfPromises = tempCities.map(getGeocodesForCity);

    Promise.all(arrayOfPromises)
        .then(function(geocodes) {

            let db = mongoose.connection;
            let dbInstance = mongoose.model('geocode');

            // console.log('Finally:');
            // console.log(geocodes)

            let aop = geocodes.map(geocode => {
                                        console.log(geocode);
                                        return new Promise(function(resolve, reject) {
                                            if(typeof geocode !== 'undefined') {
                                                let dbObject = new dbInstance(geocode);
                                                dbObject.save(function (err, product, numAffected){
                                                    if(!err){
                                                        //finalOrdersArray.push(tempObject);
                                                        resolve();
                                                    }         
                                                    else {
                                                        reject(err);
                                                    }
                                                });
                                            } 
                                            else {
                                                resolve();
                                            }    
                                         });
                                    });

            Promise.all(aop)
                .then(function() {
                    console.log('all items inserted');
                })
                .catch(function(err) {
                    console.log(err);
                });

            //add the co-ordinates for the cities to the db
        });
}

function getGeocodesForCity(city) {

    return new Promise(function(resolve, reject) {
        let pathStr = '/maps/api/geocode/json?&address=' + encodeURIComponent(city) + '&key=AIzaSyAYiFCWSwylI95KxNAreTgYpzXlGGdTMvk';

        https.get({
            host: 'maps.googleapis.com',
            path: pathStr 
        },
        res => {
            
            let body = '';
            res.on('data', d => {
                body += d;
            });
            res.on('end', function() {
                let jsonBody = JSON.parse(body.toString('utf8')); 
                
                console.log('\n\n\n * * * * * ');
                console.log(city);
                console.log(jsonBody);
                console.log('* * * * * \n\n\n ');

                if(jsonBody.status == 'OK') {
                    let returnObj = {
                        city: city,
                        latitude: jsonBody.results[0]['geometry']['location']['lat'],
                        longitude: jsonBody.results[0]['geometry']['location']['lng']
                    }
                    resolve(returnObj);
                }
                else {
                    resolve();
                }
                
            });

        }).on('error', e => {
            console.error(e);
            reject(e);
        });
    });
}

module.exports.getCoordinatesForCities = getCoordinatesForCities;