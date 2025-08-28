const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true }, // ✅ Add this
    additional: { type: String },
    content: { type: String },
    image: { type: String },
    metaTitle: { type: String },
    metaKeywords: { type: String },
    metaDescription: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
