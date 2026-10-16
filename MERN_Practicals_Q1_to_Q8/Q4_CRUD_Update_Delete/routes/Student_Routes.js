const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/student");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, roll, course } = req.body;
    if (!name?.trim() || roll === undefined || !course?.trim()) {
      return res.status(400).json({ message: "Name, roll and course are required" });
    }
    const student = await Student.create({ name, roll: Number(roll), course });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    res.json(await Student.find().sort({ _id: -1 }));
  } catch {
    res.status(500).json({ message: "Unable to fetch students" });
  }
});

// UPDATE: PUT /student/:id
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: DELETE /student/:id
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete student" });
  }
});

module.exports = router;
