const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    number: {
      type: String,
      required: true,
    },
    imageProperty: {
      url: {
        type: String,
      },
      filename: {
        type: String,
      },
    },
    architecturalPlaque: {
      url: {
        type: String,
      },
      filename: {
        type: String,
      },
    },
    floorPlan: {
      url: {
        type: String,
      },
      filename: {
        type: String,
      },
    },
    type: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    parkingLots: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
    },
    mt2: {
      type: Number,
    },
    terrace: {
      type: Number,
    },
    price: {
      type: Number,
      default: 0,
    },
    discountType: {
      type: String,
      enum: ["Percentage", "Amount"],
      default: "Percentage",
    },
    development: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Development",
    },
    discount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
    },
    onSale: {
      type: Boolean,
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
