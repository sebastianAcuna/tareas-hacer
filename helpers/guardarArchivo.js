const fs = require('fs');

const archivo = './db/data.json';



const guardarDB = ( data ) => fs.writeFileSync(archivo, JSON.stringify(data));

const leerDB = async ( ) => {
    if(!fs.existsSync(archivo)){
         return null;
    }


    // devuelve todo el contenido como string 
    const info = fs.readFileSync(archivo, {encoding:'utf-8'});

    // parsea a json
    const data = JSON.parse(info);
    return data;
}


module.exports = {
    guardarDB,
    leerDB
};