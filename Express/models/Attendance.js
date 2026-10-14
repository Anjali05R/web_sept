const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  subject: String,
  held: Number,
  attended: Number,
});

module.exports = mongoose.model("Attendance", attendanceSchema);