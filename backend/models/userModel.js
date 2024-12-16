const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      default: "",
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      lowercase: true,
      unique: true,
    },
    dwp: {
      type: Boolean,
    },
    userType: {
      type: String,
      enum: ["Guest", "Admin"],
      default: "Guest",
    },
    tradename: {
      type: String,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(passportLocalMongoose, { usernameQueryFields: ["email"] });

module.exports = User = mongoose.model("User", userSchema);
