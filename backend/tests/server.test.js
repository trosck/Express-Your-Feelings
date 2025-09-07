/**
 * @fileoverview Test suite for the Express server API endpoints
 * Tests basic functionality including root endpoint and 404 handling
 * @author Task Manager Team
 * @version 1.0.0
 */

const request = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test suite for the root endpoint
 */
describe('GET /', () => {
  /**
   * Test that the root endpoint responds with the correct message
   */
  it('responds responds to the world', async function() {
    const res = await request(app)
      .get('/')
      .set('Accept', 'application/json');

    assert.equal(res.status, 200);
    assert.equal(res.type, 'application/json');
    assert.equal(res.body.message, 'Hello World!');
  });
});

/**
 * Test suite for 404 error handling
 */
describe('GET /404', () => {
  /**
   * Test that non-existent routes return 404 status
   */
  it('responds with a 404', async function() {
    const res = await request(app)
      .get('/404')
      .set('Accept', 'application/json');

    assert.equal(res.status, 404);
  });
});