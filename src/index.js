require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactRoutes);


if (process.env.NODE_ENV !== "test") {
  connectDB();
}

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; 
