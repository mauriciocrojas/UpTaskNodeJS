exports.proyectosHome = (req, res) =>{
    res.render("index", {
        nombrePagina: "Proyectos"
    });
}

exports.formularioProyecto = (req, res) =>{
    res.render("nuevoProyecto", {
        nombrePagina: "Nuevo Proyecto"
    });
}

exports.nuevoProyecto = (req, res) => {
    //Enviamos a la consola lo que el usuario escriba
    console.log(req.body);
}