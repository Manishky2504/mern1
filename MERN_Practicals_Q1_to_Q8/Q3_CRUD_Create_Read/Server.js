const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student_Routes = require("./routes/Student_Routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/student", Student_Routes);

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
