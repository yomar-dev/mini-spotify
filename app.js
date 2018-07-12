'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Cargar Rutas
const user_routes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cabeceras http

// Rutas Base
app.use('/api', user_routes);

module.exports = app;
