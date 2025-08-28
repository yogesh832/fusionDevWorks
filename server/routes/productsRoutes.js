const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary")
// Cloudinary Config
cloudinary.config({
  cloud_name: "dil5x4cxh",
  api_key: "981397987531997",
  api_secret: "SvG1gNicYWgJ904xOZun2wO2il4",
});

// Multer Setup (memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ----------------------------
   GET ALL PRODUCTS
---------------------------- */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});
// stuff

/* ----------------------------
   GET SINGLE PRODUCT
---------------------------- */
/* ----------------------------
   GET PRODUCTS BY CATEGORY SLUG
---------------------------- */
router.get("/:slug", async (req, res) => {
  try {
    const categorySlug = req.params.slug;

    const products = await Product.find({ slug: categorySlug }).sort({ createdAt: -1 });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.json(products);
  } catch (err) {
    console.error("Category fetch error:", err);
    res.status(500).json({ message: "Failed to fetch category products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving product" });
  }
});

/* ----------------------------
   CREATE PRODUCT
---------------------------- */
router.post("/", upload.single("img"), async (req, res) => {
  try {
 const {
  title,
  slug,
  price,
  content,
  additional,
  metaTitle,
  metaKeywords,
  metaDescription,
} = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let imageUrl = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "products" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const newProduct = new Product({
  title,
  slug,
  price, // ✅ Add here
  content,
  additional,
  image: imageUrl,
  metaTitle,
  metaKeywords,
  metaDescription,
});

    await newProduct.save();
    res.status(201).json({ message: "Product created", data: newProduct });
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: "Failed to create product" });
  }
});

/* ----------------------------
   UPDATE PRODUCT
---------------------------- */
router.put("/:id", upload.single("img"), async (req, res) => {
  try {
 const {
  title,
  slug,
  price,
  content,
  additional,
  metaTitle,
  metaKeywords,
  metaDescription,
} = req.body;

  const updateFields = {
  title,
  slug,
  price,
  content,
  additional,
  metaTitle,
  metaKeywords,
  metaDescription,
};

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "products" },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        ).end(req.file.buffer);
      });

      updateFields.image = result.secure_url;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated", data: updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
});

/* ----------------------------
   DELETE PRODUCT
---------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found to delete" });

    res.json({ message: "Product deleted", data: deleted });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;
