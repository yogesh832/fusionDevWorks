const express = require("express");
const router = express.Router();
const data = require("../models/data");
const nodemailer = require("nodemailer");

// Setup email transporter (reused from your contact route)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "upadhayayyogesh832@gmail.com",
    pass: "exzl urpm udfq kzsq", // Move this to .env for production
  },
});

// @route   POST /api/data
// @desc    Save mobile number and send email
router.post("/", async (req, res) => {
  const { mobile } = req.body;

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    return res.status(400).json({ error: "Invalid mobile number" });
  }

  try {
    const newdata = new data({ mobile });
    await newdata.save();

    // Send email
    await transporter.sendMail({
      from: `"Lohamandi Enquiry" info@lohamandi.com`,
      to: "info@lohamandi.com",
      cc: "upadhayayyogesh832@gmail.com",
      subject: `📞 New Mobile Number Submitted`,
      html: `
      <div style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 24px; font-family: Arial, sans-serif; background-color: #fff;">
        <div style="text-align: center;">
          <img src="https://lohamandi.com/lohamandi_original.png" alt="Lohamandi Logo" style="width: 120px; margin-bottom: 12px;" />
          <h2 style="margin: 0; color: #D61349;">New Mobile Number Submitted!</h2>
          <p style="color: #555; font-size: 14px; margin-top: 4px;">From Lohamandi.com mobile form</p>
        </div>

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

        <table style="width: 100%; font-size: 15px; color: #333;">
          <tr>
            <td style="padding: 8px 0;"><strong>Mobile Number:</strong></td>
            <td style="padding: 8px 0;">${mobile}</td>
          </tr>
        </table>

        <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />

        <footer style="font-size: 12px; text-align: center; color: #999;">
          <p>This submission was made via <a href="https://lohamandi.com" style="color: #D61349; text-decoration: none;">lohamandi.com</a></p>
        </footer>
      </div>
      `,
    });

    res.status(201).json({ message: "Mobile number saved and email sent" });
  } catch (err) {
    console.error("❌ Email or DB Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/data
// @desc    Get all mobile numbers
router.get("/", async (req, res) => {
  try {
    const datas = await data.find().sort({ submittedAt: -1 });
    res.status(200).json(datas);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
