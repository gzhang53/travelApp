const request = require('supertest')
const app = require('../src/server/index.js')


test('check description here', async done => {
    const response = await request(app).get('/') 
    expect(response.status).toBe(200)
    done()
});