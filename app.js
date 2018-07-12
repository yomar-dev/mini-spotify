'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Cargar Rutas


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cabeceras http

// Rutas Base

module.exports = app;
