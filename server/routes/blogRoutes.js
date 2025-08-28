const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");

// Cloudinary Config
cloudinary.config({
  cloud_name: "dil5x4cxh",
  api_key: "981397987531997",
  api_secret: "SvG1gNicYWgJ904xOZun2wO2il4",
});

// Multer (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ----------------------------
   GET ALL BLOGS
---------------------------- */
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

/* ----------------------------
   GET SINGLE BLOG
---------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving blog" });
  }
});


/* ----------------------------
   CREATE BLOG
---------------------------- */
router.post("/", upload.single("img"), async (req, res) => {
  try {
    const {
      title,
      content,
      tag,
      date,
      month,
      metaTitle,
      metaKeywords,
      metaDescription,
    } = req.body;

    if (!title || !content || !tag || !date || !month || !req.file) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "blog_images" }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }).end(req.file.buffer);
    });

    // Auto-generate desc from first 200 characters of plain text
    const plainText = content.replace(/<[^>]*>/g, "");
    const desc = plainText.substring(0, 200);

    const newBlog = new Blog({
      title,
      desc,
      content,
      tag,
      img: result.secure_url,
      date,
      month,
      metaTitle,
      metaKeywords,
      metaDescription,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created", data: newBlog });
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: "Failed to create blog" });
  }
});

/* ----------------------------
   UPDATE BLOG
---------------------------- */
router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const {
      title,
      content,
      tag,
      date,
      month,
      metaTitle,
      metaKeywords,
      metaDescription,
    } = req.body;

    const updateFields = {
      title,
      content,
      tag,
      date,
      month,
      metaTitle,
      metaKeywords,
      metaDescription,
      desc: content.replace(/<[^>]*>/g, "").substring(0, 200),
    };

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "blog_images" }, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }).end(req.file.buffer);
      });

      updateFields.img = result.secure_url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
    });

    res.json(updatedBlog);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update blog" });
  }
});

/* ----------------------------
   DELETE BLOG
---------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Blog not found to delete" });

    res.json({ message: "Blog deleted", data: deleted });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete blog" });
  }
});

module.exports = router;
