const express = require("express");
const router = express.Router();
const QuickLead = require("../models/QuickLead");
const nodemailer = require("nodemailer");

// Email transporter setupp
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "upadhayayyogesh832@gmail.com",
    pass: "exzl urpm udfq kzsq", // Use environment variable in production
  },
});

// @POST - Save phone number and send email
router.post("/", async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const lead = new QuickLead({ phone });
    await lead.save();

    // Send email notification
    await transporter.sendMail({
      from: `"Lohamandi Enquiry" info@lohamandi.com`,
      to: "info@lohamandi.com",
      cc: "upadhayayyogesh832@gmail.com",
      subject: `📩 New Mobile Enquiry Received`,
      html: `
        <div>
          <h2>📱 New Lead Received</h2>
          <p><strong>Mobile:</strong> ${phone}</p>
          <p><strong>Time:</strong> ${new Date(
            lead.submittedAt
          ).toLocaleString()}</p>
        </div>
      `,
    });

    res.status(200).json({ message: "Lead saved and email sent", lead });
  } catch (error) {
    console.error("Error saving lead or sending email:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// @GET - Fetch all leads
router.get("/", async (req, res) => {
  try {
    const leads = await QuickLead.find().sort({ submittedAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
