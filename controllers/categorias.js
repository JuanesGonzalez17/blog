//instanciamos la capa modelo correspondiente
let Categoria = require("../models/categorias");
//métodos de la librería - métodos de la clase
const listartodos = async (req, res) => {
  try {
    //consultar todos sin filtro
    let listaCategorias = await Categoria.find().exec();
    res.status(200).send({
      exito: true,
      listaCategorias,
    });
  } catch (error) {
    res.status(500).send({
      exito: false,
      mensaje: `Ha ocurrido un error en la consulta: ${error}`,
    });
  }
};

const agregarCategoria = async (req, res) => {
  let datos = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  };

  try {
    const categorianueva = new Categoria(datos);
    await categorianueva.save();
    return res.send({
      estado: true,
      mensaje: "categoría agregada exitosamente",
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
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  };
  try {
    let consulta = await Categoria.findByIdAndUpdate(id, datos).exec(); //escribe en mongo
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
    let consulta = await Categoria.findByIdAndDelete(id).exec();
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
module.exports = { listartodos, agregarCategoria, actualizarporid, borrarporid};
