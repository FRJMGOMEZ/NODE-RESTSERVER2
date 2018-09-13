const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const fs = require('fs');
const path = require('path');

const {verifyTokenImg} = require('../middlewares/authentication');

app.get('/imagen/:type/:img',verifyTokenImg,(req,res)=>{

 let type = req.params.type;
 let img = req.params.img;

 let imgPath = path.resolve(__dirname,`../../uploads/${type}/${img}`)

 if(fs.existsSync(imgPath)){

   res.sendFile(imgPath); return}

 let noImgPath = path.resolve(__dirname,'../assets/no-image.png')

 res.sendFile(noImgPath);})





module.exports = app;
