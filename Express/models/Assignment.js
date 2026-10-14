const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  Topic: String,
  duedate: String,
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
