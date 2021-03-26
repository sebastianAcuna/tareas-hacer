const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name:`${'1'.green}. Crear Tarea`,
            },
            {
                value: '2',
                name:`${'2'.green}. Listar tareas`
            },
            {
                value: '3',
                name:`${'3'.green}. Listar tareas completadas`
            },
            {
                value: '4',
                name:`${'4'.green}. Listar tareas pendientes`
            },
            {
                value: '5',
                name:`${'5'.green}. Completar tarea(s)`
            },
            {
                value: '6',
                name:`${'6'.green}. Borrar tarea`
            },
            {
                value: '0',
                name:`${'0'.green}. Salir`
            },
        ]
    }
]


const pausas= [
    {
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} para continuar:`,
        choices: [ '' ]
    }
]


const inquirerMenu = async() => {
    // console.clear();
    console.log("=======================".green);
    console.log("Seleccione una opcion ".green);
    console.log("=======================\n".green);



    const {opcion} = await inquirer.prompt(menuOpts)

    return opcion;
}


const menuListadoTareas = async( data = [] ) => {


    const menuOpts = [
        {
            type: 'list',
            name: 'opcion',
            message: 'Eliminar Tarea',
            choices: data
        }     
    ]

    const {opcion} = await inquirer.prompt(menuOpts);

    return opcion;
}



const mostrarListadoCheckList = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) =>{
        const idx = `${i + 1}`.green;

        return {
            value:tarea.id,
            name:`${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn)
        }
    })

    const menuOpts = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }     
    ]

    const {ids} = await inquirer.prompt(menuOpts);

    return ids;
}


const confirmar =  async (message) => {

    const question = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);


    return ok;
}



const pausa = async() => {

    console.log("\n");
    const {enter} = await inquirer.prompt(pausas)

    return enter;
}


const leerInput = async( message ) =>{
    const question = [
       {
        type: 'input',
        name : 'desc',
        message,
        validate( value ){
            if( value.length === 0) {
                return 'Por favor ingrese un valor';
            }

            return true;
        }
       }
    ];


    const { desc } = await inquirer.prompt( question );

    return desc;
}



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    menuListadoTareas,
    confirmar,
    mostrarListadoCheckList
}