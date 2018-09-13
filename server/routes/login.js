const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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
  })})



async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken:token,
      audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();

  return {nombre:payload.name,
          email:payload.email,
          img:payload.picture,
          google:true}


  // If request specified a G Suite domain:
  //const domain = payload['hd'];
}


app.post('/google', async(req,res)=>{

  let token = req.body.idtoken;

  let googleUser = await verify(token)
      .catch(error=>{return res.status(403).json({ok:false,
                                                  error})});

  Usuario.findOne({email:googleUser.email},(error,usuarioDb)=>{

    if(error){return res.status(500).json({ok:false,
                                    message:error})}
    if(usuarioDb){

       if(usuarioDb.google === false){return res.status(500).json({ok:false,
                                                                   message:'Debe de usar su autenticación normal'})}

       else{  let token = jwt.sign({usuario:usuarioDb},process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN});

              return res.status(200).json({ok:true,
                                           usuario:usuarioDb,
                                           token,
                                           message:'Token actualizado correctamente'})}}

    else{ let usuario = new Usuario();

          usuario.nombre = googleUser.nombre;
          usuario.email = googleUser.email;
          usuario.img = googleUser.img;
          usuario.google = true;
          usuario.password = ':)';

          usuario.save((error,usuarioGrabado)=>{

            if(error){return res.status(500).json({ok:false,
                                            message:error})}

            let token = jwt.sign({usuario:usuarioGrabado},process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN});

            return res.status(200).json({ok:true,
                                         usuario:usuarioGrabado,
                                         token,
                                         message:'Usuario registrado correctamente'})})}})})


module.exports = app;
