//modelo para la colección producto
//destructuring de la clase mongoose --solo traigo los métodos que me importan
const { Schema, model, Collection } = require("mongoose");

//creamos el schema

const comentarioSchema = Schema(
  {
    usuario_id: {
      type: String,
      required: true,
    },
    entrada_id: {
      type: String,
      required: true,
    },
    detalle: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now(),
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
  },
  {
    Collection: "comentario",
  }
);
module.exports = model("Comentario", comentarioSchema);
