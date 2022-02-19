const Usuarios = require("../models/Usuarios");

exports.formCrearCuenta = (req, res) => {
    res.render("crearCuenta", {
        nombrePagina: "Crear Cuenta en UpTask"
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
        res.render("crearCuenta", {
            errores: error.errors,
            nombrePagina: "Crear Cuenta en UpTask"
        });
    }
}