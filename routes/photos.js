
const express = require('express');

const keygen = require('keygen');
const path = require('path');

const bodyParser = require('body-parser');
const multer = require('multer');

const photoModel = require('../models/photos');


function uploadPhoto(req, res) {

    if (!req.file || !req.file.filename) {
        res.status(400);
        res.end();
        return;
    }

    let contentkey = req.file.filename;

    keygen(8)
    .then(id => {
        photoModel.uploadPhoto(req.params.user, id, contentkey)
        .then(() => {
            res.status(200);
            res.send(id + '\n');
        })
    });
}

function deletePhoto(req, res) {
    // delete from storage directory
    // remove metedata
    res.send('delete photo');
}

function getPhoto(req, res) {

    photoModel.getPhoto(req.params.user, req.params.photoid)
    .then((contentkey) => {
        if (contentkey) {
            let pathPrefix = path.join(__dirname, '../uploads');
            res.download(pathPrefix + '/' + contentkey);
        } else {
            res.status(404);
            res.end();
        }
    });
}

let upload = multer({dest: path.join(__dirname, '../uploads') });
let photoRouter = express.Router();

photoRouter.get('/:user/:photoid', getPhoto);

photoRouter.post('/:user', 
    bodyParser.json(),
    upload.single('photo'),
    uploadPhoto
);

photoRouter.delete('/:user/:photoid', deletePhoto);

module.exports = photoRouter;
