const request = require('supertest');
const express = require('express');

const photoRouter = require('../routes/photos');
const userRouter = require('../routes/users');

const app = express();

app.use('/photos', photoRouter);
app.use('/users', userRouter);

describe('/users', function() {

    it('POST / 404', function(done) {
        request(app)
            .post('/users')
            .expect(404, done);
    });

    it('POST / 200', function(done) {
        request(app)
            .post('/users')
            .send({username: 'testuser', email: 't@user.com'})
            .expect(200, done);
    });
});

describe('/photos', function() {

    it('GET / 404', function(done) {
        request(app)
            .get('/photos')
            .expect(404, done);
    });

    it('POST / 200', function(done) {
        request(app)
            .post('/photos')
            .attach('photo', 'test/fixtures/testphoto')
            .expect(200, done);
    });

    it('DELETE / 200', function(done) {
        request(app)
            .delete('/photos/393939')
            .expect(200, done);
    });
});
