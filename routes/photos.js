
const express = require('express');


function uploadPhoto(req, res) {
    res.send('upload photo');
}

function deletePhoto(req, res) {
    res.send('delete photo');
}

function getPhoto(req, res) {
    res.send('download photo');
}

let photoRouter = express.Router();

photoRouter.get('/:photoid', getPhoto);
photoRouter.post('/', uploadPhoto);
photoRouter.delete('/:photoid', deletePhoto);

module.exports = photoRouter;
