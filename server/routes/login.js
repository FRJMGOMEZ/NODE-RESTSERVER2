const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const app = express();


app.post('/login',(req,res)=>{

let body = req.body;

  Usuario.findOne({email:body.email},(error,usuarioDb)=>{

   if(error){res.status(400).json({ok:false,
                                   message:error})}

   if(!usuarioDb){return res.status(500).json({ok:false,
                                               message:'User has not been found'})}

  if(!bcrypt.compareSync(body.password,usuarioDb.password)){return res.status(500).json({ok:false,
                                                                                         message:'Password is not correct'})}

  let token = jwt.sign({usuario:usuarioDb},process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN})
  res.json({ok:true,
            usuario:usuarioDb,
            token})
  })
})


module.exports = app;
