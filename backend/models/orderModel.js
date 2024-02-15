const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Cancelado",
        "Devolución",
        "Enviado",
        "En proceso",
        "Pendiente",
        "Rechazado por proveedor",
      ],
      default: "Pendiente",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    adviser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    marketplace: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Marketplace",
    },
    marketplaceComission: {
      type: Number,
    },
    parcel: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Parcel",
    },
    shippingGuide: {
      url: {
        type: String,
      },
      filename: {
        type: String,
      },
    },
    deliveryNote: {
      url: {
        type: String,
      },
      filename: {
        type: String,
      },
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        discount: {
          type: Boolean,
          default: false,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    comments: {
      type: String,
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

module.exports = Order = mongoose.model("Order", orderSchema);
