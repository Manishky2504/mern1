const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const students = [
  { id: 1, name: "Rahul", course: "BSc IT" },
  { id: 2, name: "Priya", course: "BSc DS" },
  { id: 3, name: "Ankit", course: "BCom" }
];

app.get("/students", (req, res) => {
  res.json(students);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
