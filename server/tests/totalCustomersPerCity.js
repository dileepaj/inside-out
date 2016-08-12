/**
 * Unit test for Total Customers Per City
 */

'use strict';

const supertest = require('supertest');
const should = require('chai').should();
const expect = require('chai').expect;
const config = require('./config');

const server = supertest.agent(config.server);

describe('Running test for /total-customers-per-city', function() {
	it('Endpoint should return a valid JSON', function(done) {
		server
			.get('/total-customers-per-city')
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