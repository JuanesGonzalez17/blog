//modelo para la colección producto
//destructuring de la clase mongoose --solo traigo los métodos que me importan
const { Schema, model, Collection } = require("mongoose");

//creamos el schema

const comentarioSchema = Schema(
  {
    usuario: {
      type: String,
      required: true,
    },
    entrada: {
      type: String,
      required: true,
    },
    detalle: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
    },
    dislike: {
      type: Number,
    },
  },
  {
    Collection: "comentario",
  }
);
module.exports = model("Comentario", comentarioSchema);
