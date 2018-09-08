const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

let productoSchema = new Schema({

  nombre:  {type:String,
            required:[true,'Name is required'],
            unique:true},
  categoria:{type:String,
             required:[true,'Category is required']} });


productoSchema.plugin(uniqueValidator,{message: '{PATH} debe de ser único'});

module.exports = mongoose.model('Producto',productoSchema);
