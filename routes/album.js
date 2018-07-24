'use strict'

const express = require('express');
const { celebrate, Joi } = require('celebrate');
const MessageError = require('../utilities/MessageResponse');
const md_auth = require('../middlewares/authenticated');
const AlbumController = require('../controllers/album');

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/album' });

const api = express.Router();

api.get('/album/', md_auth.ensureAuth, AlbumController.getAlbum);
api.post('/album/', md_auth.ensureAuth, AlbumController.saveAlbum);

module.exports = api;