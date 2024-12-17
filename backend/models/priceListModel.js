const mongoose = require("mongoose");

const PriceListSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the Price List
  products: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      }, // Reference to the Product
      price: { type: Number, required: true } // Price for the Product
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("PriceList", PriceListSchema);
