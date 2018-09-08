const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const {verifyToken} = require('../middlewares/authentication');
const {verifyRole} = require('../middlewares/authentication');

const app = express();



app.get('/categoria/producto',(req,res)=>{

  let nombreProducto = req.query.nombre;

  Categoria.find({})
           .exec(async(error,categoriasDb)=>{

    if(error){return res.status(500).json({ok:false,
                                           message:error})}

    let categoria = await categoriasDb.find((categoria)=>{

     return categoria.productos[0].nombre === nombreProducto});


    let producto = categoria.productos.find((producto)=>{

      producto = categoria.productos[0].nombre === nombreProducto;

      return producto
    })

      res.json({producto})
    })})


app.post('/producto',(req,res)=>{

let body = req.body;

let producto = new Producto({nombre:body.nombre,
                             categoria:body.categoria});

Categoria.findOne({nombre:body.categoria},(error,categoriaDb)=>{

  if(error){return res.status(400).json({ok:false,
                                  message:error})}

  if(!categoriaDb){return res.status(404).json({ok:false,
                                         message:'Category does not exist'})}

  categoriaDb.productos.push(producto);

  categoriaDb.save((error,categoriaActualizada)=>{

    if(error){return res.status(500).json({ok:false,
                                    message:error})}

      res.json({ok:true,
                categoriaActualizada,
                producto})

      })})})


app.put('/producto',(req,res)=>{

Categoria.find({})
         .exec(async(error,categoriasDb)=>{

  if(error){return res.status(500).json({ok:false,
                                         message:error})}

  let categoria = await categoriasDb.find((categoria)=>{

   return categoria.productos[0].nombre === req.body.nombre});


  let producto = await categoria.productos.find((producto)=>{

     producto = categoria.productos[0].nombre === nombreProducto;

     return producto
   })

   categoriasDb.save((error,productoModificado)=>{

     res.json({ok:true,
               productoModificado:producto})})})

  })


module.exports= app;
