const request = require('supertest');
const express = require('express');

const photoRouter = require('../routes/photos');

const app = express();

app.use('/', photoRouter);

describe('API', function() {

    it('GET /', function(done) {
        request(app)
            .get('/')
            .expect(404, done);
    });

    it('POST /', function(done) {
        request(app)
            .post('/')
            .attach('photo', 'test/fixtures/testphoto')
            .expect(200, done);
    });

    it('DELETE /', function(done) {
        request(app)
            .delete('/393939')
            .expect(200, done);
    });
});
