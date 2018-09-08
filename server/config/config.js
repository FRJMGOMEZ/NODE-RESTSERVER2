//////////////// PUERTO ////////////////
process.env.PORT = process.env.PORT|| 3000;


//////////////// ENVIROMENT /////////////
process.env.NODE_ENV = process.env.NODE_ENV || 'desarollo';


/////////////// BASE DE DATOS /////////////
let urlDataBase;

if(process.env.NODE_ENV === 'desarollo'){urlDataBase = 'mongodb://localhost:27017/cafe' }

else{urlDataBase = process.env.MONGO_URI};

process.env.URLDB = urlDataBase;


////////////// VENCIMIENTO DEL TOKEN //////////////
process.env.CADUCIDAD_TOKEN = '48h';


/////////////// SEED SECRETO //////////////////////
process.env.SEED = process.env.SEED || 'seed_desarrollo';


///////////// GOOGLE-CLIENT ID//////////////////////

process.env.CLIENT_ID = process.env.CLIENT_ID || '722636808179-vldk0api42iur7p31ld9pdafanftekmn.apps.googleusercontent.com';
