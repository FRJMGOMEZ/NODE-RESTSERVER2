//////////////// PUERTO ////////////////

process.env.PORT = process.env.PORT|| 3000;



//////////////// ENVIROMENT /////////////

process.env.NODE_ENV = process.env.NODE_ENV || 'desarollo';


/////////////// BASE DE DATOS /////////////



let urlDataBase;

if(process.env.NODE_ENV === 'desarollo'){urlDataBase = 'mongodb://localhost:27017/cafe' }

else{urlDataBase = `mongodb://cafeuser:Gondorgenwein123@ds241012.mlab.com:41012/cafe`};


process.env.URLDB = urlDataBase;
