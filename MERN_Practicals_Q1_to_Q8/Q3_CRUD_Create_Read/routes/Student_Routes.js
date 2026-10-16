const express = require("express");
const Student = require("../models/student");
const router = express.Router();

// CREATE: POST /student
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

// READ: GET /student
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ _id: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch students" });
  }
});

module.exports = router;
