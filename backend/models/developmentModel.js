const mongoose = require("mongoose");

const developmentsSchema = mongoose.Schema(
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
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    images: [
      {
        url: {
          type: String,
        },
        filename: {
          type: String,
        },
      },
    ],
    fiscalAddress: {
      address: { type: String },
      district: { type: String },
      postalCode: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
    levels: {
      type: Number,
    },
    description: {
      type: String,
    },
    amenities: {
      type: String,
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

module.exports = Development = mongoose.model(
  "Development",
  developmentsSchema
);
