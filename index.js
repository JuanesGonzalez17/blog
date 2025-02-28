//librerias base
const express = require("express");
const app = express();
const cors = require("cors");
//middleware de la app
app.use(cors());
app.use(express.json());
//llamamos la librería de conexión
const conexion = require("./models/bd_conexion");
conexion();
//rutas globales de la app
const usuarioRta = require("./routes/usuarios");
const comentarioRta = require("./routes/comentarios");
const entradaRta = require("./routes/entradas");
const categoriaRta = require("./routes/categorias");
//usamos las rutas
app.use("/api", usuarioRta);
app.use("/api", comentarioRta);
app.use("/api", entradaRta);
app.use("/api", categoriaRta);
app.listen(4000, () => {
  console.log(`listen ${4000}`);
});
