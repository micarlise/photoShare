const request = require('supertest');
const express = require('express');

const photoRouter = require('../routes/photos');

const app = express();

app.use('/', photoRouter);

describe('API', function() {

    it('GET /', function(done) {
        request(app)
            .get('/393939')
            .expect(200, done);
    });

    it('POST /', function(done) {
        request(app)
            .post('/')
            .expect(200, done);
    });

    it('DELETE /', function(done) {
        request(app)
            .delete('/393939')
            .expect(200, done);
    });
});
