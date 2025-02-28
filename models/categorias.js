//modelo para la colección producto
//destructuring de la clase mongoose --solo traigo los métodos que me importan
const { Schema, model, Collection } = require("mongoose");

//creamos el schema

const categoriaSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
  },
  {
    Collection: "categoria",
  }
);
module.exports = model("Categoria", categoriaSchema);
