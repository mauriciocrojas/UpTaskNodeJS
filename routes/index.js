const express = require("express");
const router = express.Router();

//importamos express validator
const {body} = require("express-validator/check");

//importamos el controlador
const proyectosController = require ("../controllers/proyectosController");
const tareasController = require ("../controllers/tareasController");
const usuariosController = require ("../controllers/usuariosController");


module.exports = function(){
      //ruta para el home
      router.get("/", proyectosController.proyectosHome);
      router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
      router.post("/nuevo-proyecto/", 
            body("nombre").not().isEmpty().trim().escape(),
            proyectosController.nuevoProyecto);

      //Listar proyectos
      router.get("/proyectos/:url", proyectosController.proyectoPorUrl);

      //Actualizar el Proyecto
      router.get("/proyecto/editar/:id", proyectosController.formularioEditar);
      router.post("/nuevo-proyecto/:id", 
            body("nombre").not().isEmpty().trim().escape(),
            proyectosController.actualizarProyecto);

      //Eliminar Proyecto
      router.delete("/proyectos/:url", proyectosController.eliminarProyecto);

      //Tareas
      router.post("/proyectos/:url", tareasController.agregarTarea);

      //Actualizar Tarea
      router.patch("/tareas/:id", tareasController.cambiarEstadoTarea);

      //Eliminar Tarea
      router.delete("/tareas/:id", tareasController.eliminarTarea);

      //Crear cuenta nueva
      router.get("/crear-cuenta", usuariosController.formCrearCuenta);
      router.post("/crear-cuenta", usuariosController.crearCuenta);

      return router;
}
