
const express = require('express');

const followerModel = require('../models/followers');


function getFollowers(req, res) {

    followerModel.getFollowers(req.params.user)
    .then((followers) => {

        res.status(200);
        res.send(followers);
    });
}

function addFollower(req, res) {

    followerModel.follow(req.params.user, req.params.user2)
    .then(() => {
    
        res.status(200);
        res.send();
    });
}

function removeFollower(req, res) {

    followerModel.unfollow(req.params.user, req.params.user2)
    .then(() => {

        res.status(200);
        res.send();
    });
}

let followRouter = express.Router();

followRouter.get('/:user', getFollowers);
followRouter.get('/:user/follows/:user2', addFollower);
followRouter.get('/:user/unfollows/:user2', removeFollower);

module.exports = followRouter;
