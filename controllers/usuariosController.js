const Usuarios = require("../models/Usuarios");

exports.formCrearCuenta = (req, res) => {
    res.render("crearCuenta", {
        nombrePagina: "Crear Cuenta en UpTask"
    });
}

exports.crearCuenta = (req, res) => {

    //leer los datos
    const { email, password } = req.body;

    //crear el usuario
    Usuarios.create({
        email,
        password
    })
    .then(() => {
        res.redirect("/iniciar-sesion");
    })

}