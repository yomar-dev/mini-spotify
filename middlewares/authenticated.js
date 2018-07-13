'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'mini_spotify';

exports.ensureAuth = function(req, res, next){
    let payload = '';
    if(!req.headers.authorization){
        return res.status(403).send({ message: "La peticion no contine la cabecera de autenticación." });
    }

    const token = req.headers.authorization.replace(/['"]+/g, '');
    try{
        payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({ message: "El token ha expirado." });
        }
    }catch(ex){
        return res.status(404).send({ message: "Token no valido." });
    }
    req.user = payload;
    next();
}