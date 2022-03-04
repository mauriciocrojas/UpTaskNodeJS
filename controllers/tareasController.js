const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

exports.agregarTarea = async (req, res, next) => {
    //obtenemos el Proyecto actual
    const proyecto = await Proyectos.findOne({where: { url: req.params.url }});
    
    //leer el valor del input
    const {tarea} = req.body;

    //estado 0 = incompleto y ID del Proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    //Insertamos en la base de datos
    const resultado = await Tareas.create({tarea, estado, proyectoId});

    if(!resultado){
        return next;
    }

    //Redireccionamos
    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tareas.findOne({where: { id: id }});

    //cambiamos el estado
    let estado = 0;

    // Si el estado que viene es 0 significa que hay que cambiarlo
    if(tarea.estado === estado){
        estado = 1;
    }
    
    tarea.estado = estado;

    const resultado = await tarea.save();

    if(!resultado) return next;

    res.status(200).send("Actualizado");
}

exports.eliminarTarea = async (req, res) => {

    const { id } = req.params;

    //Eliminamos la tarea por ID
    const resultado = await Tareas.destroy({where : { id : id }});

    if(!resultado) return next();

    res.status(200).send("Tarea Eliminada Correctamente");
}