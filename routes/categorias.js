//rutas para consumir el módulo productos del SERVICIO ECOMMERCE
const express = require("express");
const router = express.Router();

//instanciamos el controlador correspondiente
const categoriaCtr = require("../controllers/categorias");

//rutas que entregará el modulo producto

router.get("/categoria/listartodos", categoriaCtr.listartodos);
router.post("/categoria/nuevo", categoriaCtr.agregarCategoria);
router.delete("/categoria/borrarporid/:id", categoriaCtr.borrarporid);
router.put("/categoria/editarporid/:id", categoriaCtr.actualizarporid);
router.put("/categoria/buscarporid/:id", categoriaCtr.buscarporid);

//....
module.exports = router;
