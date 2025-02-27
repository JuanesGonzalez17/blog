//instanciamos la capa modelo correspondiente
let Comentario = require("../models/comentarios");
let bcryptjs = require("bcryptjs");
//métodos de la librería - métodos de la clase
const listartodos = async (req, res) => {
  try {
    //consultar todos sin filtro
    let listaComentarios = await Comentario.find().exec();
    res.status(200).send({
      exito: true,
      listaComentarios,
    });
  } catch (error) {
    res.status(500).send({
      exito: false,
      mensaje: `Ha ocurrido un error en la consulta: ${error}`,
    });
  }
};

const agregarComentario = async (req, res) => {
  let datos = {
    usuario: req.body.usuario,
    entrada: req.body.entrada,
    detalle: req.body.detalle,
  };

  try {
    const comentarionuevo = new Comentario(datos);
    await comentarionuevo.save();
    return res.send({
      estado: true,
      mensaje: "comentario agregado exitosamente",
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `error ${error}`,
    });
  }
};

module.exports = { listartodos, agregarComentario};
