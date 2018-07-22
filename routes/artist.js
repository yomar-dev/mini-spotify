'use strict'

const express = require('express');
const { celebrate, Joi } = require('celebrate');
const MessageError = require('../utilities/MessageResponse');
const md_auth = require('../middlewares/authenticated');
const ArtistController = require('../controllers/artist');

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

module.exports = api;