const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");
const Usuarios = require("../models/Usuarios");

exports.proyectosHome = async (req, res) =>{

    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where:{usuarioId}});

    res.render("index", {
        nombrePagina: "Proyectos",
        proyectos
    });
}

exports.formularioProyecto = async (req, res) =>{
    
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId : usuarioId}});

    res.render("nuevoProyecto", {
        nombrePagina: "Nuevo Proyecto",
        proyectos
    });
}

exports.nuevoProyecto = async (req, res) => {

    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId : usuarioId}});

    //Enviamos a la consola lo que el usuario escriba
    //console.log(req.body);

    //validamos que tengamos algo en el input
    const nombre = req.body.nombre;

    let errores = [];

    if(!nombre){
        errores.push({"texto": "Agrega nombre al Proyecto"});
    }

    //si hay errores
    if(errores.length>0){
        res.render("nuevoProyecto", {
            nombrePagina: "Nuevo Proyecto",
            errores,
            proyectos
        }) 
    } else {
        //sequelize ORM basado en promises
        //No hay errores
        // Insertar en la BD
        const usuarioId = res.locals.usuario.id;

        await Proyectos.create({nombre, usuarioId});
        res.redirect("/");
    }
}

exports.proyectoPorUrl = async (req, res, next) => {

    const usuarioId = res.locals.usuario.id;
    const proyectosPromise =  Proyectos.findAll({where: { usuarioId : usuarioId }});

    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId : usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    //Consultar tareas del Proyecto actual

    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        }
    });
    
    console.log(tareas);

    if(!proyecto) return next();

    //render a la vista
    res.render("tareas", {
        nombrePagina: "Tareas del Proyecto",
        proyecto,
        proyectos,
        tareas
    });
}

exports.formularioEditar = async (req, res) => {

    const usuarioId = res.locals.usuario.id;
    const proyectosPromise =  Proyectos.findAll({where: { usuarioId : usuarioId }});

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);


    //render a al vista
    res.render("nuevoProyecto", {
        nombrePagina: "Editar Proyecto",
        proyectos,
        proyecto
    });
}

exports.actualizarProyecto = async (req, res) => {
    
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise =  Proyectos.findAll({where: { usuarioId : usuarioId }});    
    //validamos que tengamos algo en el input
    const nombre = req.body.nombre;
    
    let errores = [];
    
    if(!nombre){
        errores.push({"texto": "Agrega nombre al Proyecto"});
    }
    
    //si hay errores en la BD
    if(errores.length>0){
        res.render("nuevoProyecto", {
            nombrePagina: "Nuevo Proyecto",
            errores,
            proyectos
        }) 
    } else {
        //No hay errores en la BD
        // Insertar en la BD    
        await Proyectos.update(
            {nombre: nombre},
            {where: {id: req.params.id}}
            );
        res.redirect("/");
    }
}


exports.eliminarProyecto = async (req, res, next) => {
    //req, query, o params
    //console.log(req.query);
    const {urlProyecto} = req.query;
    const resultado = await Proyectos.destroy({where: {url : urlProyecto}});

    //Si no hay resultado por algún motivo, salteamos al siguiente middleware
    if(!resultado){
        return next();
    }

    res.status(200).send("Proyecto Eliminado Correctamente");
}