require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

let publicPath = path.resolve(__dirname , '../public');
app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//////////REQUERIMOS LAS RUTAS///////////////
app.use(require('./routes/index.js'));


//////////CONEXION A BASE DE DATOS//////////////
mongoose.connect(process.env.URLDB,(error,respuesta)=>{

  if(error){throw error}

  console.log(`Base de datos conectada a ${process.env.URLDB}`)});


////////////CONEXION AL SERVIDOR////////////////
app.listen(process.env.PORT, ()=>{console.log(`Escuchando en el puerto ${process.env.PORT}`)})
