const mongoose = require("mongoose");

const PaymentMethodSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['Cash', 'Transfer', 'Credit Card'], 
    required: true 
  },
  alias: { type: String },                // Alias
  clabe: { type: String },                // Bank Code (CLABE)
  accountNumber: { type: String },        // Account Number
  holder: { type: String },               // Account Holder
  bank: { type: String },                 // Bank Name
  priority: { type: Number },             // Priority
  maxAmount: { type: Number },            // Maximum Amount
  maxPercentage: { type: Number }         // Maximum Percentage
}, { timestamps: true });

module.exports = mongoose.model("PaymentMethod", PaymentMethodSchema);
