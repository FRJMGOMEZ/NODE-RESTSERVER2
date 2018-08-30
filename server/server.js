require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.get('/',(req,res)=>{

res.json('Hola a todos')

})


app.post('/usuario',(req,res)=>{

let body = req.body;

if(body.nombre === undefined){
res.status(400).json({ok:false,
                    message:'El nombre es necesario'})}

res.json({body})})



app.put('/usuario/:id',(req,res)=>{

let id = req.params.id

res.json({id,
          nombre:'Pancho'})

})

app.delete('/',(req,res)=>{

res.json('Hola a todos')})

app.listen(process.env.PORT, ()=>{console.log(`Escuchando en el puerto ${process.env.PORT}`)})
