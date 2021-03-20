
const express = require('express');
const bodyParser = require('body-parser');

const userModel = require('../models/users');



function createUser(req, res) {

    if (!req.body || !req.body.username || !req.body.email) {
        res.status(404);
        res.end();
        return
    }

    userModel.createUser(req.body.username, req.body.email)
    .then(() => {
        res.status(200);
        res.end();
    });
}

let userRouter = express.Router();

userRouter.post('/', 
    bodyParser.json(),
    createUser
);

module.exports = userRouter;
