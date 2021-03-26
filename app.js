// const { mostrarMenu, pausa } = require('./helpers/mensajes');
require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, menuListadoTareas,confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');





const main = async () =>{

    const tareas = new Tareas();

    const tareasDB = await leerDB();
    if(tareasDB){
        // establecer tareas     
        tareas.cargarTareasFromArray(tareasDB);      
    }

    let opt = '';
    do{
       opt = await  inquirerMenu();

       switch(opt){
           case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
               break;

            case '2':
                tareas.listadoCompleto();
               break;

            case '3':
                tareas.listadoCompletadas();
               break;
            case '4':
                tareas.listadoCompletadas(false);
               break;
            case '5': /*   */
               const ids = await  mostrarListadoCheckList(tareas.listadoArr);

               tareas.toggleCompletadas(ids)
               break;
            case '6':
               const id =  await menuListadoTareas(tareas.generaListaConsola());
    
               if (id !== '0'){
                    const ok = await confirmar('¿Esta seguro que desea borrar?');  
                    if(ok){
                        tareas.borrarTarea(id); console.log('Tarea borrada!.'); 
                    }
               }

               break;
       }

       guardarDB(tareas.listadoArr);

       if(opt !== '0') await pausa();
    }while(opt !== '0');
}


main();