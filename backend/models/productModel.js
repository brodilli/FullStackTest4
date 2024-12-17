const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
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
    image: {
      url: {
        type: String,
      },
      filename: {
        type: String,
      },
    },
    type: {
      type: String,
      enum: ["Tubo", "Varilla"],
      default: "Tubo",
      required: true,
    },
    appearance: {
      type: String,
      enum: ["Color", "Transparente"],
      default: "Color",
      required: true,
    },
    category: {
      type: String,
      enum: ["Economico", "Premiun"],
      default: "Economico",
      required: true,
    },
    diameter: {
      type: Number,
      required: true,
    },
    thickness: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
      default: 1.5,
    },
    initialQuantity: {
      type: Number,
      required: true,
    },
    piecesPerBox: {
      type: Number,
      required: true,
    },
    weightPerBox: {
      type: Number,
      required: true,
    },
    tubeQuantityPerBox: {
      type: Number,
      required: true,
    },
    minimumQuantity: {
      type: Number,
      required: true,
    },
    unitOfMeasure: {
      type: String,
      enum: ["Kg", "Pieza"],
      required: true,
      default: "Pieza",
    },
    code: {
      type: String,
      required: true,
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

module.exports = Product = mongoose.model("Product", productSchema);
