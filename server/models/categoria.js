const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

let categoriaSchema = new Schema({

  nombre:    {type:String,
              required:[true,'Name is required'],
              unique:true},

  productos: [{type:Schema.Types.ObjectId,ref:'Producto'}],

  usuario:   {type:Schema.Types.ObjectId,ref:'Usuario', required:true},

  descripcion: {type:String,
                required:true}       })


categoriaSchema.plugin(uniqueValidator,{message: '{PATH} debe de ser único'});

module.exports = mongoose.model('Categoria',categoriaSchema);
