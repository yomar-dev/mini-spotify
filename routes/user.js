'use strict'

const express = require('express');
const { celebrate, Joi } = require('celebrate');
const MessageError = require('../utilities/MessageResponse');
const UserController = require('../controllers/user');
const md_auth = require('../middlewares/authenticated');

const api = express.Router();

api.post('/user/save', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.required(),
        role: Joi.string().required(),
        image: Joi.string()
    }).unknown()
}), (error, req, res, next) => {
    res.status(200).send(MessageError.MESSAGE_ERROR_FIELDS);
}, UserController.saveUser);

api.post('/user/login', celebrate({
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.required()
    }).unknown()
}), (error, req, res, next) => {
    res.status(200).send(MessageError.MESSAGE_INVALID_FIELD);
}, UserController.loginUser);

api.put('/user/update/:id',md_auth.ensureAuth, UserController.updateUser);

api.get('/user/test', md_auth.ensureAuth, UserController.test);

module.exports = api;