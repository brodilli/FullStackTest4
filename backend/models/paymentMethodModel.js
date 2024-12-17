const mongoose = require("mongoose");

const PaymentMethodSchema = new mongoose.Schema({
  tipo: { 
    type: String, 
    enum: ['Cash', 'Transfer', 'Credit Card'], 
    required: true 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  deleted: { type: Boolean, default: false },
  alias: { type: String },                // Alias
  clabe: { type: String },                // Bank Code (CLABE)
  accountNumber: { type: String },        // Account Number
  holder: { type: String },               // Account Holder
  bank: { type: String },                 // Bank Name
  priority: { type: Number },             // Priority
  maxAmount: { type: Number },            // Maximum Amount
  maxPercentage: { type: Number },         // Maximum Percentage
  paymentDate:{ type: Date}              // Payment Date
}, { timestamps: true });

module.exports = mongoose.model("PaymentMethod", PaymentMethodSchema);
