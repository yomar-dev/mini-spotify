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

module.exports = {
    saveUser
}