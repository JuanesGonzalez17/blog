//rutas para consumir el módulo productos del SERVICIO ECOMMERCE
const express = require("express");
const router = express.Router();

//instanciamos el controlador correspondiente
const comentarioCtr = require("../controllers/comentarios");

//rutas que entregará el modulo producto

router.get("/comentario/listartodos", comentarioCtr.listartodos);
router.post("/comentario/nuevo", comentarioCtr.agregarComentario);
router.put("/comentario/like/:id", comentarioCtr.like);
router.delete("/comentario/borrarporid/:id", comentarioCtr.borrarporid);
router.put("/comentario/dislike/:id", comentarioCtr.dislike);
router.put("/comentario/editarporid/:id", comentarioCtr.actualizarporid);

//....
module.exports = router;
