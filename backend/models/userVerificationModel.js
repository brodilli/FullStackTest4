const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userVerificationSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    dwp: {
      type: Boolean,
    },
    userType: {
      type: String,
      enum: ["Collector", "Artist", "Admin24685"],
      default: "Collector",
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
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userVerificationSchema.plugin(passportLocalMongoose);

module.exports = UserVerification = mongoose.model(
  "UserVerification",
  userVerificationSchema
);
