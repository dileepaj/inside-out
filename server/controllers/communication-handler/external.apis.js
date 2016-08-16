"use strict"

const router = require('express').Router();
const IceFreshApi = require('../../config/externalApi.config');
const fetch = require('node-fetch');
const logger = require('../../utils/logger');
const avgAmntPerCity = require('../../business-logic/averageAmountSpentPerCity');
const https = require('https');


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
    let dumpObj = [];
    let counter = 0;
    let promise = Promise.resolve(null);
    
    //make a call to the google maps api in a loop
    // for(let city in cities) {
    //     counter++;
    //     let pathStr = '/maps/api/geocode/json?&address=' + encodeURIComponent(cities[city]) + '&key=AIzaSyAYiFCWSwylI95KxNAreTgYpzXlGGdTMvk';


    //     https.get({
    //             host: 'maps.googleapis.com',
    //             path: pathStr 
    //         },
    //         res => {
    //         console.log('status code: ', res.statusCode);

    //         res.on('data', d => {
    //             let jsonBody = JSON.parse(d.toString('utf8')); 
    //             console.log(jsonBody.results[0]['formatted_address']);
    //         });

    //     }).on('error', e => {
    //         console.error(e);
    //     });

    //     if(counter === 50) {
    //         counter = 0;
    //         setTimeout(function(){ console.log('on a timeout'); }, 60000);
    //     }
    //     console.log('counter: ' + counter);
    //     //dumpObj.push(tempObj);
    // }

    
    let tempCities = cities.splice(0, 5);
    let arrayOfPromises = tempCities.map(getGeocodesForCity);

    Promise.all(arrayOfPromises)
        .then(function(addresses) {
            console.log('\n\n\n Finally:');
            console.log(addresses)
        });

    // tempCities.forEach(function(city) {
    //     counter++;
        

    //     promise = promise.then(function() {
    //         console.log('in promise');
            
    //     })
    //     .then(function(value) {
    //         dumpObj.push(value);
    //     });

    //     if(counter === tempCities.length) {
    //         ;            
    //     }
    // });
    
    //add the co-ordinates for the cities to the db
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
                //console.log('\n\n\n * * * * * * \n');
                //console.log(body.toString('utf8'));
                //console.log('\n * * * * * * \n\n\n');

                let jsonBody = JSON.parse(body.toString('utf8')); 
                let returnObj = {
                    city: city,
                    longitude: jsonBody.results[0]['geometry']['location']['lng'],
                    latitude: jsonBody.results[0]['geometry']['location']['lat'],
                }

                resolve(returnObj);
            });

        }).on('error', e => {
            console.error(e);
        });
    });
}

module.exports.getCoordinatesForCities = getCoordinatesForCities;

//https://maps.googleapis.com/maps/api/geocode/json?&address=