// test-email.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "upadhayayyogesh832@gmail.com",
    pass: "exzl urpm udfq kzsq", // App password
  },
});

const mailOptions = {
  from: "upadhayayyogesh832@gmail.com",
  to: "info@lohamandi.com",
  subject: "Testing Email",
  text: "Hello, this is a test email.",
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    return console.error("❌ Email send failed:", err);
  }
  console.log("✅ Email sent:", info.response);
});
