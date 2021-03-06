//importamos express dentro de esta variable
const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const { allowedNodeEnvironmentFlags } = require("process");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");

//importar valores de variables.env
require("dotenv").config({ path: "variables.env"});

//helpers con algunas funciones
const helpers = require("./helpers");

//Crar la conexión a la BD
const db = require("./config/db");

//Importar el modelo
require("./models/Proyectos");
require("./models/Tareas");
require("./models/Usuarios");

db.sync()
    .then(() => console.log("Conectado al Servidor"))
    .catch((error) => console.log(error))

//creamos un app de express
const app = express();

//Donde cargar archivos estáticos
app.use(express.static("public"));

//habilitamos Pug
app.set("view engine", "pug");

//Habilitamos bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

//Añadimos carpeta de vistas
app.set("views", path.join(__dirname, "./views"));

//agregamos flash messages
app.use(flash());

app.use(cookieParser());

//Sessiones nos permiten navegar entre distintas páginas sin volvernos a autenticar
app.use(session({
    secret: "supersecreto",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//pasar vardump a la app
app.use((req, res, next) =>{
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    console.log(res.locals.usuario);
    next();
})

app.use("/", routes());


//Servidor y Puerto
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;


//puerto donde correrá
app.listen(port, host, () => {
    console.log("El servidor está funcionando");
});


//require("./handlers/email");