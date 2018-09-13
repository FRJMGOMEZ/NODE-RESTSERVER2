const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const {verifyToken} = require('../middlewares/authentication');
const {verifyRole} = require('../middlewares/authentication');
const {categorizacion} = require('../middlewares/categorizacion');

const app = express();



app.post('/producto',categorizacion,verifyToken,(req,res)=>{

  let body = req.body;

  let producto = new Producto({nombre:      body.nombre,
                               precioUni:   body.precioUni,
                               descripcion: body.descripcion,
                               disponible:  body.disponible,
                               categoria:   req.categoria,
                               usuario:     req.usuario.usuario,
                               img:         body.img})

  producto.save(async(error,productoGuardado)=>{

    if(error){return res.status(500).json({ok:false,

                                    message:error})}

  let categoria = await Categoria.findOne({_id:productoGuardado.categoria},(error,categoria)=>{

      if(error){ return res.status(500).json({ok:false,
                                              message:error})}
      return  new Categoria(categoria)});


  categoria.productos.push(productoGuardado._id);

  categoria.save((error,categoriaActualizada)=>{

    if(error){ return res.status(500).json({ok:false,
                                            message:error})}
      res.json({ok:true,
               categoriaActualizada,
               productoGuardado})})})})




app.get('/producto',(req,res)=>{

  let nombreProducto = req.query.producto;

  if(nombreProducto){

  Producto.find({nombre:nombreProducto})
          .populate('usuario','nombre')
          .populate('categoria','nombre')
          .exec((error,productoDb)=>{

    if(error){res.status(500).json({ok:false,
                                    message:error})}
    if(!productoDb){res.status(400).json({ok:false,
                                          message:'No se encontró el producto'})}
    res.json({ok:true,
              producto:productoDb})})}

  else{
    Producto.find({})
            .exec((error,productosDb)=>{
    if(error){res.status(500).json({ok:false,
                                    message:error})}
    res.json({ok:true,
              producto:productosDb})})}})



app.put('/producto',(req,res)=>{

let nombreProducto = req.query.producto;

let body = req.body;

Producto.findOneAndUpdate({nombre:nombreProducto},body,{new:true},(error,productoActualizado)=>{

  if(error){return res.status(500).json({ok:false,
                                  message:error})}
  res.json({ok:true,
            productoActualizado})})})


app.delete('/producto',(req,res)=>{

let nombreProducto = req.query.producto;

Producto.findOneAndDelete({nombre:nombreProducto},(error,productoBorrado)=>{

  if(error){return res.status(500).json({ok:false,
                                  message:error})}

  res.json({ok:true,
            productoBorrado}) })})



module.exports = app;
