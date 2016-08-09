/*
* Unit test for numberOfPurchasesByDay 
*/

'use strict'

const supertest = require('supertest');
const should = require('chai').should();
const expect = require('chai').expect;
const config = require('./config');

const server = supertest.agent(config.server);

describe('Running test for /purchases-by-days', function() {
	it('Endpoint should return a valid JSON', function(done) {
		server
		.get('/purchases-by-days')
		.expect(200)
		.end(function(err, res) {
			if(err) {
				//console.log(err);	
			}
			res.body.status.should.equal(true);
			done();
		});	

	});
});