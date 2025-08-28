const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");

const app = express();
const PORT = 8000;

// ✅ Correct CORS options
const corsOptions = {
  origin: "*", // Allow all origins
};

// ✅ Apply middleware in correct order
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Connect to DB
dbConnection();

// ✅ Routes
app.use("/api/seo", require("./routes/seoRoutes"));
app.use("/api/blog", require("./routes/blogRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/enquiry", require("./routes/enquireRoutes")); // Enquiry route
app.use("/api/quickLead", require("./routes/quickLead"));   // Quick lead route
app.use("/api/products", require("./routes/productsRoutes"));   // Quick lead route
// added product route
// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 API is up and running.");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
