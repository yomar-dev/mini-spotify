'use strict'

const express = require('express');
const { celebrate, Joi } = require('celebrate');
const MessageError = require('../utilities/MessageResponse');
const md_auth = require('../middlewares/authenticated');
const ArtistController = require('../controllers/artist');

const api = express.Router();



module.exports = api;