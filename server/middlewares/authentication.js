const jwt = require('jsonwebtoken');


/////////////// VERIFY TOKEN ////////////////


let verifyToken = (req,res,next) => {

let token = req.get('token');

  jwt.verify(token,process.env.SEED,(error,usuarioDecoded)=>{

    if(error){return res.status(401).json({ok:false,
                                           error:'Token no válido'})}
    req.usuario = usuarioDecoded.usuario;

    next()})}


    
///////////////// VERIFY ADMIN ROLE ///////////////

let verifyRole = (req,res,next)=>{

  if(req.usuario.role !== 'ADMIN_ROLE') {return res.status(401).json({ok:false,
                                                                   error:'Unauthorized role'})}
  next()}


module.exports = {verifyToken,verifyRole};
