const jwt = require('jsonwebtoken');


/////////////// VERIFY TOKEN ////////////////

let verifyToken = (req,res,next) => {

let token = req.get('token');

  jwt.verify(token,process.env.SEED,(error,usuarioDecoded)=>{

    if(error){return res.status(401).json({ok:false,
                                           error:'Token no válido'})}
    req.usuario = usuarioDecoded;

    next()})}


///////////////// VERIFY ADMIN ROLE ///////////////

let verifyRole = (req,res,next)=>{

  if(req.usuario.usuario.role !== 'ADMIN_ROLE') {return res.status(401).json({ok:false,
                                                                   error:'Unauthorized role'})}
  next()}



////////////// VERIFY TOKEN IMG ///////////////////////

let verifyTokenImg = (req,res,next) => {

let token = req.query.token;

  jwt.verify(token,process.env.SEED,(error,usuarioDecoded)=>{

    if(error){return res.status(401).json({ok:false,
                                           error:'Token no válido'})}
    req.usuario = usuarioDecoded;

    next()})}


module.exports = {verifyToken,verifyRole,verifyTokenImg};
