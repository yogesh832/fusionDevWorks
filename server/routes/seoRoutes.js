const express = require("express");
const router = express.Router();
const SeoPage = require("../models/SeoPage");

// 🔧 Normalize slug: trims, ensures leading '/', removes trailing '/', lowercases
const normalizeSlug = (slug) => {
  if (!slug) return "/";
  slug = slug.trim().toLowerCase();

  if (!slug.startsWith("/")) slug = "/" + slug;
  if (slug.length > 1 && slug.endsWith("/")) slug = slug.slice(0, -1);

  return slug;
};

// ✅ GET all SEO pages
router.get("/", async (req, res) => {
  try {
    const pages = await SeoPage.find().sort({ createdAt: -1 });
    res.json(pages);
  } catch (error) {
    console.error("GET /seo error:", error);
    res.status(500).json({ message: "Failed to fetch SEO pages" });
  }
});

// ✅ POST: Create a new SEO page
router.post("/", async (req, res) => {
  try {
    let { slug } = req.body;
    if (!slug) return res.status(400).json({ message: "Slug is required" });

    slug = normalizeSlug(slug);
    req.body.slug = slug;

    const existing = await SeoPage.findOne({ slug });
    if (existing)
      return res.status(409).json({ message: "Slug already exists" });

    const newPage = new SeoPage(req.body);
    await newPage.save();

    res.status(201).json({ message: "SEO page created", data: newPage });
  } catch (error) {
    console.error("POST /seo error:", error);
    res.status(500).json({ message: "Failed to create SEO page" });
  }
});

// ✅ GET: Single SEO page by slug (supports deep paths like /products/item)
router.get("/:slug", async (req, res) => {
  try {
    const slug = normalizeSlug(req.path); // uses full path from root
    console.log("🔍 Looking up SEO page:", slug);

    const page = await SeoPage.findOne({ slug });
    if (!page) {
      console.warn("❌ SEO page not found:", slug);
      return res.status(404).json({ message: "SEO page not found" });
    }

    res.json(page);
  } catch (error) {
    console.error("GET /seo/:slug error:", error);
    res.status(500).json({ message: "Failed to fetch SEO page" });
  }
});

// ✅ PUT: Update SEO page by slug
router.put("/", async (req, res) => {
  try {
    const slug = normalizeSlug(req.path);
    const updated = await SeoPage.findOneAndUpdate({ slug }, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "SEO page not found to update" });
    }

    res.json({ message: "SEO page updated", data: updated });
  } catch (error) {
    console.error("PUT /seo/:slug error:", error);
    res.status(500).json({ message: "Failed to update SEO page" });
  }
});

// ✅ DELETE: Delete SEO page by slug
router.delete("/", async (req, res) => {
  try {
    const slug = normalizeSlug(req.path);
    const deleted = await SeoPage.findOneAndDelete({ slug });

    if (!deleted) {
      return res.status(404).json({ message: "SEO page not found to delete" });
    }

    res.json({ message: "SEO page deleted successfully", slug });
  } catch (error) {
    console.error("DELETE /seo/:slug error:", error);
    res.status(500).json({ message: "Failed to delete SEO page" });
  }
});

module.exports = router;
