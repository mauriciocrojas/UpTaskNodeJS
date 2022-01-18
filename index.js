//importamos express dentro de esta variable
const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const { allowedNodeEnvironmentFlags } = require("process");

//Crar la conexión a la BD
const db = require("./config/db");

//Importar el modelo
require("./models/Proyectos");

db.sync()
    .then(() => console.log("Conectado al Servidor"))
    .catch((error) => console.log(error))

//creamos un app de express
const app = express();

//Donde cargar archivos estáticos
app.use(express.static("public"));

//habilitamos Pug
app.set("view engine", "pug");

//Añadimos carpeta de vistas
app.set("views", path.join(__dirname, "./views"));

//Habilitamos bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", routes());

//puerto donde correrá express
app.listen(3000);
