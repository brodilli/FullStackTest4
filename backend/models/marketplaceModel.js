const mongoose = require("mongoose");

const marketplaceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    desarrollo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Development",
    },
    para: {
      type: String,
      required: true,
    },
    apartado: {
      porcentaje: {
        type: String,
      },
      tiempoSiguiente: {
        type: Number,
      },
    },
    enganche: {
      porcentaje: {
        type: String,
      },
      tiempoSiguiente: {
        type: Number,
      },
    },
    mensualidades: {
      porcentaje: {
        type: Number,
      },
      cantidadMeses: {
        type: Number,
      },
      tiempoSiguiente: {
        type: Number,
      },
    },
    liquidacion: {
      porcentaje: {
        type: Number,
      },
    },

    descuento: {
      type: Number,
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Marketplace = mongoose.model("Marketplace", marketplaceSchema);
