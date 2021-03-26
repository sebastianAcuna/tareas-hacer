const Tarea = require("./tarea");


class Tareas{

    _listado = {}; // se puede definir directamente en el contructor

    constructor(){
        this._listado = {};
    }


    cargarTareasFromArray( tareas = []) {

        tareas.forEach( (el) => {
            this._listado[el.id] = el;
        })

    }


    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }


    get listadoArr(){
        const listado = [];

        // devuelve un array con todas las llaves de un objeto
        // Object.keys(this._listado).forEach( key => {
        //     const tarea  = this._listado[key];
        //     listado.push(tarea);
        // });

        Object.keys(this._listado).forEach( key => listado.push(this._listado[key]))

        return listado;
    }


    listadoCompleto( ){

        this.listadoArr.forEach((elemento, i) => {
            let estCompletado = (elemento.completadoEn != null) ? "Completada".green : "Pendiente".red;
            let conteoMostrar = `${i + 1}`.green;
            console.log(`${conteoMostrar}. ${elemento.desc}  :::: ${estCompletado}`);
        });
    }



    generaListaConsola(){
        const listado = [];
        this.listadoArr.forEach((elemento, i) => {

            let estCompletado = (elemento.completadoEn != null) ? "Completada".green : "Pendiente".red;

            let conteoMostrar = `${i + 1}`.green;

            listado.push({
                value: elemento.id,
                name: `${conteoMostrar}. ${elemento.desc}  :::: ${estCompletado}`,
            })
        });

        listado.unshift({ value:'0', name:`${'0'.green}. Cancelar.`})

        return listado;
    }

    
    listadoCompletadas( completadas = true ){


        var cont = 0;
        this.listadoArr.forEach((elemento, i) => {

            let estCompletado = (elemento.completadoEn != null) ? elemento.completadoEn.green : "Pendiente".red;

           

            // listado.push({
            //     value: elemento.id,
            //     name: `${conteoMostrar}. ${elemento.desc}  :::: ${estCompletado}`,
            // })

            if(completadas && elemento.completadoEn != null){
                let conteoMostrar = `${cont+= 1}`.green;
                console.log(`${conteoMostrar}. ${elemento.desc}  :::: ${estCompletado}`);
            }else if(!completadas && elemento.completadoEn == null){
                let conteoMostrar = `${cont+= 1}`.green;
                console.log(`${conteoMostrar}. ${elemento.desc}  :::: ${estCompletado}`);
            }

        

        });
    
    }


    crearTarea( desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }


    toggleCompletadas(ids = []){


        ids.forEach( id => {

            const tarea  = this._listado[id];

            if( !tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }

        });


        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });


    }



}

module.exports = Tareas;