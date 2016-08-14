"use strict"

const router = require('express').Router();
const IceFreshApi = require('../../config/externalApi.config');
const fetch = require('node-fetch');
const logger = require('../../utils/logger');

module.exports.getAllIcefreshOrders = function(){
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


//https://maps.googleapis.com/maps/api/geocode/json?&address=