const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {values:['ADMIN_ROLE','USER_ROLE'],
                    message:'{VALUE} iS not a valid role'};

let usuarioSchema = new Schema({

nombre:  {type:String,
          required:[true,'Name is required']},

email:   {type:String,
          required:[true,'Email is required'],
          unique:[true,'This password already exist']},

password:{type:String,
          required:[true,'Password is required']},

img:     {type:String},

role:    {type:String,
          default:'USER_ROLE',
          required:[true,'Role is required'],
          enum:rolesValidos},

estado:  {type:Boolean,
          required:[true,'Status is required'],
          default:true},

google:  {type:Boolean,
          default:false}
});


usuarioSchema.methods.toJSON = function() {

  let user = this;

  let userObject = user.toObject();

  delete userObject.password;

  return userObject;}


usuarioSchema.plugin(uniqueValidator,{message: '{PATH} debe de ser único'});

module.exports = mongoose.model('Usuario',usuarioSchema);
