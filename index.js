'use strict'

const conexion = require('./database');
const app = require('./app');
const port = process.env.PORT || 3977;

app.listen(port, () => {
    console.log('Servidor corriendo y escuchando en el puerto: ', port);
});