//importamos express dentro de esta variable
const express = require("express");
const routes = require("./routes");
const path = require("path");

//creamos un app de express
const app = express();

//habilitamos Pug
app.set("view engine", "pug");

//Añadimos carpeta de vistas
app.set("views", path.join(__dirname, "./views"));

app.use("/", routes());

//puerto donde correrá express
app.listen(3000);
