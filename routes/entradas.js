//rutas para consumir el módulo productos del SERVICIO ECOMMERCE
const express = require("express");
const router = express.Router();

//instanciamos el controlador correspondiente
const entradaCtr = require("../controllers/entradas");

//rutas que entregará el modulo producto

router.get("/entrada/listartodos", entradaCtr.listartodos);
router.post("/entrada/nuevo", entradaCtr.agregarEntrada);
router.put("/entrada/editarporid/:id", entradaCtr.actualizarporid);
router.delete("/entrada/borrarporid/:id", entradaCtr.borrarporid);
router.get("/entrada/buscarporid/:id", entradaCtr.buscarporid);
//....
module.exports = router;
