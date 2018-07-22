'use strict'

const fs = require('fs');
const path = require('path');

const mongoosePaginate = require('mongoose-pagination');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

function getArtists(req, res){
    const page = req.params.page ? req.params.page : 1;
    const itemsPerPage = 4;

    Artist.find().sort('name').paginate(page, itemsPerPage, (err, response, total) => {
        if(err){
            res.status(200).send({ message: "Problemas al consultar los artistas." });
        }else{
            if(!response){
                res.status(200).send({ message: "No hay artistas!!" });
            }else{
                res.status(200).send({ total_items: total, artists: response });
            }
        }
    });
}

function getArtist(req, res){
    const id = req.params.id;

    Artist.findById(id, (err, artist) => {
        if(err){
            res.status(200).send({ message: "Problemas al consultar el artista." });
        }else{
            if(!artist){
                res.status(200).send({ message: "El artista no existe." });
            }else{
                res.status(200).send({ data: artist });
            }
        }
    })
}

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
    getArtists,
    getArtist,
    saveArtist
}