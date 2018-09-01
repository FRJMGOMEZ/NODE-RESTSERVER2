const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();


app.get('/usuario',(req,res)=>{

  let desde = req.query.desde || 0 ;

  let limite = req.query.limite || 5;

  limite = Number(limite);

  desde = Number(desde);

  Usuario.find({estado:true},'nombre email role estado google img')
         .skip(desde)
         .limit(limite)
         .exec((error,usuarios)=>{
           if(error){return res.status(400).json({ok:false,
                                                  message:error})}

            Usuario.count({estado:true},(error,conteo)=>{

              res.json({ok:true,
                        usuarios,
                        conteo})
             })
          })
  })



app.post('/usuario',(req,res)=>{

let body = req.body;

let usuario = new Usuario({nombre:body.nombre,
                           email:body.email,
                           password:bcrypt.hashSync(body.password,10),
                           role:body.role});

usuario.save((error,usuarioDb)=>{

  if(error){return res.status(400).json({ok:false,
                                         message:error})}

  res.json({ok:true,
            usuario:usuarioDb})})
})




app.put('/usuario/:id',(req,res)=>{

let id = req.params.id

let body = _.pick(req.body,['nombre','email','img','role','estado']);

Usuario.findByIdAndUpdate(id,body,{new:true,
                                   runValidators:true},(error,usuarioDb)=>{

  if(error){return res.status(400).json({ok:false,
                                         message:error})}
  res.json({ok:true,
            usuario:usuarioDb})})
})




app.delete('/usuario/:id',(req,res)=>{

  let id = req.params.id;

  let cambiaObjeto = {estado:false};

  Usuario.findByIdAndUpdate(id,cambiaObjeto,{new:true},(error,usuarioBorrado)=>{

       if(usuarioBorrado === undefined){return res.status(400).json({ok:false,
                                                     message:'No se encontró el usuario'})}

       if(error){return res.status(400).json({ok:false,
                                              message:error})}
       res.json({ok:true,
                 usuario:usuarioBorrado})
  })
})




module.exports = app;
