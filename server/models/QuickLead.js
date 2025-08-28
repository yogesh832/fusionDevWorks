const mongoose = require("mongoose");

const quickLeadSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QuickLead", quickLeadSchema);
