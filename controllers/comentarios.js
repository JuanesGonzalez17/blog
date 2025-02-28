//instanciamos la capa modelo correspondiente
let Comentario = require("../models/comentarios");
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
//actualizar de acuerdo al id del producto
const actualizarporid = async (req, res) => {
  //recibe el parámetro de la consulta
  let id = req.params.id;
  //llega el objeto en el body del request (payload)
  let datos = {
    usuario: req.body.usuario,
    entrada: req.body.entrada,
    detalle: req.body.detalle,
  };
  try {
    let consulta = await Comentario.findByIdAndUpdate(id, datos).exec(); //escribe en mongo
    return res.send({
      estado: true,
      mensaje: "Actualización exitosa!",
      consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Ha ocurrido un error en la consulta: ${error}`,
    });
  }
};
const like = async (req, res) => {
  //recibe el parámetro de la consulta
  let id = req.params.id;
  let datosActuales = await Comentario.findById(id);
  let likes = datosActuales.like;
  //llega el objeto en el body del request (payload)
  let datos = {
    like: likes+1,
  };
  try {
    let consulta = await Comentario.findByIdAndUpdate(id, datos).exec(); //escribe en mongo
    return res.send({
      estado: true,
      mensaje: "Actualización exitosa!",
      consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Ha ocurrido un error en la consulta: ${error}`,
    });
  }
};
const dislike = async (req, res) => {
  //recibe el parámetro de la consulta
  let id = req.params.id;
  let datosActuales = await Comentario.findById(id);
  let dislikes = datosActuales.dislike;
  //llega el objeto en el body del request (payload)
  let datos = {
    dislike: dislikes+1,
  };
  try {
    let consulta = await Comentario.findByIdAndUpdate(id, datos).exec(); //escribe en mongo
    return res.send({
      estado: true,
      mensaje: "Actualización exitosa!",
      consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Ha ocurrido un error en la consulta: ${error}`,
    });
  }
};
//borrar de acuerdo al id
const borrarporid = async (req, res) => {
  //recibimos el parámetro
  let id = req.params.id;
  try {
    //logica de buscar y eliminar el registro
    let consulta = await Comentario.findByIdAndDelete(id).exec();
    return res.send({
      estado: true,
      mensaje: "Eliminación exitosa!",
      consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Ha ocurrido un error en la consulta: ${error}`,
    });
  }
};
module.exports = { listartodos, agregarComentario, actualizarporid, like, dislike, borrarporid};
