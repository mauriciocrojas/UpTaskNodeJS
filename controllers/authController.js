const passport = require("passport");

exports.autenticarUsuario = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/iniciar-sesion",
    failureFlash: true,
    badRequestMessage: "Ambos campos son obligatorios"
});


//Función para revisar el si el usuario está logueado o no
exports.usuarioAutenticado = (req, res, next) => {

    //Si el usuario está autenticado, adelante
    if(req.isAuthenticated()){
        return next();
    }

    //Si no está autenticado, redirigir al formulario
    return res.redirect("/iniciar-sesion");
}

//Función para Cerrar Sesión
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/iniciar-sesion"); //al cerrar sesión nos lleva al login
    })
}