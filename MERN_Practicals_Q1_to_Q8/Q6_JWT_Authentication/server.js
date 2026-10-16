const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("JWT authentication API is running"));

app.get("/protected", require("./middleware/authMiddleware"), (req, res) => {
  res.json({ message: "You accessed a protected route", userId: req.user.id });
});

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
