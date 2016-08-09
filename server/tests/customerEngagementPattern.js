/*
* Unit test for Customer Engagement Pattern
*/

'use strict'

const supertest = require('supertest');
const should = require('chai').should();
const expect = require('chai').expect;
const config = require('./config');

const server = supertest.agent(config.server);

describe('Running test for /customer-engagement-pattern', function() {
	it('Endpoint should return a valid JSON', function(done) {
		server
		.get('/customer-engagement-pattern')
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