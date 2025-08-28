const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    content: String, // Rich content from CKEditor
    tag: String,
    img: String,
    date: String,
    month: String,
    metaTitle: String,
    metaKeywords: String,
    metaDescription: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
