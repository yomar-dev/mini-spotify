'use strict'

const fs = require('fs');
const path = require('path');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

function saveArtist(req, res){
    const params = req.body;

    Artist.create(params, (err, response) => {
        if(err){
            res.status(200).send({ message: "Problemas al guardar el artista." });
        }else{
            res.status(200).send({ message: "Artista registrado con éxito.", data: response });
        }
    });
}

module.exports = {
    saveArtist
}