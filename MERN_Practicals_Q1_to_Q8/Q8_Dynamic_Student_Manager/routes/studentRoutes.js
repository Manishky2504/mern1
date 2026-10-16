const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const router = express.Router();

// GET all records, newest first
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch {
    res.status(500).json({ message: "Unable to fetch students" });
  }
});

// CREATE a record
router.post("/", async (req, res) => {
  try {
    const { name, email, course, city } = req.body;
    if (!name?.trim() || !email?.trim() || !course?.trim() || !city?.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const student = await Student.create({ name, email, course, city });
    res.status(201).json(student);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Email already exists" });
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a record
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    const student = await Student.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Email already exists" });
    res.status(400).json({ message: error.message });
  }
});

// DELETE a record
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch {
    res.status(500).json({ message: "Unable to delete student" });
  }
});

module.exports = router;
