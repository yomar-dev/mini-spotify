'use strict'

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

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

module.exports = {
    saveUser,
    loginUser
}