const mongoose = require("mongoose");

const lookupSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    code: {
      type: String,
      unique: true,
      required: true,
    },
    meaning: {
      type: String,
      required: true,
    },
    isAttributeGroup: {
      type: Boolean,
      required: true,
      default: false,
    },
    attribeGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lookup",
    },
    description: {
      type: String,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Lookup = mongoose.model("Lookup", lookupSchema);
