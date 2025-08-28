const express = require("express");
const router = express.Router();
const EnquiryMessage = require("../models/EnquireNow"); // Updated schema name
const nodemailer = require("nodemailer");

// Setup nodemailer with Gmail (use environment variables in production)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "upadhayayyogesh832@gmail.com",
    pass: "exzl urpm udfq kzsq", // Move to .env file for security
  },
});

// POST /api/enquiry: Save enquiry and send email
router.post("/", async (req, res) => {
  const { name, email, phone, product, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Name, email, and message are required" });
  }

  try {
    // Save message in DB
    const newEnquiry = new EnquiryMessage({
      name,
      email,
      phone,
      product,
      message,
    });
    await newEnquiry.save();

    // Send styled email
    await transporter.sendMail({
      from: `"Website Enquiry" <${email}>`,
      to: "info@lohamandi.com", // Recipient
      cc: "upadhayayyogesh832@gmail.com", // Optional CC
      subject: `New Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <div style="text-align: center;">
              <img src="https://lohamandi.com/lohamandi_original.png" alt="Company Logo" style="height: 60px; margin-bottom: 15px;" />
              <h2 style="color: #D61349;">📩 New Product Enquiry Received</h2>
            </div>
            <hr style="margin: 20px 0;" />
            <p><strong>👤 Name:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>📞 Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>🛒 Product:</strong> ${product || "Not specified"}</p>
            <p><strong>📝 Message:</strong></p>
            <div style="background-color: #f1f1f1; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              ${message}
            </div>
            <hr style="margin: 30px 0;" />
            <p style="text-align: center; color: #888;">This message was sent from the website enquiry form.</p>
          </div>
        </div>
      `,
    });

    res.status(201).json({ message: "Enquiry submitted and email sent!" });
  } catch (error) {
    console.error("Enquiry Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET: All enquiries
router.get("/", async (req, res) => {
  try {
    const messages = await EnquiryMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// GET: Single enquiry by ID
router.get("/:id", async (req, res) => {
  try {
    const message = await EnquiryMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ message: "Enquiry not found" });
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch message" });
  }
});

module.exports = router;
