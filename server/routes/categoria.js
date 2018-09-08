
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Categoria = require('../models/categoria');

const {verifyToken,verifyRole} = require('../middlewares/authentication');

const app = express();


  app.get('/categoria',verifyToken,verifyRole,(req,res)=>{

  let nombreCategoria = req.query.categoria;

    if(!nombreCategoria){

    Categoria.find({})
             .populate({path:'productos',select:'nombre'})
             .populate('usuario')
             .sort('descripcion')
             .exec((error,categoriasDb)=>{

    if(error){return res.status(500).json({ok:false,
                                    message:error})}
    res.json({ok:true,
              categorias:categoriasDb}) }) }

    else if(nombreCategoria){

    Categoria.findOne({nombre:nombreCategoria},(error,categoriaDb)=>{

      if(error){return res.status(500).json({ok:false,
                                      message:error})}
    res.json({ok:true,
              categoria:categoriaDb}) })}})




  app.post('/categoria',verifyToken,verifyRole,(req,res)=>{

  let body = req.body;

  let categoria = new Categoria({nombre:body.nombre,
                                 usuario:req.usuario.usuario,
                                 descripcion:body.descripcion});

  categoria.save((error,categoriaDb)=>{

    if(error){return res.status(500).json({ok:false,
                                           message:error})}

    if(!categoriaDb){return res.status(400).json({ok:false,
                                                  message:error})}
    res.json({ok:true,
              categoria:categoriaDb})})})





  app.put('/categoria',verifyToken,verifyRole,(req,res)=>{

  let nombreCategoria = req.query.categoria;

  let body = _.pick(req.body,['nombre','descripcion']);

  Categoria.findOneAndUpdate({nombre:nombreCategoria},body,{new:true},(error,categoriaDb)=>{

    if(error){return res.status(500).json({ok:false,
                                           message:error})}
    res.json({ok:true,
              categoria_actualizada:categoriaDb})})})




  app.delete('/categoria',verifyToken,verifyRole,(req,res)=>{

    let nombreCategoria = req.query.categoria;

    Categoria.findOneAndDelete({nombre:nombreCategoria},(error,categoriaBorrada)=>{

      if(error){return res.status(500).json({ok:false,
                                             message:error})}
      res.json({ok:true,
                categoriaBorrada})})})



module.exports = app;
