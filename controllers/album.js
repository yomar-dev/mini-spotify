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

module.exports = {
    getAlbum
}