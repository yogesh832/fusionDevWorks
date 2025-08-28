const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("data", dataSchema);
