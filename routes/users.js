
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

function getUser(req, res) {

    userModel.getUser(req.params.user)
    .then((user) => {

        if (!user) {
            res.status(404);
            res.end();
            return;
        }

        res.send(user);
    });
}

let userRouter = express.Router();

userRouter.get('/:user', getUser);

userRouter.post('/', 
    bodyParser.json(),
    createUser
);

module.exports = userRouter;
