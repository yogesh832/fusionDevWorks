const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  keywords: { type: String },
  ogImage: { type: String },
  canonical: { type: String },
  robots: { type: String, default: "index,follow" },
});

module.exports = mongoose.model("SeoPage", seoSchema);
