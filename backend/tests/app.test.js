const request = require('supertest');
const app = require("../server");
const { disconnectDB } = require("../src/config/db");
 // import directly from server.js

describe('Backend basic tests', () => {
  it('GET /api/server-status should return 200', async () => {
    const res = await request(app).get('/api/server-status');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('GET /api/test-route should return 200', async () => {
    const res = await request(app).get('/api/test-route');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Test route is working');
  });
});

afterAll(async () => {
  await disconnectDB(); // close DB after tests
});

