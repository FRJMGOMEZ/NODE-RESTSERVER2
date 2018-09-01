//////////////// PUERTO ////////////////

process.env.PORT = process.env.PORT|| 3000;



//////////////// ENVIROMENT /////////////

process.env.NODE_ENV = process.env.NODE_ENV || 'desarollo';


/////////////// BASE DE DATOS /////////////



let urlDataBase;

if(process.env.NODE_ENV === 'desarollo'){urlDataBase = 'mongodb://localhost:27017/cafe' }

else{urlDataBase = process.env.MONGO_URI};


process.env.URLDB = urlDataBase;
