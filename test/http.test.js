const request = require('supertest');
const express = require('express');

const photoRouter = require('../routes/photos');
const userRouter = require('../routes/users');
const followRouter = require('../routes/followers');

const app = express();

app.use('/photos', photoRouter);
app.use('/users', userRouter);
app.use('/followers', followRouter);

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

    it('POST / 200', function(done) {
        request(app)
            .post('/users')
            .send({username: 'otheruser', email: 'other@user.com'})
            .expect(200, done);
    });

    it('GET / 200', function(done) {
        request(app)
            .get('/users/testuser')
            .expect(200, done);
    });
});

describe('/followers', function() {

    it('GET /followers 200', function(done) {

        request(app)
            .get('/followers/testuser/follows/otheruser')
            .expect(200, done);
    });
});

describe('/photos', function() {

    it('GET / 404', function(done) {

        request(app)
            .get('/photos/testuser')
            .expect(404, done);
    });

    it('POST / 200 with title', function(done) {
        request(app)
            .post('/photos/testuser')
            .field('title', 'test photo')
            .attach('photo', 'test/fixtures/testphoto')
            .expect(200, done);
    });

    it('POST / 200', function(done) {
        request(app)
            .post('/photos/testuser')
            .attach('photo', 'test/fixtures/testphoto')
            .expect(200, done);
    });
});
