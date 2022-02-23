const Usuarios = require("../models/Usuarios");

exports.formCrearCuenta = (req, res) => {
    res.render("crearCuenta", {
        nombrePagina: "Crear Cuenta en UpTask"
    });
}


// Es el que dibuja la vista en el navegador
exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render("iniciarSesion", {
        nombrePagina: "Iniciar Sesion en UpTask",
        error: error
    });
}

exports.crearCuenta = async (req, res) => {

    //leer los datos
    const { email, password } = req.body;

    try {
        //crear el usuario
        await Usuarios.create({
              email,
              password
        });
        res.redirect("/iniciar-sesion");
    } catch (error){
        req.flash("error", error.errors.map(error => error.message));
        res.render("crearCuenta", {
            mensajes: req.flash(),
            nombrePagina: "Crear Cuenta en UpTask",
            email : email,
            password : password
        });
    }
}