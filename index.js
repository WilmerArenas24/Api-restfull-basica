//Importar el framework express
const express = require("express");
const app = express();

//Obtener el modulo conexion.js
const mongoDB = require("./conexion");

//Configurar nuestra API para trabajar para el formato JSON
app.use(express.json());

//Definir methodo GET
app.get('/users', (pedido, respuesta) => {
    //Pedir listado users
    mongoDB.conexionDB()
        .then((conexion) => {
            const controlador = conexion.db().collection('users');
            controlador.find().toArray()
                .then((filas) => respuesta.send(filas))
                .catch((error) => respuesta.send(error))
        })
})

//Definir un methodo POST
app.post('/users/create', (pedido, respuesta) =>{
    mongoDB.conexionDB()
    .then((conexion) =>{
        const controlador = conexion.db().collection('users');
        controlador.insertOne(pedido.body)
        .then(respuesta.send('Nuevo usuario creado'))
        .catch((error) => respuesta.send(error));
    })
})








//Inicciar ell servidor en el puerto 3000
app.listen(3000, () => {
    console.log('servidor en linea')
});

