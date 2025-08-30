const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");
const nodemailer = require("nodemailer");

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "upadhayayyogesh832@gmail.com",
    pass: "exzl urpm udfq kzsq", // Move to .env in production
  },
});

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    await transporter.sendMail({
      from: `"Client Enquiry" <${email}>`,
      to: "worksfusiondev@gmail.com", // Recipient
      cc: "upadhayayyogesh832@gmail.com", // Optional CC
      bcc: "bipashabareja1@gmail.com",
      subject: `📩 New Enquiry from ${name}`,
      html: `
  <div style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 24px; font-family: Arial, sans-serif; background-color: #fff;">
    <div style="text-align: center; background-color: black; color: white; padding: 12px; border-radius: 8px;">
      <img src="https://fusiondevworks.com/lovable-uploads/78f498c2-7f04-4dac-853b-5c006f3941c4.png" alt="fusiondevworks Logo" style="width: 120px; margin-bottom: 12px;" />
      <h2 style="margin: 0; color: #D61349;">You’ve received a new enquiry!</h2>
      <p style="color: #555; font-size: 14px; margin-top: 4px;">From fusiondevworks contact form</p>
    </div>

    <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

    <table style="width: 100%; font-size: 15px; color: #333;">
      <tr>
        <td style="padding: 8px 0;"><strong>Name:</strong></td>
        <td style="padding: 8px 0;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>Email:</strong></td>
        <td style="padding: 8px 0;">${email}</td>
      </tr>
    </table>

    <div style="margin-top: 16px;">
      <strong>Message:</strong>
      <div style="margin-top: 8px; background-color: #f9f9f9; padding: 12px; border-left: 4px solid #D61349; color: #444; line-height: 1.6;">
        ${message}
      </div>
    </div>

    <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />

    <footer style="font-size: 12px; text-align: center; color: #999;">
      <p>This message was submitted from <a href="https://fusiondevworks" style="color: #D61349; text-decoration: none;">lohamandi.com</a></p>
    </footer>
  </div>
`,
    });

    res.status(201).json({ message: "Message saved and email sent!" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// GET all messages
router.get("/", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// GET single message by ID
router.get("/:id", async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ message: "Not found" });
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch message" });
  }
});

module.exports = router;
