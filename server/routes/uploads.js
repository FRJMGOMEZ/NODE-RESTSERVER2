const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const fs = require('fs');
const path = require('path');


app.use(fileUpload());


app.put('/upload/:type/:id', (req, res) => {

let type = req.params.type;
let id = req.params.id;

  if (!req.files)
    return res.status(400).json({ok:false,
                                 message:'No files were uploaded.'});

 ////VALIDAMOS EL TIPO DE ARCHIVO////
let validTypes = [`productos`,'usuarios'];
  if(validTypes.indexOf(type)<0){
    return res.status(403).json({ok:false,
                                 message:`Invalid type, the types allowed are ${validTypes.join(', ')}` })}


 ////VALIDAMOS LA EXTENSION DEL ARCHIVO///
let file = req.files.archivo;

let validExtensions = ['png','jpg','gif','jpeg'];

let cuttedFile = file.name.split('.');

let extension = cuttedFile[cuttedFile.length-1];

if(validExtensions.indexOf(extension)<0){
   return res.status(403).json({ok:false,
                                message:`The extension of the file is not allowed, the extensions allowed are ${extensionesValidas.join(', ')}`})}

//////NOW, WE SAVE AND UPDATE THE IMAGE OF THE DATABASE////////
let fileName = `${id}-${new Date().getMilliseconds()}.${extension}`;


 file.mv(`uploads/${type}/${fileName}`, (err)=>{

     if (err)
      return res.status(500).json({ok:false,
                                    message:'File could not been loaded '});

 if(type ==='usuarios'){ imageUser(id,res,fileName)}

 else                  { imageProduct(id,res,fileName)}})});




const imageUser = (id,res,fileName) => {

  Usuario.findById(id,(error,userDb)=>{

    if(error){

      deleteImg(fileName,'usuarios')

      return res.status(500).json({ok:false,
                                   message:error})}

    if(!userDb){

      deleteImg(fileName,'usuarios')

      return res.status(400).json({ok:false,
                                   message:'User do not exist'})}

    deleteImg(userDb.img,'usuarios');

    userDb.img = fileName;

    userDb.save((error,userSaved)=>{

      res.json({ok:true,
                user:userSaved})})})}



const imageProduct = (id,res,fileName) => {

  Producto.findById(id,(error,productDb)=>{

    if(error){

      deleteImg(fileName,'productos')

      return res.status(500).json({ok:false,
                                   message:error})}
    if(!productDb){

      deleteImg(fileName,'productos')

      return res.status(400).json({ok:false,
                                   message:'Product do not exist'})}
    deleteImg(productDb.img,'productos');

    productDb.img = fileName;

    productDb.save((error,productSaved)=>{

      res.json({ok:true,
                product:productSaved})})})}


const deleteImg = (imageName,type) =>{

  let pathImage = path.resolve(__dirname,`../../uploads/${type}/${imageName}`);

  if(fs.existsSync(pathImage)){fs.unlinkSync(pathImage)}};




module.exports = app;
