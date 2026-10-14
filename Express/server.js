require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Assignment = require("./models/Assignment");
const Attendance = require("./models/Attendance");


const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Connection failed:", err.message));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/assignments", async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
});

app.post("/api/assignments", async (req, res) => {
  const assignment = await Assignment.create(req.body);
  res.status(201).json(assignment);
});

app.put("/api/assignments/:id", async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
  res.json(assignment);
});

app.delete("/api/assignments/:id", async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ message: "Assignment deleted" });
});

// app.get("/api/attendance", (req, res) => {
//   res.json(attendance);
// });

// Get all attendance records
app.get("/api/attendance", async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch attendance" });
  }
});

// Add an attendance record
app.post("/api/attendance", async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ message: "Failed to add attendance" });
  }
});

// Update an attendance record
app.put("/api/attendance/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after", runValidators: true }
    );

    if (!attendance) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(attendance);
  } catch (err) {
    res.status(400).json({ message: "Failed to update attendance" });
  }
});

// Delete an attendance record
app.delete("/api/attendance/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(
      req.params.id
    );

    if (!attendance) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Attendance deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete attendance" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
