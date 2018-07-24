'use strict'

const fs = require('fs');
const path = require('path');

const mongoosePaginate = require('mongoose-pagination');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

function getAlbum(req, res){
    res.status(200).send({ message: "Get Album" });
}

function saveAlbum(req, res){
    const params = req.body;
    Album.create(params, (err, response) => {
        if(err){
            res.status(200).send({ message: "Problemas al guardar el album." });
        }else{
            res.status(200).send({ message: "ALbum registrado con éxito.", data: response });
        }
    });
}

module.exports = {
    getAlbum,
    saveAlbum
}