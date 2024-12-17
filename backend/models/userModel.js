const { all } = require("express/lib/application");
const { status, type } = require("express/lib/response");
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
    billing: {
      taxId: { type: String }, // RFC
      businessName: { type: String }, // Razón Social
      fiscalAddress: {
        street: { type: String }, // Calle
        number: { type: String }, // Número
        neighborhood: { type: String }, // Colonia
        postalCode: { type: String }, // Código Postal
        city: { type: String }, // Ciudad
        state: { type: String }, // Estado
        country: { type: String } // País
      }
    },
    shippingAddress: {
      street: { type: String },       // Calle
      number: { type: String },       // Número
      neighborhood: { type: String }, // Colonia
      postalCode: { type: String },   // Código Postal
      city: { type: String },         // Ciudad
      state: { type: String },        // Estado
      country: { type: String }       // País
    },
    credit: {
      enabled: { type: Boolean, default: false },      // Habilitado
      creditLimit: { type: Number },                   // Límite de Crédito
      creditUsed: { type: Number, default: 0 }         // Crédito Usado
    },
    priceList: { type: mongoose.Schema.Types.ObjectId, ref: 'PriceList' }, // Lista de Precios
    paymentMethods: [
      { type: String, enum: ['Cash', 'Transfer', 'Credit Card'] }          // Métodos de Pago
    ],
    dwp: {
      type: Boolean,
    },
    userType: {
      type: String,
      enum: ["Client", "Admin", "Supplier"],
      default: "Guest",
    },
    tradename: {
      type: String,
      default: "",
    },
    allowPlusOne: {
      type: Boolean,
      default: false,
    },
    plusOne: {
      type: Boolean,
      default: false,
    },
    allergies: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Declined"],
      default: "Pending",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products:[{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(passportLocalMongoose, { usernameQueryFields: ["email"] });

module.exports = User = mongoose.model("User", userSchema);
