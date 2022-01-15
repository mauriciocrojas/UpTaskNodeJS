//importamos express dentro de esta variable
const express = require("express");
const routes = require("./routes");

//creamos un app de express
const app = express();
app.use("/", routes());

//puerto donde correrá express
app.listen(3000);