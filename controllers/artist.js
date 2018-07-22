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

function updateArtist(req, res){
    const artistId = req.params.id;
    const data = req.body;

    Artist.findByIdAndUpdate(artistId, data, (error, artistUpdated) => {
        if(error){
            res.status(500).send({ message: "Problemas al actualizar el artista." });
        }else{
            if(!artistUpdated){
                res.status(404).send({ message: "No se ha podido actualizar el artista." });
            }else{
                res.status(200).send({ message: "Artista actualizado con éxito.", artist: artistUpdated });
            }
        }
    });
}

function deleteArtist(req, res){
    const artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, (err, artistRemove) => {
        if(err){
            res.status(200).send({ message: "Problemas al eliminar el artista." });
        }else{
            if(!artistRemove){
                res.status(200).send({ message: "No se ha podido eliminar el artista." });
            }else{
                Album.find({ artist: artistRemove._id }, (err, albumRemoved) => {
                    if(err){
                        res.status(200).send({ message: "Problemas al eliminar album" });
                    }else{
                        if(!albumRemoved){
                            res.status(200).send({ message: "Problemas al eliminar album de: " + artistRemove.name });
                        }else{
                            Song.find({ album: albumRemoved._id }, (err, songRemoved) => {
                                if(err){
                                    res.status(200).send({ message: "Problemas al eliminar canciones del album: " + albumRemoved.name });
                                }else{
                                    if(!songRemoved){
                                        res.status(200).send({ message: "Problemas al eliminar la canción: " + songRemoved.name });
                                    }else{
                                        res.status(200).send({ artist: artistRemove });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}
function uploadImage(req, res){
    const artistId = req.params.id;
    let file_name = '...';
    
    if(req.files){
        const file_path = req.files.image.path;
        const file_split = file_path.split('/');
        //const file_split = file_path.split('\\');
        const file_name = file_split[2];
        console.log("Nombre Imagen: ", file_name);

        const ext_split = file_name.split('.');
        const file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            Artist.findByIdAndUpdate(artistId, { image: file_name }, (err, artistUpdated) => {
                if(!artistUpdated){
                    res.status(404).send({ message: "No se ha podido actualizar la imagen del artista." });
                }else{
                    res.status(200).send({ message: "Imagen del artista actualizada con éxito.", artist: artistUpdated });
                }
            })
        }else{
            res.status(200).send({ message: "Tipo de archivo no valido." });
        }
    }else{
        res.status(200).send({ message: "No se ha subido ninguna imagen." });
    }
}

function getImage(req, res){
    const imageFile = req.params.imageFile;
    const path_file = './uploads/artists/' + imageFile;

    fs.exists(path_file, (exists) => {
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({ message: "La imagen no existe." });
        }
    });
}

module.exports = {
    getArtists,
    getArtist,
    saveArtist,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImage
}