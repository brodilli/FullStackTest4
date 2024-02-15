const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userForgotPasswordSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    uniqueString: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    },
    changed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userForgotPasswordSchema.plugin(passportLocalMongoose);

module.exports = UserForgotPassword = mongoose.model(
  "UserForgotPassword",
  userForgotPasswordSchema
);
