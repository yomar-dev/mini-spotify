'use strict'

const express = require('express');
const { celebrate, Joi } = require('celebrate');
const MessageError = require('../utilities/MessageResponse');
const md_auth = require('../middlewares/authenticated');
const ArtistController = require('../controllers/artist');

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/artists' });

const api = express.Router();

api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists);

api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist);

/*api.post('/artist/save', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required()
    }).unknown()
}), (error, req, res, next) => {
    res.status(200).send(MessageError.MESSAGE_INVALID_FIELD);
}, ArtistController.saveArtist);*/

api.post('/artist/save', md_auth.ensureAuth, ArtistController.saveArtist);

api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist);

api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist);

api.post('/artist/upload-image/:id', [md_auth.ensureAuth, md_upload], ArtistController.uploadImage);

api.get('/artist/image/:imageFile', ArtistController.getImage);

module.exports = api;