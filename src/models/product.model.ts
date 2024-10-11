import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: { required: true, type: String },
  product_description: { type: String },
  product_thumb: { type: String },
  product_price: { type: Number, required: true },
  product_quantity: { type: Number, required: true },
  product_shop: { type: String },
  product_type: {
    type: String,
    required: true,
    enum: ["Electronics", "Clothes", "Furniture"],
  },
  product_attributes: {
    type: mongoose.Types
  }
});
