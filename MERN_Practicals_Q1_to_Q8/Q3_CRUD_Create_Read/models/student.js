const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  roll: { type: Number, required: true, min: 1 },
  course: { type: String, required: true, trim: true }
});

module.exports = mongoose.model("Student", studentSchema);
