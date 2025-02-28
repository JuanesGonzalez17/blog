//modelo para la colección producto
//destructuring de la clase mongoose --solo traigo los métodos que me importan
const { Schema, model, Collection } = require("mongoose");

//creamos el schema

const entradaSchema = Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      required: true,
    },
    detalle: {
      type: String,
      required: true,
    },
    categoria_id: {
      type: Number,
      default: 0,
    },
  },
  {
    Collection: "entrada",
  }
);
module.exports = model("Entrada", entradaSchema);
