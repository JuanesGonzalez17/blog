//instanciamos la capa modelo correspondiente
let Usuario = require("../models/usuarios");
let bcryptjs = require("bcryptjs");
let jwt = require("jsonwebtoken");
//métodos de la librería - métodos de la clase
const listartodos = async (req, res) => {
  try {
    //consultar todos sin filtro
    let listaUsuarios = await Usuario.find().exec();
    res.status(200).send({
      exito: true,
      listaUsuarios,
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
    let consulta = await Usuario.findById(id).exec();
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
const registro = async (req, res) => {
  let datos = {
    nombre: req.body.nombre,
    foto: req.body.foto,
    email: req.body.email,
    passwordHash: bcryptjs.hashSync(req.body.passwordHash, 10),
    fechaNace: req.body.fechaNace,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
  };
  const usuarioexiste = await Usuario.findOne({ email: datos.email });

  if (usuarioexiste) {
    return res.send({
      estado: false,
      mensaje: "el usuario ya existe en el sistema",
    });
  }

  try {
    const usuarionuevo = new Usuario(datos);
    await usuarionuevo.save();
    return res.send({
      estado: true,
      mensaje: "usuario creado exitosamente",
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `error ${error}`,
    });
  }
};
const editar = async (req, res) => {
  //recibe el parámetro de la consulta
  let id = req.params.id;
  let datos = {
    nombre: req.body.nombre,
    foto: req.body.foto,
    email: req.body.email,
    fechaNace: req.body.fechaNace,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
  };

  const usuarioexiste = await Usuario.findOne({ email: datos.email });

  if (usuarioexiste) {
    return res.send({
      estado: false,
      mensaje: "el correo ya se encuentra registrado a otro usuario",
    });
  }

  try {
    let consulta = await Usuario.findByIdAndUpdate(id, datos);
    return res.send({
      estado: true,
      mensaje: "usuario editado exitosamente",
      consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `error ${error}`,
    });
  }
};

const login = async (req, res) => {
  let usuarioexiste = await Usuario.findOne({ email: req.body.email });

  if (!usuarioexiste) {
    return res.send({
      estado: false,
      mensaje: "No existe el usuario en la base de datos.",
    });
  }

  if (bcryptjs.compareSync(req.body.clave, usuarioexiste.passwordHash)) {
    //Autenticación de 2 factores con generación de token
    const token = jwt.sign(
      {
        //datos a codificar en el token
        userId: usuarioexiste._id,
        isAdmin: usuarioexiste.esAdmin,
      },
      //salt de la codificada o hashing o encriptado
      "seCreTo",
      {
        //vida util del token
        expiresIn: "4h",
      }
    );
    return res.send({
      estado: true,
      mensaje: "Ingreso exitoso al sistema.",
      usuario: usuarioexiste._id,
      isAdmin: usuarioexiste.esAdmin,
      token,
    });
  } else {
    return res.send({
      estado: false,
      mensaje: "Credenciales erróneas, intente de nuevo.",
    });
  }
};
module.exports = { listartodos, buscarporid, registro, editar, login };
