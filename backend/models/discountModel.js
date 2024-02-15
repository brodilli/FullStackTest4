const mongoose = require("mongoose");

const discountSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    discountType: {
      type: String,
      enum: ["Percentage", "Amount", "FreeShipping"],
    },
    quantity: {
      type: Number,
    },
    code: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    active: {
      type: Boolean,
    },
    redeemed: {
      type: Number,
      default: 0,
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

module.exports = Discount = mongoose.model("Discount", discountSchema);
