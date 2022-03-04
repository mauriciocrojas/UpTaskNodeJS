const passport = require("passport");
const Usuarios = require("../models/Usuarios");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const crypto = require("crypto");
const bcrypt = require("bcrypt-nodejs");
const enviarEmail = require("../handlers/email");

//Autenticar el usuario
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

//Genera un token si el usuario es válido
exports.enviarToken = async (req, res) => {
    //Verificar que el usuario exista
    const {email} = req.body;
    const usuario = await Usuarios.findOne({where: { email } });

    //Si no existe el usuario
    if(!usuario){
        req.flash("error", "No existe esa cuenta");
        res.redirect("/restablecer");
    }

    //Usuario existe
    usuario.token = crypto.randomBytes(20).toString("hex");
    usuario.expiracion = Date.now() + 3600000;

    //guardarlos en la base de datos
    await usuario.save();

    //Url de reset
    const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`;

    //Envia el correo con el Token
    await enviarEmail.enviar({
        usuario,
        subject: "Password Reset",
        resetUrl,
        archivo: "restablecer-password"
    }); 

    //Terminamos flujo de restablecer
    req.flash("correcto", "Se envió un mensaje a tu correo");
    res.redirect("/iniciar-sesion");
}   

exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    })

    //Si no encuentra el usuario
    if(!usuario) {
        req.flash("error", "No válido");
        res.redirect("/restablecer");
    }


    //Formulario para generar el password
    res.render("resetPassword", {
        nombrePagina: "Restablecer Contraseña"
    })
}

//Cambia el password por uno nuevo
exports.actualizarPassword = async (req, res) => {

    //Verifica token válido y fecha de expiración
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte] : Date.now()
            }
        }
    });

    //Verificamos si el usuario existe
    if(!usuario){
        req.flash("error", "No válido");
        res.redirect("/restablecer");
    }

    //Hasheamos el nuevo password
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;


    //Guardamos el nuevo password
    await usuario.save();

    req.flash("correcto", "Tu password se ha modificado correctamente");
    res.redirect("/iniciar-sesion");
}