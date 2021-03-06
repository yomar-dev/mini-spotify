'use strict'

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jwt = require('../services/jwt');
const fs = require('fs');
const path = require('path');

function saveUser(req, res){
    const params = req.body;
    bcrypt.hash(params.password, null, null, ((err, hash) => {
        if (err) {
            return res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            params.password = hash;
            User.create(params, (error, response)=> {
                if(error){
                    res.status(200).send({ message: "Problemas al guardar el registro." });
                }else{
                    res.status(200).send({ message: "Registro guardado con éxito." });
                }
            })
        }
    }));
}

function loginUser(req, res){
    const params = req.body;
    const email = params.email;
    const password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if(err){
            res.status(200).send({ message: "Problemas al consultar el usuario." });
        }else{
            if(!user){
                res.status(200).send({ message: "Datos incorrectos." });
            }else{
                bcrypt.compare(password, user.password, (err, check) => {
                    if(check){
                        if(params.gethash){
                            // Devolver un token de JWT
                            res.status(200).send({ token: jwt.createToken(user) });
                        }else{
                            res.status(200).send({ data: user });
                        }
                    }else{
                        res.status(200).send({ message: "Datos incorrectos." });
                    }
                })
            }
        }
    })
}

function updateUser(req, res){
    const userId = req.params.id;
    const data = req.body;

    User.findByIdAndUpdate(userId, data, (error, userUpdated) => {
        if(error){
            res.status(500).send({ message: "Problemas al actualizar el usuario." });
        }else{
            if(!userUpdated){
                res.status(404).send({ message: "No se ha podido actualizar el usuario." });
            }else{
                res.status(200).send({ message: "Usuario actualizado con éxito.", data: userUpdated });
            }
        }
    })
}

function uploadImage(req, res){
    const userId = req.params.id;
    let file_name = '...';
    
    if(req.files){
        const file_path = req.files.image.path;
        const file_split = file_path.split('/');
        //const file_split = file_path.split('\\');
        const file_name = file_split[2];

        const ext_split = file_name.split('.');
        const file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            User.findByIdAndUpdate(userId, { image: file_name }, (err, userUpdated) => {
                if(!userUpdated){
                    res.status(404).send({ message: "No se ha podido actualizar la imagen del usuario." });
                }else{
                    res.status(200).send({ message: "Imagen de usuario actualizada con éxito.", data: userUpdated });
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
    const path_file = './uploads/users/' + imageFile;

    fs.exists(path_file, (exists) => {
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({ message: "La imagen no existe." });
        }
    });
}

function test(req, res){
    res.status(200).send({ message: "Prueba exitosa." });
}

module.exports = {
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImage,
    test
}