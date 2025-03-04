//instanciamos la capa modelo correspondiente
let Entrada = require("../models/entradas");
//métodos de la librería - métodos de la clase
const listartodos = async (req, res) => {
  try {
    //consultar todos sin filtro
    let listaEntradas = await Entrada.find().exec();
    res.status(200).send({
      exito: true,
      listaEntradas,
    });
  } catch (error) {
    res.status(500).send({
      exito: false,
      mensaje: `Ha ocurrido un error en la consulta: ${error}`,
    });
  }
};
//buscar por id o por otro parámetro
const buscarporid = async (req, res) => {
  //recibimos el parámetro por el cual debo buscar y eliminar
  let id = req.params.id;
  try {
    //logica de buscar y mostrar el resultado del query
    let consulta = await Entrada.findById(id).exec();
    return res.send({
      estado: true,
      consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Ha ocurrido un error en la consulta: ${error}`,
    });
  }
};
const agregarEntrada = async (req, res) => {
  let datos = {
    titulo: req.body.titulo,
    imagen: req.body.imagen,
    detalle: req.body.detalle,
    categoria_id: req.body.categoria_id,
  };

  try {
    const entradanueva = new Entrada(datos);
    await entradanueva.save();
    return res.send({
      estado: true,
      mensaje: "entrada agregada exitosamente",
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
    titulo: req.body.titulo,
    imagen: req.body.imagen,
    detalle: req.body.detalle,
    categoria_id: req.body.categoria_id,
  };
  try {
    let consulta = await Entrada.findByIdAndUpdate(id, datos).exec(); //escribe en mongo
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
    let consulta = await Entrada.findByIdAndDelete(id).exec();
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
module.exports = { listartodos, buscarporid, agregarEntrada, actualizarporid, borrarporid};
