//modelo para la colección producto
//destructuring de la clase mongoose --solo traigo los métodos que me importan
const { Schema, model, Collection } = require("mongoose");

//creamos el schema

const usuarioSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    foto: {
      type: String,
      default: 'image.jpg',
    },
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    fechaNace: {
      type: Date,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    esAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    Collection: "usuario",
  }
);
module.exports = model("Usuario", usuarioSchema);
